import { getSome } from './option/some';
import { getNone } from './option/none';

/**
 * An interface describing the argument passed to [[OptT]]'s `match` function.
 */
export interface OptMatch<T, U, V> {
  some: (val: T) => U;
  none: () => V;
}

/**
 * An interface describing the `OptionT` type.
 *
 * Items of this type can either be a `Some` value (with something of
 * type `T` in them), or a `None` value (with nothing in them).
 */
export interface OptT<T> {
  /**
   * Returns `true` if this [[OptT]] is a `Some`, returns false if it is a `None`.
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
  isSome(): boolean;

  /**
   * Returns `true` if this [[OptT]] is a `None`, returns false if it is a `Some`.
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
  isNone(): boolean;

  /**
   * Returns `None()` if this [[OptT]] is a `None`, returns `Some( val )` if it is a `Some`.
   *
   * ```
   * OptionT.some(1).toString() //Some(1)
   * OptionT.none().toString() //None()
   * ```
   *
   * @returns {boolean}
   */
  toString(): string;

  /**
   * Returns the value contained by this [[OptT]] if it is a `Some`.  Throws an error
   * containing `message` if this [[OptT]] is a `None`.
   *
   * ```
   * const maybeOne = OptionT.some(1);
   * // this won't throw, because it's a Some value.
   * const one = maybeOne.expect("couldn't unwrap a Some");
   *
   * // but:
   * const maybeTwo = OptionT.none();
   * // this will throw, because it's a None value.
   * const two = maybeTwo.expect("couldn't unwrap a Some");
   * ```
   *
   * @param {string} message
   * @returns {T}
   */
  expect(message: string): T;

  /**
   * Returns the value contained by this [[OptT]] if it is a `Some`.  Throws a pre-defined
   * error if this [[OptT]] is a `None`.
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
  unwrap(): T;

  /**
   * Returns the value contained by this [[OptT]] if it is a `Some`.  Returns `other` if
   * this [[OptT]] is a `None`.
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
  unwrapOr(other: T): T;

  /**
   * Returns the value contained by this [[OptT]] if it is a `Some`.  Returns the return
   * value of `func` if this [[OptT]] is a `None`.
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
  unwrapOrElse(func: () => T): T;

  /**
   * Maps an [[OptT]]&lt;T&gt; to an [[OptT]]&lt;U&gt; by applying `func` to the value
   * contained in this [[OptT]].
   *
   * If this [[OptT]] is a `Some` value, the returned value will be the return of `func`
   * wrapped in a new [[OptT]] (resulting in a `Some` value); otherwise the returned value
   * will be a new `None` value.
   *
   * ### Note:
   * If the return value of `func` is `null` or `undefined`, the [[OptT]] that is returned
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
   * @returns {OptT<U>}
   */
  map<U>(func: (val: T) => U): OptT<U>;

  /**
   * Returns a `None` value if this [[OptT]] is a `None`; otherwise returns `other`.
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
   * @param {OptT<U>} other
   * @returns {OptT<U>}
   */
  and<U>(other: OptT<U>): OptT<U>;

  /**
   * Returns a `None` value if this [[OptT]] is a `None`; otherwise calls `func` and returns
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
   * @param {(val: T) => OptT<U>} func
   * @returns {OptT<U>}
   */
  flatMap<U>(func: (val: T) => OptT<U>): OptT<U>;

  /**
   * Returns "this" [[OptT]] if it is a `Some` value; otherwise returns `other`.
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
   * @param {OptT<any>} other
   * @returns {OptT<any>}
   */
  or(other: OptT<any>): OptT<any>;

  /**
   * Returns "this" [[OptT]] if it is a `Some` value; otherwise calls `func` and returns the
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
   * @param {() => OptT<any>} func
   * @returns {OptT<any>}
   */
  orElse(func: () => OptT<any>): OptT<any>;

  /**
   * Calls the appropriate function in `options` and returns the result.
   *
   * If "this" [[OptT]] if it is a `Some` value, `options.some` is called;
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
  match<U, V>(options: OptMatch<T, U, V>): U | V;
}

/**
 * Wrapper for `some` and `none` functions.
 */
export namespace OptionT {
  /**
   * Returns a `None` value if `val` is `null` or `undefined`, otherwise returns a `Some`
   * value containing `val`.
   *
   * @param {T} val
   * @returns {OptT<any>}
   */
  export function some<T>(val: T) {
    return getSome(val);
  }

  /**
   * Returns a `None` value.
   *
   * @returns {OptT<any>}
   */
  export function none() {
    return getNone();
  }
}
