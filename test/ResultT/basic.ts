import 'mocha';
import { expect } from 'chai';
import ResultT from '../../src/ResultT';
import { expectAnOk, expectAnErr } from '../util';

describe('#ResultT.ok', () => {
  it('should be able to create an Ok', () => {
    const r1 = ResultT.ok(1);
    expectAnOk(r1);
    expect(r1.unwrapOr(2)).to.equal(1);
  });

  it('should return an Ok when given null or undefined', () => {
    const r1 = ResultT.ok(null);
    expectAnOk(r1);

    const r2 = ResultT.ok(undefined);
    expectAnOk(r2);
  });
});

describe('#ResultT.err', () => {
  it('should be able to create an Err', () => {
    const r2 = ResultT.err('error');
    expectAnErr(r2);
    expect(r2.unwrapOr(2)).to.equal(2);
  });

  it('should return an Err when given null or undefined', () => {
    const r1 = ResultT.err(null);
    expectAnErr(r1);

    const r2 = ResultT.err(undefined);
    expectAnErr(r2);
  });
});

describe('#ResultT', () => {
  it('should be able to be used as a type', () => {
    const f = function (value: string): ResultT<string, any> {
      return ResultT.ok(value);
    };

    const r1 = f('test!');

    expectAnOk(r1);
    expect(r1.unwrap()).to.equal('test!');
  });

  it('Ok and Err should be compatible with one another', () => {
    const okay = ResultT.ok(1);
    const error = ResultT.err('parsing error');

    expectAnOk(okay);
    expectAnErr(error);

    function processRes<T, E>(res: ResultT<T, E>): ResultT<T, E> {
      return res;
    }

    const okayAgain = processRes(okay);
    const errorAgain = processRes(error);

    expectAnOk(okayAgain);
    expectAnErr(errorAgain);
  });
});
