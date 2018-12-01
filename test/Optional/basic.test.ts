import { Optional } from '../../src/tupperware';
import { expectASome, expectANone } from '../util';

describe('#Optional.of', () => {
  it('should create a Some from a "normal" value', () => {
    const optional = Optional.of(1);
    expectASome(optional);
  });

  it('should create a Some from a "null" value', () => {
    const optional = Optional.of(null);
    expectASome(optional);
  });
});

describe('#Optional.some', () => {
  it('should create a Some from a "normal" value', () => {
    const optional = Optional.some(1);
    expectASome(optional);
  });

  it('should create a Some from a "null" value', () => {
    const optional = Optional.some(null);
    expectASome(optional);
  });
});

describe('#Optional.none', () => {
  it('should create a None', () => {
    const optional = Optional.none();
    expectANone(optional);
  });

  it('should create a None even if you give it a value', () => {
    const optional = Optional.none();
    expectANone(optional);
  });
});

describe('#Optiona.fromNullable', () => {
  it('should create a Some from a "normal" value', () => {
    const optional = Optional.fromNullable(1);
    expectASome(optional);
  });

  it('should create a None from a "null" value"', () => {
    const optional = Optional.fromNullable(null);
    expectANone(optional);
  });

  it('should create a None from a "undefined" value"', () => {
    const optional = Optional.fromNullable();
    expectANone(optional);
  });
});

describe('#Optional', () => {
  it('should be able to be used as a type', () => {
    const f = (value: string): Optional<string> => {
      return Optional.some(value);
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

    const processOpt = <T>(opt: Optional<T>): Optional<T> => {
      return opt;
    };

    const oneAgain = processOpt(one);
    const nopeAgain = processOpt(nope);

    expectASome(oneAgain);
    expectANone(nopeAgain);
  });
});
