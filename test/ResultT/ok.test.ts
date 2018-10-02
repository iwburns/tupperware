import { Result } from '../../src/tupperware';
import { expectAnOk, expectANone } from '../util';

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
  });

  it('should have the function unwrapOrElse', () => {
    const r = Result.ok(1);
    expectAnOk(r);
    expect(r.unwrapOrElse(() => 2)).toEqual(1);
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

  it('should have the function flatMap', () => {
    const r = Result.ok(1);
    expectAnOk(r);
    const double = (x: any) => Result.ok(x * 2);

    const m = r.flatMap(double);
    expectAnOk(m);
    expect(m.unwrap()).toEqual(2);
  });

  it('should have the function orElse', () => {
    const r = Result.ok(1);
    expectAnOk(r);
    const changeError = () => Result.err('new error') as Result<number, string>;
    const m = r.orElse(changeError);
    expectAnOk(m);
    expect(m.unwrap()).toEqual(1);
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
