"use strict";
const electron = require("electron");
const exposeBridge = {
  login: (credentials) => electron.ipcRenderer.invoke("login", credentials),
  logout: () => electron.ipcRenderer.invoke("logout"),
  selectDirectory: () => electron.ipcRenderer.invoke("selectDirectory"),
  selectImage: () => electron.ipcRenderer.invoke("selectImage")
};
electron.contextBridge.exposeInMainWorld("electronBridge", exposeBridge);
