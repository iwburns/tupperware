import { Validation } from '../../src/nullshield';
import {expectASuccess, expectAFailure } from '../util';

describe('#Validation - Success', () => {
  it('should have the function isSuccess', () => {
    const one = Validation.success(1);
    expect(one.isSuccess()).toEqual(true);
  });

  it('should have the function isFailure', () => {
    const one = Validation.success(1);
    expect(one.isFailure()).toEqual(false);
  });

  it('should have the function getSuccess', () => {
    const one = Validation.success(1);
    const maybeOne = one.getSuccess();
    expect(maybeOne.unwrapOr(2)).toEqual(1);
  });

  it('should have the function getFailure', () => {
    const one = Validation.success(1);
    const maybeOne = one.getFailure();
    expect(maybeOne.unwrapOr(2)).toEqual(2);
  });

  it('should have the function assert', () => {
    const one = Validation.success(1);
    const two = Validation.success(2);
    const combo = one.assert(two);

    expectASuccess(combo);
    expect(combo.getSuccess().unwrapOr(3)).toEqual(2);

    const nope = Validation.failure('nope');
    const comboAgain = one.assert(nope);

    expectAFailure(comboAgain);
    expect(comboAgain.getFailure().unwrapOr(['nada'])).toEqual(['nope']);

    const nada = Validation.failure('nada');
    const final = one.assert(nope).assert(nada);

    expectAFailure(final);
    expect(final.getFailure().unwrapOr(['nein'])).toEqual(['nope', 'nada']);
  });

  it('should have the function flatMap', () => {
    function isGreaterThanZero(val: number): Validation<number, string> {
      return val > 0
        ? Validation.success(val)
        : Validation.failure('value is LTE zero');
    }

    const one = Validation.success(1);
    const result = one.flatMap(isGreaterThanZero);

    expectASuccess(result);
    expect(result.getSuccess().unwrapOr(3)).toEqual(1);

    const zero = Validation.success(0);
    const resultAgain = zero.flatMap(isGreaterThanZero);

    expectAFailure(resultAgain);
    expect(resultAgain.getFailure().unwrapOr(['nada'])).toEqual(['value is LTE zero']);
  });
});
