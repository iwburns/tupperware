import 'mocha';
import { OptionT } from '../../src/index';
import { expect } from 'chai';
import { expectANone, expectASome } from '../util';

describe('#OptionT - None', () => {
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

  it('should have the function toString', () => {
    const none = OptionT.none();

    expectANone(none);

    expect(none.toString()).to.equal('None()');
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

  it('should have the function mapOr', () => {
    const none = OptionT.none();

    expectANone(none);

    const mapResult = none.mapOr(1, (x: number) => x * 2);

    expect(mapResult).to.equal(1);
  });

  it('should have the function mapOrElse', () => {
    const none = OptionT.none();

    expectANone(none);

    const mapResult = none.mapOrElse(() => 1, (x: number) => x * 2);

    expect(mapResult).to.equal(1);
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
      none: () => 0,
    })).to.equal(0);
  });

  it('should have the function clone', () => {
    const none = OptionT.none();
    expectANone(none);

    const noneAgain = none.clone();
    expectANone(noneAgain);

    expect(none).to.not.equal(noneAgain);
  });

  it('should have the function filter', () => {
    const none = OptionT.none();
    expectANone(none);

    const filtered = none.filter(x => x > 0);
    expectANone(filtered);
  });

  it('should have the function forEach', () => {
    const none = OptionT.none();
    expectANone(none);

    let val = 0;

    none.forEach(x => val = x);
    expect(val).to.equal(0);
  });

  it('should have the function equals', () => {
    const a = OptionT.none();
    const b = OptionT.some(1);
    expectANone(a);
    expectASome(b);

    expect(a.equals(b)).to.be.false;

    const c = OptionT.none();
    const d = OptionT.none();
    expectANone(c);
    expectANone(d);

    expect(c.equals(d)).to.be.true;
  });

  it('should have the function hasValue', () => {
    const none = OptionT.none();
    expectANone(none);

    expect(none.hasValue(1)).to.be.false;
  });

  it('should have the function contains', () => {
    const none = OptionT.none();
    expectANone(none);

    expect(none.contains(x => x > 0)).to.be.false;
    expect(none.contains(x => x < 0)).to.be.false;

    const noneAgain = OptionT.none();
    expect(noneAgain.contains(x => x.hasOwnProperty('foo'))).to.be.false;
  });
});
