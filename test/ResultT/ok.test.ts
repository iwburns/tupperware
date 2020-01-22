import { Result } from '../../src/tupperware';
import {expectAnErr, expectAnOk, expectANone} from '../util';

describe('#Result - Ok', () => {
  it('should have the function isOk', () => {
    const r = Result.ok(1);
    expectAnOk(r);
    expect(r.isOk()).toEqual(true);
  });

  it('should have the function isErr', () => {
    const r = Result.ok(1);
    expectAnOk(r);
    expect(r.isErr()).toEqual(false);
  });

  it('should have the function toString', () => {
    const r = Result.ok(1);
    expectAnOk(r);
    expect(r.toString()).toEqual(`Ok( 1 )`);
  });

  it('should have the function getOk', () => {
    const r = Result.ok(1);
    expectAnOk(r);
    const ok = r.getOk();
    expect(ok.isSome()).toEqual(true);
    expect(ok.unwrap()).toEqual(1);
  });

  it('should have the function getErr', () => {
    const r = Result.ok(1);
    expectAnOk(r);
    expectANone(r.getErr());
  });

  it('should have the function unwrap', () => {
    const r = Result.ok(1);
    expectAnOk(r);
    expect(r.unwrap()).toEqual(1);
  });

  it('should have the function unwrapErr', () => {
    const r = Result.ok(1);
    expectAnOk(r);
    expect(() => {
      r.unwrapErr('failed');
    }).toThrow('failed');
    expect(() => {
      r.unwrapErr();
    }).toThrow('Called unwrapErr on an Ok value.');
  });

  it('should have the function unwrapOr', () => {
    const r = Result.ok(1);
    expectAnOk(r);
    expect(r.unwrapOr(2)).toEqual(1);
    expect(r.unwrapOr(() => 2)).toEqual(1);
  });

  it('should have the function map', () => {
    const r = Result.ok(1);
    expectAnOk(r);
    const m = r.map(v => v);
    expectAnOk(m);
    expect(m.unwrap()).toEqual(1);
  });

  it('should have the function mapErr', () => {
    const r = Result.ok(1);
    expectAnOk(r);
    const m = r.mapErr(() => 2);
    expectAnOk(m);
    expect(m.unwrap()).toEqual(1);
  });

  it('should have the function and', () => {
    let one = Result.ok(1);
    let two = Result.ok(2);
    expectAnOk(one);
    expectAnOk(two);

    let r = one.and(two);
    expectAnOk(r);
    expect(r.unwrap()).toEqual(2);

    two = Result.err('it failed');
    expectAnErr(two);

    r = one.and(two);
    expectAnErr(r);
    expect(r.unwrapErr()).toEqual('it failed');
  });

  it('should have the function flatMap', () => {
    const r = Result.ok(1);
    expectAnOk(r);
    const double = (x: any) => Result.ok(x * 2);

    const m = r.flatMap(double);
    expectAnOk(m);
    expect(m.unwrap()).toEqual(2);
  });

  it('should have the function or', () => {
    const r = Result.ok(1);
    expectAnOk(r);
    const changeError = () => Result.err('new error') as Result<number, string>;
    const m = r.or(changeError);
    expectAnOk(m);
    expect(m.unwrap()).toEqual(1);

    const other = Result.err('two');
    const r2 = r.or(other);
    expectAnOk(r2);
    expect(r2.unwrap()).toEqual(1);
  });

  it('should have the function match', () => {
    const r = Result.ok(1);
    expectAnOk(r);
    const m = r.match({
      ok: () => 2,
      err: () => 'new error',
    });
    expect(m).toEqual(2);
  });
});
