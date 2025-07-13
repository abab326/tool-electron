import { dialog } from 'electron'

const selectDirectory = async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  return result.filePaths[0]
}

const register = (ipcMain: Electron.IpcMain) => {
  ipcMain.handle('selectDirectory', selectDirectory)
}

const expose = (ipcRenderer: Electron.IpcRenderer) => {
  return {
    selectDirectory: () => ipcRenderer.invoke('selectDirectory')
  }
}

export type FileExpose = {
  selectDirectory: () => Promise<string>
}

export default { register, expose }
