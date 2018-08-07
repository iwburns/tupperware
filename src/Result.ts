import Optional from './Optional';

/**
 * An interface describing the argument passed to [[Result]]'s `match` function.
 */
export interface ResultMatch<T, E, U, F> {
  ok: (ok: T) => U;
  err: (err: E) => F;
}

/**
 * ## Result
 *
 * An abstract class representing the result of some computation (that may have failed).  There are
 * only two concrete classes extending this one: [[Ok]] and [[Err]].
 *
 * `Ok`-values represent a computation result that returned successfully while `Err`-values
 * represent a failed computation.  Similar to [[Optional]]'s [[Some]] and [[None]], these two types
 * are useful because they share the same API.
 *
 * This means you could have a function that returns a [[Result]] and use the value straight away
 * without having to do a bunch of type checking to determine what happened during the computation.
 *
 * For example:
 * ```
 * // with this we can parse an integer out of a string and never have to check for `NaN`s again
 * function safeParseInt(val) {
 *   const parsed = Number.parseInt(val, 10);
 *   if (Number.isNan(parsed)) {
 *     return Result.err(`Failed to parse an integer from the string "${val}".`);
 *   }
 *   return Result.ok(parsed);
 * }
 *
 * const num = getSomeNumber();                  // maybe this returns a string (for some reason)
 * const parsed = safeParseInt(num).unwrapOr(0); // if it parsed properly, we can get the value
 *                                               // but if it didn't we'll just default back to 0
 *
 * // or if we want to be more explicit (or do more complex things)
 * const parsed = safeParseInt(num).match({
 *   ok: (val) => { return val; },      // this function will be called if we got an `Ok` back
 *   err: (e) => {                      // and this one will be called if we got an `Err` back
 *      console.error(e);
 *      return computeSomethingElse();
 *   },
 * });
 * ```
 *
 * @param T The type of the value contained within this [[Result]] if it is an [[Ok]] value.
 * @param E The type of the value contained within this [[Result]] if it is an [[Err]] value.
 */
export default abstract class Result<T, E> {
  /**
   * Creates an [[Ok]] with the given value.
   *
   * ```
   * const one = Result.ok(1);
   * // one.unwrap() === 1
   * ```
   *
   * @param value The value with which to create the [[Ok]] instance.
   * @param U The type of value that the new [[Ok]] will contain.
   * @returns An [[Ok]] instance containing `value`.
   */
  static ok<U>(value: U): Result<U, any> {
    return new Ok(value);
  }

  /**
   * Creates an [[Err]] with the given value.
   *
   * ```
   * const one = Result.err(1);
   * // one.unwrapErr() === 1
   * ```
   *
   * @param error The value with which to create the [[Err]] instance.
   * @param F The type of value that the new [[Err]] will contain.
   * @returns An [[Err]] instance containing `value`.
   */
  static err<F>(error: F): Result<any, F> {
    return new Err(error);
  }

  /**
   * Checks whether or not the given [[Result]] is an [[Ok]].
   *
   * ```
   * const one = Result.ok(1);
   * // one.isOk() === true
   * ```
   *
   * @returns `true` if this [[Result]] is an [[Ok]], otherwise returns `false`.
   */
  abstract isOk(): boolean;

  /**
   * Checks whether or not the given [[Result]] is an [[Err]].
   *
   * ```
   * const one = Result.err(1);
   * // one.isErr() === true
   * ```
   *
   * @returns `true` if this [[Result]] is an [[Err]], otherwise returns `false`.
   */
  abstract isErr(): boolean;

  /**
   * Returns `Ok( val )` if this [[Result]] is an [[Ok]], returns `Err( err )` if it is an
   * [[Err]].
   *
   * ```
   * const one = Result.ok(1);
   * // one.toString() === "Ok( 1 )"
   *
   * const two = Result.err(2);
   * // two.toString() === "Err( 2 )"
   * ```
   *
   * @returns A string representation of this [[Result]].
   */
  abstract toString(): string;

  /**
   * Tries to return the internal [[Ok]] value of this [[Result]]. Returns a [[Some]] containing
   * the value if it is an [[Ok]], returns a [[None]] if it is an [[Err]].
   *
   * You can also think of this function as transforming a [[Result]] into an [[Optional]], where
   * the [[Some]] comes from the [[Ok]] and the [[Err]] (if it exists) is thrown away.
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
   * @returns A [[Some]] containing this [[Result]]'s value if it is an [[Ok]], otherwise returns
   * a [[None]].
   */
  abstract getOk(): Optional<T>;

  /**
   * Tries to return the internal [[Err]] value of this [[Result]]. Returns a [[Some]] containing
   * the value if it is an [[Err]], returns a [[None]] if it is an [[Ok]].
   *
   * You can also think of this function as transforming a [[Result]] into an [[Optional]], where
   * the [[Some]] comes from the [[Err]] and the [[Ok]] (if it exists) is thrown away.
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
   * @returns A [[Some]] containing this [[Result]]'s value if it is an [[Err]], otherwise returns
   * a [[None]].
   */
  abstract getErr(): Optional<E>;

  /**
   * Returns the value contained by this [[Result]] if it is an [[Ok]]. Throws an error containing
   * `message` if it is an [[Err]] or a default message if none is provided.
   *
   * ```
   * const maybeOne = Result.ok(1);
   * // this won't throw because it's an `Ok` value.
   * const one = maybeOne.unwrap("couldn't unwrap an Ok");
   *
   * // but:
   * const maybeOne = Result.err('parsing error');
   * // this will throw because it's an `Err` value.
   * const one = maybeOne.unwrap("couldn't unwrap an Ok");
   * ```
   *
   * @param message A message to use in the thrown error if this [[Result]] is an [[Err]].
   * @returns This [[Result]]'s contained value if it is an [[Ok]].
   */
  abstract unwrap(message?: string): T;

  /**
   * Returns the value contained by this [[Result]] if it is an [[Err]]. Throws an error
   * containing `message` if it is an [[Ok]] or a default message if none is provided.
   *
   * ```
   * const maybeError = Result.ok(1);
   * // this will throw because it's an `Ok` value.
   * const error = maybeError.unwrapErr("couldn't unwrap an Err");
   *
   * // but:
   * const maybeError = Result.err('parsing error');
   * // this won't throw because it's an `Err` value.
   * const error = maybeError.unwrapErr("couldn't unwrap an Err");
   * ```
   *
   * @param message A message to use in the thrown error if this [[Result]] is an [[Ok]].
   * @returns This [[Result]]'s contained value if it is an [[Err]].
   */
  abstract unwrapErr(message?: string): E;

  /**
   * Returns the value contained by this [[Result]] if it is an [[Ok]], otherwise returns `other`
   * as a default value.
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
   * @param other A default value to fall back on if this [[Result]] is an [[Err]].
   * @returns The value in this [[Result]] if it is an [[Ok]], otherwise returns `other`.
   */
  abstract unwrapOr(other: T): T;

  /**
   * Returns the value contained by this [[Result]] if it is an [[Ok]], otherwise calls `func`
   * with the [[Err]] value and returns the result.
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
   * #### Note ####
   * The argument `func` will __not__ be evaluated unless this [[Result]] is an [[Err]]. This
   * means [[unwrapOrElse]] is ideal for cases when you need to fall back on a value that needs to
   * be computed (and may be expensive to compute).
   *
   * @param func A function returning the fall-back value if this [[Result]] is an [[Err]].
   * @returns The value in this [[Result]] if it is an [[Ok]], otherwise returns the return value
   * of `func`.
   */
  abstract unwrapOrElse(func: (err: E) => T): T;

  /**
   * Maps a [[Result]]<T, E> to an [[Result]]<U, E> by applying `func` to the value contained in
   * this [[Result]].
   *
   * If this [[Result]] is an [[Ok]], the returned value will be the return of `func` wrapped in a
   * new [[Result]] (resulting in a new [[Ok]]); otherwise the returned value will be a new
   * [[Err]].
   *
   * ```
   * const maybeOne = Result.ok(1);
   * const maybeTwo = maybeOne.map(x => x * 2);
   * // maybeTwo.isOk() === true
   * // maybeTwo.unwrap() === 2
   *
   * const maybeThree = Result.err(1);
   * const maybeSix = maybeThree.map(x => x * 2);
   * // maybeSix.isErr() === true
   * // maybeSix.unwrapErr() === 1
   * ```
   *
   * @param func A function to apply to this [[Result]]'s contained value.
   * @param U Both the return type of `func` and the type contained in the new [[Ok]] returned by
   * `map` (unless `map` returns an [[Err]]).
   * @returns The return value of `func` wrapped up as a new [[Result]].
   */
  abstract map<U>(func: (val: T) => U): Result<U, E>;

  /**
   * Maps a [[Result]]<T, E> to an [[Result]]<T, F> by applying `func` to the value
   * contained in this [[Result]].
   *
   * If this [[Result]] is an [[Err]], the returned value will be the return of `func` wrapped in
   * a new [[Result]] (resulting in a new [[Err]]); otherwise the returned value will be a new
   * [[Ok]].
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
   * @param func A function to apply to this [[Result]]'s contained value.
   * @param F Both the return type of `func` and the type contained in the new [[Err]] returned by
   * `map` (unless `map` returns an [[Ok]]).
   * @returns The return value of `func` wrapped up as a new [[Result]].
   */
  abstract mapErr<F>(func: (val: E) => F): Result<T, F>;

  /**
   * Returns an [[Err]] if this [[Result]] is an [[Err]]; otherwise calls `func` and returns
   * the result.
   *
   * This function behaves similarly to [[map]] and [[mapErr]] except that in this function, `func`
   * returns a [[Result]].  This means [[flatMap]] doesn't auto-wrap the return value from `func`
   * while [[map]] and [[mapErr]] both do.
   *
   * ```
   * const square = x => Result.ok(x * x);
   * const error = () => Result.err('it broke!');
   *
   * const two = Result.ok(2);
   * const sixteen = two.flatMap(square).flatMap(square);
   * // sixteen.isOk() === true
   * // sixteen.unwrap() === 16
   *
   * const parseError = Result.err('parsing error');
   * const result = parseError.flatMap(square).flatMap(square);
   * // result.isOk() === false
   * // result.unwrap() === 'parsing error'
   *
   * const resultAgain = two.flatMap(error).flatMap(square);
   * // resultAgain.isOk() === false
   * // resultAgain.unwrap() === 'it broke!'
   * ```
   *
   * #### Note: ####
   * This function is sometimes called `andThen` in other libraries.
   *
   * @param func The function to call with this [[Result]]'s inner value (if it is an [[Ok]]).
   * @param U The type of the inner value contained in `func`'s return value (if this [[Result]]
   * is an [[Ok]].
   * @returns An [[Err]] if this [[Result]] is an [[Err]]; otherwise passes this [[Result]]'s
   * inner value to `func` and returns the resulting [[Result]].
   */
  abstract flatMap<U>(func: (ok: T) => Result<U, E>): Result<U, E>;

  /**
   * Returns `this` [[Result]] if it is an [[Ok]]; otherwise calls `func` and returns the result.
   *
   * ```
   * const okay = Result.ok(1);
   * const error = Result.err('parseError');
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
   * #### Note ####
   * The argument `func` will __not__ be evaluated unless this [[Result]] is an [[Err]]. This
   * means [[orElse]] is ideal for cases when you need to fall back on a value that needs to
   * be computed (and may be expensive to compute).
   *
   * @param func A function returning an alternate [[Result]] if this one is an [[Err]].
   * @returns `this` [[Result]] if it is an [[Ok]], otherwise `func`'s return value is returned.
   */
  abstract orElse(func: (err: E) => Result<T, any>): Result<T, any>;

  /**
   * Calls the appropriate function in `options` and returns the result. If `this` [[Result]] is
   * an [[Ok]], `options.ok` is called; otherwise `options.err` is called.
   *
   * ```
   * const maybeOne = Result.ok(1);
   *
   * const doubled = maybeOne.match({
   *   ok: (val) => val * 2, // double it
   *   err: (err) => 0,      // we'll pretend an Err implies a 0
   * });
   *
   * // doubled === 2
   *
   * const maybeTwo = Result.err(2);
   *
   * const tripled = maybeTwo.match({
   *   ok: (val) => val * 3,
   *   err: (err) => 0,
   * });
   *
   * // tripled === 0
   * ```
   *
   * #### Note: ####
   * See [[ResultMatch]] for more details on the structure allowed.
   *
   * @param options An object adhering to the [[ResultMatch]] interface.
   * @param U The type of the return value in the case where `this` [[Result]] is an [[Ok]].
   * @param F The type of the return value in the case where `this` [[Result]] is an [[Err]].
   * @returns The return value from whichever function specified in `options` is called.
   */
  abstract match<U, F>(options: ResultMatch<T, E, U, F>): U | F;
}

/**
 * ## Ok
 *
 * A type representing the result of a __successful__ computation.
 *
 * This type is not intended to be used or instantiated directly. Instead, [[Ok]] instances can be created with
 * [[Result.ok]] and can then be manipulated with any method available on [[Result]].
 *
 * Please see the [[Result]] documentation for more information.
 *
 * #### Note: ####
 * All [[Ok]] methods are documented at the [[Result]] level.
 *
 * @param T The type of the value contained in this [[Ok]] instance.
 */
class Ok<T> extends Result<T, any> {
  /**
   * @hidden
   */
  private readonly value: T;

  /**
   * @hidden
   */
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

  getOk(): Optional<T> {
    return Optional.some(this.value);
  }

  getErr<E>(): Optional<E> {
    return Optional.none();
  }

  unwrap(message?: string): T {
    return this.value;
  }

  unwrapErr<E>(message?: string): never {
    if (typeof message !== 'undefined' && message !== null) {
      throw new Error(message);
    }
    throw new Error('Called unwrapErr on an Ok value.');
  }

  unwrapOr(other: T): T {
    return this.value;
  }

  unwrapOrElse<E>(func: (err: E) => T): T {
    return this.value;
  }

  map<E, U>(func: (val: T) => U): Result<U, E> {
    return Result.ok(func(this.value));
  }

  mapErr<E, F>(func: (val: E) => F): Result<T, F> {
    return Result.ok(this.value);
  }

  flatMap<E, U>(func: (ok: T) => Result<U, E>): Result<U, E> {
    return func(this.value);
  }

  orElse<E, F>(func: (err: E) => Result<T, F>): Result<T, F> {
    return Result.ok(this.value);
  }

  match<E, U, F>(options: ResultMatch<T, E, U, F>): U | F {
    return options.ok(this.value);
  }
}

/**
 * ## Err
 *
 * A type representing the result of a __failed__ computation.
 *
 * This type is not intended to be used or instantiated directly. Instead, [[Err]] instances can be created with
 * [[Result.err]] and can then be manipulated with any method available on [[Result]].
 *
 * Please see the [[Result]] documentation for more information.
 *
 * #### Note: ####
 * All [[Err]] methods are documented at the [[Result]] level.
 *
 * @param E The type of the value contained in this [[Err]] instance.
 */
class Err<E> extends Result<any, E> {
  /**
   * @hidden
   */
  private readonly error: E;

  /**
   * @hidden
   */
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

  getOk<T>(): Optional<T> {
    return Optional.none();
  }

  getErr(): Optional<E> {
    return Optional.some(this.error);
  }

  unwrap<T>(message?: string): never {
    if (typeof message !== 'undefined' && message !== null) {
      throw new Error(message);
    }
    throw new Error('Called unwrap on an Err value.');
  }

  unwrapErr(message: string): E {
    return this.error;
  }

  unwrapOr<T>(other: T): T {
    return other;
  }

  unwrapOrElse<T>(func: (err: E) => T): T {
    return func(this.error);
  }

  map<T, U>(func: (val: T) => U): Result<U, E> {
    return Result.err(this.error);
  }

  mapErr<T, F>(func: (val: E) => F): Result<T, F> {
    return Result.err(func(this.error));
  }

  flatMap<T, U>(func: (ok: T) => Result<U, E>): Result<U, E> {
    return Result.err(this.error);
  }

  orElse<T, F>(func: (err: E) => Result<T, F>): Result<T, F> {
    return func(this.error);
  }

  match<T, U, F>(options: ResultMatch<T, E, U, F>): U | F {
    return options.err(this.error);
  }
}
