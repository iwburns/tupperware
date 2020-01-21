import { Result } from '../../src/tupperware';
import {expectAnErr, expectAnOk, expectANone} from '../util';

describe('#Result - Err', () => {
  it('should have the function isOk', () => {
    const r = Result.err(1);
    expectAnErr(r);
    expect(r.isOk()).toEqual(false);
  });

  it('should have the function isErr', () => {
    const r = Result.err(1);
    expectAnErr(r);
    expect(r.isErr()).toEqual(true);
  });

  it('should have the function toString', () => {
    const r = Result.err(1);
    expectAnErr(r);
    expect(r.toString()).toEqual(`Err( 1 )`);
  });

  it('should have the function getOk', () => {
    const r = Result.err(1);
    expectAnErr(r);
    expectANone(r.getOk());
  });

  it('should have the function getErr', () => {
    const r = Result.err(1);
    const err = r.getErr();
    expect(err.isSome()).toEqual(true);
    expect(err.unwrap()).toEqual(1);
  });

  it('should have the function unwrap', () => {
    const r = Result.err(1);
    expectAnErr(r);
    expect(() => {
      r.unwrap('failed');
    }).toThrow('failed');
    expect(() => {
      r.unwrap();
    }).toThrow('Called unwrap on an Err value.');
  });

  it('should have the function unwrapErr', () => {
    const r = Result.err(1);
    expectAnErr(r);
    expect(r.unwrapErr()).toEqual(1);
  });

  it('should have the function unwrapOr', () => {
    const r = Result.err(1);
    expectAnErr(r);
    expect(r.unwrapOr(2)).toEqual(2);
    expect(r.unwrapOr(() => 'other string')).toEqual('other string');
  });

  it('should have the function map', () => {
    const r = Result.err(1) as Result<number, any>;
    expectAnErr(r);
    const m = r.map(() => 2);
    expectAnErr(m);
    expect(m.unwrapErr()).toEqual(1);
  });

  it('should have the function mapErr', () => {
    const r = Result.err(1) as Result<number, any>;
    expectAnErr(r);
    const m = r.mapErr(() => 2);
    expectAnErr(m);
    expect(m.unwrapErr()).toEqual(2);
  });

  it('should have the function flatMap', () => {
    const r = Result.err('error');
    expectAnErr(r);
    const double = (x: any) => Result.ok(x * 2) as Result<number, string>;

    const m = r.flatMap(double);
    expectAnErr(m);
    expect(m.unwrapErr()).toEqual('error');
  });

  it('should have the function or', () => {
    const r = Result.err(1);
    expectAnErr(r);
    const changeError = () => Result.err('new error');
    const m = r.or(changeError);
    expectAnErr(m);
    expect(m.unwrapErr()).toEqual('new error');

    const other = Result.err('two');
    const r2 = r.or(other);
    expectAnErr(r2);
    expect(r2.unwrapErr()).toEqual('two');
  });

  it('should have the function match', () => {
    const r = Result.err('error');
    expectAnErr(r);
    const m = r.match({
      ok: () => 2,
      err: () => 'new error',
    });
    expect(m).toEqual('new error');
  });
});
