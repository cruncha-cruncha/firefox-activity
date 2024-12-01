import sqlite3 from "sqlite3";
import { QueryParams } from "./query-params";

export class SQLiteHandle {
  #conn: sqlite3.Database | null = null;

  connect(filename: string, mode = sqlite3.OPEN_READWRITE) {
    const db = new sqlite3.Database(filename, mode);

    return new Promise((resolve, reject) => {
      db.once("open", () => {
        this.#conn = db;
        resolve(true);
      });

      db.once("error", (err: Error) => {
        reject(err);
      });
    });
  }

  query(sql: string) {
    if (!this.#conn) {
      return Promise.reject(new Error("Database not connected"));
    }

    return new Promise((resolve, reject) => {
      this.#conn!.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

export const makeQuery = (params: QueryParams = {}) => {
  // always select the same columns
  // can specify a date range
  // always order by mp.last_visit_date
  // can specify ascending or descending order
  // can change limit

  let where = "";
  if (params.startTime && params.endTime) {
    where = `WHERE mp.last_visit_date >= ${params.startTime} AND mp.last_visit_date <= ${params.endTime}`;
  } else if (params.startTime) {
    where = `WHERE mp.last_visit_date >= ${params.startTime}`;
  } else if (params.endTime) {
    where = `WHERE mp.last_visit_date <= ${params.endTime}`;
  }

  let order = "DESC";
  if (params.ascending) {
    order = "ASC";
  }

  let limit = 1;
  if (params.limit) {
    limit = params.limit;
  }

  return `
    SELECT
      mp.id,
      mp.url,
      mp.title,
      mp.description,
      mp.visit_count,
      mp.last_visit_date
    FROM moz_places mp
    ${where}
    ORDER BY mp.last_visit_date ${order}
    LIMIT ${limit};
  `;
};
