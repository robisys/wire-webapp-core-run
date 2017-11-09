"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PathValidationError = (function (_super) {
    __extends(PathValidationError, _super);
    function PathValidationError(message) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        Object.setPrototypeOf(_this, PathValidationError.prototype);
        _this.message = message;
        _this.name = _this.constructor.name;
        _this.stack = new Error().stack;
        return _this;
    }
    Object.defineProperty(PathValidationError, "TYPE", {
        get: function () {
            return {
                PATH_TRAVERSAL: 'Path traversal has been detected. Aborting.',
            };
        },
        enumerable: true,
        configurable: true
    });
    return PathValidationError;
}(Error));
exports.default = PathValidationError;
