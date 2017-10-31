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

  it('should have the function unwrapOrElse', () => {
    const one = OptionT.none();

    expect(one)
      .to.be.a('object')
      .that.has.property('unwrapOrElse');

    expect(one.unwrapOrElse).to.be.a('function');
    expect(one.unwrapOrElse(() => 1)).to.equal(1);
  });

  it('should have the function map', () => {
    const one = OptionT.none();

    expect(one)
      .to.be.a('object')
      .that.has.property('map');

    expect(one.map).to.be.a('function');

    const mapResult = one.map((x: number) => x * 2);
    expect(mapResult.isNone()).to.be.true;
  });

  it('should have the function and', () => {
    const one = OptionT.none();

    expect(one)
      .to.be.a('object')
      .that.has.property('and');

    expect(one.and).to.be.a('function');

    expect(one.and(OptionT.some(1)).isNone()).to.be.true;
    expect(one.and(OptionT.none()).isNone()).to.be.true;
  });

  it('should have the function or', () => {
    const one = OptionT.none();

    expect(one)
      .to.be.a('object')
      .that.has.property('or');

    expect(one.or).to.be.a('function');

    const orResult = one.or(OptionT.some(1));
    expect(orResult.isSome()).to.be.true;
    expect(orResult.unwrap()).to.equal(1);
    expect(one.or(OptionT.none()).isNone()).to.be.true;
  });

  it('should have the function flatMap', () => {
    const one = OptionT.none();
    const nothing = () => OptionT.none();
    const something = () => OptionT.some(1);

    expect(one)
      .to.be.a('object')
      .that.has.property('flatMap');

    expect(one.flatMap).to.be.a('function');

    expect(one.flatMap(nothing).isNone()).to.be.true;
    expect(one.flatMap(something).isNone()).to.be.true;    
  });

});
