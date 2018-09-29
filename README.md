# tupperware

[![Build Status](https://travis-ci.org/iwburns/tupperware.svg?branch=master)](https://travis-ci.org/iwburns/tupperware)
[![Coverage Status](https://coveralls.io/repos/github/iwburns/tupperware/badge.svg?branch=master)](https://coveralls.io/github/iwburns/tupperware?branch=master)
[![npm](https://img.shields.io/badge/npm-npm-green.svg)](https://www.npmjs.com/package/tupperware)
[![Documentation](https://img.shields.io/badge/docs-gh--pages-blue.svg)](https://iwburns.github.com/tupperware)
[![GitHub license](https://img.shields.io/github/license/iwburns/tupperware.svg)](https://github.com/iwburns/tupperware/blob/master/LICENSE)

A library for safely and consistently dealing with complex values in Javascript and Typescript.

## Overview

This library provides two types for dealing with optional / conditional values:
* Optional - A type representing an optional value.
* Result - A type representing the result of some fallible computation.

### Optional
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

let optC = getProperty(data, 'c');  Optional
let c = optC.unwrapOr(0);           // we can use unwrapOr to safely get the value or
                                    // a default value if c wasn't present on data

doSomething(c);
```
Or if we want to avoid doing anything when `c` doesn't exist:
```javascript
const data = getSomeData();

let optC = getProperty(data, 'c');  Optional

optC.forEach(doSomething);          // forEach will call doSomething with optC's internal
                                    // value if it exists, otherwise nothing happens
```
The key to this being useful is that both `Some` and `None` are wrapped in the same API. This means you can call `forEach` and `unwrapOr` (and a bunch of other methods) on the return value regardless of whether it's a `Some` or a `None`.

Note: This library doesn't provide a `getProperty()` function but one could imagine it looking something like:
```javascript
function getProperty(obj, propName) {
  if (typeof obj[propName] !== 'undefined' && obj[propName] !== null) {
    return Optional.some(obj[propName]); // return a `Some`-value containing the value internally
  }
  return Optional.none(); // otherwise return a `None`-value
}
```

### Result
A value of this type is either an `Ok` or an `Err`.  Both of these contain an internal value, but they each convey a different meaning.  `Ok` is used to represent an operation that succeeded and returned some kind of successful result.  `Err` is used to represent an operation that failed and returned some kind of error.

Consider parsing a number out of a string:

Normally you might do this:
```javascript
const aNumber = getANumber(); // we may not know if this is a valid number

const result = parseInt(aNumber, 10); // do our parsing

let parsed = 0; // default it

if (!Number.isNaN(result)) { // if it didn't fail, hold on to the parsed value
  parsed = result;
}

doSomething(parsed); // now we can use it
```
Instead you could do this:
```javascript
const aNumber = getANumber(); // we may not know if this is a valid number

const result = safeParseInt(aNumber, 10); Result

const parsed = result.unwrapOr(0);  // we can use unwrapOr to safely get the value or
                                    // a default value if the result was an Err-value

doSomething(parsed); // now we can use it
```
Or if you want to handle both cases explicitly:
```javascript
const aNumber = getANumber(); // we may not know if this is a valid number

const result = safeParseInt(aNumber, 10); Result

// result.match will call the given ok function if the result is an Ok-value
// and it will call the given err function if it is an Err-value
result.match({
  ok: value => { doSomething(value); },    // pass the parsed value to `doSomething`
  err: error => { console.error(error); }, // or do whatever you need to do with the error
});
```
Again, the key here is that both `Ok` and `Err` values are wrapped in the same API. This means you can treat them both the same and just describe how you want them to behave instead of writing all of the boiler-plate logic every time you deal with them.

Note: This library doesn't provide a `safeParseInt()` function but it might look something like this if it were provided:
```javascript
function safeParseInt(num, radix) {
  let parsed = parseInt(num, radix);
  if (Number.isNaN(parsed)) {
    // return an Err-value with a meaningful error message
    return Result.Err(`Could not parse the value: ${num} as an integer with radix: ${radix}`);
  }
  // otherwise return an Ok-value with the parsed value inside
  return Result.Ok(parsed);
}
```

## Contributors
* [ryanguill](https://github.com/ryanguill)
* [brycehipp](https://github.com/brycehipp)
