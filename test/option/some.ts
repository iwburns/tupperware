import 'mocha';
import { OptionT } from '../../src/index';
import { expect } from 'chai';

describe('#OptionT', () => {
  it('should be an object with Some', () => {
    expect(OptionT)
      .to.be.a('object')
      .that.has.property('some');
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

});
