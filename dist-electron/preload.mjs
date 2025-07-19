"use strict";
const electron = require("electron");
const exposeBridge = {
  login: (credentials) => electron.ipcRenderer.invoke("login", credentials),
  logout: () => electron.ipcRenderer.invoke("logout"),
  // file
  selectDirectory: () => electron.ipcRenderer.invoke("selectDirectory"),
  selectImage: () => electron.ipcRenderer.invoke("selectImage"),
  selectExcel: () => electron.ipcRenderer.invoke("selectExcel"),
  // excel
  parseExcelFile: (filePath) => electron.ipcRenderer.invoke("parseExcelFile", filePath)
};
electron.contextBridge.exposeInMainWorld("electronBridge", exposeBridge);
