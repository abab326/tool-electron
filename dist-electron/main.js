import { dialog, app, BrowserWindow, screen, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path$1 from "node:path";
import fs from "fs";
import path from "path";
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
const register$1 = (ipcMain2) => {
  ipcMain2.handle("login", login);
  ipcMain2.handle("logout", logout);
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: register$1
}, Symbol.toStringTag, { value: "Module" }));
const selectDirectory = async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"]
  });
  return result.filePaths[0];
};
const selectImage = async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "图片", extensions: ["jpg", "png", "gif"] }]
  });
  const base64Image = fs.readFileSync(result.filePaths[0], "base64");
  return {
    path: result.filePaths[0],
    name: path.basename(result.filePaths[0]),
    url: `data:image/png;base64,${base64Image}`
  };
};
const register = (ipcMain2) => {
  ipcMain2.handle("selectDirectory", selectDirectory);
  ipcMain2.handle("selectImage", selectImage);
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: register
}, Symbol.toStringTag, { value: "Module" }));
const ipcModules = {};
const modules = /* @__PURE__ */ Object.assign({ "./modules/auth.ts": __vite_glob_0_0, "./modules/file.ts": __vite_glob_0_1 });
for (const path2 in modules) {
  const module = modules[path2];
  const name = path2.replace(/\.\/modules\/(.*)\.ts/, "");
  console.log("register module:", name);
  ipcModules[name] = module.default;
}
const registerIpcHandlers = (ipcMain2) => {
  console.log("registerIpcHandlers", ipcModules);
  for (const name in ipcModules) {
    const module = ipcModules[name];
    module(ipcMain2);
  }
};
const __dirname = path$1.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path$1.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path$1.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path$1.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path$1.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  win = new BrowserWindow({
    width: Math.round(width * 0.5),
    height: Math.round(height * 0.8),
    icon: path$1.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path$1.join(__dirname, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path$1.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(() => {
  registerIpcHandlers(ipcMain);
  createWindow();
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
