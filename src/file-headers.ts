/****************************************************************
 * Author: Sergey Kolmiller
 * Email: <uyem.ru@gmail.com>
 * License: MIT
 * License Text: All rights reserved (c)
 * Create date: Mon Oct 11 2021 14:52:49 GMT+0700 (Krasnoyarsk Standard Time)
****************************************************************/
import fs, { readdir, readdirSync } from 'fs';
import path from 'path';

const root = process.env.NODE_ENV === 'production' ? '../../../' : '../';

const CONFIG_PATH = path.resolve(__dirname, root, 'file-headers.json');

const DEFAULT_CONFIG = {
  root: 'src',
  patterns: ['.js', '.jsx', '.ts', '.tsx'],
  exclude: ['node_modules'],
  name: 'Sergey Kolmiller',
  email: 'uyem.ru@gmail.com',
  license: 'MIT',
  licenseText: 'All rights reserved (c)'
};

let CONFIG: typeof DEFAULT_CONFIG;

function createDefaultConfig(): void {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(DEFAULT_CONFIG, null, 2));
  console.warn(new Date(), `Create default config file on ${CONFIG_PATH} with value:`, DEFAULT_CONFIG);
}

(async () => {

  function parseDir(root: string, items: string[]): void {
    for (let i = 0; items[i]; i++) {
      const item = items[i];
      const itemPath = path.resolve(root, item);
      if (CONFIG.exclude.indexOf(item) !== -1) {
        continue;
      }
      let _include = false;
      CONFIG.patterns.map((pattern) => {
        const reg = new RegExp(`${pattern}$`);
        if (reg.test(item)) {
          _include = true;
        }
      });
      if (_include) {
        const filePath = path.resolve(root, item);
        let fileData = fs.readFileSync(filePath).toString();
        let data = `/****************************************************************
 * Author: ${CONFIG.name}
 * Email: <${CONFIG.email}>
 * License: ${CONFIG.license}
 * License Text: ${CONFIG.licenseText}
 * Create date: ${new Date}
****************************************************************/\n`;
        const oldHeaderReg = /^\/\*{64}[\s\S.]*\*{64}\/\n/;
        if (fileData.match(oldHeaderReg)) {
          fileData = fileData.replace(oldHeaderReg, '');
        }
        data += fileData;
        fs.writeFileSync(filePath, data);
      } else {
        const isDir = fs.lstatSync(itemPath).isDirectory();
        if (isDir) {
          const subDirPath = path.resolve(root, item);
          const dir = readdirSync(subDirPath);
          parseDir(subDirPath, dir);
        }
      }
    }
  }

  CONFIG =  await new Promise<typeof DEFAULT_CONFIG>((resolve) => {
    fs.readFile(CONFIG_PATH, (err, res) => {
      let configData = Object.assign({}, DEFAULT_CONFIG);
      if (err) {
        console.error(new Date(), `File ${CONFIG_PATH} not found`);
        createDefaultConfig();
        resolve(DEFAULT_CONFIG);
      } else {
        const strRes = res.toString();
        try {
          configData = JSON.parse(strRes);
        } catch(e) {
          console.error(new Date(), `Invalid json in ${CONFIG_PATH}: ${strRes}`);
          createDefaultConfig();
          resolve(DEFAULT_CONFIG);
        }
        resolve(configData);
      }
    });
  });
  if (!CONFIG) {
    return;
  }
  const sourcePath = path.resolve(__dirname, root, CONFIG.root);
  const source = await new Promise<string[] | void>((resolve, reject) => {
    fs.readdir(sourcePath, (err, res) => {
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
  parseDir(sourcePath, source);
  console.info('Success added headers!')
  })();