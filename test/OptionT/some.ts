import 'mocha';
import OptionT from '../../src/OptionT';
import { expect } from 'chai';
import { expectASome, expectANone } from '../util';

describe('#OptionT.some', () => {
  it('should throw an error when given null or undefined', () => {
    expect(() => {
      OptionT.some(null);
    }).to.throw();

    expect(() => {
      OptionT.some(undefined);
    }).to.throw();
  });

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

  it('should have the function toString', () => {
    const one = OptionT.some(1);

    expectASome(one);

    expect(one.toString()).to.equal('Some( 1 )');
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

    const two = one.map(val => 2);

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

  it('should have the function mapOr', () => {
    const one = OptionT.some(1);
    expectASome(one);

    const mapResult = one.mapOr(3, (x: number) => x * 2);

    expect(mapResult).to.equal(2);
  });

  it('should have the function mapOrElse', () => {
    const one = OptionT.some(1);
    expectASome(one);

    const mapResult = one.mapOrElse(() => 3, (x: number) => x * 2);

    expect(mapResult).to.equal(2);
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
      some: val => val * 2,
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

  it('should have the function clone', () => {
    const one = OptionT.some(1);
    expectASome(one);

    const oneAgain = one.clone();
    expectASome(oneAgain);

    expect(one.unwrap()).to.equal(oneAgain.unwrap());
    expect(one).to.not.equal(oneAgain);
  });

  it('should have the function filter', () => {
    const one = OptionT.some(1);
    expectASome(one);

    const filtered = one.filter(x => x > 0);
    expectASome(filtered);

    expect(filtered.unwrap()).to.equal(1);
    expect(filtered).to.equal(one); // they should be the same object

    const filteredAgain = one.filter(x => x < 0);
    expectANone(filteredAgain);
  });

  it('should have the function forEach', () => {
    const one = OptionT.some(1);
    expectASome(one);

    let val = 0;

    one.forEach(x => val = x);
    expect(val).to.equal(1);
  });

  it('should have the function equals', () => {
    const a = OptionT.some(1);
    const b = OptionT.some(1);
    expectASome(a);
    expectASome(b);

    expect(a.equals(b)).to.be.true;

    const c = OptionT.some({ foo: 'bar' });
    const d = OptionT.some({ foo: 'bar' });
    expectASome(c);
    expectASome(d);

    expect(c.equals(d)).to.be.false;

    const obj = {
      foo: 'bar',
    };

    const e = OptionT.some(obj);
    const f = OptionT.some(obj);
    expectASome(e);
    expectASome(f);

    expect(e.equals(f)).to.be.true;

    const g = OptionT.some(1);
    const h = OptionT.none();
    expectASome(e);
    expectANone(h);

    expect(g.equals(h)).to.be.false;
  });

  it('should have the function hasValue', () => {
    const one = OptionT.some(1);
    expectASome(one);

    expect(one.hasValue(1)).to.be.true;
    expect(one.hasValue(2)).to.be.false;

    const another = OptionT.some({ foo: 'bar' });
    expectASome(another);

    expect(another.hasValue({ foo: 'bar' })).to.be.false;

    const obj = {
      foo: 'bar',
    };
    const maybeObj = OptionT.some(obj);
    expectASome(maybeObj);

    expect(maybeObj.hasValue(obj)).to.be.true;
  });

  it('should have the function contains', () => {
    const one = OptionT.some(1);
    expectASome(one);

    expect(one.contains(x => x > 0)).to.be.true;
    expect(one.contains(x => x < 0)).to.be.false;

    const obj = OptionT.some({ foo: 'bar' });
    expectASome(obj);

    expect(obj.contains(x => x.foo === 'bar')).to.be.true;
    expect(obj.contains(x => x.foo === 'baz')).to.be.false;
  });
});
