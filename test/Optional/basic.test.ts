import { Optional } from '../../src/nullshield';
import { expectASome, expectANone } from '../util';

describe('#Optional.of', () => {
  it('should choose the appropriate class based on the value', () => {
    expect(Optional.of(null).isNone()).toEqual(true);
    expect(Optional.of(undefined).isNone()).toEqual(true);
    expect(Optional.of().isNone()).toEqual(true);
    expect(Optional.of('foo').isNone()).toEqual(false);

    expect(Optional.of(null).isSome()).toEqual(false);
    expect(Optional.of(undefined).isSome()).toEqual(false);
    expect(Optional.of().isSome()).toEqual(false);
    expect(Optional.of('foo').isSome()).toEqual(true);
  });

  it('should be able to create a some', () => {
    const maybe1 = Optional.of(1);
    expectASome(maybe1);
    expect(maybe1.unwrapOr(2)).toEqual(1);
  });

  it('should be able to create a none', () => {
    const maybeNone = Optional.of(null) as Optional<any>;
    expectANone(maybeNone);
    expect(maybeNone.unwrapOr(2)).toEqual(2);
  });
});

describe('#Optional.some', () => {
  it('should create a Some', () => {
    const option = Optional.some(1);
    expectASome(option);
  });

  it('should throw an error when given null or undefined', () => {
    expect(() => {
      Optional.some(null);
    }).toThrow();

    expect(() => {
      Optional.some(undefined);
    }).toThrow();
  });
});

describe('#Optional.none', () => {
  it('should create a None', () => {
    const option = Optional.none();
    expectANone(option);
  });

  it('should throw an error if you provide it with a value', () => {
    expect(() => {
      Optional.none('value');
    }).toThrow();
  });
});

describe('#Optional', () => {
  it('should be able to be used as a type', () => {
    const f = function (value : string): Optional<string> {
      return Optional.of(value);
    };

    const maybeString = f('test!');

    expectASome(maybeString);
    expect(maybeString.unwrap()).toEqual('test!');
  });

  it('Some and None should be compatible with one another', () => {
    const one = Optional.some(1);
    const nope = Optional.none();

    expectASome(one);
    expectANone(nope);

    function processOpt<T>(opt: Optional<T>): Optional<T> {
      return opt;
    }

    const oneAgain = processOpt(one);
    const nopeAgain = processOpt(nope);

    expectASome(oneAgain);
    expectANone(nopeAgain);
  });

  it('should be of the same type when a Some turns into a None', () => {
    const one = Optional.of(undefined);
    const two = Optional.of(null);
    const nope = Optional.none();

    expectANone(one);
    expectANone(two);
    expectANone(nope);

    function processOpt<T>(opt: Optional<T>) : Optional<T> {
      return opt;
    }

    const oneAgain = processOpt(one);
    const twoAgain = processOpt(two);
    const nopeAgain = processOpt(nope);

    expectANone(oneAgain);
    expectANone(twoAgain);
    expectANone(nopeAgain);
  });
});
