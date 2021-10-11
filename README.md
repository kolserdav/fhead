# File Headers

Utility which added headers to all files of specidied directory

## Instalation

```
npm install --save-dev file-headers
```

## Configuration

- Create file `file-headers.json` in root of your project:

```json
{
  "root": "src",
  "repository": "https://github.com/kolserdav/file-headers.git",
  "patterns": [".js", ".jsx", ".ts", ".tsx"],
  "exclude": ["node_modules"],
  "name": "Sergey Kolmiller",
  "email": "uyem.ru@gmail.com",
  "license": "MIT",
  "licenseText": "",
  "copyright": "All rights reserved (c)"
}
```

- Add script to your `package.json` file:

```json
"scripts": {
    ...
    "headers": "NODE_ENV=production file-headers"
    ...
  },
```

## Run

```
npm run headers
```

## Result

```javascript
/****************************************************************
 * Author: Sergey Kolmiller
 * Email: <uyem.ru@gmail.com>
 * License: MIT
 * License Text: All rights reserved (c)
 * Create date: Mon Oct 11 2021 15:00:28 GMT+0700 (Krasnoyarsk Standard Time)
 ****************************************************************/
```
