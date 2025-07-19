import { LoginParams } from '@/types/auth'
import { ipcRenderer } from 'electron'

export const exposeBridge = {
  login: (credentials: LoginParams) => ipcRenderer.invoke('login', credentials),
  logout: () => ipcRenderer.invoke('logout'),
  // file
  selectDirectory: (): Promise<string> => ipcRenderer.invoke('selectDirectory'),
  selectImage: (): Promise<string> => ipcRenderer.invoke('selectImage'),
  selectExcel: (): Promise<string> => ipcRenderer.invoke('selectExcel'),
  // excel
  parseExcelFile: (filePath: string): Promise<any> => ipcRenderer.invoke('parseExcelFile', filePath)
}

export type ElectronBridge = typeof exposeBridge
