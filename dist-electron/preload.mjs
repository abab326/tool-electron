"use strict";
const electron = require("electron");
const login = async (event, credentials) => {
  console.log("login", credentials);
  const { username, password } = credentials;
  if (username === "admin" && password === "admin") {
    return {
      success: true,
      data: { token: "generated-token" }
    };
  }
  return Promise.reject(new Error("用户名或密码错误"));
};
const logout = async () => {
  return Promise.resolve();
};
const register$1 = (ipcMain) => {
  ipcMain.handle("login", login);
  ipcMain.handle("logout", logout);
};
const expose$1 = (ipcRenderer) => {
  return {
    login: (credentials) => ipcRenderer.invoke("login", credentials),
    logout: () => ipcRenderer.invoke("logout")
  };
};
const auth = {
  register: register$1,
  expose: expose$1
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: auth
}, Symbol.toStringTag, { value: "Module" }));
const selectDirectory = async () => {
  const result = await electron.dialog.showOpenDialog({
    properties: ["openDirectory"]
  });
  return result.filePaths[0];
};
const register = (ipcMain) => {
  ipcMain.handle("selectDirectory", selectDirectory);
};
const expose = (ipcRenderer) => {
  return {
    selectDirectory: () => ipcRenderer.invoke("selectDirectory")
  };
};
const file = { register, expose };
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: file
}, Symbol.toStringTag, { value: "Module" }));
const ipcModules = {};
const modules = /* @__PURE__ */ Object.assign({ "./modules/auth.ts": __vite_glob_0_0, "./modules/file.ts": __vite_glob_0_1 });
console.log("modules:", modules);
for (const path in modules) {
  const module = modules[path];
  const name = path.replace(/\.\/modules\/(.*)\.ts/, "");
  console.log("register module:", name);
  ipcModules[name] = module.default;
}
const exposeRender = (ipcRenderer) => {
  let allExpose = {};
  for (const name in ipcModules) {
    const module = ipcModules[name];
    const expose2 = module["expose"];
    allExpose = { ...allExpose, ...expose2(ipcRenderer) };
  }
  return allExpose;
};
electron.contextBridge.exposeInMainWorld("electronBridge", {
  ...exposeRender(electron.ipcRenderer)
});
