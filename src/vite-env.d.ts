/// <reference types="vite/client" />
import { ElectronBridge } from '@/electron/bridges/pre-bridge'
declare global {
  interface Window {
    electronBridge: ElectronBridge
  }
}
