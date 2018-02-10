import 'mocha';
import { OptionT } from '../../src/index';
import { expect } from 'chai';
import { expectASome, expectANone } from './util';
import { OptT } from "../../src/option";

describe('#OptionT.some and #OptionT.none', () => {
  it('should be compatible with one another in terms of types', () => {
    const one = OptionT.some(1);
    const nope = OptionT.none();

    expectASome(one);
    expectANone(nope);

    function processOpt(opt: OptT<number>) {
      return opt;
    }

    const oneAgain = processOpt(one);
    const nopeAgain = processOpt(nope);

    expectASome(oneAgain);
    expectANone(nopeAgain);
  });

  it('should be of the same type when a some turns into a none', () => {
    const one = OptionT.some(undefined);
    const two = OptionT.some(null);
    const nope = OptionT.none();

    expectANone(one);
    expectANone(two);
    expectANone(nope);

    function processOpt(opt: OptT<string>) {
      return opt;
    }

    const oneAgain = processOpt(one);
    const twoAgain = processOpt(two);
    const nopeAgain = processOpt(nope);

    expectANone(oneAgain);
    expectANone(twoAgain);
    expectANone(nopeAgain);
  });
});
