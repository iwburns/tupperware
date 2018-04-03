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
var OptionT_1 = require("./OptionT");
/**
 * An abstract class describing the `ResultT` type.
 *
 * Items of this type can either be an `Ok` value (implying the absence of an error),
 * or an `Err` value (implying the presence of an error).
 */
var ResultT = /** @class */ (function () {
    // tslint:disable-next-line:no-empty
    function ResultT() {
    }
    ResultT.ok = function (val) {
        return new Ok(val);
    };
    ResultT.err = function (error) {
        return new Err(error);
    };
    return ResultT;
}());
exports.default = ResultT;
var Ok = /** @class */ (function (_super) {
    __extends(Ok, _super);
    function Ok(val) {
        var _this = _super.call(this) || this;
        _this.value = val;
        return _this;
    }
    Ok.prototype.isOk = function () {
        return true;
    };
    Ok.prototype.isErr = function () {
        return false;
    };
    Ok.prototype.toString = function () {
        return "Ok( " + this.value + " )";
    };
    Ok.prototype.getOk = function () {
        return OptionT_1.default.some(this.value);
    };
    Ok.prototype.getErr = function () {
        return OptionT_1.default.none();
    };
    Ok.prototype.expect = function (message) {
        return this.value;
    };
    Ok.prototype.expectErr = function (message) {
        throw new Error(message);
    };
    Ok.prototype.unwrap = function () {
        return this.value;
    };
    Ok.prototype.unwrapErr = function () {
        throw new Error('Called unwrap on an Ok value.');
    };
    Ok.prototype.unwrapOr = function (other) {
        return this.value;
    };
    Ok.prototype.unwrapOrElse = function (func) {
        return this.value;
    };
    Ok.prototype.map = function (func) {
        return ResultT.ok(func(this.value));
    };
    Ok.prototype.mapErr = function (func) {
        return ResultT.ok(this.value);
    };
    Ok.prototype.flatMap = function (func) {
        return func(this.value);
    };
    Ok.prototype.orElse = function (func) {
        return ResultT.ok(this.value);
    };
    Ok.prototype.match = function (options) {
        return options.ok(this.value);
    };
    Ok.prototype.clone = function () {
        return ResultT.ok(this.value);
    };
    Ok.prototype.equals = function (other) {
        if (other.isErr()) {
            return false;
        }
        return other.hasValue(this.value);
    };
    Ok.prototype.hasValue = function (val) {
        return this.value === val;
    };
    Ok.prototype.contains = function (func) {
        return func(this.value);
    };
    return Ok;
}(ResultT));
var Err = /** @class */ (function (_super) {
    __extends(Err, _super);
    function Err(err) {
        var _this = _super.call(this) || this;
        _this.error = err;
        return _this;
    }
    Err.prototype.isOk = function () {
        return false;
    };
    Err.prototype.isErr = function () {
        return true;
    };
    Err.prototype.toString = function () {
        return "Err( " + this.error + " )";
    };
    Err.prototype.getOk = function () {
        return OptionT_1.default.none();
    };
    Err.prototype.getErr = function () {
        return OptionT_1.default.some(this.error);
    };
    Err.prototype.expect = function (message) {
        throw new Error(message);
    };
    Err.prototype.expectErr = function (message) {
        return this.error;
    };
    Err.prototype.unwrap = function () {
        throw new Error('Called unwrap on a Err value.');
    };
    Err.prototype.unwrapErr = function () {
        return this.error;
    };
    Err.prototype.unwrapOr = function (other) {
        return other;
    };
    Err.prototype.unwrapOrElse = function (func) {
        return func(this.error);
    };
    Err.prototype.map = function (func) {
        return ResultT.err(this.error);
    };
    Err.prototype.mapErr = function (func) {
        return ResultT.err(func(this.error));
    };
    Err.prototype.flatMap = function (func) {
        return ResultT.err(this.error);
    };
    Err.prototype.orElse = function (func) {
        return func(this.error);
    };
    Err.prototype.match = function (options) {
        return options.err(this.error);
    };
    Err.prototype.clone = function () {
        return ResultT.err(this.error);
    };
    Err.prototype.equals = function (other) {
        if (other.isOk()) {
            return false;
        }
        return other.hasValue(this.error);
    };
    Err.prototype.hasValue = function (val) {
        return this.error === val;
    };
    Err.prototype.contains = function (func) {
        return func(this.error);
    };
    return Err;
}(ResultT));
//# sourceMappingURL=ResultT.js.map