import 'mocha';
import { OptionT } from '../../src/index';
import { expect } from 'chai';
import { expectASome, expectANone } from './util';

/*
  expectASome() and expectANone() will check that all expected functions exist on the Option
  and that the value is a None or a Some.
*/

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

    expectANone(none);
    expect(none.isSome()).to.be.false;
  });

  it('should have the function isNone', () => {
    const none = OptionT.none();

    expectANone(none);
    expect(none.isNone()).to.be.true;
  });

  it('should have the function expect', () => {
    const none = OptionT.none();

    expectANone(none);
    expect(() => none.expect('failed')).to.throw('failed');
  });

  it('should have the function unwrap', () => {
    const none = OptionT.none();

    expectANone(none);
    expect(() => none.unwrap()).to.throw('Called unwrap on a None value');
  });

  it('should have the function unwrapOr', () => {
    const none = OptionT.none();

    expectANone(none);
    expect(none.unwrapOr(10)).to.equal(10);
  });

  it('should have the function unwrapOrElse', () => {
    const none = OptionT.none();

    expectANone(none);
    expect(none.unwrapOrElse(() => 1)).to.equal(1);
  });

  it('should have the function map', () => {
    const none = OptionT.none();

    expectANone(none);

    const mapResult = none.map((x: number) => x * 2);
    expect(mapResult.isNone()).to.be.true;
  });

  it('should have the function and', () => {
    const none = OptionT.none();

    expectANone(none);

    expect(none.and(OptionT.some(1)).isNone()).to.be.true;
    expect(none.and(OptionT.none()).isNone()).to.be.true;
  });

  it('should have the function or', () => {
    const none = OptionT.none();

    expectANone(none);

    const orResult = none.or(OptionT.some(1));
    expect(orResult.isSome()).to.be.true;
    expect(orResult.unwrap()).to.equal(1);
    expect(none.or(OptionT.none()).isNone()).to.be.true;
  });

  it('should have the function flatMap', () => {
    const none = OptionT.none();
    const nothing = () => OptionT.none();
    const something = () => OptionT.some(1);

    expectANone(none);

    expect(none.flatMap(nothing).isNone()).to.be.true;
    expect(none.flatMap(something).isNone()).to.be.true;    
  });

  it('should have the function orElse', () => {
    const none = OptionT.none();
    const nothing = () => OptionT.none();
    const something = () => OptionT.some(1);

    expectANone(none);

    expect(none.orElse(nothing).isNone()).to.be.true;
    expect(none.orElse(something).isSome()).to.be.true;    
    expect(none.orElse(() => OptionT.some('foobar')).unwrap()).to.equal('foobar');
  });

  it('should have the function match', () => {
    const none = OptionT.none();

    expectANone(none);

    expect(none.match({
      some: () => 1, 
      none: () => 0
    })).to.equal(0);
  });

});
