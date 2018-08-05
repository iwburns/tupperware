/**
 * An interface describing the argument passed to [[OptionT]]'s `match` function.
 */
export interface OptMatch<T, U, V> {
  some: (val: T) => U;
  none: () => V;
}

/**
 * ## OptionT
 *
 * An abstract class representing an optional value. There are only two concrete classes extending
 * this one: [[Some]] and [[None]].
 *
 * `Some`-values contain an internal value while `None`-values represent the absence of a given
 * value. What makes these two types useful is that they both offer the same API to the consumer.
 *
 * This means that you can have a function that returns an `OptionT` and you can use the returned
 * values right away without having to check what type the are or if they're valid in one way or
 * another.
 *
 * For example:
 * ```
 * // with this we can pull values out of objects without knowing if they exist or not
 * function getProperty(obj, propName) {
 *   if (typeof obj[propName] !== 'undefined' && obj[propName] !== null) {
 *     return OptionT.some(obj[propName]);
 *   }
 *   return OptionT.none();
 * }
 *
 * const data = getSomeData();                  // maybe we don't know what this looks like
 * getProperty(data, 'c').forEach(console.log); // if c exists pass it to console.log
 *                                              // otherwise don't do anything
 *
 * getProperty(data, 'username')
 *   .map(x => `Hello, ${x}`) // if username exists, map it to an Option containing a greeting
 *   .forEach(console.log);   // if we just created a greeting, console.log it
 * ```
 *
 * @param T The type of the value contained within this [[OptionT]].
 */
export default abstract class OptionT<T> {
  /**
   * Creates an [[OptionT]] with the given value. If `null` or `undefined` is provided a [[None]]
   * will be returned, otherwise a [[Some]] containing the given value will be returned.
   *
   * ```
   * const one = OptionT.of(1);     // one.unwrapOr(0) === 1
   * const none = OptionT.of(null); // none.unwrapOr(0) === 0
   * const nope = OptionT.of();     // nope.unwrapOr(0) === 0
   * ```
   *
   * @param value An optional value to create an [[OptionT]] with.
   * @param A The type of the value that the new [[OptionT]] will contain.
   * @returns Either a [[Some]] or a [[None]] depending on the `value` passed in.
   */
  static of<A>(value?: A): OptionT<A> {
    if (value === null || typeof value === 'undefined') {
      return new None();
    }
    return new Some(value);
  }

  /**
   * Creates a [[Some]] with the given value. If `null` or `undefined` is provided this method with
   * throw an error.
   *
   * ```
   * const one = OptionT.some(1);      // one.unwrapOr(0) === 1
   * const none = OptionT.some(null);  // throws an error
   * const nope = OptionT.some();      // throws an error
   * ```
   *
   * @param value A value to create a [[Some]] with.
   * @param A The type of the value that the new [[Some]] will contain.
   * @returns A [[Some]] instance containing `value`.
   */
  static some<A>(value: A): OptionT<A> {
    if (value === null || typeof value === 'undefined') {
      throw Error('Cannot create a Some of a null or undefined value');
    }
    return new Some(value);
  }

  /**
   * Creates a [[None]] with the given value. If something other than `null` or `undefined` is
   * provided this method with throw an error.
   *
   * ```
   * const one = OptionT.none(1);      // throws an error
   * const none = OptionT.none(null);  // none.unwrapOr(0) === 0
   * const nope = OptionT.none();      // nope.unwrapOr(0) === 0
   * ```
   *
   * @param value? A value to create a [[None]] with
   * @returns A [[None]] instance.
   */
  static none<A>(value?: A): OptionT<A> {
    if (value === null || typeof value === 'undefined') {
      return new None();
    }
    throw Error('Cannot create a None of a non-null or undefined value');
  }

  /**
   * Checks whether or not the given [[OptionT]] is a [[Some]].
   *
   * ```
   * const one = OptionT.some(1);
   * if (one.isSome()) { // always going to be true.
   *   // ...
   * }
   *
   * const two = OptionT.none();
   * if (two.isSome()) { // always going to be false.
   *   // ...
   * }
   * ```
   *
   * @returns `true` if this [[OptionT]] is a [[Some]], otherwise returns `false`.
   */
  abstract isSome(): boolean;

  /**
   * Checks whether or not the given [[OptionT]] is a [[None]],
   *
   * ```
   * const one = OptionT.some(1);
   * if (one.isNone()) { // always going to be false.
   *   // ...
   * }
   *
   * const two = OptionT.none();
   * if (two.isNone()) { // always going to be true.
   *   // ...
   * }
   * ```
   *
   * @returns `true` if this [[OptionT]] is a [[None]], otherwise returns `false`.
   */
  abstract isNone(): boolean;

  /**
   * Returns `None()` if this [[OptionT]] is a `None`, returns `Some( val )` if it is a `Some`.
   *
   * ```
   * const one = OptionT.some(1);
   * console.log(one.toString()); // Some( 1 )
   *
   * const two = OptionT.none();
   * console.log(two.toString()); // None()
   * ```
   *
   * @returns A string representation of this [[OptionT]].
   */
  abstract toString(): string;

  /**
   * Returns the value contained by this [[OptionT]] if it is a [[Some]]; throws an error if this
   * [[OptionT]] is a [[None]] (because it cannot be unwrapped).
   *
   * The only safe way to call this function is to first make sure that this [[OptionT]] is a
   * [[Some]] (by calling [[isSome]] or [[isNone]]).
   *
   * ```
   * const one = OptionT.some(1);
   * console.log(one.unwrap()); // will throw; we didn't check if it was safe to call `unwrap`
   *
   * if (one.isSome()) {
   *   console.log(one.unwrap()); // will not throw; we know it's safe to call `unwrap`
   * }
   *
   * // however:
   * const two = OptionT.none();
   * console.log(two.unwrap()); // with throw; we didn't check if it was safe to call `unwrap`
   *
   * if (two.isSome()) {
   *   console.log(two.unwrap()); // will not throw; also won't run b/c two is a `None`
   * } else {
   *   console.log(two.unwrap()); // will throw; two is a `None` so it can't be `unwrap`ed
   * }
   * ```
   *
   * @param message An optional message to be included in the error that this function may throw.
   * @returns The value contained within this [[OptionT]].
   * @throws A `nullshield:unchecked_unwrap` error if you attempt to call this function before
   * first checking if this [[OptionT]] is a safe to unwrap. "Safe to unwrap" means that this
   * [[OptionT]] is a [[Some]].
   * @throws A `nullshield:unwrap_on_none` error if you attempted to call this function on a
   * [[None]] value.
   *
   * ## `nullshield:unchecked_unwrap:` ##
   * The most direct way to avoid this issue is to either check that the given [[OptionT]] is a
   * [[Some]] value (with [[isSome]] or [[isNone]]) or to use [[unwrapOr]] instead which allows you
   * to specify a default value to fall back on in the case where this [[OptionT]] is a [[None]].
   *
   * However, oftentimes you may not want to simply get the value out of the [[OptionT]]; instead
   * you may want to conditionally use that value in some sort of computation.  In those cases it's
   * likely more clean/clear to use [[map]] or a similar function instead.
   *
   * ## `nullshield:unwrap_on_none:` ##
   * To avoid this issue, either make sure that your logic is correct concerning whether or not
   * you should be `unwrap`-ing this value or use [[unwrapOr]] instead which allows you to specify
   * a default value to fall back on in the case where this [[OptionT]] is a [[None]].
   */
  abstract unwrap(message?: string): T;

  /**
   * Returns the value contained by this [[OptionT]] if it is a [[Some]]; throws an error if this
   * [[OptionT]] is a [[None]] (because it cannot be unwrapped).
   *
   * This function will __not__ throw an error if you fail to check if this [[OptionT]] is safe to
   * unwrap before doing so. However, it will always print a console warning because this function
   * is inherently dangerous to use.
   *
   * ```
   * const one = OptionT.some(1);
   * console.log(one.forceUnwrap()); // won't throw, but will always console.warn()
   *
   * const two = OptionT.none();
   * console.log(two.forceUnwrap()); // will throw because two is a `None`
   * ```
   *
   * #### Note ####
   * It is usually more ergonomic to unwrap an [[OptionT]] with [[unwrapOr]] or to conditionally do
   * something with the contained value with [[map]] or a similar function instead of using
   * [[forceUnwrap]].
   *
   * However, there are cases where [[forceUnwrap]] may be useful.  With that in mind, please note:
   * this function will always print a `nullshield:force_unwrap_warning` regardless of whether or
   * not the [[OptionT]] in question is a [[Some]].
   *
   * @param message An optional message to be included in the error that this function may throw.
   * @returns The value contained within this [[OptionT]].
   * @throws A `nullshield:force_unwrap_on_none` if this function is called on a [[None]].
   *
   * ## `nullshield:force_unwrap_on_none` ##
   * The only way to avoid this is to not call this function on a [[None]]. This means you must
   * either know for certain that the [[OptionT]] in question is a [[Some]], or you must verify
   * it manually with [[isSome]] or a similar function.
   */
  abstract forceUnwrap(message?: string): T;

  /**
   * Returns the value contained by this [[OptionT]] if it is a [[Some]], otherwise returns `other`
   * as a default value.
   *
   * ```
   * const maybeOne = OptionT.some(1);
   * const one = maybeOne.unwrapOr(3); // one === 1
   *
   * const maybeTwo = OptionT.none();
   * const two = maybeTwo.unwrapOr(3); // two === 3
   * ```
   *
   * @param other A default value to fall back on if this [[OptionT]] is a [[None]].
   * @returns The value in this [[OptionT]] if it is a [[Some]], otherwise returns `other`.
   */
  abstract unwrapOr(other: T): T;

  /**
   * Returns the value contained by this [[OptionT]] if it is a [[Some]], otherwise calls `func`
   * and returns the result.
   *
   * ```
   * const maybeOne = OptionT.some(1);
   * const one = maybeOne.unwrapOrElse(() => 3); // one === 1
   *
   * const maybeTwo = OptionT.none();
   * const two = maybeTwo.unwrapOrElse(() => 3); // two === 3
   * ```
   *
   * #### Note ####
   * The argument `func` will __not__ be evaluated unless this [[OptionT]] is a [[None]]. This
   * means [[unwrapOrElse]] is ideal for cases when you need to fall back on a value that needs to
   * be computed (and may be expensive to compute).
   *
   * @param func A function returning the fall-back value if this [[OptionT]] is a [[None]].
   * @returns The value in this [[OptionT]] if it is a [[Some]], otherwise returns the return value
   * of `func`.
   */
  abstract unwrapOrElse(func: () => T): T;

  /**
   * Maps an [[OptionT]]&lt;T&gt; to an [[OptionT]]&lt;U&gt; by applying `func` to the value
   * contained in this [[OptionT]].
   *
   * If this [[OptionT]] is a [[Some]], the returned value will be the return of `func` wrapped in
   * a new [[OptionT]] (resulting in a new [[Some]] value); otherwise the returned value will be a
   * new [[None]].
   *
   * ```
   * const one = OptionT.some(1);
   * const two = one.map(x => x * 2);
   * // two.unwrapOr(3) === 2
   *
   * const three = OptionT.none();
   * const six = three.map(x => x * 2);
   * // six.unwrapOr(7) === 7
   * ```
   * #### Note: ####
   * If the return value of `func` is `null` or `undefined`, the [[OptionT]] that is returned is
   * guaranteed to be a [[None]].
   *
   * @param func A function to apply to this [[OptionT]]'s contained value.
   * @param U Both the return type of `func` and the type of the value contained in the returned
   * [[OptionT]].
   * @returns The return value of `func` wrapped up as a new [[OptionT]].
   */
  abstract map<U>(func: (val: T) => U): OptionT<U>;

  /**
   * Compares two [[OptionT]] values. Returns `other` if this [[OptionT]] is a [[Some]]; otherwise
   * returns [[None]]. This allows chained comparison of [[OptionT]] values.
   *
   * ```
   * const one = OptionT.some(1);
   * const two = OptionT.some(2);
   *
   * const twoAgain = one.and(two);
   * // twoAgain.isSome() === true
   * // twoAgain.unwrap() === 2
   *
   * const three = OptionT.none();
   * const four = OptionT.some(4);
   *
   * const fourAgain = three.and(four);
   * // fourAgain.isSome() === false
   * ```
   *
   * @param other Another [[OptionT]] to use in the comparison.
   * @param U The type of the value contained in the `other` [[OptionT]].
   * @returns `other` if this [[OptionT]] is a [[Some]], otherwise returns [[None]].
   */
  abstract and<U>(other: OptionT<U>): OptionT<U>;

  /**
   * Returns a [[None]] value if this [[OptionT]] is a [[None]]; otherwise calls `func` and returns
   * the result.
   *
   * This function behaves similarly to [[map]] except that in this function `func` returns an
   * [[OptionT]]. This means [[flatMap]] doesn't auto-wrap the return value from `func` while
   * [[map]] does.
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
   * #### Note: ####
   * This function is sometimes also called `andThen` in other libraries.
   *
   * @param func The function to call with this [[OptionT]]'s inner value.
   * @param U The type of the value inside the returned [[OptionT]].
   * @returns A [[None]] if this [[OptionT]] is a [[None]]; otherwise passes this [[OptionT]]'s
   * inner value to `func` and returns the resulting [[OptionT]].
   */
  abstract flatMap<U>(func: (val: T) => OptionT<U>): OptionT<U>;

  /**
   * Compares two [[OptionT]] values. Returns `this` [[OptionT]] if it is a [[Some]] value;
   * otherwise returns the `other` [[OptionT]].
   *
   * ```
   * const one = OptionT.some(1);
   * const none = OptionT.none();
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
   * @param other Another [[OptionT]] to compare to `this` one.
   * @returns `this` if it is a [[Some]], otherwise returns `other`.
   */
  abstract or(other: OptionT<any>): OptionT<any>;

  /**
   * Returns `this` [[OptionT]] if it is a [[Some]]; otherwise calls `func` and returns the result.
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
   * #### Note: ####
   * The argument `func` will __not__ be evaluated unless this [[OptionT]] is a [[None]]. This
   * means [[orElse]] is ideal for cases when you need to fall back on a value that needs to be
   * computed (and may be expensive to compute).
   *
   * @param func A function returning an alternate [[OptionT]] if `this` one is a [[None]].
   * @returns `this` [[OptionT]] if it is a [[Some]], otherwise `func`'s return value is returned.
   */
  abstract orElse(func: () => OptionT<any>): OptionT<any>;

  /**
   * Calls the appropriate function in `options` and returns the result. If `this` [[OptionT]] is a
   * [[Some]], `options.some` is called with its inner value; otherwise `options.none` is called.
   *
   * ```
   * const one = OptionT.some(1);
   *
   * const doubled = one.match({
   *   some: (val) => val * 2, // double it
   *   none: () => 0,          // we'll pretend `None` implies a 0
   * });
   * // doubled === 2
   *
   * const two = OptionT.none();
   *
   * const tripled = two.match({
   *   some: (val) => val * 3, // tripple it
   *   none: () => 0,          // again, `None` implies a 0
   * });
   *
   * // tripled === 0
   * ```
   * #### Note: ####
   * See the [[OptMatch]] interface for more details on the structure allowed.
   *
   * @param options An object adhering to the [[OptMatch]] interface.
   * @param U The type of the return value in the case where `this` [[OptionT]] is a [[Some]].
   * @param V The type of the return value in the case where `this` [[OptionT]] is a [[None]].
   * @returns The return value from whichever function specified in `options` is called.
   */
  abstract match<U, V>(options: OptMatch<T, U, V>): U | V;

  /**
   * Filters an [[OptionT]] based on the given `condition` function.
   *
   * ```
   * const one = OptionT.some(1);
   *
   * const greaterThanZero = one.filter(x => x > 0);
   * // greaterThanZero.isSome() === true
   * // greaterThanZero.unwrap() === 1
   *
   * const lessThanZero = one.filter(x => x < 0);
   * // lessThanZero.isSome() === false
   * ```
   *
   * @param condition A function returning `true` or `false` based on `this` [[OptionT]]'s inner
   * value.
   * @returns `this` [[OptionT]] if it is a [[Some]] and if `condition` returns `true`, otherwise
   * returns a [[None]].
   */
  abstract filter(condition: (val: T) => boolean): OptionT<T>;

  /**
   * Calls `func` with the contained value if `this` [[OptionT]] is a [[Some]]; otherwise does
   * nothing.
   *
   * ```
   * let val = 0;
   *
   * const one = OptionT.some(1);
   * one.forEach(x => { val = x; });
   * // val === 1
   *
   * val = 0;
   *
   * const two = OptionT.none();
   * two.forEach(x => { val = x; });
   * // val === 0
   * ```
   * #### Note: ####
   * This function is intended for causing side-effects and therefore does not return anything. If
   * you need a return value, consider using [[match]] instead.
   *
   * @param func A function to call if `this` [[OptionT]] is a [[Some]]. `This` [[OptionT]]'s inner
   * value is passed to `func` if it is called.
   */
  abstract forEach(func: (val: any) => void): void;
}

/**
 * ## Some
 *
 * A type that represents the __presence__ of a value.
 *
 * This type is not intended to be used or instantiated directly. Instead, [[Some]] instances can
 * be created with [[OptionT.some]] and can then be manipulated with any method available on
 * [[OptionT]].
 *
 * Please see the [[OptionT]] documentation for more information.
 *
 * #### Note: ####
 * All [[Some]] methods are documented at the [[OptionT]] level.
 *
 * @param T The type of the value contained in this [[Some]] instance.
 */
class Some<T> extends OptionT<T> {
  /**
   * @hidden
   */
  private readonly value: T;

  /**
   * @hidden
   */
  private hasBeenInspected: boolean;

  /**
   * @hidden
   */
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
        'nullshield:unchecked_unwrap: Called unwrap without first checking if it was safe to do' +
          ' so. Please verify that the `OptionT` in question is a `Some` value before calling' +
          ' this function or use a safer function like `unwrapOr` which provides a default value' +
          ' in case this `OptionT` is a `None`.'
      );
    }
    return this.value;
  }

  forceUnwrap(message?: string): T {
    console.warn(
      'nullshield:force_unwrap_warning: Called forceUnwrap on a `Some` value.  This is not' +
        ' recommended usage.'
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
 * ## None
 *
 * A type that represents the __absence__ of a value.
 *
 * This type is not intended to be used or instantiated directly. Instead, [[None]] instances can
 * be created with [[OptionT.none]] and can then be manipulated with any method available on
 * [[OptionT]].
 *
 * Please see the [[OptionT]] documentation for more information.
 *
 * #### Note: ####
 * All [[None]] methods are documented at the [[OptionT]] level.
 */
class None extends OptionT<any> {
  /**
   * @hidden
   */
  private hasBeenInspected: boolean;

  /**
   * @hidden
   */
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
        'nullshield:unchecked_unwrap: Called unwrap without first checking if it was safe to do' +
          ' so. Please verify that the `OptionT` in question is a `Some` value before calling' +
          ' this function or use a safer function like `unwrapOr` which provides a default value' +
          ' in case this `OptionT` is a `None`.'
      );
    }
    if (typeof message !== 'undefined' && message !== null) {
      throw new Error(`nullshield:unwrap_on_none: ${message}`);
    }
    throw new Error('nullshield:unwrap_on_none: Called unwrap on a None value.');
  }

  forceUnwrap(message?: string): never {
    console.warn(
      'nullshield:force_unwrap_warning: Called forceUnwrap on a `None` value.  This is not' +
        ' recommended usage.'
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
