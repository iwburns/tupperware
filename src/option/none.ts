import { OptT, OptMatch } from '../option';

/**
 * A class representing the `None`-type variant of the `OptionT` type.
 *
 * Instances of this class contain no internal value.  They simply wrap the concept of "nothing"
 * inside the same `OptionT` API defined by [[OptT]].
 */
export class NoneT<T> implements OptT<T> {
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

  unwrapOr(other: T): T {
    return other;
  }

  unwrapOrElse(func: () => T): T {
    return func();
  }

  map<U>(func: (val: T) => U): OptT<U> {
    return <OptT<U>>getNone();
  }

  mapOr<U>(other: U, func: (val: T) => U): U {
    return other;
  }

  mapOrElse<U>(other: () => U, func: (val: T) => U): U {
    return other();
  }

  and<U>(other: OptT<U>): OptT<U> {
    return <OptT<U>>getNone();
  }

  flatMap<U>(func: (val: T) => OptT<U>): OptT<U> {
    return <OptT<U>>getNone();
  }

  or(other: OptT<T>): OptT<T> {
    return <OptT<T>>other;
  }

  orElse(func: () => OptT<T>): OptT<T> {
    return <OptT<T>>func();
  }

  match<U, V>(options: OptMatch<T, U, V>): V | U {
    return options.none();
  }

  clone(): OptT<T> {
    return getNone();
  }

  filter(condition: (val: T) => boolean): OptT<T> {
    return getNone();
  }

  forEach(func: (val: any) => void): void {
    return;
  }

  equals(other: OptT<T>): boolean {
    return other.isNone();
  }

  hasValue(val: T): boolean {
    return false;
  }
}

/**
 * Returns a [[NoneT]] instance.
 *
 * @returns {OptT<T>}
 */
export function getNone<T>(): OptT<T> {
  return new NoneT();
}
