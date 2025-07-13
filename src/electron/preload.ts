import { contextBridge } from 'electron'
import { exposeBridge } from './bridges/pre-bridge'

contextBridge.exposeInMainWorld('electronBridge', exposeBridge)
