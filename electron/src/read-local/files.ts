import os from "os";
import fs from "fs";
import { join, parse } from "path";

// only works on MacOS right now
const getFirefoxProfileDirs = async (): Promise<string[]> => {
  const homeDir = os.homedir();
  const profilesDir = `${homeDir}/Library/Application Support/Firefox/Profiles`;

  return new Promise((resolve, reject) =>
    fs.readdir(profilesDir, (err, files) => {
      if (err) {
        console.error(err);
        resolve([]);
      } else {
        const regex = /[a-z0-9]+\.default-[0-9]+/i;
        const matches = files.filter((file) => regex.test(file));
        resolve(matches.map((match) => join(profilesDir, match)));
      }
    })
  );
};

export const findSqliteFile = async () => {
    const profiles = await getFirefoxProfileDirs();

    console.log("profiles", profiles);

    if (profiles.length === 0) {
        console.error("No profiles found");
        return "";
    }

    // TODO: handle multiple profiles
    const profile = profiles[0];

    const sqliteFile = `${profile}/places.sqlite`;

    return sqliteFile;
}

export const copyFile = async (src: string, dest: string) => {
  if (!fs.existsSync(src)) {
    console.error("Source file does not exist");
    return false;
  }

  const destDir = parse(dest).dir;
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
  }

  return new Promise((resolve, reject) =>
    fs.copyFile(src, dest, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(true);
      }
    })
  );
};