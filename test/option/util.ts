import 'mocha';
import { expect } from 'chai';

export function expectAnOption (val) : void {
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
}

export function expectASome (val) : void {
  expectAnOption(val);
  expect(val.isSome()).to.be.true;
  expect(val.isNone()).to.be.false;
}

export function expectANone (val) : void {
  expectAnOption(val);
  expect(val.isSome()).to.be.false;
  expect(val.isNone()).to.be.true;
}
