import 'mocha';
import { expect } from 'chai';
import ResultT from '../../src/ResultT';
import { expectAnOk, expectAnErr, expectASome, expectANone } from '../util';

describe('#ResultT.ok', () => {
  it('should return an error when given null or undefined', () => {
    const r1 = ResultT.ok(null);
    expectAnErr(r1);

    const r2 = ResultT.ok(undefined);
    expectAnErr(r2);
  });


  it('should have the function isOk', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    expect(r.isOk()).to.be.true;
  });

  it('should have the function isErr', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    expect(r.isErr()).to.be.false;
  });

  it('should have the function toString', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    expect(r.toString()).to.equal(`Ok( 1 )`);
  });

  it('should have the function getOk', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    expectASome(r.getOk());
    expect(r.getOk().unwrap()).to.equal(1);
  });

  it('should have the function getErr', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    expectANone(r.getErr());
  });

  it('should have the function expect', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    expect(r.expect('error!')).to.equal(1);
  });

  it('should have the function expectErr', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    expect(() => {
      r.expectErr('error!');
    }).to.throw('error!');
  });

  it('should have the function unwrap', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    expect(r.unwrap()).to.equal(1);
  });

  it('should have the function unwrapErr', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    expect(() => {
      r.unwrapErr();
    }).to.throw();
  });

  it('should have the function unwrapOr', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    expect(r.unwrapOr(2)).to.equal(1);
  });

  it('should have the function unwrapOrElse', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    expect(r.unwrapOrElse(e => 2)).to.equal(1);
  });

  it('should have the function map', () => {
    const r = ResultT.ok(1);
    expectAnOk(r);
    const m = r.map(v => v);
    expectAnOk(m);
    expect(m.unwrap()).to.equal(1);
  });

});
