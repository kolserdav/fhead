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
 * Repository: https://github.com/kolserdav/file-headers.git
 * Author: Sergey Kolmiller
 * Email: <uyem.ru@gmail.com>
 * License: MIT
 * License Text:
 * Copyright: kolserdav, All rights reserved (c)
 * Create date: Tue Oct 26 2021 22:40:50 GMT+0700 (Krasnoyarsk Standard Time)
******************************************************************************************/
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var _a = process.env, NODE_ENV = _a.NODE_ENV, PWD = _a.PWD;
var root = NODE_ENV === 'production' ? '../../../' : './';
var CONFIG_PATH = path_1.default.resolve(PWD, root, 'file-headers.json');
var DEFAULT_CONFIG = {
    root: 'src',
    repository: 'https://github.com/kolserdav/file-headers.git',
    patterns: ['.js', '.jsx', '.ts', '.tsx'],
    exclude: ['node_modules'],
    name: 'Sergey Kolmiller',
    email: 'uyem.ru@gmail.com',
    license: 'MIT',
    licenseText: '',
    copyright: 'kolserdav, All rights reserved (c)',
    renewAll: false,
};
var CONFIG;
function createDefaultConfig() {
    (0, fs_1.writeFileSync)(CONFIG_PATH, JSON.stringify(DEFAULT_CONFIG, null, 2));
    console.warn(new Date(), "Create default config file on " + CONFIG_PATH + " with value:", DEFAULT_CONFIG);
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    function parseDir(root, items) {
        var _loop_1 = function (i) {
            var item = items[i];
            var itemPath = path_1.default.resolve(root, item);
            if (CONFIG.exclude.indexOf(item) !== -1) {
                return "continue";
            }
            var _include = false;
            CONFIG.patterns.map(function (pattern) {
                var reg = new RegExp(pattern + "$");
                if (reg.test(item)) {
                    _include = true;
                }
            });
            var isDir = (0, fs_1.lstatSync)(itemPath).isDirectory();
            if (_include && !isDir) {
                var filePath = path_1.default.resolve(root, item);
                var fileData = (0, fs_1.readFileSync)(filePath).toString();
                var data = "/******************************************************************************************\n * Repository: " + CONFIG.repository + "\n * Author: " + CONFIG.name + "\n * Email: <" + CONFIG.email + ">\n * License: " + CONFIG.license + "\n * License Text: " + CONFIG.licenseText + "\n * Copyright: " + CONFIG.copyright + "\n * Create date: " + new Date + "\n******************************************************************************************/\n";
                var oldHeaderReg = /^\/\*{90}[\s\S.]*\*{90}\/\n/;
                if (fileData.match(oldHeaderReg)) {
                    if (CONFIG.renewAll) {
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
    var sourcePath, source;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new Promise(function (resolve) {
                    (0, fs_1.readFile)(CONFIG_PATH, function (err, res) {
                        var configData = Object.assign({}, DEFAULT_CONFIG);
                        if (err) {
                            console.error(new Date(), "File " + CONFIG_PATH + " not found");
                            createDefaultConfig();
                            resolve(DEFAULT_CONFIG);
                        }
                        else {
                            var strRes = res.toString();
                            try {
                                configData = JSON.parse(strRes);
                            }
                            catch (e) {
                                console.error(new Date(), "Invalid json in " + CONFIG_PATH + ": " + strRes);
                                createDefaultConfig();
                                resolve(DEFAULT_CONFIG);
                            }
                            resolve(configData);
                        }
                    });
                })];
            case 1:
                CONFIG = _a.sent();
                if (!CONFIG) {
                    return [2 /*return*/];
                }
                sourcePath = path_1.default.resolve(root, CONFIG.root);
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
                parseDir(sourcePath, source);
                console.info('Success added headers!');
                return [2 /*return*/];
        }
    });
}); })();
