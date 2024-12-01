import { contextBridge, ipcRenderer } from "electron";
import { QueryParams } from "./read-local/query-params";

export const backend = {
  nodeVersion: async (msg: string) =>
    await ipcRenderer.invoke("node-version", msg),
  testSqlite: async (msg: string) =>
    await ipcRenderer.invoke("test-sqlite", msg),
  getData: async (msg: QueryParams) => await ipcRenderer.invoke("get-data", msg),
};

contextBridge.exposeInMainWorld("backend", backend);
