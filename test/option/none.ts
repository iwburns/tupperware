import 'mocha';
import { OptionT } from '../../src/index';
import { expect } from 'chai';

describe('#OptionT', () => {
  it('should be an object with None', () => {
    expect(OptionT)
      .to.be.a('object')
      .that.has.property('none');
  });
});

describe('#OptionT.none', () => {
  it('should have the function isSome', () => {
    const none = OptionT.none();

    expect(none)
      .to.be.a('object')
      .that.has.property('isSome');

    expect(none.isSome).to.be.a('function');
    expect(none.isSome()).to.be.false;
  });

  it('should have the function isNone', () => {
    const none = OptionT.none();

    expect(none)
      .to.be.a('object')
      .that.has.property('isNone');

    expect(none.isNone).to.be.a('function');
    expect(none.isNone()).to.be.true;
  });

  it('should have the function expect', () => {
    const none = OptionT.none();

    expect(none)
      .to.be.a('object')
      .that.has.property('expect');

    expect(none.expect).to.be.a('function');
    expect(() => none.expect('failed')).to.throw('failed');
  });

  it('should have the function unwrap', () => {
    const one = OptionT.none();

    expect(one)
      .to.be.a('object')
      .that.has.property('unwrap');

    expect(one.unwrap).to.be.a('function');
    expect(() => one.unwrap()).to.throw('Called unwrap on a None value');
  });

  it('should have the function unwrapOr', () => {
    const one = OptionT.none();

    expect(one)
      .to.be.a('object')
      .that.has.property('unwrapOr');

    expect(one.unwrapOr).to.be.a('function');
    expect(one.unwrapOr(10)).to.equal(10);
  });

});
