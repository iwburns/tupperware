import 'mocha';
import { OptionT } from '../../src/index';
import { expect } from 'chai';
import { expectASome, expectANone } from './util';

describe('#OptionT', () => {
  it('should be an object with some', () => {
    expect(OptionT)
      .to.be.a('object')
      .that.has.property('some');

    expect(OptionT.some).to.be.a('function');
  });
});

describe('#OptionT.some', () => {
  it('should have the function isSome', () => {
    const one = OptionT.some(1);

    expectASome(one);
    expect(one.isSome()).to.be.true;
  });

  it('should have the function isNone', () => {
    const one = OptionT.some(1);

    expectASome(one);
    expect(one.isNone()).to.be.false;
  });

  it('should have the function expect', () => {
    const one = OptionT.some(1);

    expectASome(one);
    expect(one.expect('it failed')).to.equal(1);
  });

  it('should have the function unwrap', () => {
    const one = OptionT.some(1);

    expectASome(one);
    expect(one.unwrap()).to.equal(1);
  });

  it('should have the function unwrapOr', () => {
    const one = OptionT.some(1);

    expectASome(one);
    expect(one.unwrapOr(10)).to.equal(1);
  });

  it('should have the function unwrapOrElse', () => {
    const one = OptionT.some(1);

    expectASome(one);
    expect(one.unwrapOrElse(() => 2)).to.equal(1);
  });

  it('should have the function map', () => {
    const one = OptionT.some(1);

    expectASome(one);

    const two = one.map((val) => 2);

    expectASome(two);
    expect(two.isSome()).to.equal(true);
    expect(two.unwrap()).to.equal(2);

    const three = one.map(() => null);

    expectANone(three);
    expect(three.isSome()).to.equal(false);

    const four = one.map(() => {return;});

    expectANone(four);
    expect(four.isSome()).to.equal(false);
  });

  it('should have the function and', () => {
    const one = OptionT.some(1);

    expectASome(one);

    const two = OptionT.some(2);
    const maybeTwo = one.and(two);

    expectASome(two);
    expect(maybeTwo.isSome()).to.equal(true);
    expect(maybeTwo.unwrap()).to.equal(2);

    const none = OptionT.none();
    const maybeThree = one.and(none);

    expectANone(maybeThree);
    expect(maybeThree.isSome()).to.equal(false);
  });

  it('should have the function flatMap', () => {
    const one = OptionT.some(1);

    expectASome(one);
    expect(one.flatMap).to.be.a('function');

    const maybeTwo = one.flatMap((val) => {
      return OptionT.some(val * 2);
    });

    expectASome(maybeTwo);
    expect(maybeTwo.isSome()).to.equal(true);
    expect(maybeTwo.unwrap()).to.equal(2);

    const maybeThree = one.flatMap(() => {
      return OptionT.none();
    });

    expectANone(maybeThree);
    expect(maybeThree.isSome()).to.equal(false);
  });

  it('should have the function or', () => {
    const one = OptionT.some(1);

    expectASome(one);

    const two = OptionT.some(2);
    const maybeOne = one.or(two);

    expectASome(maybeOne);
    expect(maybeOne.isSome()).to.equal(true);
    expect(maybeOne.unwrap()).to.equal(1);

    const three = OptionT.none();
    const maybeOneAgain = one.or(three);

    expectASome(maybeOneAgain);
    expect(maybeOneAgain.isSome()).to.equal(true);
    expect(maybeOneAgain.unwrap()).to.equal(1);
  });

  it('should have the function orElse', () => {
    const one = OptionT.some(1);

    expectASome(one);

    const maybeOne = one.orElse(() => OptionT.some(2));

    expectASome(maybeOne);
    expect(maybeOne.isSome()).to.equal(true);
    expect(maybeOne.unwrap()).to.equal(1);

    const maybeOneAgain = one.orElse(() => OptionT.none());

    expectASome(maybeOneAgain);
    expect(maybeOneAgain.isSome()).to.equal(true);
    expect(maybeOneAgain.unwrap()).to.equal(1);
  });

  it('should have the function match', () => {
    const one = OptionT.some(1);

    expectASome(one);

    const doubled = one.match({
      some: (val) => val * 2,
      none: () => 0,
    });

    expect(doubled).to.be.a('number');
    expect(doubled).to.equal(2);

    let three = 0;
    one.match({
      some: () => three = 3,
      none: () => {},
    });

    expect(three).to.equal(3);
  });
});
