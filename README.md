# nullshield

[![Build Status](https://travis-ci.org/iwburns/nullshield.svg?branch=master)](https://travis-ci.org/iwburns/nullshield)
[![Coverage Status](https://coveralls.io/repos/github/iwburns/nullshield/badge.svg?branch=master)](https://coveralls.io/github/iwburns/nullshield?branch=master)
[![npm](https://img.shields.io/badge/npm-npm-green.svg)](https://www.npmjs.com/package/nullshield)
[![Documentation](https://img.shields.io/badge/docs-gh--pages-blue.svg)](https://iwburns.github.com/nullshield)
[![GitHub license](https://img.shields.io/github/license/iwburns/nullshield.svg)](https://github.com/iwburns/nullshield/blob/master/LICENSE)

A library for safely and consistently dealing with complex values in Javascript and Typescript.

## Overview

This library provides two types for dealing with optional / conditional values:
* OptionT - A type representing an optional value.
* ResultT - A type representing the result of some fallible computation.

### OptionT
A value of this type is either a `Some` or a `None`. `Some`-values contain a value internally while `None`-values represent the absence of a given value.  This is useful when you have a value that may or may not exist.  Where you might otherwise use `null` or `undefined` to represent the absense of a value, you can use a `None` value instead.

Consider getting a property of an object that may or may not exist:

Normally you might do this:
```javascript
const data = getSomeData(); // we may not know what data looks like here

let c = 0; // make sure you default it

if (typeof data.c !== 'undefined' && data.c !== null) { // make sure data.c exists
  c = data.c;
}

doSomething(c);  // now we can use c
```
Instead you could do this:
```javascript
const data = getSomeData();

let c = getProperty(data, 'c').unwrapOr(0); // assume getProperty() returns an `OptionT`
// here, we're pulling the value out of the `OptionT` (assuming it's a `Some`)
// or defaulting to 0 if turned out to be a `None`

doSomething(c);
```
Or if we want to avoid doing anything when `c` doesn't exist:
```javascript
const data = getSomeData();

getProperty(data, 'c').forEach(doSomething); // again, getProperty() returns an `OptionT`
// here, the function passed to `forEach` will be called if we got a `Some` (passing the internal
// value to that function), otherwise, the function passed to `forEach` will be ignored
```
The key to this being useful is that both `Some` and `None` are wrapped in the same API. This means you can call `forEach` and `unwrapOr` (and a bunch of other methods) on the return value regardless of whether it's a `Some` or a `None`.

Note: This library doesn't provide a `getProperty()` function but one could imagine it looking something like:
```javascript
function getProperty(obj, propName) {
  // if you want to you could even allow propNames with dots in them
  // to do deep object searches
  if (typeof obj[propName] !== 'undefined' && obj[propName] !== null) {
    return OptionT.some(obj[propName]);
  }
  return OptionT.none();
}
```

### ResultT
A value of this type is either an `Ok` or an `Err`.  Both of these contain an internal value, but they each convey a different meaning.  `Ok` is used to represent an operation that succeeded and returned some kind of successful result.  `Err` is used to represent an operation that failed and returned some kind of error.

Consider parsing a number out of a string:

Normally you might do this:
```javascript
const aNumber = getANumber(); //we may not know if this is a valid number

const result = parseInt(aNumber, 10); //do our parsing

const parsed = 0; // default it

if (!Number.isNaN(result)) { // make sure it didn't fail
  parsed = result;
}

doSomething(parsed); // now we can use it
```
Instead you could do this:
```javascript
const aNumber = 'foobar';

const parsed = safeParse(aNumber, 10).unwrapOr(0); // assume safeParse returns a ResultT
// again, we're pulling the value out of the `OptionT` (assuming it's an `Ok` this time)
// or defaulting to 0 if turned out to be a `Err`

doSomething(parsed); // now we can use it
```
Or if you want to handle both cases:
```javascript
const aNumber = 'foobar';

const result = safeParse(aNumber, 10); // assume safeParse returns a ResultT

result.match({
  ok: value => { doSomething(value) },     // pass the parsed value to `doSomething`
  err: error => { console.error(error); }, // or do whatever you need to do with the error
});
```
Again, the key here is that both `Ok` and `Err` values are wrapped in the same API. This means you can treat them both the same and just describe how you want them to behave instead of writing all of the boiler-plate logic every time you deal with them.

## Contributors
* [ryanguill](https://github.com/ryanguill)
* [brycehipp](https://github.com/brycehipp)
