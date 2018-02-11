import 'mocha';
import { expect } from 'chai';
import OptionT from '../../src/OptionT';
import { expectASome, expectANone } from '../util';

describe('basic test', () => {
  it('should be able to create a some', () => {
    const maybe1 = OptionT.of(1);
    expectASome(maybe1);
    expect(maybe1.unwrapOr(2)).to.equal(1);
  });
  it('should be able to create a none', () => {
    const maybeNone = OptionT.of(null) as OptionT<any>;
    expectANone(maybeNone);
    expect(maybeNone.unwrapOr(2)).to.equal(2);
  });
});

describe('type test', () => {
  it('should be able to be used as a type', () => {

    const f = function (value : string): OptionT<string> {
      return OptionT.of(value);
    };

    const maybeString = f('test!');

    expectASome(maybeString);
    expect(maybeString.unwrap()).to.equal('test!');

  });
});

describe('#OptionT.some and #OptionT.none', () => {
  it('should be compatible with one another in terms of types', () => {
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

  it('should be of the same type when a some turns into a none', () => {
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

  it('none should throw an error if you provide it with a value', () => {
    expect(() => {
      OptionT.none('value');
    }).to.throw();
  });

  it('some should throw an error if you do not provide it with a value', () => {
    expect(() => {
      OptionT.some(null);
    }).to.throw();

    expect(() => {
      OptionT.some(undefined);
    }).to.throw();
  });
});

describe('#OptionT.of', () => {
  it('should choose the appropriate class based on the value', () => {

    expect(OptionT.of(null).isNone()).to.be.true;
    expect(OptionT.of(undefined).isNone()).to.be.true;
    expect(OptionT.of().isNone()).to.be.true;
    expect(OptionT.of('foo').isNone()).to.be.false;

    expect(OptionT.of(null).isSome()).to.be.false;
    expect(OptionT.of(undefined).isSome()).to.be.false;
    expect(OptionT.of().isSome()).to.be.false;
    expect(OptionT.of('foo').isSome()).to.be.true;



  });
});
