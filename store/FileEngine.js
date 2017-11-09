"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var path = require("path");
var error_1 = require("./error");
var FileEngine = (function () {
    function FileEngine(storeName, options) {
        if (options === void 0) { options = {
            fileExtension: '.dat'
        }; }
        this.storeName = storeName;
        this.options = options;
        this.storeName = path.normalize(storeName);
        this.options = options;
    }
    FileEngine.prototype.resolvePath = function (tableName, primaryKey) {
        var _this = this;
        var isPathTraversal = function () {
            var testPaths = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                testPaths[_i] = arguments[_i];
            }
            for (var _a = 0, testPaths_1 = testPaths; _a < testPaths_1.length; _a++) {
                var testPath = testPaths_1[_a];
                if (typeof testPath !== 'undefined' && (testPath.includes('.') || testPath.includes('/') || testPath.includes('\\'))) {
                    return true;
                }
            }
            return false;
        };
        return new Promise(function (resolve, reject) {
            if (isPathTraversal(tableName, primaryKey)) {
                return reject(new error_1.PathValidationError(error_1.PathValidationError.TYPE.PATH_TRAVERSAL));
            }
            return resolve(path.join(_this.storeName, tableName, (primaryKey ? "" + primaryKey + _this.options.fileExtension : '')));
        });
    };
    FileEngine.prototype.create = function (tableName, primaryKey, entity) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (entity) {
                _this.resolvePath(tableName, primaryKey)
                    .then(function (file) {
                    if (typeof entity === 'object') {
                        try {
                            entity = JSON.stringify(entity);
                        }
                        catch (error) {
                            entity = entity.toString();
                        }
                    }
                    fs.writeFile(file, entity, { flag: 'wx' }, function (error) {
                        if (error) {
                            if (error.code === 'ENOENT') {
                                fs.outputFile(file, entity)
                                    .then(function () { return resolve(primaryKey); })
                                    .catch(function (error) { return reject(error); });
                            }
                            else if (error.code === 'EEXIST') {
                                var message = "Record \"" + primaryKey + "\" already exists in \"" + tableName + "\". You need to delete the record first if you want to overwrite it.";
                                reject(new error_1.RecordAlreadyExistsError(message));
                            }
                            else {
                                reject(error);
                            }
                        }
                        else {
                            resolve(primaryKey);
                        }
                    });
                })
                    .catch(reject);
            }
            else {
                var message = "Record \"" + primaryKey + "\" cannot be saved in \"" + tableName + "\" because it's \"undefined\" or \"null\".";
                reject(new error_1.RecordTypeError(message));
            }
        });
    };
    FileEngine.prototype.delete = function (tableName, primaryKey) {
        return this.resolvePath(tableName, primaryKey).then(function (file) {
            return fs.remove(file).then(function () { return primaryKey; }).catch(function () { return false; });
        });
    };
    FileEngine.prototype.deleteAll = function (tableName) {
        return this.resolvePath(tableName).then(function (directory) {
            return fs.remove(directory).then(function () { return true; }).catch(function () { return false; });
        });
    };
    FileEngine.prototype.read = function (tableName, primaryKey) {
        return this.resolvePath(tableName, primaryKey).then(function (file) {
            return new Promise(function (resolve, reject) {
                fs.readFile(file, { encoding: 'utf8', flag: 'r' }, function (error, data) {
                    if (error) {
                        if (error.code === 'ENOENT') {
                            var message = "Record \"" + primaryKey + "\" in \"" + tableName + "\" could not be found.";
                            reject(new error_1.RecordNotFoundError(message));
                        }
                        else {
                            reject(error);
                        }
                    }
                    else {
                        try {
                            data = JSON.parse(data);
                        }
                        catch (error) {
                        }
                        resolve(data);
                    }
                });
            });
        });
    };
    FileEngine.prototype.readAll = function (tableName) {
        var _this = this;
        return this.resolvePath(tableName).then(function (directory) {
            return new Promise(function (resolve, reject) {
                fs.readdir(directory, function (error, files) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        var recordNames = files.map(function (file) { return path.basename(file, path.extname(file)); });
                        var promises = recordNames.map(function (primaryKey) { return _this.read(tableName, primaryKey); });
                        Promise.all(promises).then(function (records) { return resolve(records); });
                    }
                });
            });
        });
    };
    FileEngine.prototype.readAllPrimaryKeys = function (tableName) {
        return this.resolvePath(tableName).then(function (directory) {
            return new Promise(function (resolve) {
                fs.readdir(directory, function (error, files) {
                    if (error) {
                        if (error.code === 'ENOENT') {
                            resolve([]);
                        }
                        else {
                            throw new Error(error);
                        }
                    }
                    else {
                        var fileNames = files.map(function (file) { return path.parse(file).name; });
                        resolve(fileNames);
                    }
                });
            });
        });
    };
    FileEngine.prototype.update = function (tableName, primaryKey, changes) {
        var _this = this;
        return this.resolvePath(tableName, primaryKey)
            .then(function (file) {
            return _this.read(tableName, primaryKey)
                .then(function (record) {
                if (typeof record === 'string') {
                    record = JSON.parse(record);
                }
                var updatedRecord = __assign({}, record, changes);
                return JSON.stringify(updatedRecord);
            })
                .then(function (updatedRecord) { return fs.outputFile(file, updatedRecord); })
                .then(function () { return primaryKey; });
        });
    };
    return FileEngine;
}());
exports.default = FileEngine;
