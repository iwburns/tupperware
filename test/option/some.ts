import 'mocha';
import { OptionT } from '../../src/index';
import { expect } from 'chai';

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

    expect(one)
      .to.be.a('object')
      .that.has.property('isSome');

    expect(one.isSome).to.be.a('function');
    expect(one.isSome()).to.be.true;
  });

  it('should have the function isNone', () => {
    const one = OptionT.some(1);

    expect(one)
      .to.be.a('object')
      .that.has.property('isNone');

    expect(one.isNone).to.be.a('function');
    expect(one.isNone()).to.be.false;
  });

  it('should have the function expect', () => {
    const one = OptionT.some(1);

    expect(one)
      .to.be.a('object')
      .that.has.property('expect');

    expect(one.expect).to.be.a('function');
    expect(one.expect('it failed')).to.equal(1);
  });

  it('should have the function unwrap', () => {
    const one = OptionT.some(1);

    expect(one)
      .to.be.a('object')
      .that.has.property('unwrap');

    expect(one.unwrap).to.be.a('function');
    expect(one.unwrap()).to.equal(1);
  });

  it('should have the function unwrapOr', () => {
    const one = OptionT.some(1);

    expect(one)
      .to.be.a('object')
      .that.has.property('unwrapOr');

    expect(one.unwrapOr).to.be.a('function');
    expect(one.unwrapOr(10)).to.equal(1);
  });

  it('should have the function unwrapOrElse', () => {
    const one = OptionT.some(1);

    expect(one)
      .to.be.a('object')
      .that.has.property('unwrapOrElse');

    expect(one.unwrapOrElse).to.be.a('function');
    expect(one.unwrapOrElse(() => 2)).to.equal(1);
  });

  it('should have the function map', () => {
    const one = OptionT.some(1);

    expect(one)
      .to.be.a('object')
      .that.has.property('map');
    expect(one.map).to.be.a('function');

    const two = one.map((val) => 2);

    expect(two)
      .to.be.a('object')
      .that.has.property('isSome');
    expect(two.isSome).to.be.a('function');
    expect(two.isSome()).to.equal(true);

    expect(two).to.have.property('unwrap');
    expect(two.unwrap).to.be.a('function');
    expect(two.unwrap()).to.equal(2);
  });

  it('should have the function and', () => {
    const one = OptionT.some(1);

    expect(one)
      .to.be.a('object')
      .that.has.property('and');
    expect(one.and).to.be.a('function');

    const two = OptionT.some(2);

    const maybeTwo = one.and(two);

    expect(maybeTwo)
      .to.be.a('object')
      .that.has.property('isSome');

    expect(maybeTwo.isSome).to.be.a('function');
    expect(maybeTwo.isSome()).to.equal(true);

    expect(maybeTwo).to.have.property('unwrap');
    expect(maybeTwo.unwrap).to.be.a('function');
    expect(maybeTwo.unwrap()).to.equal(2);
  });

});
