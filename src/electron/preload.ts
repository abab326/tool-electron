import { contextBridge, ipcRenderer } from 'electron'
import { exposeRender } from './bridges'

contextBridge.exposeInMainWorld('electronBridge', {
  ...exposeRender(ipcRenderer)
})
