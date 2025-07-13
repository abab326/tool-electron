import { LoginParams } from '@/types/auth'
import { ipcRenderer } from 'electron'

export const exposeBridge = {
  login: (credentials: LoginParams) => ipcRenderer.invoke('login', credentials),
  logout: () => ipcRenderer.invoke('logout'),
  selectDirectory: () => ipcRenderer.invoke('selectDirectory'),
  selectImage: () => ipcRenderer.invoke('selectImage')
}

export type ElectronBridge = typeof exposeBridge
