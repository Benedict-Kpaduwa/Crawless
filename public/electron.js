const { app, BrowserWindow, ipcMain, screen, session, safeStorage } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const { makeWorkflowStore } = require('../electron/workflowStore')
const { makeSettingsStore } = require('../electron/settingsStore')
const { makeWorkflowRunner } = require('../electron/workflowRunner')

let mainWindow

const workflowStore = makeWorkflowStore(app.getPath('userData'))
const settingsStore = makeSettingsStore(app.getPath('userData'), safeStorage)
const workflowRunner = makeWorkflowRunner({
  BrowserWindow,
  session,
  ipcMain,
  getMainWindow: () => mainWindow,
  workflowStore,
})

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    width,
    height,
    icon: '../../Assets/crawless.png',
    backgroundColor: '#151515',
    title: 'Crawless',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  })
  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`,
  )
  mainWindow.on('closed', () => (mainWindow = null))
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }
}

function registerIpcHandlers() {
  ipcMain.handle('workflows:list', () => workflowStore.list())
  ipcMain.handle('workflows:create', (event, workflow) => workflowStore.create(workflow))
  ipcMain.handle('workflows:update', (event, { name, patch }) => workflowStore.update(name, patch))
  ipcMain.handle('workflows:delete', (event, name) => workflowStore.remove(name))

  ipcMain.handle('settings:get', () => settingsStore.read())
  ipcMain.handle('settings:set', (event, patch) => settingsStore.update(patch))

  workflowRunner.registerIpcHandlers()
}

app.on('ready', () => {
  registerIpcHandlers()
  createWindow()
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
