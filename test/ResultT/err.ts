import 'mocha';
import { expect } from 'chai';
import ResultT from '../../src/ResultT';
import { expectAnErr, expectASome, expectANone } from '../util';

describe('#ResultT.err', () => {
  it('should return an error when given null or undefined', () => {
    const r1 = ResultT.err(null);
    expectAnErr(r1);

    const r2 = ResultT.err(undefined);
    expectAnErr(r2);
  });


  it('should have the function isOk', () => {
    const r = ResultT.err(1);
    expectAnErr(r);
    expect(r.isOk()).to.be.false;
  });

  it('should have the function isErr', () => {
    const r = ResultT.err(1);
    expectAnErr(r);
    expect(r.isErr()).to.be.true;
  });

  it('should have the function toString', () => {
    const r = ResultT.err(1);
    expectAnErr(r);
    expect(r.toString()).to.equal(`Err( 1 )`);
  });

  it('should have the function getOk', () => {
    const r = ResultT.err(1);
    expectAnErr(r);
    expectANone(r.getOk());

  });

  it('should have the function getErr', () => {
    const r = ResultT.err(1);
    expectASome(r.getErr());
    expect(r.getErr().unwrap()).to.equal(1);
  });

  it('should have the function expect', () => {
    const r = ResultT.err(1);
    expectAnErr(r);
    expect(() => {
      r.expect('error!');
    }).to.throw('error!');
  });

  it('should have the function expectErr', () => {
    const r = ResultT.err(1);
    expectAnErr(r);
    expect(r.expectErr('error!')).to.equal(1);
  });

  it('should have the function unwrap', () => {
    const r = ResultT.err(1);
    expectAnErr(r);
    expect(() => {
      r.unwrap();
    }).to.throw();
  });

  it('should have the function unwrapErr', () => {
    const r = ResultT.err(1);
    expectAnErr(r);
    expect(r.unwrapErr()).to.equal(1);
  });

  it('should have the function unwrapOr', () => {
    const r = ResultT.err(1);
    expectAnErr(r);
    expect(r.unwrapOr(2)).to.equal(2);
  });

  it('should have the function unwrapOrElse', () => {
    const r = ResultT.err('parse error');
    expectAnErr(r);
    expect(r.unwrapOrElse(err => err.length)).to.equal(11);
  });


});
