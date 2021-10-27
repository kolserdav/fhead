# File Headers

Command line utility for add header to files from specify directory

## Instalation

```
npm i -g fhead
```

## Configuration

- Add to your `package.json` file the `fhead` object:

```json
"fhead": {
    "comment": "/** Do not use this config in production! */",
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
    "licenseText": "Text",
    "copyright": "kolserdav, All rights reserved (c)",
    "renewAll": true
  }
```

**Do not use this config in production!**

## Run

Go to project:

```
cd projectname
```

Start writing:

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
 * License Text: Text
 * Copyright: kolserdav, All rights reserved (c)
 * Create date: Wed Oct 13 2021 08:48:52 GMT+0700 (Krasnoyarsk Standard Time)
 ******************************************************************************************/
```
