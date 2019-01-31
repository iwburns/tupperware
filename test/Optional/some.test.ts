import { Optional } from '../../src/tupperware';

describe('#Optional - Some', () => {
  it('should have the function isSome', () => {
    const one = Optional.some(1);
    expect(one.isSome()).toEqual(true);
  });

  it('should have the function isNone', () => {
    const one = Optional.some(1);
    expect(one.isNone()).toEqual(false);
  });

  it('should have the function toString', () => {
    const one = Optional.some(1);
    expect(one.toString()).toEqual('Some( 1 )');
  });

  it('should have the function unwrap', () => {
    const one = Optional.some(1);

    expect(() => one.unwrap()).toThrow(
      'tupperware:unchecked_unwrap: Called unwrap without first checking if it was safe to do so. Please verify that' +
      ' the `Optional` in question is a `Some` value before calling this function or use a safer function like' +
      ' `unwrapOr` which provides a default value in case this `Optional` is a `None`.'
    );
    expect(() => one.unwrap('failed')).toThrow(
      'tupperware:unchecked_unwrap: Called unwrap without first checking if it was safe to do so. Please verify that' +
      ' the `Optional` in question is a `Some` value before calling this function or use a safer function like' +
      ' `unwrapOr` which provides a default value in case this `Optional` is a `None`.'
    );

    one.isSome(); // trigger internal inspection flag

    expect(one.unwrap()).toEqual(1);
    expect(one.unwrap('failed')).toEqual(1);
  });

  it('should have the function forceUnwrap', () => {
    const one = Optional.some(1);
    expect(one.forceUnwrap()).toEqual(1);
    expect(one.forceUnwrap('failed')).toEqual(1);
  });

  it('should have the function unwrapOr', () => {
    const one = Optional.some(1);
    expect(one.unwrapOr(10)).toEqual(1);
    expect(one.unwrapOr(() => 10)).toEqual(1);
  });

  it('should have the function unwrapOrElse', () => {
    const one = Optional.some(1);
    expect(one.unwrapOrElse(() => 2)).toEqual(1);
  });

  it('should have the function map', () => {
    const one = Optional.some(1);

    const two = one.map(() => 2);
    expect(two.isSome()).toEqual(true);
    expect(two.unwrap()).toEqual(2);

    const three = one.map(() => null);
    expect(three.isSome()).toEqual(true);
    expect(three.unwrap()).toEqual(null);

    const four = one.map(() => {return;});
    expect(four.isSome()).toEqual(true);
    expect(four.unwrap()).toEqual(undefined);
  });

  it('should have the function and', () => {
    const one = Optional.some(1);
    const two = Optional.some(2);

    const maybeTwo = one.and(two);
    expect(maybeTwo.isSome()).toEqual(true);
    expect(maybeTwo.unwrap()).toEqual(2);

    const none = Optional.none();
    const maybeThree = one.and(none);
    expect(maybeThree.isSome()).toEqual(false);
  });

  it('should have the function flatMap', () => {
    const one = Optional.some(1);

    const maybeTwo = one.flatMap(val => Optional.some(val * 2));
    expect(maybeTwo.isSome()).toEqual(true);
    expect(maybeTwo.unwrap()).toEqual(2);

    const maybeThree = one.flatMap(() => Optional.none());
    expect(maybeThree.isSome()).toEqual(false);
  });

  it('should have the function or', () => {
    const one = Optional.some(1);
    const two = Optional.some(2);

    const maybeOne = one.or(two);
    expect(maybeOne.isSome()).toEqual(true);
    expect(maybeOne.unwrap()).toEqual(1);

    const three = Optional.none();

    const maybeOneAgain = one.or(three);
    expect(maybeOneAgain.isSome()).toEqual(true);
    expect(maybeOneAgain.unwrap()).toEqual(1);
  });

  it('should have the function orElse', () => {
    const one = Optional.some(1);

    const maybeOne = one.orElse(() => Optional.some(2));
    expect(maybeOne.isSome()).toEqual(true);
    expect(maybeOne.unwrap()).toEqual(1);

    const maybeOneAgain = one.orElse(() => Optional.none());
    expect(maybeOneAgain.isSome()).toEqual(true);
    expect(maybeOneAgain.unwrap()).toEqual(1);
  });

  it('should have the function ap', () => {
    const makeDivider = (x: number): Optional<(val: number) => number> => {
      if (x === 0) {
         return Optional.none();
      }
      const divider = (y: number) => y / x;
      return Optional.some(divider);
    };

    const div2 = makeDivider(2);
    const div0 = makeDivider(0);

    const two = Optional.some(2);

    const one = two.ap(div2);
    expect(one.isSome()).toEqual(true);
    expect(one.unwrap()).toEqual(1);

    const three = two.ap(div0);
    expect(three.isSome()).toEqual(false);
  });

  it('should have the function match', () => {
    const one = Optional.some(1);

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

    const filtered = one.filter(x => x > 0);

    expect(filtered.isSome()).toEqual(true);
    expect(filtered.unwrap()).toEqual(1);
    expect(filtered).toBe(one); // they should be the same object

    const filteredAgain = one.filter(x => x < 0);
    expect(filteredAgain.isSome()).toEqual(false);
  });

  it('should have the function forEach', () => {
    const one = Optional.some(1);
    let val = 0;

    one.forEach(x => val = x);
    expect(val).toEqual(1);
  });

  it('should have the function withSome', () => {
    const one = Optional.some(1);
    let val = 0;

    one.withSome(x => val = x);
    expect(val).toEqual(1);
  });

  it('should have the function withNone', () => {
    const none = Optional.some(1);
    let val = 0;

    none.withNone(() => { val = 42; });
    expect(val).toEqual(0);
  });

  it('should have the function toArray', () => {
    const one = Optional.some(2);

    const data = one.toArray();
    expect(data.length).toEqual(1);
    expect(data[0]).toEqual(2);
  });
});
