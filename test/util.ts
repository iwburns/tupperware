import 'mocha';
import { expect } from 'chai';

export function expectAnOption(val) : void {
  expect(val)
    .to.be.a('object');
  expect(val)
    .to.have.property('isSome').that.is.a('function');
  expect(val)
    .to.have.property('isNone').that.is.a('function');
  expect(val)
    .to.have.property('toString').that.is.a('function');
  expect(val)
    .to.have.property('expect').that.is.a('function');
  expect(val)
    .to.have.property('unwrap').that.is.a('function');
  expect(val)
    .to.have.property('unwrapOr').that.is.a('function');
  expect(val)
    .to.have.property('unwrapOrElse').that.is.a('function');
  expect(val)
    .to.have.property('map').that.is.a('function');
  expect(val)
    .to.have.property('mapOr').that.is.a('function');
  expect(val)
    .to.have.property('mapOrElse').that.is.a('function');
  expect(val)
    .to.have.property('and').that.is.a('function');
  expect(val)
    .to.have.property('flatMap').that.is.a('function');
  expect(val)
    .to.have.property('or').that.is.a('function');
  expect(val)
    .to.have.property('orElse').that.is.a('function');
  expect(val)
    .to.have.property('match').that.is.a('function');
  expect(val)
    .to.have.property('clone').that.is.a('function');
  expect(val)
    .to.have.property('filter').that.is.a('function');
  expect(val)
    .to.have.property('forEach').that.is.a('function');
  expect(val)
    .to.have.property('equals').that.is.a('function');
  expect(val)
    .to.have.property('hasValue').that.is.a('function');
  expect(val)
    .to.have.property('contains').that.is.a('function');
}

export function expectASome(val) : void {
  expectAnOption(val);
  expect(val.isSome()).to.be.true;
  expect(val.isNone()).to.be.false;
}

export function expectANone(val) : void {
  expectAnOption(val);
  expect(val.isSome()).to.be.false;
  expect(val.isNone()).to.be.true;
}

export function expectAResult(val) : void {
  expect(val)
    .to.be.a('object');
  expect(val)
    .to.have.property('isErr').that.is.a('function');
  expect(val)
    .to.have.property('toString').that.is.a('function');
  expect(val)
    .to.have.property('getOk').that.is.a('function');
  expect(val)
    .to.have.property('getErr').that.is.a('function');
  expect(val)
    .to.have.property('expect').that.is.a('function');
  expect(val)
    .to.have.property('expectErr').that.is.a('function');
  expect(val)
    .to.have.property('unwrap').that.is.a('function');
  expect(val)
    .to.have.property('unwrapErr').that.is.a('function');
  expect(val)
    .to.have.property('unwrapOr').that.is.a('function');
  expect(val)
    .to.have.property('unwrapOrElse').that.is.a('function');
  expect(val)
    .to.have.property('map').that.is.a('function');
  expect(val)
    .to.have.property('mapErr').that.is.a('function');
  expect(val)
    .to.have.property('and').that.is.a('function');
  expect(val)
    .to.have.property('flatMap').that.is.a('function');
  expect(val)
    .to.have.property('or').that.is.a('function');
  expect(val)
    .to.have.property('orElse').that.is.a('function');
  expect(val)
    .to.have.property('match').that.is.a('function');
  expect(val)
    .to.have.property('clone').that.is.a('function');
}

export function expectAnOk(val) : void {
  expectAResult(val);
  expect(val.isOk()).to.be.true;
  expect(val.isErr()).to.be.false;
}

export function expectAnErr(val) : void {
  expectAResult(val);
  expect(val.isOk()).to.be.false;
  expect(val.isErr()).to.be.true;
}
