/// <reference types="vite/client" />
import { ElectronBridge } from '@/electron/bridges/type'
declare global {
  interface Window {
    electronBridge: ElectronBridge
  }
}
