import { AuthExpose } from './modules/auth'
import { FileExpose } from './modules/file'

export type ElectronBridge = AuthExpose & FileExpose
