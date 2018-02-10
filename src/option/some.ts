import { OptT, OptMatch } from '../option';
import { getNone, NoneT } from './none';

/**
 * A class representing the `Some`-type variant of the `OptionT` type.
 *
 * Instances of this class contain an internal value that is guaranteed to be `!== null` and
 * `!== undefined`.
 *
 * This class wraps its internal value in the same `OptionT` API defined by [[OptT]].
 */
export class SomeT<T> implements OptT<T> {
  private value: T;

  constructor(val: T) {
    this.value = val;
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

  map<U>(func: (val: T) => U): OptT<U> {
    return getSome(func(this.value));
  }

  mapOr<U>(other: U, func: (val: T) => U): U {
    return func(this.value);
  }

  mapOrElse<U>(other: () => U, func: (val: T) => U): U {
    return func(this.value);
  }

  and<U>(other: OptT<U>): OptT<U> {
    return other;
  }

  flatMap<U>(func: (val: T) => OptT<U>): OptT<U> {
    return func(this.value);
  }

  or(other: OptT<T>): OptT<T> {
    return this;
  }

  orElse(func: () => OptT<T>): OptT<T> {
    return this;
  }

  match<U, V>(options: OptMatch<T, U, V>): U | V {
    return options.some(this.value);
  }

  clone(): OptT<T> {
    return getSome(this.value);
  }

  filter(condition: (val: T) => boolean): OptT<T> {
    if (condition(this.value)) {
      return this;
    }
    return getNone();
  }

  forEach(func: (val: any) => void): void {
    func(this.value);
  }

  equals(other: OptT<T>): boolean {
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

/**
 * Returns a [[NoneT]] instance if `val` is `null` or `undefined`, otherwise returns a [[SomeT]]
 * containing `val`.
 *
 * @param {T} val The value with which to create the [[NoneT]] or [[SomeT]].
 * @returns {OptT<any>}
 */
export function getSome<T>(val: T): OptT<any> {
  if (val === null || typeof val === 'undefined') {
    return new NoneT();
  }
  return new SomeT(val);
}
