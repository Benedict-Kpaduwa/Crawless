const { contextBridge, ipcRenderer } = require('electron')
const { buildUtils } = require('../electron/sandbox/utilsFacade')

// Numbered isolated world the controller window's orchestration script runs
// in. It is a separate JS realm from this preload's own context and from any
// page loaded in the (different) target window, so user code never touches
// Node, Electron, or app internals — only what we explicitly bridge below.
const WORKFLOW_WORLD_ID = 1

function getRunId() {
  const arg = process.argv.find((a) => a.startsWith('--crawless-run-id='))
  return arg ? arg.split('=')[1] : null
}

const runId = getRunId()

function buildPage() {
  return {
    goto: (url, options) => ipcRenderer.invoke('workflow:page:goto', { runId, url, options }),
    evaluate: (fn, ...args) =>
      ipcRenderer.invoke('workflow:page:evaluate', { runId, code: fn.toString(), args }),
    show: () => ipcRenderer.invoke('workflow:page:show', { runId }),
    hide: () => ipcRenderer.invoke('workflow:page:hide', { runId }),
    title: () => ipcRenderer.invoke('workflow:page:title', { runId }),
  }
}

function buildLog() {
  const send = (level) => (...args) => ipcRenderer.send('workflow:log', { runId, level, args })
  return {
    debug: send('debug'),
    info: send('info'),
    warn: send('warn'),
    error: send('error'),
  }
}

if (runId) {
  contextBridge.exposeInIsolatedWorld(WORKFLOW_WORLD_ID, 'context', {
    Page: buildPage(),
    Log: buildLog(),
    Utils: buildUtils(),
  })
}

module.exports = { WORKFLOW_WORLD_ID }
