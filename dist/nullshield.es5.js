/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

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
        return OptionT.some(this.value);
    };
    Ok.prototype.getErr = function () {
        return OptionT.none();
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
        return OptionT.none();
    };
    Err.prototype.getErr = function () {
        return OptionT.some(this.error);
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

export { OptionT, ResultT };
