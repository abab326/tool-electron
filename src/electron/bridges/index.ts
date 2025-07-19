const ipcModules: Record<string, any> = {}

const modules = import.meta.glob('./modules/*.ts', { eager: true })
 console.log('modules :', modules)
for (const path in modules) {
  const module = modules[path] as any
  console.log('register module:', path)
  ipcModules[path] = module.default
}

export const registerIpcHandlers = (ipcMain: Electron.IpcMain) => {
  console.log('registerIpcHandlers', ipcModules)
  for (const name in ipcModules) {
    const module = ipcModules[name]
    module(ipcMain)
  }
}
