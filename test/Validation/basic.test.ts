import { Validation } from '../../src/nullshield';
import { expectASuccess, expectAFailure } from '../util'

describe('#Validation.success', () => {
  it('should build a success instance', () => {
    const one = Validation.success(1);
    expectASuccess(one);
  });
});

describe('#Validation.failure', () => {
  it('should build a failure instance', () => {
    const nope = Validation.failure('invalid');
    expectAFailure(nope);
  });
});

describe('#Validation', () => {
  it('should be able to be used as a type', () => {
    function checkLength(value: string): Validation<string, string> {
      return value.length < 6
        ? Validation.success(value)
        : Validation.failure('input has a length greater than 5');
    }

    const checked = checkLength('test!');

    expectASuccess(checked);
    expect(checked.getSuccess().unwrapOr('nope')).toEqual('test!');
  });

  it('Success and Failure should be compatible with one another', () => {
    const one = Validation.success(1);
    const nope = Validation.failure('nope');

    function identity<T, E>(val: Validation<T, E>): Validation<T, E> {
      return val;
    }

    const oneAgain = identity(one);
    const nopeAgain = identity(nope);

    expectASuccess(oneAgain);
    expectAFailure(nopeAgain);
  });
});
