#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/******************************************************************************************
 * Repository: https://github.com/kolserdav/fhead.git
 * Author: Sergey Kolmiller
 * Email: <serega12101983@gmail.com>
 * License: MIT
 * License Text:
 * Copyright: kolserdav, All rights reserved (c)
 * Create date: Wed Oct 27 2021 00:42:38 GMT+0700 (Krasnoyarsk Standard Time)
******************************************************************************************/
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var PWD = process.env.PWD;
var ERROR = 'error';
var WARNING = 'warning';
var INFO = 'info';
var PROD = path_1.default.relative(PWD, __dirname) !== 'bin';
var ROOT = PROD ? PWD : './';
var CONFIG_PATH = path_1.default.resolve(PWD, ROOT, 'package.json');
var DEFAULT_CONFIG = {
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
var CONFIG = null;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    /**
     * Recursive method
     */
    function parseDir(root, items) {
        if (!CONFIG) {
            return;
        }
        var exclude = CONFIG.exclude, patterns = CONFIG.patterns, repository = CONFIG.repository, name = CONFIG.name, email = CONFIG.email, license = CONFIG.license, licenseText = CONFIG.licenseText, copyright = CONFIG.copyright, renewAll = CONFIG.renewAll;
        var _loop_1 = function (i) {
            var item = items[i];
            var itemPath = path_1.default.resolve(root, item);
            var isDir = (0, fs_1.lstatSync)(itemPath).isDirectory();
            if (isDir && item === 'node_modules') {
                return "continue";
            }
            if ((exclude === null || exclude === void 0 ? void 0 : exclude.indexOf(item)) !== -1) {
                return "continue";
            }
            var _include = false;
            patterns.map(function (pattern) {
                var reg = new RegExp(pattern + "$");
                if (reg.test(item)) {
                    _include = true;
                }
            });
            if (_include && !isDir) {
                var filePath = path_1.default.resolve(root, item);
                var fileData = (0, fs_1.readFileSync)(filePath).toString();
                var data = "/******************************************************************************************\n * Repository: " + repository + "\n * Author: " + name + "\n * Email: <" + email + ">\n * License: " + license + "\n * License Text: " + licenseText + "\n * Copyright: " + copyright + "\n * Create date: " + new Date + "\n******************************************************************************************/\n";
                var oldHeaderReg = /^\/\*{90}[\s\S.]*\*{90}\/\n/;
                if (fileData.match(oldHeaderReg)) {
                    if (renewAll) {
                        data += fileData.replace(oldHeaderReg, '');
                    }
                    else {
                        data = fileData;
                    }
                }
                else {
                    data += fileData;
                }
                (0, fs_1.writeFileSync)(filePath, data);
            }
            else {
                if (isDir) {
                    var subDirPath = path_1.default.resolve(root, item);
                    var dir = (0, fs_1.readdirSync)(subDirPath);
                    parseDir(subDirPath, dir);
                }
            }
        };
        for (var i = 0; items[i]; i++) {
            _loop_1(i);
        }
    }
    var root, sourcePath, source;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new Promise(function (resolve) {
                    (0, fs_1.readFile)(CONFIG_PATH, function (err, res) {
                        if (err) {
                            console.error(ERROR, "File " + CONFIG_PATH + " not found");
                            resolve(null);
                        }
                        else {
                            var fhead = JSON.parse(res.toString()).fhead;
                            var configData = Object.assign({}, fhead);
                            var strRes = res.toString();
                            try {
                                configData = JSON.parse(strRes);
                            }
                            catch (e) {
                                console.error(ERROR, "Invalid json in " + CONFIG_PATH + ": " + strRes);
                                resolve(null);
                            }
                            resolve(configData.fhead);
                        }
                    });
                })];
            case 1:
                // Set config global
                CONFIG = _a.sent();
                if (!CONFIG) {
                    console.info(ERROR, "Config in you package.json is not found see https://github.com/kolserdav/fhead.git/README.md#Configuration");
                    return [2 /*return*/, 1];
                }
                root = CONFIG.root;
                sourcePath = path_1.default.resolve(ROOT, root || '');
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        (0, fs_1.readdir)(sourcePath, function (err, res) {
                            if (err) {
                                reject(err.message);
                            }
                            resolve(res);
                        });
                    }).catch(function (e) {
                        console.error(new Date(), e);
                    })];
            case 2:
                source = _a.sent();
                if (!source) {
                    return [2 /*return*/];
                }
                // Run script
                parseDir(sourcePath, source);
                console.info('Success added headers!');
                return [2 /*return*/];
        }
    });
}); })();
