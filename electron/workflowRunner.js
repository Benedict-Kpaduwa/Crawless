const path = require('path')

const WORKFLOW_WORLD_ID = 1

function wrapUserCode(code) {
  return `(async () => {
    const { Page, Log, Utils } = context;
    try {
      ${code}
    } catch (err) {
      context.Log.error('Workflow error: ' + (err && err.message ? err.message : String(err)));
      throw err;
    }
  })()`
}

function wrapEvaluate(code, args) {
  const serializedArgs = args.map((a) => JSON.stringify(a)).join(',')
  return `(function() {
    const fn = (${code});
    return fn(${serializedArgs});
  })()`
}

// Runs each workflow's orchestration code (Page/Log/Utils calls) in a hidden,
// never-navigating "controller" window's isolated world, and drives a
// separate "target" window (the one that actually navigates) purely over
// IPC. This split exists because navigating a page destroys any JS context
// attached to that frame — including an isolated world — so the code that's
// meant to survive across multiple Page.goto() calls can't live in the page
// that's being navigated.
function makeWorkflowRunner({ BrowserWindow, session, ipcMain, getMainWindow, workflowStore }) {
  const runs = new Map()
  const preloadPath = path.join(__dirname, '..', 'public', 'workflowPreload.js')

  function sendLog(runId, level, args) {
    const mainWindow = getMainWindow()
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('workflow:log', { runId, level, args, timestamp: Date.now() })
    }
  }

  function finishRun(runId, { error } = {}) {
    const run = runs.get(runId)
    if (!run) return
    if (error) sendLog(runId, 'error', [`Workflow crashed: ${error.message || error}`])
    workflowStore.update(run.name, { is_running: false })
    runs.delete(runId)
    ;[run.controllerWin, run.targetWin].forEach((win) => {
      if (win && !win.isDestroyed()) win.destroy()
    })
    if (run.session) run.session.clearStorageData().catch(() => {})
  }

  function runWorkflow({ name, code, options = {} }) {
    const runId = `${name}-${Date.now()}`
    const ses = session.fromPartition(`workflow-${runId}`) // no "persist:" prefix -> in-memory only

    const targetWin = new BrowserWindow({
      show: options.visibility !== 'hidden',
      webPreferences: { session: ses, contextIsolation: true, nodeIntegration: false, sandbox: true },
    })
    if (options.userAgent) targetWin.webContents.setUserAgent(options.userAgent)
    targetWin.loadURL('about:blank')

    const controllerWin = new BrowserWindow({
      show: false,
      webPreferences: {
        preload: preloadPath,
        additionalArguments: [`--crawless-run-id=${runId}`],
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: false,
      },
    })

    runs.set(runId, { controllerWin, targetWin, session: ses, name })
    workflowStore.update(name, { is_running: true, last_run_date: new Date().toISOString() })

    controllerWin.webContents.once('did-finish-load', () => {
      controllerWin.webContents
        .executeJavaScriptInIsolatedWorld(WORKFLOW_WORLD_ID, [{ code: wrapUserCode(code) }])
        .then(() => finishRun(runId))
        .catch((error) => finishRun(runId, { error }))
    })
    controllerWin.loadURL('about:blank')

    return runId
  }

  function stopWorkflow(runId) {
    const run = runs.get(runId)
    if (!run) return false
    sendLog(runId, 'warn', ['Workflow stopped by user'])
    finishRun(runId)
    return true
  }

  function getRun(runId) {
    const run = runs.get(runId)
    if (!run) throw new Error(`No active run "${runId}"`)
    return run
  }

  function registerIpcHandlers() {
    ipcMain.handle('workflow:run', (event, { name, code, options }) =>
      runWorkflow({ name, code, options }),
    )
    ipcMain.handle('workflow:stop', (event, runId) => stopWorkflow(runId))

    ipcMain.handle('workflow:page:goto', async (event, { runId, url, options }) => {
      const run = getRun(runId)
      if (options && options.userAgent) run.targetWin.webContents.setUserAgent(options.userAgent)
      await run.targetWin.loadURL(url)
      return true
    })
    ipcMain.handle('workflow:page:evaluate', (event, { runId, code, args }) => {
      const run = getRun(runId)
      return run.targetWin.webContents.executeJavaScript(wrapEvaluate(code, args))
    })
    ipcMain.handle('workflow:page:show', (event, { runId }) => {
      getRun(runId).targetWin.show()
      return true
    })
    ipcMain.handle('workflow:page:hide', (event, { runId }) => {
      getRun(runId).targetWin.hide()
      return true
    })
    ipcMain.handle('workflow:page:title', (event, { runId }) =>
      getRun(runId).targetWin.webContents.getTitle(),
    )
    ipcMain.on('workflow:log', (event, { runId, level, args }) => sendLog(runId, level, args))
  }

  return { runWorkflow, stopWorkflow, registerIpcHandlers, _runs: runs }
}

module.exports = { makeWorkflowRunner, wrapUserCode, wrapEvaluate, WORKFLOW_WORLD_ID }
