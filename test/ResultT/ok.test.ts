import { ResultT } from '../../src/nullshield';
import { expectAnOk, expectASome, expectANone, expectAnErr } from '../util';

describe('#ResultT - Ok', () => {
  it('should have the function isOk', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    expect(r.isOk()).toEqual(true);
  });

  it('should have the function isErr', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    expect(r.isErr()).toEqual(false);
  });

  it('should have the function toString', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    expect(r.toString()).toEqual(`Ok( 1 )`);
  });

  it('should have the function getOk', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    expectASome(r.getOk());
    expect(r.getOk().unwrap()).toEqual(1);
  });

  it('should have the function getErr', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    expectANone(r.getErr());
  });

  it('should have the function expect', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    expect(r.expect('error!')).toEqual(1);
  });

  it('should have the function expectErr', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    expect(() => {
      r.expectErr('error!');
    }).toThrow('error!');
  });

  it('should have the function unwrap', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    expect(r.unwrap()).toEqual(1);
  });

  it('should have the function unwrapErr', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    expect(() => {
      r.unwrapErr();
    }).toThrow();
  });

  it('should have the function unwrapOr', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    expect(r.unwrapOr(2)).toEqual(1);
  });

  it('should have the function unwrapOrElse', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    expect(r.unwrapOrElse(e => 2)).toEqual(1);
  });

  it('should have the function map', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    const m = r.map(v => v);
    expectAnOk(m);
    expect(m.unwrap()).toEqual(1);
  });

  it('should have the function mapErr', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    const m = r.mapErr(v => 2);
    expectAnOk(m);
    expect(m.unwrap()).toEqual(1);
  });

  it('should have the function flatMap', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    const double = x => ResultT.ok(x * 2);

    const m = r.flatMap(double);
    expectAnOk(m);
    expect(m.unwrap()).toEqual(2);
  });

  it('should have the function orElse', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    const changeError = e => ResultT.err('new error') as ResultT<number, string>;
    const m = r.orElse(changeError);
    expectAnOk(m);
    expect(m.unwrap()).toEqual(1);
  });

  it('should have the function match', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    const m = r.match({
      ok: _ => 2,
      err: _ => 'new error',
    });
    expect(m).toEqual(2);
  });

  it('should have the function clone', () => {
    const obj = {};
    const r = ResultT.ok(obj);
    expectAnOk(r);
    const m = r.clone();
    expectAnOk(m);
    expect(m.unwrap()).toBe(obj);
  });

  it('should have the function equals', () => {
    const r = ResultT.ok(1);
    const r2 = ResultT.ok(1);
    expectAnOk(r);
    expectAnOk(r2);
    expect(r.equals(r2)).toEqual(true);

    const r3 = ResultT.ok(2);
    expectAnOk(r3);
    expect(r.equals(r3)).toEqual(false);

    const r4 = ResultT.err(1);
    expectAnErr(r4);
    expect(r.equals(r4)).toEqual(false);
  });

  it('should have the function hasValue', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);

    expect(r.hasValue(1)).toEqual(true);
    expect(r.hasValue('two')).toEqual(false);

    const obj = {};
    const r2 = ResultT.ok(obj);
    expectAnOk(r2);

    expect(r2.hasValue(obj)).toEqual(true);
    expect(r2.hasValue({})).toEqual(false);
  });

  it('should have the function contains', () => {
    const r = ResultT.ok({ a: 'b' });
    expectAnOk(r);

    const aEqualsB = function(x) {
      return x.a === 'b'
    };

    const aEqualsC = function(x) {
      return x.a === 'c';
    };

    expect(r.contains(aEqualsB)).toEqual(true);
    expect(r.contains(aEqualsC)).toEqual(false);
  });
});
