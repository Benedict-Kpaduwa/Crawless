import { describe, it, expect, vi, beforeEach } from 'vitest'
import { makeWorkflowRunner } from '../workflowRunner'

// A minimal fake of Electron's BrowserWindow/webContents surface — enough to
// drive workflowRunner's orchestration logic without a real Chromium
// instance. loadURL() resolves on the next microtask and fires any
// registered "did-finish-load" listener first, mirroring real Electron's
// ordering closely enough for these tests.
function makeFakeBrowserWindow() {
  const onceListeners = {}
  let destroyed = false
  const win = {
    webContents: {
      once: (event, cb) => { onceListeners[event] = cb },
      send: vi.fn(),
      setUserAgent: vi.fn(),
      getTitle: vi.fn().mockResolvedValue('a title'),
      executeJavaScript: vi.fn().mockResolvedValue('evaluated'),
      executeJavaScriptInIsolatedWorld: vi.fn().mockResolvedValue(undefined),
    },
    loadURL: vi.fn().mockImplementation(async () => {
      if (onceListeners['did-finish-load']) onceListeners['did-finish-load']()
    }),
    show: vi.fn(),
    hide: vi.fn(),
    destroy: vi.fn(() => { destroyed = true }),
    isDestroyed: () => destroyed,
  }
  return win
}

function makeDeps() {
  const windows = []
  const BrowserWindow = vi.fn().mockImplementation(() => {
    const win = makeFakeBrowserWindow()
    windows.push(win)
    return win
  })
  const fakeSession = { clearStorageData: vi.fn().mockResolvedValue(undefined) }
  const session = { fromPartition: vi.fn().mockReturnValue(fakeSession) }
  const handlers = {}
  const listeners = {}
  const ipcMain = {
    handle: (channel, fn) => { handlers[channel] = fn },
    on: (channel, fn) => { listeners[channel] = fn },
  }
  const mainWindow = { webContents: { send: vi.fn() }, isDestroyed: () => false }
  const workflowStore = { update: vi.fn() }

  const runner = makeWorkflowRunner({
    BrowserWindow,
    session,
    ipcMain,
    getMainWindow: () => mainWindow,
    workflowStore,
  })
  runner.registerIpcHandlers()

  return { runner, windows, handlers, listeners, mainWindow, workflowStore, fakeSession, BrowserWindow, session }
}

describe('workflowRunner', () => {
  let deps

  beforeEach(() => {
    deps = makeDeps()
  })

  it('creates a visible target window and a hidden, preloaded controller window', () => {
    deps.runner.runWorkflow({ name: 'wf', code: '', options: {} })

    expect(deps.BrowserWindow).toHaveBeenCalledTimes(2)
    const [targetOpts] = deps.BrowserWindow.mock.calls[0]
    const [controllerOpts] = deps.BrowserWindow.mock.calls[1]
    expect(targetOpts.show).toBe(true)
    expect(controllerOpts.show).toBe(false)
    expect(controllerOpts.webPreferences.preload).toContain('workflowPreload.js')
    expect(controllerOpts.webPreferences.additionalArguments[0]).toMatch(/^--crawless-run-id=wf-\d+$/)
  })

  it('respects options.visibility: "hidden" for the target window', () => {
    deps.runner.runWorkflow({ name: 'wf', code: '', options: { visibility: 'hidden' } })
    const [targetOpts] = deps.BrowserWindow.mock.calls[0]
    expect(targetOpts.show).toBe(false)
  })

  it('gives the target window a fresh, in-memory (non-persist:) session partition', () => {
    deps.runner.runWorkflow({ name: 'wf', code: '', options: {} })
    expect(deps.session.fromPartition).toHaveBeenCalledTimes(1)
    const [partitionName] = deps.session.fromPartition.mock.calls[0]
    expect(partitionName).toMatch(/^workflow-wf-\d+$/)
  })

  it('marks the workflow as running and records last_run_date', () => {
    deps.runner.runWorkflow({ name: 'wf', code: '', options: {} })
    expect(deps.workflowStore.update).toHaveBeenCalledWith(
      'wf',
      expect.objectContaining({ is_running: true }),
    )
  })

  it('runs the wrapped user code in the reserved isolated world once the controller loads', async () => {
    deps.runner.runWorkflow({ name: 'wf', code: 'await Log.info(1)', options: {} })
    await Promise.resolve()
    await Promise.resolve()

    const controllerWin = deps.windows[1]
    expect(controllerWin.webContents.executeJavaScriptInIsolatedWorld).toHaveBeenCalled()
    const [worldId, scripts] = controllerWin.webContents.executeJavaScriptInIsolatedWorld.mock.calls[0]
    expect(worldId).toBe(1)
    expect(scripts[0].code).toContain('await Log.info(1)')
    expect(scripts[0].code).toContain('const { Page, Log, Utils } = context')
  })

  it('routes workflow:page:goto to the target window of the matching run', async () => {
    const runId = deps.runner.runWorkflow({ name: 'wf', code: '', options: {} })
    const targetWin = deps.windows[0]

    await deps.handlers['workflow:page:goto']({}, { runId, url: 'https://example.com' })

    expect(targetWin.loadURL).toHaveBeenCalledWith('https://example.com')
  })

  it('routes workflow:page:evaluate through executeJavaScript on the target window', async () => {
    const runId = deps.runner.runWorkflow({ name: 'wf', code: '', options: {} })
    const targetWin = deps.windows[0]

    const result = await deps.handlers['workflow:page:evaluate']({}, {
      runId,
      code: '(x) => x + 1',
      args: [41],
    })

    expect(result).toBe('evaluated')
    expect(targetWin.webContents.executeJavaScript).toHaveBeenCalled()
    const [code] = targetWin.webContents.executeJavaScript.mock.calls[0]
    expect(code).toContain('(x) => x + 1')
    expect(code).toContain('41')
  })

  it('forwards workflow:log to the main window', () => {
    const runId = deps.runner.runWorkflow({ name: 'wf', code: '', options: {} })
    deps.listeners['workflow:log']({}, { runId, level: 'info', args: ['hello'] })

    expect(deps.mainWindow.webContents.send).toHaveBeenCalledWith(
      'workflow:log',
      expect.objectContaining({ runId, level: 'info', args: ['hello'] }),
    )
  })

  it('stopWorkflow destroys both windows and marks the workflow as not running', () => {
    const runId = deps.runner.runWorkflow({ name: 'wf', code: '', options: {} })
    const [targetWin, controllerWin] = deps.windows

    const stopped = deps.runner.stopWorkflow(runId)

    expect(stopped).toBe(true)
    expect(targetWin.destroy).toHaveBeenCalled()
    expect(controllerWin.destroy).toHaveBeenCalled()
    expect(deps.workflowStore.update).toHaveBeenCalledWith('wf', { is_running: false })
  })

  it('stopWorkflow on an unknown run id is a no-op that returns false', () => {
    expect(deps.runner.stopWorkflow('does-not-exist')).toBe(false)
  })

  it('IPC handlers throw for an unknown run id (Electron turns this into a rejected invoke() on the renderer side)', () => {
    expect(() => deps.handlers['workflow:page:title']({}, { runId: 'nope' })).toThrow(/No active run/)
  })
})
