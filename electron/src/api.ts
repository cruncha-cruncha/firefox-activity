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

const testDB = async (db: SQLiteHandle) => {
  await db
    .query(makeQuery())
    .then((rows) => console.log("TEST RESULT", rows))
    .catch((err) => console.error("TEST ERROR", err));
};

export const setupApi = async () => {
  const db = await setupDB();

  ipcMain.handle("node-version", (event, msg: string) => {
    console.log(event);
    console.log(msg);

    return process.versions.node;
  });

  ipcMain.handle("test-sqlite", (event, msg: string) => {
    console.log("handling test-sqlite");

    testDB(db);

    return "tested sqlite";
  });

  ipcMain.handle("get-data", (event, msg: QueryParams) => {
    return db.query(makeQuery(msg));
  });
};
