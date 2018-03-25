import { OptionT } from '../../src/nullshield';
import { expectASome, expectANone } from '../util';

describe('#OptionT.of', () => {
  it('should choose the appropriate class based on the value', () => {
    expect(OptionT.of(null).isNone()).toEqual(true);
    expect(OptionT.of(undefined).isNone()).toEqual(true);
    expect(OptionT.of().isNone()).toEqual(true);
    expect(OptionT.of('foo').isNone()).toEqual(false);

    expect(OptionT.of(null).isSome()).toEqual(false);
    expect(OptionT.of(undefined).isSome()).toEqual(false);
    expect(OptionT.of().isSome()).toEqual(false);
    expect(OptionT.of('foo').isSome()).toEqual(true);
  });

  it('should be able to create a some', () => {
    const maybe1 = OptionT.of(1);
    expectASome(maybe1);
    expect(maybe1.unwrapOr(2)).toEqual(1);
  });

  it('should be able to create a none', () => {
    const maybeNone = OptionT.of(null) as OptionT<any>;
    expectANone(maybeNone);
    expect(maybeNone.unwrapOr(2)).toEqual(2);
  });
});

describe('#OptionT.some', () => {
  it('should create a Some', () => {
    const option = OptionT.some(1);
    expectASome(option);
  });

  it('should throw an error when given null or undefined', () => {
    expect(() => {
      OptionT.some(null);
    }).toThrow();

    expect(() => {
      OptionT.some(undefined);
    }).toThrow();
  });
});

describe('#OptionT.none', () => {
  it('should create a None', () => {
    const option = OptionT.none();
    expectANone(option);
  });

  it('should throw an error if you provide it with a value', () => {
    expect(() => {
      OptionT.none('value');
    }).toThrow();
  });
});

describe('#OptionT', () => {
  it('should be able to be used as a type', () => {
    const f = function (value : string): OptionT<string> {
      return OptionT.of(value);
    };

    const maybeString = f('test!');

    expectASome(maybeString);
    expect(maybeString.unwrap()).toEqual('test!');
  });

  it('Some and None should be compatible with one another', () => {
    const one = OptionT.some(1);
    const nope = OptionT.none();

    expectASome(one);
    expectANone(nope);

    function processOpt<T>(opt: OptionT<T>): OptionT<T> {
      return opt;
    }

    const oneAgain = processOpt(one);
    const nopeAgain = processOpt(nope);

    expectASome(oneAgain);
    expectANone(nopeAgain);
  });

  it('should be of the same type when a Some turns into a None', () => {
    const one = OptionT.of(undefined);
    const two = OptionT.of(null);
    const nope = OptionT.none();

    expectANone(one);
    expectANone(two);
    expectANone(nope);

    function processOpt<T>(opt: OptionT<T>) : OptionT<T> {
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
