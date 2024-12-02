import { ipcMain } from "electron";
import { makeQuery, SQLiteHandle } from "./read-local/sqlite";
import { copyFile } from "./read-local/files";
import { QueryParams } from "./read-local/query-params";

const setupDB = async () => {
  const src =
    "/Users/wilder/Library/Application Support/Firefox/Profiles/pnl3hctl.default-1567355615198/places.sqlite";
  const dest = "./source-db/places.sqlite";

  const sqlite = new SQLiteHandle();

  return copyFile(src, dest)
    .then(() => sqlite.connect(dest))
    .then(() => sqlite);
};

export const setupApi = async () => {
  const db = await setupDB();

  ipcMain.handle("get-data", (event, msg: QueryParams) => {
    return db.query(makeQuery(msg));
  });
};
