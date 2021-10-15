const fs = require('fs');
const path = require('path');
const arg = process.argv[2];
let data, filePath;
switch(process.argv[2]) {
  case 'env':
    filePath = path.resolve(__dirname, '../bin/file-headers.js');
    data = fs.readFileSync(filePath).toString();
    data = '#!/usr/bin/env node\n' + data;
    fs.writeFileSync(filePath, data);
    fs.chmodSync(filePath, '755');
    console.info(`Set up env for file ${filePath}`);
    break;
  default:
}