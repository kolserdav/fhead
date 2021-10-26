# File Headers

Utility which added headers to all files of specidied directory

## Instalation

```
npm install -g file-headers
```

## Configuration

- Add to your `package.json` file the `fhead` object:

```json
"fhead": {
    "root": "src",
    "repository": "https://github.com/kolserdav/fhead.git",
    "patterns": [
      ".js",
      ".ts"
    ],
    "exclude": [],
    "name": "Sergey Kolmiller",
    "email": "serega12101983@gmail.com",
    "license": "MIT",
    "licenseText": "",
    "copyright": "kolserdav, All rights reserved (c)",
    "renewAll": true
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
 * Email: <serega12101983@gmail.com>
 * License: MIT
 * License Text:
 * Copyright: kolserdav, All rights reserved (c)
 * Create date: Wed Oct 13 2021 08:48:52 GMT+0700 (Krasnoyarsk Standard Time)
 ******************************************************************************************/
```
