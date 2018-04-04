import { ResultT } from '../../src/nullshield';
import { expectAnErr, expectASome, expectANone, expectAnOk } from '../util';

describe('#ResultT - Err', () => {
  it('should have the function isOk', () => {
    const r = ResultT.err(1);
    expectAnErr(r);
    expect(r.isOk()).toEqual(false);
  });

  it('should have the function isErr', () => {
    const r = ResultT.err(1);
    expectAnErr(r);
    expect(r.isErr()).toEqual(true);
  });

  it('should have the function toString', () => {
    const r = ResultT.err(1);
    expectAnErr(r);
    expect(r.toString()).toEqual(`Err( 1 )`);
  });

  it('should have the function getOk', () => {
    const r = ResultT.err(1);
    expectAnErr(r);
    expectANone(r.getOk());
  });

  it('should have the function getErr', () => {
    const r = ResultT.err(1);
    expectASome(r.getErr());
    expect(r.getErr().unwrap()).toEqual(1);
  });

  it('should have the function expect', () => {
    const r = ResultT.err(1);
    expectAnErr(r);
    expect(() => {
      r.expect('error!');
    }).toThrow('error!');
  });

  it('should have the function expectErr', () => {
    const r = ResultT.err(1);
    expectAnErr(r);
    expect(r.expectErr('error!')).toEqual(1);
  });

  it('should have the function unwrap', () => {
    const r = ResultT.err(1);
    expectAnErr(r);
    expect(() => {
      r.unwrap();
    }).toThrow();
  });

  it('should have the function unwrapErr', () => {
    const r = ResultT.err(1);
    expectAnErr(r);
    expect(r.unwrapErr()).toEqual(1);
  });

  it('should have the function unwrapOr', () => {
    const r = ResultT.err(1);
    expectAnErr(r);
    expect(r.unwrapOr(2)).toEqual(2);
  });

  it('should have the function unwrapOrElse', () => {
    const r = ResultT.err('parse error') as ResultT<string, any>;
    expectAnErr(r);
    // tslint:disable-next-line:handle-callback-err
    expect(r.unwrapOrElse(err => 'other string')).toEqual('other string');
  });

  it('should have the function map', () => {
    const r = ResultT.err(1) as ResultT<number, any>;
    expectAnErr(r);
    const m = r.map(v => 2);
    expectAnErr(m);
    expect(m.unwrapErr()).toEqual(1);
  });

  it('should have the function mapErr', () => {
    const r = ResultT.err(1) as ResultT<number, any>;
    expectAnErr(r);
    const m = r.mapErr(v => 2);
    expectAnErr(m);
    expect(m.unwrapErr()).toEqual(2);
  });

  it('should have the function flatMap', () => {
    const r = ResultT.err('error');
    expectAnErr(r);
    const double = x => ResultT.ok(x * 2) as ResultT<number, string>;

    const m = r.flatMap(double);
    expectAnErr(m);
    expect(m.unwrapErr()).toEqual('error');
  });

  it('should have the function orElse', () => {
    const r = ResultT.err(1);
    expectAnErr(r);
    const changeError = e => ResultT.err('new error');
    const m = r.orElse(changeError);
    expectAnErr(m);
    expect(m.unwrapErr()).toEqual('new error');
  });

  it('should have the function match', () => {
    const r = ResultT.err('error');
    expectAnErr(r);
    const m = r.match({
      ok: _ => 2,
      err: _ => 'new error',
    });
    expect(m).toEqual('new error');
  });

  it('should have the function clone', () => {
    const obj = {};
    const r = ResultT.err(obj);
    expectAnErr(r);
    const m = r.clone();
    expectAnErr(m);
    expect(m.unwrapErr()).toBe(obj);
  });

  it('should have the function equals', () => {
    const r = ResultT.err(1);
    const r2 = ResultT.err(1);
    expectAnErr(r);
    expectAnErr(r2);
    expect(r.equals(r2)).toEqual(true);

    const r3 = ResultT.err(2);
    expectAnErr(r3);
    expect(r.equals(r3)).toEqual(false);

    const r4 = ResultT.ok(1);
    expectAnOk(r4);
    expect(r.equals(r4)).toEqual(false);
  });

  it('should have the function hasValue', () => {
    const r = ResultT.err(1);
    expectAnErr(r);

    expect(r.hasValue(1)).toEqual(true);
    expect(r.hasValue('two')).toEqual(false);

    const obj = {};
    const r2 = ResultT.err(obj);
    expectAnErr(r2);

    expect(r2.hasValue(obj)).toEqual(true);
    expect(r2.hasValue({})).toEqual(false);
  });

  it('should have the function contains', () => {
    const r = ResultT.err({ a: 'b' });
    expectAnErr(r);

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
