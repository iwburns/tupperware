import 'mocha';
import { expect } from 'chai';
import ResultT from '../../src/ResultT';
import { expectAnOk, expectAnErr } from '../util';

describe('basic test', () => {
  it('should be able to create an ok', () => {
    const r1 = ResultT.ok(1);
    expectAnOk(r1);
    expect(r1.unwrapOr(2)).to.equal(1);
  });
  it('should be able to create an err', () => {
    const r2 = ResultT.err('error');
    expectAnErr(r2);
    expect(r2.unwrapOr(2)).to.equal(2);
  });
});

describe('type test', () => {
  it('should be able to be used as a type', () => {

    const f = function (value : string): ResultT<string, any> {
      return ResultT.ok(value);
    };

    const r1 = f('test!');

    expectAnOk(r1);
    expect(r1.unwrap()).to.equal('test!');

  });
});

