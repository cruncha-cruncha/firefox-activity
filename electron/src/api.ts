import { ipcMain } from "electron";

ipcMain.handle(
  "node-version",
  (event, msg) => {
    console.log(event);
    console.log(msg);

    return process.versions.node;
  }
);