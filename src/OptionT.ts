/**
 * An interface describing the argument passed to   [[OptionT]]'s `match` function.
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

  static of<T>(value?: T): OptionT<T> {
    if (value === null || typeof value === 'undefined') {
      return new None();
    }
    return new Some(value);
  }

  static some<T>(value: T): OptionT<T> {
    if (value === null || typeof value === 'undefined') {
      throw Error('Cannot create a Some of a null or undefined value');
    }
    return new Some(value);
  }

  static none<T>(value?: T): OptionT<T> {
    if (value === null || typeof value === 'undefined') {
      return new None();
    }
    throw Error('Cannot create a None of a non-null or undefined value');
  }

  /**
   * Returns `true` if this   [[OptionT]] is a `Some`, returns false if it is a `None`.
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
   * Returns `true` if this   [[OptionT]] is a `None`, returns false if it is a `Some`.
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
   * Returns `None()` if this   [[OptionT]] is a `None`, returns `Some( val )` if it is a `Some`.
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
   * Returns the value contained by this   [[OptionT]] if it is a `Some`.  Throws an error
   * containing `message` if this   [[OptionT]] is a `None`.
   *
   * ```
   * const maybeOne = OptionT.some(1);
   * // this won't throw, because it's a Some value.
   * const one = maybeOne.expect('couldn't unwrap a Some');
   *
   * // but:
   * const maybeTwo = OptionT.none();
   * // this will throw, because it's a None value.
   * const two = maybeTwo.expect('can not unwrap a Some');
   * ```
   *
   * @param {string} message
   * @returns {T}
   */
  abstract expect(message: string): T;

  /**
   * Returns the value contained by this   [[OptionT]] if it is a `Some`.  Throws a pre-defined
   * error if this   [[OptionT]] is a `None`.
   *
   * ```
   * const maybeOne = OptionT.some(1);
   * // this won't throw, because it's a Some value.
   * const one = maybeOne.unwrap();
   *
   * // but:
   * const maybeTwo = OptionT.none();
   * // this will throw, because it's a None value.
   * const two = maybeTwo.unwrap();
   * ```
   *
   * @returns {T}
   */
  abstract unwrap(): T;

  /**
   * Returns the value contained by this   [[OptionT]] if it is a `Some`.  Returns `other` if
   * this   [[OptionT]] is a `None`.
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
   * Returns the value contained by this   [[OptionT]] if it is a `Some`.  Returns the return
   * value of `func` if this   [[OptionT]] is a `None`.
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
   * Maps an   [[OptionT]]&lt;T&gt; to an   [[OptionT]]&lt;U&gt; by applying `func` to the value
   * contained in this   [[OptionT]].
   *
   * If this   [[OptionT]] is a `Some` value, the returned value will be the return of `func`
   * wrapped in a new   [[OptionT]] (resulting in a `Some` value); otherwise the returned value
   * will be a new `None` value.
   *
   * ### Note:
   * If the return value of `func` is `null` or `undefined`, the   [[OptionT]] that is returned
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
   * Maps an   [[OptionT]]&lt;T&gt; to a U by applying `func` to the value contained in this
   *   [[OptionT]].
   *
   * If this   [[OptionT]] is a `Some` value, the returned value will be the return of `func`;
   * otherwise the returned value will be `other`.
   *
   * ```
   * const maybeOne = OptionT.some(1);
   * const maybeTwo = maybeOne.mapOr(3, x => x * 2);
   * // maybeTwo === 2
   *
   * const maybeThree = OptionT.none();
   * const maybeSix = maybeThree.mapOr(7, x => x * 2);
   * // maybeSix === 7
   * ```
   *
   * @param {U} other
   * @param {(val: T) => U} func
   * @returns {OptionT<U>}
   */
  abstract mapOr<U>(other: U, func: (val: T) => U): U;

  /**
   * Maps an   [[OptionT]]&lt;T&gt; to a U by applying `func` to the value contained in this
   *   [[OptionT]].
   *
   * If this   [[OptionT]] is a `Some` value, the returned value will be the return of `func`;
   * otherwise the returned value will be the value returned from `other`.
   *
   * ```
   * const maybeOne = OptionT.some(1);
   * const maybeTwo = maybeOne.mapOrElse(() => 3, x => x * 2);
   * // maybeTwo === 2
   *
   * const maybeThree = OptionT.none();
   * const maybeSix = maybeThree.mapOr(() => 7, x => x * 2);
   * // maybeSix === 7
   * ```
   *
   * @param {() => U} other
   * @param {(val: T) => U} func
   * @returns {U}
   */
  abstract mapOrElse<U>(other: () => U, func: (val: T) => U): U;

  /**
   * Returns a `None` value if this   [[OptionT]] is a `None`; otherwise returns `other`.
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
   * Returns a `None` value if this   [[OptionT]] is a `None`; otherwise calls `func` and returns
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
   * Returns 'this'   [[OptionT]] if it is a `Some` value; otherwise returns `other`.
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
   * Returns 'this'   [[OptionT]] if it is a `Some` value; otherwise calls `func` and returns the
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
   * If 'this'   [[OptionT]] is a `Some` value, `options.some` is called;
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
   * Returns a new   [[OptionT]] containing the same data as the current one.
   *
   * Note: does not perform any deep copying of the contained data.
   *
   * ```
   * const one = OptionT.some(1);
   *
   * const oneAgain = maybeOne.clone();
   * // one !== oneAgain
   * // one.unwrap() === oneAgain.unwrap()
   *
   * const foo = OptionT.some({
   *   bar: 'baz'
   * });
   *
   * const fooAgain = foo.clone();
   * // foo !== fooAgain
   * // foo.unwrap() === fooAgain.unwrap()
   * // because they're the same object
   *
   * const nope = OptionT.none();
   * const nada = nope.clone();
   * // nope !== nada
   * ```
   *
   * @returns {OptionT<T>}
   */
  abstract clone(): OptionT<T>;

  /**
   * Returns `this`   [[OptionT]] if it is a `Some` value and if `condition` returns `true`;
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
   * Calls `func` with the contained value if this   [[OptionT]] is a `Some` value;
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

  /**
   * Returns `true` if both   [[OptionT]]s are `None`s or (if they are both `Some`s) if they both
   * contain the same value;  otherwise returns `false`.
   *
   * Note: No deep comparison is done on the contained values.
   *
   * ```
   * const a = OptionT.some(1);
   * const b = OptionT.some(1);
   * // a.equals(b) === true
   *
   * const c = OptionT.none();
   * const d = OptionT.none();
   * // c.equals(d) === true
   *
   * const e = OptionT.some({ foo: 'bar' });
   * const f = OptionT.some({ foo: 'bar' });
   * // e.equals(f) === false
   * // because they're different objects
   * ```
   *
   * @param {OptionT<any>} other
   * @returns {boolean}
   */
  abstract equals(other: OptionT<any>): boolean;

  /**
   * Returns `true` if the   [[OptionT]] is a `Some` and contains the given value `val`, otherwise
   * returns `false`.
   *
   * Note: No deep comparison is done on the contained values.  If you need to do deep
   * comparisons against the contained value, consider using [[contains]] instead.
   *
   * ```
   * const one = OptionT.some(1);
   * // one.hasValue(1) === true
   *
   * const none = OptionT.none();
   * // none.hasValue(1) === false
   *
   * const obj = OptionT.some({ foo: 'bar' });
   * // obj.hasValue({ foo: 'bar' }) === false
   * // because they're different objects
   * ```
   *
   * @param {T} val
   * @returns {boolean}
   */
  abstract hasValue(val: any): boolean;

  /**
   * Returns `false` if the   [[OptionT]] is a `None`, otherwise calls `condition`
   * with the contained value and returns the result.
   *
   * ```
   * const one = OptionT.some(1);
   * // one.contains(x => x > 0) === true
   *
   * const obj = OptionT.some({ foo: 'bar' });
   * // obj.contains(x => x.foo === 'bar') === true
   *
   * const none = OptionT.none();
   * // none.contains(x => x.a === 'b') === false
   * ```
   *
   * @param {(val: T) => boolean} condition
   * @returns {boolean}
   */
  abstract contains(condition: (val: T) => boolean): boolean;
}

/**
 * A class representing the `None`-type variant of the `OptionT` type.
 *
 * Instances of this class contain no internal value.  They simply wrap the concept of 'nothing'
 * inside the same `OptionT` API defined by   [[OptionT]].
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

  expect(message: string): never {
    throw new Error(message);
  }

  unwrap(): never {
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

  mapOr<T, U>(other: U, func: (val: T) => U): U {
    return other;
  }

  mapOrElse<T, U>(other: () => U, func: (val: T) => U): U {
    return other();
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

  clone<T>(): OptionT<T> {
    return new None();
  }

  filter<T>(condition: (val: T) => boolean): OptionT<T> {
    return new None();
  }

  forEach(func: (val: any) => void): void {
    return;
  }

  equals<T>(other: OptionT<T>): boolean {
    return other.isNone();
  }

  hasValue(val: any): boolean {
    return false;
  }

  contains<T>(condition: (val: T) => boolean): boolean {
    return false;
  }
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

  expect(message: string): T {
    return this.value;
  }

  unwrap(): T {
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

  mapOr<U>(other: U, func: (val: T) => U): U {
    return func(this.value);
  }

  mapOrElse<U>(other: () => U, func: (val: T) => U): U {
    return func(this.value);
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

  clone(): OptionT<T> {
    return OptionT.of(this.value);
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

  equals(other: OptionT<T>): boolean {
    if (other.isNone()) {
      return false;
    }
    return this.value === other.unwrap();
  }

  hasValue(val: any): boolean {
    return this.value === val;
  }

  contains(condition: (val: T) => boolean): boolean {
    return condition(this.value);
  }
}
