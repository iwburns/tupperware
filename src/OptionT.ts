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
   * // this won't throw, because it's a Some value.
   * const one = maybeOne.unwrap('could not unwrap a Some');
   *
   * // but:
   * const maybeTwo = OptionT.none();
   * // this will throw, because it's a None value.
   * const two = maybeTwo.unwrap('could not unwrap a Some');
   * ```
   *
   * @param {string} message
   * @returns {T}
   */
  abstract unwrap(message?: string): T;

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
  constructor(value: T) {
    super();
    this.value = value;
  }

  isSome(): boolean {
    return true;
  }

  isNone(): boolean {
    return false;
  }

  toString(): string {
    return `Some( ${this.value} )`;
  }

  unwrap(message?: string): T {
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
  constructor() {
    super();
  }

  isSome(): boolean {
    return false;
  }

  isNone(): boolean {
    return true;
  }

  toString(): string {
    return 'None()';
  }

  unwrap(message?: string): never {
    if (typeof message !== 'undefined' && message !== null) {
      throw new Error(message);
    }
    throw new Error('Called unwrap on a None value.');
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
