import fs from 'fs'
import { dialog } from 'electron'
import { ImageResult } from '@/types/file'

import path from 'path'

/**
 * 选择目录
 *
 */
const selectDirectory = async (): Promise<string> => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })
  return result.filePaths[0]
}
// 选择图片
const selectImage = async (): Promise<ImageResult> => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: '图片', extensions: ['jpg', 'png', 'gif'] }]
  })
  // 图片转base64
  const base64Image = fs.readFileSync(result.filePaths[0], 'base64')
  return {
    path: result.filePaths[0],
    name: path.basename(result.filePaths[0]),
    url: `data:image/png;base64,${base64Image}`
  }
}

const register = (ipcMain: Electron.IpcMain) => {
  ipcMain.handle('selectDirectory', selectDirectory)
  ipcMain.handle('selectImage', selectImage)
}

export type FileExpose = {
  selectDirectory: () => Promise<string>
  selectImage: () => Promise<ImageResult>
}

export default register
