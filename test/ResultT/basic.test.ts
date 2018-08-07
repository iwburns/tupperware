import { Result } from '../../src/nullshield';
import { expectAnOk, expectAnErr } from '../util';

describe('#Result.ok', () => {
  it('should be able to create an Ok', () => {
    const r1 = Result.ok(1);
    expectAnOk(r1);
    expect(r1.unwrapOr(2)).toEqual(1);
  });

  it('should return an Ok when given null or undefined', () => {
    const r1 = Result.ok(null);
    expectAnOk(r1);

    const r2 = Result.ok(undefined);
    expectAnOk(r2);
  });
});

describe('#Result.err', () => {
  it('should be able to create an Err', () => {
    const r2 = Result.err('error');
    expectAnErr(r2);
    expect(r2.unwrapOr(2)).toEqual(2);
  });

  it('should return an Err when given null or undefined', () => {
    const r1 = Result.err(null);
    expectAnErr(r1);

    const r2 = Result.err(undefined);
    expectAnErr(r2);
  });
});

describe('#Result', () => {
  it('should be able to be used as a type', () => {
    const f = function (value: string): Result<string, any> {
      return Result.ok(value);
    };

    const r1 = f('test!');

    expectAnOk(r1);
    expect(r1.unwrap()).toEqual('test!');
  });

  it('Ok and Err should be compatible with one another', () => {
    const okay = Result.ok(1);
    const error = Result.err('parsing error');

    expectAnOk(okay);
    expectAnErr(error);

    function processRes<T, E>(res: Result<T, E>): Result<T, E> {
      return res;
    }

    const okayAgain = processRes(okay);
    const errorAgain = processRes(error);

    expectAnOk(okayAgain);
    expectAnErr(errorAgain);
  });
});
