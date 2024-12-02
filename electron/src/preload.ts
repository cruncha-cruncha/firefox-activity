import { contextBridge, ipcRenderer } from "electron";
import { QueryParams } from "./read-local/query-params";

export const backend = {
  getData: async (msg: QueryParams) => await ipcRenderer.invoke("get-data", msg),
};

contextBridge.exposeInMainWorld("backend", backend);
