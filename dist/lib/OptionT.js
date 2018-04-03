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
/**
 * A class representing the concept of an optional value.
 *
 * There are only two concrete versions of this class: [[Some]] and [[None]].
 * [[Some]] contains a value and [[None]] does not, but they both are wrapped
 * in this same OptionT API.
 */
var OptionT = /** @class */ (function () {
    // tslint:disable-next-line:no-empty
    function OptionT() {
    }
    OptionT.of = function (value) {
        if (value === null || typeof value === 'undefined') {
            return new None();
        }
        return new Some(value);
    };
    OptionT.some = function (value) {
        if (value === null || typeof value === 'undefined') {
            throw Error('Cannot create a Some of a null or undefined value');
        }
        return new Some(value);
    };
    OptionT.none = function (value) {
        if (value === null || typeof value === 'undefined') {
            return new None();
        }
        throw Error('Cannot create a None of a non-null or undefined value');
    };
    return OptionT;
}());
exports.default = OptionT;
/**
 * A class representing the `None`-type variant of the `OptionT` type.
 *
 * Instances of this class contain no internal value.  They simply wrap the concept of 'nothing'
 * inside the same `OptionT` API defined by   [[OptionT]].
 */
var None = /** @class */ (function (_super) {
    __extends(None, _super);
    function None() {
        return _super.call(this) || this;
    }
    None.prototype.isSome = function () {
        return false;
    };
    None.prototype.isNone = function () {
        return true;
    };
    None.prototype.toString = function () {
        return 'None()';
    };
    None.prototype.expect = function (message) {
        throw new Error(message);
    };
    None.prototype.unwrap = function () {
        throw new Error('Called unwrap on a None value.');
    };
    None.prototype.unwrapOr = function (other) {
        return other;
    };
    None.prototype.unwrapOrElse = function (func) {
        return func();
    };
    None.prototype.map = function (func) {
        return new None();
    };
    None.prototype.mapOr = function (other, func) {
        return other;
    };
    None.prototype.mapOrElse = function (other, func) {
        return other();
    };
    None.prototype.and = function (other) {
        return new None();
    };
    None.prototype.flatMap = function (func) {
        return new None();
    };
    None.prototype.or = function (other) {
        return other;
    };
    None.prototype.orElse = function (func) {
        return func();
    };
    None.prototype.match = function (options) {
        return options.none();
    };
    None.prototype.clone = function () {
        return new None();
    };
    None.prototype.filter = function (condition) {
        return new None();
    };
    None.prototype.forEach = function (func) {
        return;
    };
    None.prototype.equals = function (other) {
        return other.isNone();
    };
    None.prototype.hasValue = function (val) {
        return false;
    };
    None.prototype.contains = function (condition) {
        return false;
    };
    return None;
}(OptionT));
/**
 * A class representing the `Some`-type variant of the `OptionT` type.
 *
 * Instances of this class wrap their contained value inside the
 * `OptionT` API defined by [[OptionT]].
 */
var Some = /** @class */ (function (_super) {
    __extends(Some, _super);
    function Some(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    Some.prototype.isSome = function () {
        return true;
    };
    Some.prototype.isNone = function () {
        return false;
    };
    Some.prototype.toString = function () {
        return "Some( " + this.value + " )";
    };
    Some.prototype.expect = function (message) {
        return this.value;
    };
    Some.prototype.unwrap = function () {
        return this.value;
    };
    Some.prototype.unwrapOr = function (other) {
        return this.value;
    };
    Some.prototype.unwrapOrElse = function (func) {
        return this.value;
    };
    Some.prototype.map = function (func) {
        return OptionT.of(func(this.value));
    };
    Some.prototype.mapOr = function (other, func) {
        return func(this.value);
    };
    Some.prototype.mapOrElse = function (other, func) {
        return func(this.value);
    };
    Some.prototype.and = function (other) {
        return other;
    };
    Some.prototype.flatMap = function (func) {
        return func(this.value);
    };
    Some.prototype.or = function (other) {
        return this;
    };
    Some.prototype.orElse = function (func) {
        return this;
    };
    Some.prototype.match = function (options) {
        return options.some(this.value);
    };
    Some.prototype.clone = function () {
        return OptionT.of(this.value);
    };
    Some.prototype.filter = function (condition) {
        if (condition(this.value)) {
            return this;
        }
        return new None();
    };
    Some.prototype.forEach = function (func) {
        func(this.value);
    };
    Some.prototype.equals = function (other) {
        if (other.isNone()) {
            return false;
        }
        return this.value === other.unwrap();
    };
    Some.prototype.hasValue = function (val) {
        return this.value === val;
    };
    Some.prototype.contains = function (condition) {
        return condition(this.value);
    };
    return Some;
}(OptionT));
//# sourceMappingURL=OptionT.js.map