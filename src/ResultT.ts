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
export default abstract class ResultT<T, E> {
  constructor() {}

  static ok<T, E>(val: T): ResultT<T, E> {
    return new Ok(val);
  }

  static err<T, E>(error: E): ResultT<T, E> {
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
   * Tries to return the internal `Ok` value of this [[ResultT]].
   * Returns a `Some` containing the value if it is an `Ok`,
   * returns a `None` if it is an `Err`.
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
   * Maps a [[ResultT]]<T, E> to an [[ResultT]]<U, E> by applying `func` to the value
   * contained in this [[ResultT]].
   *
   * If this [[ResultT]] is an `Ok` value, the returned value will be the return of `func`
   * wrapped in a new [[ResultT]] (resulting in an `Ok` value); otherwise the returned value
   * will be a new `Err` value.
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
   * @returns {ResultT<U, E>}
   */
  abstract map<U>(func: (val: T) => U): ResultT<U, E>;

  /**
   * Maps a [[ResultT]]<T, E> to an [[ResultT]]<T, F> by applying `func` to the value
   * contained in this [[ResultT]].
   *
   * If this [[ResultT]] is an `Err` value, the returned value will be the return of `func`
   * wrapped in a new [[ResultT]] (resulting in an `Err` value); otherwise the returned value
   * will be a new `Ok` value.
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
   * @param {(val: E) => F} func
   * @returns {ResultT<T, F>}
   */
  abstract mapErr<F>(func: (val: E) => F): ResultT<T, F>;

  /**
   * Returns an `Err` value if this [[ResultT]] is an `Err`; otherwise calls `func` and returns
   * the result.
   *
   * ```
   * const square = x => ResultT.ok(x * x);
   * const error = () => ResultT.err('it broke!');
   *
   * const two = ResultT.ok(2);
   * const sixteen = two.flatMap(square).flatMap(square);
   * // sixteen.isOk() === true
   * // sixteen.unwrap() === 16
   *
   * const parseError = ResultT.err('parsing error');
   * const result = parseError.flatMap(square).flatMap(square);
   * // result.isOk() === false
   * // result.unwrap() === 'parsing error'
   *
   * const resultAgain = two.flatMap(error).flatMap(square);
   * // resultAgain.isOk() === false
   * // resultAgain.unwrap() === 'it broke!'
   * ```
   *
   * @param {(ok: T) => ResultT<U, E>} func
   * @returns {ResultT<U, E>}
   */
  abstract flatMap<U>(func: (ok: T) => ResultT<U, E>): ResultT<U, E>;

  /**
   * Returns 'this' [[ResultT]] if it is an `Ok` value; otherwise calls `func` and returns the
   * result.
   *
   * ```
   * const okay = ResultT.ok(1);
   * const error = ResultT.err('parseError');
   *
   * const either = okay.orElse(() => error);
   * // either.isOk() === true
   * // either.unwrap() === 1
   *
   * const eitherAgain = error.orElse(() => okay);
   * // eitherAgain.isOk() === true
   * // eitherAgain.unwrap() === 1
   * ```
   *
   * @param {(err: E) => ResultT<T, F>} func
   * @returns {ResultT<T, F>}
   */
  abstract orElse<F>(func: (err: E) => ResultT<T, F>): ResultT<T, F>;

  /**
   * Calls the appropriate function in `options` and returns the result.
   *
   * If 'this' [[ResultT]] is an `Ok` value, `options.ok` is called;
   * otherwise `options.err` is called.
   *
   * See [[ResultMatch]] for more details.
   *
   * ```
   * const maybeOne = ResultT.ok(1);
   *
   * const doubled = maybeOne.match({
   *   ok: (val) => val * 2, // double it
   *   err: (err) => 0,         // we'll pretend None implies a 0
   * });
   *
   * // doubled === 2
   *
   * const maybeTwo = ResultT.err(2);
   *
   * const tripled = maybeTwo.match({
   *   ok: (val) => val * 3,
   *   err: (err) => 0,
   * });
   *
   * // tripled === 0
   * ```
   *
   * @param {ResultMatch<T, E, U, F>} options
   * @returns {U | F}
   */
  abstract match<U, F>(options: ResultMatch<T, E, U, F>): U | F;

  /**
   * Returns a new [[ResultT]] containing the same data as the current one.
   *
   * Note: does not perform any deep copying of the contained data.
   *
   * ```
   * const one = ResultT.ok(1);
   *
   * const oneAgain = maybeOne.clone();
   * // one !== oneAgain
   * // one.unwrap() === oneAgain.unwrap()
   *
   * const foo = ResultT.ok({
   *   bar: 'baz'
   * });
   *
   * const fooAgain = foo.clone();
   * // foo !== fooAgain
   * // foo.unwrap() === fooAgain.unwrap()
   * // because they're the same object
   *
   * const error = ResultT.err(2);
   * const errorAgain = error.clone();
   * // error !== errorAgain
   * // error.unwrap() === errorAgain.unwrap()
   * ```
   *
   * @returns {ResultT<T, E>}
   */
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

  map<U>(func: (val: T) => U): ResultT<U, E> {
    return ResultT.ok(func(this.value));
  }

  mapErr<F>(func: (val: E) => F): ResultT<T, F> {
    return ResultT.ok(this.value);
  }

  flatMap<U>(func: (ok: T) => ResultT<U, E>): ResultT<U, E> {
    return func(this.value);
  }

  orElse<F>(func: (err: E) => ResultT<T, F>): ResultT<T, F> {
    return new Ok(this.value);
  }

  match<U, F>(options: ResultMatch<T, E, U, F>): U | F {
    return options.ok(this.value);
  }

  clone(): ResultT<T, E> {
    return ResultT.ok(this.value);
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

  map<U>(func: (val: T) => U): ResultT<U, E> {
    return ResultT.err(this.error);
  }

  mapErr<F>(func: (val: E) => F): ResultT<T, F> {
    return ResultT.err(func(this.error));
  }

  flatMap<U>(func: (ok: T) => ResultT<U, E>): ResultT<U, E> {
    return new Err(this.error);
  }

  orElse<F>(func: (err: E) => ResultT<T, F>): ResultT<T, F> {
    return func(this.error);
  }

  match<U, F>(options: ResultMatch<T, E, U, F>): U | F {
    return options.err(this.error);
  }

  clone(): ResultT<T, E> {
    return ResultT.err(this.error);
  }
}
