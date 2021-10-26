/******************************************************************************************
 * Repository: https://github.com/kolserdav/fhead.git
 * Author: Sergey Kolmiller
 * Email: <serega12101983@gmail.com>
 * License: MIT
 * License Text: 
 * Copyright: kolserdav, All rights reserved (c)
 * Create date: Wed Oct 27 2021 01:01:23 GMT+0700 (Krasnoyarsk Standard Time)
******************************************************************************************/
import { readdir, readdirSync, writeFileSync, lstatSync, readFile, readFileSync } from 'fs';
import path from 'path';

const { PWD }: any = process.env;

const ERROR = 'error';
const WARNING = 'warning';
const INFO = 'info';

const PROD = path.relative(PWD, __dirname) !== 'bin';
const ROOT = PROD ? PWD : './';
const CONFIG_PATH = path.resolve(PWD, ROOT, 'package.json');

const DEFAULT_CONFIG = {
  fhead: {
    root: null,
    repository: "https://github.com/kolserdav/fhead.git",
    patterns: [
      ".js",
      ".ts"
    ],
    exclude: [''],
    name: "Sergey Kolmiller",
    email: "serega12101983@gmail.com",
    license: "MIT",
    licenseText: "",
    copyright: "kolserdav, All rights reserved (c)",
    renewAll: true
  }
};

let CONFIG: typeof DEFAULT_CONFIG['fhead'] | null = null;

export default async function main() {

  /**
   * Recursive method 
   */
  function parseDir(root: string, items: string[]): void {
    if (!CONFIG) {
      return;
    }
    const { exclude, patterns, repository, name, email, license, licenseText, copyright, renewAll } = CONFIG;
    for (let i = 0; items[i]; i++) {
      const item = items[i];
      const itemPath = path.resolve(root, item);
      const isDir = lstatSync(itemPath).isDirectory();
      if (isDir && item === 'node_modules') {
        continue;
      } 
      if (exclude?.indexOf(item) !== -1) {
        continue;
      }

      let _include = false;
      patterns.map((pattern) => {
        const reg = new RegExp(`${pattern}$`);
        if (reg.test(item)) {
          _include = true;
        }
      });
      if (_include && !isDir) {
        const filePath = path.resolve(root, item);
        let fileData = readFileSync(filePath).toString();
        let data = `/******************************************************************************************
 * Repository: ${repository}
 * Author: ${name}
 * Email: <${email}>
 * License: ${license}
 * License Text: ${licenseText}
 * Copyright: ${copyright}
 * Create date: ${new Date}
******************************************************************************************/\n`;
        const oldHeaderReg = /^\/\*{90}[\s\S.]*\*{90}\/\n/;
        if (fileData.match(oldHeaderReg)) {
          if (renewAll) {
            data += fileData.replace(oldHeaderReg, '');
          } else {
            data = fileData;
          }
        } else {
          data += fileData;
        }
        writeFileSync(filePath, data);
      } else {
        if (isDir) {
          const subDirPath = path.resolve(root, item);
          const dir = readdirSync(subDirPath);
          parseDir(subDirPath, dir);
        }
      }
    }
  }

  // Set config global
  CONFIG =  await new Promise<typeof DEFAULT_CONFIG['fhead'] | null>((resolve) => {
    readFile(CONFIG_PATH, (err, res) => {
      if (err) {
        console.error(ERROR, `File ${CONFIG_PATH} not found`);
        resolve(null);
      } else {
        const { fhead } = JSON.parse(res.toString());
        let configData = Object.assign({}, fhead);
        const strRes = res.toString();
        try {
          configData = JSON.parse(strRes);
        } catch(e) {
          console.error(ERROR, `Invalid json in ${CONFIG_PATH}: ${strRes}`);
          resolve(null);
        }
        resolve(configData.fhead);
      }
    });
  });
  if (!CONFIG) {
    console.info(ERROR, `Config in you package.json is not found see https://github.com/kolserdav/fhead.git/README.md#Configuration`,)
    return 1;
  }

  // Get source path
  const { root } = CONFIG;
  const sourcePath = path.resolve(ROOT, root || '');
  const source = await new Promise<string[] | void>((resolve, reject) => {
    readdir(sourcePath, (err, res) => {
      if (err) {
        reject(err.message);
      }
      resolve(res);
    });
  }).catch((e) => {
    console.error(new Date(), e);
  });
  if (!source) {
    return;
  }

  // Run script
  parseDir(sourcePath, source);
  console.info('Success added headers!')
  };