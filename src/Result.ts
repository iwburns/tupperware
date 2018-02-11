import OptionT from './OptionT';

/**
 * An interface describing the argument passed to [[ResultT]]'s `match` function.
 */
export interface ResultMatch<T, E, U, F> {
  ok: (ok: T) => U;
  err: (err: E) => F;
}

/**
 * An abstract class describing the `ResultT` type.
 *
 * Items of this type can either be an `Ok` value (implying the absence of an error),
 * or an `Err` value (implying the presence of an error).
 */
export abstract class ResultT<T, E> {
  constructor() {}

  static ok<T>(val: T): ResultT<T, TypeError> {
    if (val === null || typeof val === 'undefined') {
      const typeError = new TypeError(
        'The argument "val" cannot be "null" and cannot be "undefined".',
      );
      return new Err(typeError);
    }
    return new Ok(val);
  }

  static err<T, E>(error: E): ResultT<T, E> | ResultT<T, TypeError> {
    if (error === null || typeof error === 'undefined') {
      const typeError = new TypeError(
        'The argument "val" cannot be "null" and cannot be "undefined".',
      );
      return new Err(typeError);
    }
    return new Err(error);
  }

  /**
   * Returns `true` if this [[ResultT]] is an `Ok`, returns `false` if it is an `Err`.
   *
   * ```
   * const one = ResultT.ok(1);
   * // one.isOk() === true
   * ```
   *
   * @returns {boolean}
   */
  abstract isOk(): boolean;

  /**
   * Returns `true` if this [[ResultT]] is an `Err`, returns `false` if it is an `Ok`.
   *
   * ```
   * const one = ResultT.err('Failed to parse integer');
   * // one.isErr() === true
   * ```
   *
   * @returns {boolean}
   */
  abstract isErr(): boolean;

  /**
   * Returns `Ok( val )` if this [[ResultT]] is an `Ok`, returns `Err( err )` if it is an `Err`.
   *
   * ```
   * ResultT.ok(1).toString() //Ok( 1 )
   * ResultT.err('parsing failure').toString() //Err( parsing failure )
   * ```
   *
   * @returns {string}
   */
  abstract toString(): string;

  /**
   * Tries to return the internal `Ok` value of this [[ResultT]].  Returns a `Some` containing the value
   * if it is an `Ok`, returns a `None` if it is an `Err`.
   *
   * ```
   * const one = ResultT.ok(1);
   * const maybeOne = one.getOk();
   *
   * // maybeOne.isSome() === true
   * // maybeOne.unwrap() === 1
   *
   * const one = ResultT.err('parsing error');
   * const maybeOne = one.getOk();
   *
   * // maybeOne.isNone() === true
   * ```
   *
   * @returns {OptionT<T>}
   */
  abstract getOk(): OptionT<T>;

  /**
   * Tries to return the internal `Err` value of this [[ResultT]].  Returns a `Some` containing the
   * value if it is an `Err`, returns a `None` if it is an `Ok`.
   *
   * ```
   * const one = ResultT.err('parsing error');
   * const maybeOne = one.getErr();
   *
   * // maybeOne.isSome() === true
   * // maybeOne.unwrap() === 'parsing error'
   *
   * const one = ResultT.ok(1);
   * const maybeOne = one.getErr();
   *
   * // maybeOne.isNone() === true
   * ```
   *
   * @returns {OptionT<E>}
   */
  abstract getErr(): OptionT<E>;

  /**
   * Returns the value contained by this [[ResultT]] if it is an `Ok`.  Throws an error
   * containing `message` if it is an `Err`.
   *
   * ```
   * const maybeOne = ResultT.ok(1);
   * // this won't throw because it's an `Ok` value.
   * const one = maybeOne.expect("couldn't unwrap an Ok");
   *
   * // but:
   * const maybeOne = ResultT.err('parsing error');
   * // this will throw because it's an `Err` value.
   * const one = maybeOne.expect("couldn't unwrap an Ok");
   * ```
   *
   * @param {string} message
   * @returns {T}
   */
  abstract expect(message: string): T;

  /**
   * Returns the value contained by this [[ResultT]] if it is an `Err`.  Throws an error
   * containing `message` if it is an `Ok`.
   *
   * ```
   * const maybeError = ResultT.ok(1);
   * // this will throw because it's an `Ok` value.
   * const error = maybeError.expectErr("couldn't unwrap an Err");
   *
   * // but:
   * const maybeError = ResultT.err('parsing error');
   * // this won't throw because it's an `Err` value.
   * const error = maybeError.expectErr("couldn't unwrap an Err");
   * ```
   *
   * @param {string} message
   * @returns {T}
   */
  abstract expectErr(message: string): E;

  /**
   * Returns the value contained by this [[ResultT]] if it is an `Ok`.  Throws a
   * pre-defined error if it is an `Err`.
   *
   * ```
   * const maybeOne = ResultT.ok(1);
   * // this won't throw, because it's an Ok value.
   * const one = maybeOne.unwrap();
   *
   * // but:
   * const maybeOne = ResultT.err('parsing error');
   * // this will throw, because it's a Err value.
   * const one = maybeOne.unwrap();
   * ```
   *
   * @returns {T}
   */
  abstract unwrap(): T;

  /**
   * Returns the value contained by this [[ResultT]] if it is an `Err`.  Throws a
   * pre-defined error if it is an `Ok`.
   *
   * ```
   * const maybeOne = ResultT.ok(1);
   * // this will throw, because it's an Ok value.
   * const error = maybeOne.unwrapErr();
   *
   * // but:
   * const maybeOne = ResultT.err('parsing error');
   * // this won't throw, because it's a Err value.
   * const error = maybeOne.unwrapErr();
   * ```
   *
   * @returns {T}
   */
  abstract unwrapErr(): E;

  /**
   * Returns the value contained by this [[ResultT]] if it is an `Ok`, otherwise
   * returns `other`.
   *
   * ```
   * const maybeOne = ResultT.ok(1);
   * const one = maybeOne.unwrapOr(2);
   * // one === 1
   *
   * const maybeOne = ResultT.err('parse error');
   * const one = maybeOne.unwrapOr(2);
   * // one === 2
   * ```
   *
   * @param {T} other
   * @returns {T}
   */
  abstract unwrapOr(other: T): T;

  /**
   * Returns the value contained by this [[ResultT]] if it is an 'Ok', otherwise
   * calls `func` with the `Err` value and returns the result.
   *
   * ```
   * const maybeOne = ResultT.ok(1);
   * const one = maybeOne.unwrapOrElse((err) => err.length);
   * // one === 1
   *
   * const maybeOne = ResultT.err('parse error');
   * const one = maybeOne.unwrapOrElse((err) => err.length);
   * // one === 11
   * ```
   *
   * @param {(err: E) => T} func
   * @returns {T}
   */
  abstract unwrapOrElse(func: (err: E) => T): T;

  /**
   * Maps a [[ResultT]]&lt;T, E&gt; to an [[ResultT]]&lt;U, E&gt; by applying `func` to the value
   * contained in this [[ResultT]].
   *
   * If this [[ResultT]] is an `Ok` value, the returned value will be the return of `func`
   * wrapped in a new [[ResultT]] (resulting in an `Ok` value); otherwise the returned value
   * will be a new `Err` value.
   *
   * ### Note:
   * If the return value of `func` is `null` or `undefined`, the [[ResultT]] that is returned
   * is guaranteed to be an `Err` value containing a `TypeError`.
   *
   * ```
   * const maybeOne = ResultT.ok(1);
   * const maybeTwo = maybeOne.map(x => x * 2);
   * // maybeTwo.isOk() === true
   * // maybeTwo.unwrap() === 2
   *
   * const maybeThree = ResultT.err(2);
   * const maybeSix = maybeThree.map(x => x * 2);
   * // maybeSix.isErr() === true
   * // maybeSix.unwrapErr() === 2
   * ```
   *
   * @param {(val: T) => U} func
   * @returns {ResultT<U, E | TypeError>}
   */
  abstract map<U>(func: (val: T) => U): ResultT<U, E | TypeError>;

  /**
   * Maps a [[ResultT]]&lt;T, E&gt; to an [[ResultT]]&lt;T, F&gt; by applying `func` to the value
   * contained in this [[ResultT]].
   *
   * If this [[ResultT]] is an `Err` value, the returned value will be the return of `func`
   * wrapped in a new [[ResultT]] (resulting in an `Err` value); otherwise the returned value
   * will be a new `Ok` value.
   *
   * ### Note:
   * If the return value of `func` is `null` or `undefined`, the [[ResultT]] that is returned
   * is guaranteed to be an `Err` value containing a `TypeError`.
   *
   * ```
   * const maybeOne = ResultT.ok(1);
   * const maybeTwo = maybeOne.mapErr(x => x * 2);
   * // maybeTwo.isOk() === true
   * // maybeTwo.unwrap() === 1
   *
   * const maybeThree = ResultT.err(2);
   * const maybeSix = maybeThree.mapErr(x => x * 2);
   * // maybeSix.isErr() === true
   * // maybeSix.unwrapErr() === 4
   * ```
   *
   * @param {(val: T) => U} func
   * @returns {ResultT<U, E>}
   */
  abstract mapErr<F>(func: (val: E) => F): ResultT<T, F>;
  abstract and<U>(other: ResultT<U, E>): ResultT<U, E>;
  abstract flatMap<U>(func: (ok: T) => ResultT<U, E>): ResultT<U, E>;
  abstract or<F>(other: ResultT<T, F>): ResultT<T, F>;
  abstract orElse<F>(func: (err: E) => ResultT<T, F>): ResultT<T, F>;
  abstract match<U, F>(options: ResultMatch<T, E, U, F>): U | F;
  abstract clone(): ResultT<T, E>;
}

class Ok<T, E> extends ResultT<T, E> {
  private value: T;

  constructor(val: T) {
    super();
    this.value = val;
  }

  isOk(): boolean {
    return true;
  }

  isErr(): boolean {
    return false;
  }

  toString(): string {
    return `Ok( ${this.value} )`;
  }

  getOk(): OptionT<T> {
    return OptionT.some(this.value);
  }

  getErr(): OptionT<E> {
    return OptionT.none();
  }

  expect(message: string): T {
    return this.value;
  }

  expectErr(message: string): E {
    throw new Error(message);
  }

  unwrap(): T {
    return this.value;
  }

  unwrapErr(): E {
    throw new Error('Called unwrap on an Ok value.');
  }

  unwrapOr(other: T): T {
    return this.value;
  }

  unwrapOrElse(func: (err: E) => T): T {
    return this.value;
  }

  map<U>(func: (val: T) => U): ResultT<U, E | TypeError> {
    return ResultT.ok(func(this.value));
  }

  mapErr<F>(func: (val: E) => F): ResultT<T, F> {
    throw 'unimplemented';
  }

  and<U>(other: ResultT<U, E>): ResultT<U, E> {
    throw 'unimplemented';
  }

  flatMap<U>(func: (ok: T) => ResultT<U, E>): ResultT<U, E> {
    throw 'unimplemented';
  }

  or<F>(other: ResultT<T, F>): ResultT<T, F> {
    throw 'unimplemented';
  }

  orElse<F>(func: (err: E) => ResultT<T, F>): ResultT<T, F> {
    throw 'unimplemented';
  }

  match<U, F>(options: ResultMatch<T, E, U, F>): U | F {
    throw 'unimplemented';
  }

  clone(): ResultT<T, E> {
    throw 'unimplemented';
  }
}

class Err<T, E> extends ResultT<T, E> {
  private error: E;

  constructor(err: E) {
    super();
    this.error = err;
  }

  isOk(): boolean {
    return false;
  }

  isErr(): boolean {
    return true;
  }

  toString(): string {
    return `Err( ${this.error} )`;
  }

  getOk(): OptionT<T> {
    return OptionT.none();
  }

  getErr(): OptionT<E> {
    return OptionT.some(this.error);
  }

  expect(message: string): T {
    throw new Error(message);
  }

  expectErr(message: string): E {
    return this.error;
  }

  unwrap(): T {
    throw new Error('Called unwrap on a Err value.');
  }

  unwrapErr(): E {
    return this.error;
  }

  unwrapOr(other: T): T {
    return other;
  }

  unwrapOrElse(func: (err: E) => T): T {
    return func(this.error);
  }

  map<U>(func: (val: T) => U): ResultT<U, E | TypeError> {
    throw 'unimplemented';
  }

  mapErr<F>(func: (val: E) => F): ResultT<T, F> {
    throw 'unimplemented';
  }

  and<U>(other: ResultT<U, E>): ResultT<U, E> {
    throw 'unimplemented';
  }

  flatMap<U>(func: (ok: T) => ResultT<U, E>): ResultT<U, E> {
    throw 'unimplemented';
  }

  or<F>(other: ResultT<T, F>): ResultT<T, F> {
    throw 'unimplemented';
  }

  orElse<F>(func: (err: E) => ResultT<T, F>): ResultT<T, F> {
    throw 'unimplemented';
  }

  match<U, F>(options: ResultMatch<T, E, U, F>): U | F {
    throw 'unimplemented';
  }

  clone(): ResultT<T, E> {
    throw 'unimplemented';
  }

}
