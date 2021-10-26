# File Headers

Utility which added headers to all files of specidied directory

## Instalation

```
npm install -g file-headers
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
  "copyright": "All rights reserved (c)",
  "renewAll": false
}
```

- Add script to your `package.json` file:

## Run

```
fhead
```

## Result

```javascript
/******************************************************************************************
 * Repository: https://github.com/kolserdav/file-headers.git
 * Author: Sergey Kolmiller
 * Email: <uyem.ru@gmail.com>
 * License: MIT
 * License Text:
 * Copyright: kolserdav, All rights reserved (c)
 * Create date: Wed Oct 13 2021 08:48:52 GMT+0700 (Krasnoyarsk Standard Time)
 ******************************************************************************************/
```
