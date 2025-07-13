const ipcModules: Record<string, any> = {}
const modules = import.meta.glob('./modules/*.ts', { eager: true })
console.log('modules:', modules)
for (const path in modules) {
  const module = modules[path] as any
  const name = path.replace(/\.\/modules\/(.*)\.ts/, '')
  console.log('register module:', name)
  ipcModules[name] = module.default
}

export const registerIpcHandlers = (ipcMain: Electron.IpcMain) => {
  console.log('registerIpcHandlers', ipcModules)
  for (const name in ipcModules) {
    const module = ipcModules[name]

    if (module.register) {
      module.register(ipcMain)
    }
  }
}

export const exposeRender = (ipcRenderer: Electron.IpcRenderer) => {
  let allExpose = {}
  for (const name in ipcModules) {
    const module = ipcModules[name]
    const expose = module['expose']
    allExpose = { ...allExpose, ...expose(ipcRenderer) }
  }
  return allExpose
}
