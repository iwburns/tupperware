import OptionT from './OptionT';

/**
 * An interface describing the argument passed to [[Result]]'s `match` function.
 */
export interface ResultMatch<T, E, U, F> {
  ok: (ok: T) => U;
  err: (err: E) => F;
}

/**
 * An abstract class describing the `Result` type.
 *
 * Items of this type can either be an `Ok` value (implying the absence of an error),
 * or an `Err` value (implying the presence of an error).
 */
export abstract class Result<T, E> {
  constructor() {}

  static ok<T>(val: T): Result<T, TypeError> {
    if (val === null || typeof val === 'undefined') {
      const typeError = new TypeError(
        'The argument "val" cannot be "null" and cannot be "undefined".',
      );
      return new Err(typeError);
    }
    return new Ok(val);
  }

  static err<T, E>(error: E): Result<T, E> | Result<T, TypeError> {
    if (error === null || typeof error === 'undefined') {
      const typeError = new TypeError(
        'The argument "val" cannot be "null" and cannot be "undefined".',
      );
      return new Err(typeError);
    }
    return new Err(error);
  }

  /**
   * Returns `true` if this [[Result]] is an `Ok`, returns `false` if it is an `Err`.
   *
   * ```
   * const one = Result.ok(1);
   * // one.isOk() === true
   * ```
   *
   * @returns {boolean}
   */
  abstract isOk(): boolean;

  /**
   * Returns `true` if this [[Result]] is an `Err`, returns `false` if it is an `Ok`.
   *
   * ```
   * const one = Result.err('Failed to parse integer');
   * // one.isErr() === true
   * ```
   *
   * @returns {boolean}
   */
  abstract isErr(): boolean;

  /**
   * Returns `Ok( val )` if this [[Result]] is an `Ok`, returns `Err( err )` if it is an `Err`.
   *
   * ```
   * Result.ok(1).toString() //Ok( 1 )
   * Result.err('parsing failure').toString() //Err( parsing failure )
   * ```
   *
   * @returns {string}
   */
  abstract toString(): string;

  /**
   * Tries to return the internal `Ok` value of this [[Result]].  Returns a `Some` containing the value
   * if it is an `Ok`, returns a `None` if it is an `Err`.
   *
   * ```
   * const one = Result.ok(1);
   * const maybeOne = one.getOk();
   *
   * // maybeOne.isSome() === true
   * // maybeOne.unwrap() === 1
   *
   * const one = Result.err('parsing error');
   * const maybeOne = one.getOk();
   *
   * // maybeOne.isNone() === true
   * ```
   *
   * @returns {OptionT<T>}
   */
  abstract getOk(): OptionT<T>;

  /**
   * Tries to return the internal `Err` value of this [[Result]].  Returns a `Some` containing the
   * value if it is an `Err`, returns a `None` if it is an `Ok`.
   *
   * ```
   * const one = Result.err('parsing error');
   * const maybeOne = one.getErr();
   *
   * // maybeOne.isSome() === true
   * // maybeOne.unwrap() === 'parsing error'
   *
   * const one = Result.ok(1);
   * const maybeOne = one.getErr();
   *
   * // maybeOne.isNone() === true
   * ```
   *
   * @returns {OptionT<E>}
   */
  abstract getErr(): OptionT<E>;

  /**
   * Returns the value contained by this [[Result]] if it is an `Ok`.  Throws an error
   * containing `message` if it is an `Err`.
   *
   * ```
   * const maybeOne = Result.ok(1);
   * // this won't throw because it's an `Ok` value.
   * const one = maybeOne.expect("couldn't unwrap an Ok");
   *
   * // but:
   * const maybeOne = Result.err('parsing error');
   * // this will throw because it's an `Err` value.
   * const one = maybeOne.expect("couldn't unwrap an Ok");
   * ```
   *
   * @param {string} message
   * @returns {T}
   */
  abstract expect(message: string): T;

  /**
   * Returns the value contained by this [[Result]] if it is an `Err`.  Throws an error
   * containing `message` if it is an `Ok`.
   *
   * ```
   * const maybeError = Result.ok(1);
   * // this will throw because it's an `Ok` value.
   * const error = maybeError.expectErr("couldn't unwrap an Err");
   *
   * // but:
   * const maybeError = Result.err('parsing error');
   * // this won't throw because it's an `Err` value.
   * const error = maybeError.expectErr("couldn't unwrap an Err");
   * ```
   *
   * @param {string} message
   * @returns {T}
   */
  abstract expectErr(message: string): E;

  /**
   * Returns the value contained by this [[Result]] if it is an `Ok`.  Throws a
   * pre-defined error if it is an `Err`.
   *
   * ```
   * const maybeOne = Result.ok(1);
   * // this won't throw, because it's an Ok value.
   * const one = maybeOne.unwrap();
   *
   * // but:
   * const maybeOne = Result.err('parsing error');
   * // this will throw, because it's a Err value.
   * const one = maybeOne.unwrap();
   * ```
   *
   * @returns {T}
   */
  abstract unwrap(): T;

  /**
   * Returns the value contained by this [[Result]] if it is an `Err`.  Throws a
   * pre-defined error if it is an `Ok`.
   *
   * ```
   * const maybeOne = Result.ok(1);
   * // this will throw, because it's an Ok value.
   * const error = maybeOne.unwrapErr();
   *
   * // but:
   * const maybeOne = Result.err('parsing error');
   * // this won't throw, because it's a Err value.
   * const error = maybeOne.unwrapErr();
   * ```
   *
   * @returns {T}
   */
  abstract unwrapErr(): E;

  /**
   * Returns the value contained by this [[Result]] if it is an `Ok`, otherwise
   * returns `other`.
   *
   * ```
   * const maybeOne = Result.ok(1);
   * const one = maybeOne.unwrapOr(2);
   * // one === 1
   *
   * const maybeOne = Result.err('parse error');
   * const one = maybeOne.unwrapOr(2);
   * // one === 2
   * ```
   *
   * @param {T} other
   * @returns {T}
   */
  abstract unwrapOr(other: T): T;

  /**
   * Returns the value contained by this [[Result]] if it is an 'Ok', otherwise
   * calls `func` with the `Err` value and returns the result.
   *
   * ```
   * const maybeOne = Result.ok(1);
   * const one = maybeOne.unwrapOrElse((err) => err.length);
   * // one === 1
   *
   * const maybeOne = Result.err('parse error');
   * const one = maybeOne.unwrapOrElse((err) => err.length);
   * // one === 11
   * ```
   *
   * @param {(err: E) => T} func
   * @returns {T}
   */
  abstract unwrapOrElse(func: (err: E) => T): T;

  /**
   * Maps a [[Result]]&lt;T, E&gt; to an [[Result]]&lt;U, E&gt; by applying `func` to the value
   * contained in this [[Result]].
   *
   * If this [[Result]] is an `Ok` value, the returned value will be the return of `func`
   * wrapped in a new [[Result]] (resulting in an `Ok` value); otherwise the returned value
   * will be a new `Err` value.
   *
   * ### Note:
   * If the return value of `func` is `null` or `undefined`, the [[Result]] that is returned
   * is guaranteed to be an `Err` value containing a `TypeError`.
   *
   * ```
   * const maybeOne = Result.ok(1);
   * const maybeTwo = maybeOne.map(x => x * 2);
   * // maybeTwo.isOk() === true
   * // maybeTwo.unwrap() === 2
   *
   * const maybeThree = Result.err(2);
   * const maybeSix = maybeThree.map(x => x * 2);
   * // maybeSix.isErr() === true
   * // maybeSix.unwrapErr() === 2
   * ```
   *
   * @param {(val: T) => U} func
   * @returns {Result<U, E>}
   */
  abstract map<U>(func: (val: T) => U): Result<U, E>;

  /**
   * Maps a [[Result]]&lt;T, E&gt; to an [[Result]]&lt;T, F&gt; by applying `func` to the value
   * contained in this [[Result]].
   *
   * If this [[Result]] is an `Err` value, the returned value will be the return of `func`
   * wrapped in a new [[Result]] (resulting in an `Err` value); otherwise the returned value
   * will be a new `Ok` value.
   *
   * ### Note:
   * If the return value of `func` is `null` or `undefined`, the [[Result]] that is returned
   * is guaranteed to be an `Err` value containing a `TypeError`.
   *
   * ```
   * const maybeOne = Result.ok(1);
   * const maybeTwo = maybeOne.mapErr(x => x * 2);
   * // maybeTwo.isOk() === true
   * // maybeTwo.unwrap() === 1
   *
   * const maybeThree = Result.err(2);
   * const maybeSix = maybeThree.mapErr(x => x * 2);
   * // maybeSix.isErr() === true
   * // maybeSix.unwrapErr() === 4
   * ```
   *
   * @param {(val: T) => U} func
   * @returns {Result<U, E>}
   */
  abstract mapErr<F>(func: (val: E) => F): Result<T, F>;
  abstract and<U>(other: Result<U, E>): Result<U, E>;
  abstract flatMap<U>(func: (ok: T) => Result<U, E>): Result<U, E>;
  abstract or<F>(other: Result<T, F>): Result<T, F>;
  abstract orElse<F>(func: (err: E) => Result<T, F>): Result<T, F>;
  abstract match<U, F>(options: ResultMatch<T, E, U, F>): U | F;
  abstract clone(): Result<T, E>;
}

class Ok<T, E> extends Result<T, E> {
  private value: T;

  constructor(val: T) {
    super();
    this.value = val;
  }

  isOk(): boolean {
    throw 'unimplemented';
  }

  isErr(): boolean {
    throw 'unimplemented';
  }

  toString(): string {
    throw 'unimplemented';
  }

  getOk(): OptionT<T> {
    throw 'unimplemented';
  }

  getErr(): OptionT<E> {
    throw 'unimplemented';
  }

  expect(message: string): T {
    throw 'unimplemented';
  }

  expectErr(message: string): E {
    throw 'unimplemented';
  }

  unwrap(): T {
    throw 'unimplemented';
  }

  unwrapErr(): E {
    throw 'unimplemented';
  }

  unwrapOr(other: T): T {
    throw 'unimplemented';
  }

  unwrapOrElse(func: (err: E) => T): T {
    throw 'unimplemented';
  }

  map<U>(func: (val: T) => U): Result<U, E> {
    throw 'unimplemented';
  }

  mapErr<F>(func: (val: E) => F): Result<T, F> {
    throw 'unimplemented';
  }

  and<U>(other: Result<U, E>): Result<U, E> {
    throw 'unimplemented';
  }

  flatMap<U>(func: (ok: T) => Result<U, E>): Result<U, E> {
    throw 'unimplemented';
  }

  or<F>(other: Result<T, F>): Result<T, F> {
    throw 'unimplemented';
  }

  orElse<F>(func: (err: E) => Result<T, F>): Result<T, F> {
    throw 'unimplemented';
  }

  match<U, F>(options: ResultMatch<T, E, U, F>): U | F {
    throw 'unimplemented';
  }

  clone(): Result<T, E> {
    throw 'unimplemented';
  }
}

class Err<T, E> extends Result<T, E> {
  private error: E;

  constructor(err: E) {
    super();
    this.error = err;
  }

  isOk(): boolean {
    throw 'unimplemented';
  }

  isErr(): boolean {
    throw 'unimplemented';
  }

  toString(): string {
    throw 'unimplemented';
  }

  getOk(): OptionT<T> {
    throw 'unimplemented';
  }

  getErr(): OptionT<E> {
    throw 'unimplemented';
  }

  expect(message: string): T {
    throw 'unimplemented';
  }

  expectErr(message: string): E {
    throw 'unimplemented';
  }

  unwrap(): T {
    throw 'unimplemented';
  }

  unwrapErr(): E {
    throw 'unimplemented';
  }

  unwrapOr(other: T): T {
    throw 'unimplemented';
  }

  unwrapOrElse(func: (err: E) => T): T {
    throw 'unimplemented';
  }

  map<U>(func: (val: T) => U): Result<U, E> {
    throw 'unimplemented';
  }

  mapErr<F>(func: (val: E) => F): Result<T, F> {
    throw 'unimplemented';
  }

  and<U>(other: Result<U, E>): Result<U, E> {
    throw 'unimplemented';
  }

  flatMap<U>(func: (ok: T) => Result<U, E>): Result<U, E> {
    throw 'unimplemented';
  }

  or<F>(other: Result<T, F>): Result<T, F> {
    throw 'unimplemented';
  }

  orElse<F>(func: (err: E) => Result<T, F>): Result<T, F> {
    throw 'unimplemented';
  }

  match<U, F>(options: ResultMatch<T, E, U, F>): U | F {
    throw 'unimplemented';
  }

  clone(): Result<T, E> {
    throw 'unimplemented';
  }

}
