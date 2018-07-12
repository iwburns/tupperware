/**
 * An interface describing the argument passed to [[OptionT]]'s `match` function.
 */
export interface OptMatch<T, U, V> {
  some: (val: T) => U;
  none: () => V;
}

/**
 * A class representing the concept of an optional value.
 *
 * There are only two concrete versions of this class: [[Some]] and [[None]].
 * [[Some]] contains a value and [[None]] does not, but they both are wrapped
 * in this same OptionT API.
 */
export default abstract class OptionT<T> {
  // tslint:disable-next-line:no-empty
  constructor() {}

  static of<A>(value?: A): OptionT<A> {
    if (value === null || typeof value === 'undefined') {
      return new None();
    }
    return new Some(value);
  }

  static some<A>(value: A): OptionT<A> {
    if (value === null || typeof value === 'undefined') {
      throw Error('Cannot create a Some of a null or undefined value');
    }
    return new Some(value);
  }

  static none<A>(value?: A): OptionT<A> {
    if (value === null || typeof value === 'undefined') {
      return new None();
    }
    throw Error('Cannot create a None of a non-null or undefined value');
  }

  /**
   * Returns `true` if this [[OptionT]] is a `Some`, returns false if it is a `None`.
   *
   * ```
   * const one = OptionT.some(1);
   * if (one.isSome()) { // always going to be true.
   *   // ...
   * }
   * ```
   *
   * @returns {boolean}
   */
  abstract isSome(): boolean;

  /**
   * Returns `true` if this [[OptionT]] is a `None`, returns false if it is a `Some`.
   *
   * ```
   * const nope = OptionT.none();
   * if (nope.isNone()) { // always going to be true.
   *   // ...
   * }
   * ```
   *
   * @returns {boolean}
   */
  abstract isNone(): boolean;

  /**
   * Returns `None()` if this [[OptionT]] is a `None`, returns `Some( val )` if it is a `Some`.
   *
   * ```
   * OptionT.some(1).toString() //Some( 1 )
   * OptionT.none().toString() //None()
   * ```
   *
   * @returns {boolean}
   */
  abstract toString(): string;

  /**
   * Returns the value contained by this [[OptionT]] if it is a `Some`.  Throws an error
   * containing `message` if this [[OptionT]] is a `None` or a default `message` if one is
   * not provided.
   *
   * ```
   * const maybeOne = OptionT.some(1);
   * // this will throw, because we haven't yet checked if `maybeOne` is a `Some` value
   * const one = maybeOne.unwrap('could not unwrap a Some');
   *
   * if (maybeOne.isSome()) {
   *   // this will not throw, because we just confirmed it's a `Some`
   *   const oneAgain = maybeOne.unwrap('could not unwrap a Some');
   * }
   *
   * // but:
   * const maybeTwo = OptionT.none();
   * // this will still throw, because we haven't checked what it is.
   * const two = maybeTwo.unwrap('could not unwrap a Some');
   *
   * if (maybeTwo.isSome()) {
   *   // safe to unwrap, won't throw an error; also won't run because maybeTwo is a `None`
   *   const twoAgain = maybeTwo.unwrap('could not unwrap a Some');
   * } else {
   *   // this will throw, because `None` values cannot be unwrapped
   *   const twoAgain = maybeTwo.unwrap('could not unwrap a Some');
   * }
   * ```
   *
   * @param {string} message
   * @returns {T}
   * @throws a `nullshield:unchecked_unwrap` error if you attempt to call it before first checking
   * if the [[OptionT]] is a safe to unwrap (in other words, it must be a `Some` value).
   * @throws a `nullshield:unwrap_on_none` error if you attempt to call it on a `None` value after
   * first checking that the [[OptionT]] is safe to unwrap.
   *
   * ## `nullshield:unchecked_unwrap:` ##
   * The most direct way to avoid this issue is to either check that the given [[OptionT]] is a
   * `Some` value (with [[OptionT.isSome]] or [[OptionT.isNone]]) or use [[OptionT.unwrapOr]]
   * instead which allows you to specify a default value in the case where the given [[OptionT]]
   * is a `None`.
   *
   * However, oftentimes you may not want to simply get the value out of the [[OptionT]]; instead
   * you may want to conditionally use that value in some sort of computation.  In those cases
   * it's likely more clean/clear to use [[OptionT.map]] or a similar function instead.
   *
   * ## `nullshield:unwrap_on_none:` ##
   * To avoid this issue, either make sure that your logic is correct concerning whether or not
   * you should be `unwrap`-ing this value or use [[OptionT.unwrapOr]] instead which allows you
   * to specify a default value in the case where the given [[OptionT]] is a `None`.
   */
  abstract unwrap(message?: string): T;

  /**
   * Returns the value contained by this [[OptionT]] if it is a `Some`.  Throws an error
   * containing `message` if this [[OptionT]] is a `None` or a default `message` if one is
   * not provided.
   *
   * ```
   * const maybeOne = OptionT.some(1);
   * // this won't throw, because it's a Some value.
   * const one = maybeOne.forceUnwrap('could not unwrap a Some');
   *
   * // but:
   * const maybeTwo = OptionT.none();
   * // this will throw, because it's a None value.
   * const two = maybeTwo.forceUnwrap('could not unwrap a Some');
   * ```
   *
   * #### Note ####
   * It is usually more ergonomic to unwrap an [[OptionT]] with [[OptionT.unwrapOr]] or to
   * conditionally do something with the contained value with [[OptionT.map]] or a similar
   * function instead of using [[OptionT.forceUnwrap]].
   *
   * However, there are cases where [[OptionT.forceUnwrap]] may be useful.  With that in
   * mind, please note: this function will always print a `nullshield:force_unwrap_warning`
   * regardless of whether or not the [[OptionT]] in question is a `Some`.
   *
   * @param {string} message
   * @returns {T}
   * @throws `nullshield:force_unwrap_on_none` if this function is called on an [[OptionT]]
   * which happens to be a `None`.
   *
   * ## `nullshield:force_unwrap_on_none` ##
   * The only way to avoid this is to not call this function on an [[OptionT]] which happens
   * to be a `None`.  This means you must either know for certain that the [[OptionT]] in
   * question is a `Some`, or you must verify it manually with [[OptionT.isSome]] or a
   * similar function.
   */
  abstract forceUnwrap(message?: string): T;

  /**
   * Returns the value contained by this [[OptionT]] if it is a `Some`.  Returns `other` if
   * this [[OptionT]] is a `None`.
   *
   * ```
   * const maybeOne = OptionT.some(1);
   * const one = maybeOne.unwrapOr(3); // one === 1
   *
   * const maybeTwo = OptionT.none();
   * const two = maybeTwo.unwrapOr(3); // two === 3
   * ```
   *
   * @param {T} other
   * @returns {T}
   */
  abstract unwrapOr(other: T): T;

  /**
   * Returns the value contained by this [[OptionT]] if it is a `Some`.  Returns the return
   * value of `func` if this [[OptionT]] is a `None`.
   *
   * ```
   * const maybeOne = OptionT.some(1);
   * const one = maybeOne.unwrapOrElse(() => 3); // one === 1
   *
   * const maybeTwo = OptionT.none();
   * const two = maybeTwo.unwrapOrElse(() => 3); // two === 3
   * ```
   *
   * @param {() => T} func
   * @returns {T}
   */
  abstract unwrapOrElse(func: () => T): T;

  /**
   * Maps an [[OptionT]]&lt;T&gt; to an [[OptionT]]&lt;U&gt; by applying `func` to the value
   * contained in this [[OptionT]].
   *
   * If this [[OptionT]] is a `Some` value, the returned value will be the return of `func`
   * wrapped in a new [[OptionT]] (resulting in a `Some` value); otherwise the returned value
   * will be a new `None` value.
   *
   * ### Note:
   * If the return value of `func` is `null` or `undefined`, the [[OptionT]] that is returned
   * is guaranteed to be a `None` value.
   *
   * ```
   * const maybeOne = OptionT.some(1);
   * const maybeTwo = maybeOne.map(x => x * 2);
   * // maybeTwo.isSome() === true
   * // maybeTwo.unwrap() === 2
   *
   * const maybeThree = OptionT.none();
   * const maybeSix = maybeThree.map(x => x * 2);
   * // maybeSix.isNone() === true
   * ```
   *
   * @param {(val: T) => U} func
   * @returns {OptionT<U>}
   */
  abstract map<U>(func: (val: T) => U): OptionT<U>;

  /**
   * Returns a `None` value if this [[OptionT]] is a `None`; otherwise returns `other`.
   *
   * ```
   * const one = OptionT.some(1);
   * const two = OptionT.some(2);
   *
   * const twoAgain = one.and(two);
   * // twoAgain.isSome() === true
   * // twoAgain.unwrap() === 2
   *
   *
   * const three = OptionT.none();
   * const four = OptionT.some(4);
   *
   * const fourAgain = three.and(four);
   * // fourAgain.isSome() === false
   * ```
   *
   * @param {OptionT<U>} other
   * @returns {OptionT<U>}
   */
  abstract and<U>(other: OptionT<U>): OptionT<U>;

  /**
   * Returns a `None` value if this [[OptionT]] is a `None`; otherwise calls `func` and returns
   * the result.
   *
   * ```
   * const square = x => OptionT.some(x * x);
   * const nothing = () => OptionT.none();
   *
   * const two = OptionT.some(2);
   * const sixteen = two.flatMap(square).flatMap(square);
   * // sixteen.isSome() === true
   * // sixteen.unwrap() === 16
   *
   * const none = OptionT.none();
   * const result = none.flatMap(square).flatMap(square);
   * // result.isSome() === false
   *
   * const resultAgain = two.flatMap(nothing).flatMap(square);
   * // resultAgain.isSome() === false
   * ```
   *
   * @param {(val: T) => OptionT<U>} func
   * @returns {OptionT<U>}
   */
  abstract flatMap<U>(func: (val: T) => OptionT<U>): OptionT<U>;

  /**
   * Returns 'this' [[OptionT]] if it is a `Some` value; otherwise returns `other`.
   *
   * ```
   * const one = OptionT.some(1);
   * const none = OptionT.some(1);
   *
   * const either = one.or(none);
   * // either.isSome() === true
   * // either.unwrap() === 1
   *
   * const eitherAgain = none.or(one);
   * // eitherAgain.isSome() === true
   * // eitherAgain.unwrap() === 1
   * ```
   *
   * @param {OptionT<any>} other
   * @returns {OptionT<any>}
   */
  abstract or(other: OptionT<any>): OptionT<any>;

  /**
   * Returns 'this' [[OptionT]] if it is a `Some` value; otherwise calls `func` and returns the
   * result.
   *
   * ```
   * const one = OptionT.some(1);
   * const none = OptionT.none();
   *
   * const either = one.orElse(() => none);
   * // either.isSome() === true
   * // either.unwrap() === 1
   *
   * const eitherAgain = none.orElse(() => one);
   * // eitherAgain.isSome() === true
   * // eitherAgain.unwrap() === 1
   * ```
   *
   * @param {() => OptionT<any>} func
   * @returns {OptionT<any>}
   */
  abstract orElse(func: () => OptionT<any>): OptionT<any>;

  /**
   * Calls the appropriate function in `options` and returns the result.
   *
   * If 'this' [[OptionT]] is a `Some` value, `options.some` is called;
   * otherwise `options.none` is called.
   *
   * See [[OptMatch]] for more details.
   *
   * ```
   * const maybeOne = OptionT.some(1);
   *
   * const doubled = maybeOne.match({
   *   some: (val) => val * 2, // double it
   *   none: () => 0,          // we'll pretend None implies a 0
   * });
   *
   * // doubled === 2
   *
   * const maybeTwo = OptionT.none();
   *
   * const tripled = maybeTwo.match({
   *   some: (val) => val * 3,
   *   none: () => 0,
   * });
   *
   * // tripled === 0
   * ```
   *
   * @param {OptMatch<T, U, V>} options
   * @returns {V | U}
   */
  abstract match<U, V>(options: OptMatch<T, U, V>): U | V;

  /**
   * Returns `this` [[OptionT]] if it is a `Some` value and if `condition` returns `true`;
   * otherwise returns a `None` value.
   *
   * ```
   * const one = OptionT.some(1);
   *
   * const greaterThanZero = one.filter(x => x > 0);
   * // greaterThanZero.unwrap() === 1
   *
   * const lessThanZero = one.filter(x => x < 0);
   * // lessThanZero.isNone() === true
   * ```
   *
   * @param {(val: T) => boolean} condition
   * @returns {OptionT<T>}
   */
  abstract filter(condition: (val: T) => boolean): OptionT<T>;

  /**
   * Calls `func` with the contained value if this [[OptionT]] is a `Some` value;
   * otherwise does nothing.
   *
   * Note: This is intended for causing side-effects.  If you need a return value, consider
   * using [[match]] instead.
   *
   * ```
   * const one = OptionT.some(1);
   *
   * let val = 0;
   *
   * one.forEach(x => { val = x; });
   * // val === 1
   * ```
   *
   * @param {(val: any) => void} func
   */
  abstract forEach(func: (val: any) => void): void;
}

/**
 * A class representing the `Some`-type variant of the `OptionT` type.
 *
 * Instances of this class wrap their contained value inside the
 * `OptionT` API defined by [[OptionT]].
 */
class Some<T> extends OptionT<T> {
  private value: T;
  private hasBeenInspected: boolean;

  constructor(value: T) {
    super();
    this.value = value;
    this.hasBeenInspected = false;
  }

  isSome(): boolean {
    this.hasBeenInspected = true;
    return true;
  }

  isNone(): boolean {
    this.hasBeenInspected = true;
    return false;
  }

  toString(): string {
    return `Some( ${this.value} )`;
  }

  unwrap(message?: string): T {
    if (!this.hasBeenInspected) {
      throw new Error(
        'nullshield:unchecked_unwrap: Called unwrap without first checking if it was safe to do so. Please verify that' +
          ' the `OptionT` in question is a `Some` value before calling this function or use a safer function like' +
          ' `unwrapOr` which provides a default value in case this `OptionT` is a `None`.'
      );
    }
    return this.value;
  }

  forceUnwrap(message?: string): T {
    console.warn(
      'nullshield:force_unwrap_warning: Called forceUnwrap on a `Some` value.  This is not recommended usage.'
    );
    return this.value;
  }

  unwrapOr(other: T): T {
    return this.value;
  }

  unwrapOrElse(func: () => T): T {
    return this.value;
  }

  map<U>(func: (val: T) => U): OptionT<U> {
    return OptionT.of(func(this.value));
  }

  and<U>(other: OptionT<U>): OptionT<U> {
    this.hasBeenInspected = true;
    return other;
  }

  flatMap<U>(func: (val: T) => OptionT<U>): OptionT<U> {
    return func(this.value);
  }

  or(other: OptionT<T>): OptionT<T> {
    return this;
  }

  orElse(func: () => OptionT<T>): OptionT<T> {
    return this;
  }

  match<U, V>(options: OptMatch<T, U, V>): U | V {
    return options.some(this.value);
  }

  filter(condition: (val: T) => boolean): OptionT<T> {
    if (condition(this.value)) {
      return this;
    }
    return new None();
  }

  forEach(func: (val: any) => void): void {
    func(this.value);
  }
}

/**
 * A class representing the `None`-type variant of the `OptionT` type.
 *
 * Instances of this class contain no internal value.  They simply wrap the concept of 'nothing'
 * inside the same `OptionT` API defined by [[OptionT]].
 */
class None extends OptionT<any> {
  private hasBeenInspected: boolean;

  constructor() {
    super();
    this.hasBeenInspected = false;
  }

  isSome(): boolean {
    this.hasBeenInspected = true;
    return false;
  }

  isNone(): boolean {
    this.hasBeenInspected = true;
    return true;
  }

  toString(): string {
    return 'None()';
  }

  unwrap(message?: string): never {
    if (!this.hasBeenInspected) {
      throw new Error(
        'nullshield:unchecked_unwrap: Called unwrap without first checking if it was safe to do so. Please verify that' +
          ' the `OptionT` in question is a `Some` value before calling this function or use a safer function like' +
          ' `unwrapOr` which provides a default value in case this `OptionT` is a `None`.'
      );
    }
    if (typeof message !== 'undefined' && message !== null) {
      throw new Error(`nullshield:unwrap_on_none: ${message}`);
    }
    throw new Error('nullshield:unwrap_on_none: Called unwrap on a None value.');
  }

  forceUnwrap(message?: string): never {
    console.warn(
      'nullshield:force_unwrap_warning: Called forceUnwrap on a `None` value.  This is not recommended usage.'
    );
    if (typeof message !== 'undefined' && message !== null) {
      throw new Error(`nullshield:force_unwrap_on_none: ${message}`);
    }
    throw new Error('nullshield:force_unwrap_on_none: Called forceUnwrap on a None value.');
  }

  unwrapOr<T>(other: T): T {
    return other;
  }

  unwrapOrElse<T>(func: () => T): T {
    return func();
  }

  map<T, U>(func: (val: T) => U): OptionT<U> {
    return new None() as OptionT<U>;
  }

  and<U>(other: OptionT<U>): OptionT<U> {
    this.hasBeenInspected = true;
    return new None() as OptionT<U>;
  }

  flatMap<T, U>(func: (val: T) => OptionT<U>): OptionT<U> {
    return new None() as OptionT<U>;
  }

  or<T>(other: OptionT<T>): OptionT<T> {
    return other;
  }

  orElse<T>(func: () => OptionT<T>): OptionT<T> {
    return func();
  }

  match<T, U, V>(options: OptMatch<T, U, V>): V | U {
    return options.none();
  }

  filter<T>(condition: (val: T) => boolean): OptionT<T> {
    return new None();
  }

  forEach(func: (val: any) => void): void {
    return;
  }
}
