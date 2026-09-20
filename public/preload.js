const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('crawless', {
  listWorkflows: () => ipcRenderer.invoke('workflows:list'),
  createWorkflow: (workflow) => ipcRenderer.invoke('workflows:create', workflow),
  updateWorkflow: (name, patch) => ipcRenderer.invoke('workflows:update', { name, patch }),
  deleteWorkflow: (name) => ipcRenderer.invoke('workflows:delete', name),

  runWorkflow: (name, code, options) => ipcRenderer.invoke('workflow:run', { name, code, options }),
  stopWorkflow: (runId) => ipcRenderer.invoke('workflow:stop', runId),
  onLog: (callback) => {
    const listener = (event, payload) => callback(payload)
    ipcRenderer.on('workflow:log', listener)
    return () => ipcRenderer.removeListener('workflow:log', listener)
  },

  getSettings: () => ipcRenderer.invoke('settings:get'),
  setSettings: (patch) => ipcRenderer.invoke('settings:set', patch),
})
