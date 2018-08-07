import { Optional } from '../../src/nullshield';
import { expectASome, expectANone } from '../util';

describe('#Optional - Some', () => {
  it('should have the function isSome', () => {
    const one = Optional.some(1);

    expectASome(one);
    expect(one.isSome()).toEqual(true);
  });

  it('should have the function isNone', () => {
    const one = Optional.some(1);

    expectASome(one);
    expect(one.isNone()).toEqual(false);
  });

  it('should have the function toString', () => {
    const one = Optional.some(1);

    expectASome(one);

    expect(one.toString()).toEqual('Some( 1 )');
  });

  it('should have the function unwrap', () => {
    const one = Optional.some(1);

    expect(() => one.unwrap()).toThrow(
      'nullshield:unchecked_unwrap: Called unwrap without first checking if it was safe to do so. Please verify that' +
      ' the `Optional` in question is a `Some` value before calling this function or use a safer function like' +
      ' `unwrapOr` which provides a default value in case this `Optional` is a `None`.'
    );
    expect(() => one.unwrap('failed')).toThrow(
      'nullshield:unchecked_unwrap: Called unwrap without first checking if it was safe to do so. Please verify that' +
      ' the `Optional` in question is a `Some` value before calling this function or use a safer function like' +
      ' `unwrapOr` which provides a default value in case this `Optional` is a `None`.'
    );

    one.isSome(); // trigger internal inspection flag

    expect(one.unwrap()).toEqual(1);
    expect(one.unwrap('failed')).toEqual(1);
  });

  it('should have the function forceUnwrap', () => {
    const one = Optional.some(1);
    expectASome(one);

    expect(one.forceUnwrap()).toEqual(1);
    expect(one.forceUnwrap('failed')).toEqual(1);
  });

  it('should have the function unwrapOr', () => {
    const one = Optional.some(1);

    expectASome(one);
    expect(one.unwrapOr(10)).toEqual(1);
  });

  it('should have the function unwrapOrElse', () => {
    const one = Optional.some(1);

    expectASome(one);
    expect(one.unwrapOrElse(() => 2)).toEqual(1);
  });

  it('should have the function map', () => {
    const one = Optional.some(1);

    expectASome(one);

    const two = one.map(() => 2);

    expectASome(two);
    expect(two.isSome()).toEqual(true);
    expect(two.unwrap()).toEqual(2);

    const three = one.map(() => null);

    expectANone(three);
    expect(three.isSome()).toEqual(false);

    const four = one.map(() => {return;});

    expectANone(four);
    expect(four.isSome()).toEqual(false);
  });

  it('should have the function and', () => {
    const one = Optional.some(1);

    expectASome(one);

    const two = Optional.some(2);
    const maybeTwo = one.and(two);

    expectASome(two);
    expect(maybeTwo.isSome()).toEqual(true);
    expect(maybeTwo.unwrap()).toEqual(2);

    const none = Optional.none();
    const maybeThree = one.and(none);

    expectANone(maybeThree);
    expect(maybeThree.isSome()).toEqual(false);
  });

  it('should have the function flatMap', () => {
    const one = Optional.some(1);

    expectASome(one);

    const maybeTwo = one.flatMap((val) => {
      return Optional.some(val * 2);
    });

    expectASome(maybeTwo);
    expect(maybeTwo.isSome()).toEqual(true);
    expect(maybeTwo.unwrap()).toEqual(2);

    const maybeThree = one.flatMap(() => {
      return Optional.none();
    });

    expectANone(maybeThree);
    expect(maybeThree.isSome()).toEqual(false);
  });

  it('should have the function or', () => {
    const one = Optional.some(1);

    expectASome(one);

    const two = Optional.some(2);
    const maybeOne = one.or(two);

    expectASome(maybeOne);
    expect(maybeOne.isSome()).toEqual(true);
    expect(maybeOne.unwrap()).toEqual(1);

    const three = Optional.none();
    const maybeOneAgain = one.or(three);

    expectASome(maybeOneAgain);
    expect(maybeOneAgain.isSome()).toEqual(true);
    expect(maybeOneAgain.unwrap()).toEqual(1);
  });

  it('should have the function orElse', () => {
    const one = Optional.some(1);

    expectASome(one);

    const maybeOne = one.orElse(() => Optional.some(2));

    expectASome(maybeOne);
    expect(maybeOne.isSome()).toEqual(true);
    expect(maybeOne.unwrap()).toEqual(1);

    const maybeOneAgain = one.orElse(() => Optional.none());

    expectASome(maybeOneAgain);
    expect(maybeOneAgain.isSome()).toEqual(true);
    expect(maybeOneAgain.unwrap()).toEqual(1);
  });

  it('should have the function match', () => {
    const one = Optional.some(1);

    expectASome(one);

    const doubled = one.match({
      some: val => val * 2,
      none: () => 0,
    });

    expect(doubled).toEqual(2);

    let three = 0;
    one.match({
      some: () => three = 3,
      // tslint:disable-next-line:no-empty
      none: () => {},
    });

    expect(three).toEqual(3);
  });

  it('should have the function filter', () => {
    const one = Optional.some(1);
    expectASome(one);

    const filtered = one.filter(x => x > 0);
    expectASome(filtered);

    expect(filtered.unwrap()).toEqual(1);
    expect(filtered).toBe(one); // they should be the same object

    const filteredAgain = one.filter(x => x < 0);
    expectANone(filteredAgain);
  });

  it('should have the function forEach', () => {
    const one = Optional.some(1);
    expectASome(one);

    let val = 0;

    one.forEach(x => val = x);
    expect(val).toEqual(1);
  });
});
