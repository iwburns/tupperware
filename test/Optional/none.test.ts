import { Optional } from '../../src/nullshield';
import { expectANone } from '../util';

describe('#Optional - None', () => {
  it('should have the function isSome', () => {
    const none = Optional.none();
    expectANone(none);

    expect(none.isSome()).toEqual(false);
  });

  it('should have the function isNone', () => {
    const none = Optional.none();
    expectANone(none);

    expect(none.isNone()).toEqual(true);
  });

  it('should have the function toString', () => {
    const none = Optional.none();
    expectANone(none);

    expect(none.toString()).toEqual('None()');
  });

  it('should have the function unwrap', () => {
    const none = Optional.none();

    expect(() => none.unwrap()).toThrow(
      'nullshield:unchecked_unwrap: Called unwrap without first checking if it was safe to do so. Please verify that' +
      ' the `Optional` in question is a `Some` value before calling this function or use a safer function like' +
      ' `unwrapOr` which provides a default value in case this `Optional` is a `None`.'
    );
    expect(() => none.unwrap('failed')).toThrow(
      'nullshield:unchecked_unwrap: Called unwrap without first checking if it was safe to do so. Please verify that' +
      ' the `Optional` in question is a `Some` value before calling this function or use a safer function like' +
      ' `unwrapOr` which provides a default value in case this `Optional` is a `None`.'
    );

    none.isSome(); // trigger internal inspection flag

    expect(() => none.unwrap()).toThrow('nullshield:unwrap_on_none: Called unwrap on a None value.');
    expect(() => none.unwrap('failed')).toThrow('nullshield:unwrap_on_none: failed');
  });

  it('should have the function forceUnwrap', () => {
    const none = Optional.none();
    expectANone(none);

    expect(() => none.forceUnwrap()).toThrow('nullshield:force_unwrap_on_none: Called forceUnwrap on a None value.');
    expect(() => none.forceUnwrap('failed')).toThrow('nullshield:force_unwrap_on_none: failed');
  });

  it('should have the function unwrapOr', () => {
    const none = Optional.none();

    expectANone(none);
    expect(none.unwrapOr(10)).toEqual(10);
  });

  it('should have the function unwrapOrElse', () => {
    const none = Optional.none();

    expectANone(none);
    expect(none.unwrapOrElse(() => 1)).toEqual(1);
  });

  it('should have the function map', () => {
    const none = Optional.none<number>();

    expectANone(none);

    const mapResult = none.map(x => x * 2);
    expect(mapResult.isNone()).toEqual(true);
  });

  it('should have the function and', () => {
    const none = Optional.none();

    expectANone(none);

    expect(none.and(Optional.some(1)).isNone()).toEqual(true);
    expect(none.and(Optional.none()).isNone()).toEqual(true);
  });

  it('should have the function or', () => {
    const none = Optional.none();

    expectANone(none);

    const orResult = none.or(Optional.some(1));
    expect(orResult.isSome()).toEqual(true);
    expect(orResult.unwrap()).toEqual(1);
    expect(none.or(Optional.none()).isNone()).toEqual(true);
  });

  it('should have the function flatMap', () => {
    const none = Optional.none();
    const nothing = () => Optional.none();
    const something = () => Optional.some(1);

    expectANone(none);

    expect(none.flatMap(nothing).isNone()).toEqual(true);
    expect(none.flatMap(something).isNone()).toEqual(true);
  });

  it('should have the function orElse', () => {
    const none = Optional.none();
    const nothing = () => Optional.none();
    const something = () => Optional.some(1);

    expectANone(none);

    expect(none.orElse(nothing).isNone()).toEqual(true);
    expect(none.orElse(something).isSome()).toEqual(true);
    const result = none.orElse(() => Optional.some('foobar'));
    expect(result.isSome()).toEqual(true);
    expect(result.unwrap()).toEqual('foobar');
  });

  it('should have the function match', () => {
    const none = Optional.none();

    expectANone(none);

    expect(none.match({
      some: () => 1,
      none: () => 0,
    })).toEqual(0);
  });

  it('should have the function filter', () => {
    const none = Optional.none();
    expectANone(none);

    const filtered = none.filter(x => x > 0);
    expectANone(filtered);
  });

  it('should have the function forEach', () => {
    const none = Optional.none();
    expectANone(none);

    let val = 0;

    none.forEach(x => val = x);
    expect(val).toEqual(0);
  });
});
