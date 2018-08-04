export function expectAnOption(val) : void {
  expect(val).toHaveProperty('isSome'); expect(val.isSome).toBeInstanceOf(Function);
  expect(val).toHaveProperty('isNone'); expect(val.isNone).toBeInstanceOf(Function);
  expect(val).toHaveProperty('toString'); expect(val.toString).toBeInstanceOf(Function);
  expect(val).toHaveProperty('unwrap'); expect(val.unwrap).toBeInstanceOf(Function);
  expect(val).toHaveProperty('unwrapOr'); expect(val.unwrapOr).toBeInstanceOf(Function);
  expect(val).toHaveProperty('unwrapOrElse'); expect(val.unwrapOrElse).toBeInstanceOf(Function);
  expect(val).toHaveProperty('map'); expect(val.map).toBeInstanceOf(Function);
  expect(val).toHaveProperty('and'); expect(val.and).toBeInstanceOf(Function);
  expect(val).toHaveProperty('flatMap'); expect(val.flatMap).toBeInstanceOf(Function);
  expect(val).toHaveProperty('or'); expect(val.or).toBeInstanceOf(Function);
  expect(val).toHaveProperty('orElse'); expect(val.orElse).toBeInstanceOf(Function);
  expect(val).toHaveProperty('match'); expect(val.match).toBeInstanceOf(Function);
  expect(val).toHaveProperty('filter'); expect(val.filter).toBeInstanceOf(Function);
  expect(val).toHaveProperty('forEach'); expect(val.forEach).toBeInstanceOf(Function);
}

export function expectASome(val) : void {
  expectAnOption(val);
  expect(val.isSome()).toEqual(true);
  expect(val.isNone()).toEqual(false);
}

export function expectANone(val) : void {
  expectAnOption(val);
  expect(val.isSome()).toEqual(false);
  expect(val.isNone()).toEqual(true);
}

export function expectAResult(val) : void {
  expect(val).toHaveProperty('isOk'); expect(val.isOk).toBeInstanceOf(Function);
  expect(val).toHaveProperty('isErr'); expect(val.isErr).toBeInstanceOf(Function);
  expect(val).toHaveProperty('toString'); expect(val.toString).toBeInstanceOf(Function);
  expect(val).toHaveProperty('getOk'); expect(val.getOk).toBeInstanceOf(Function);
  expect(val).toHaveProperty('getErr'); expect(val.getErr).toBeInstanceOf(Function);
  expect(val).toHaveProperty('unwrap'); expect(val.unwrap).toBeInstanceOf(Function);
  expect(val).toHaveProperty('unwrapErr'); expect(val.unwrapErr).toBeInstanceOf(Function);
  expect(val).toHaveProperty('unwrapOr'); expect(val.unwrapOr).toBeInstanceOf(Function);
  expect(val).toHaveProperty('unwrapOrElse'); expect(val.unwrapOrElse).toBeInstanceOf(Function);
  expect(val).toHaveProperty('map'); expect(val.map).toBeInstanceOf(Function);
  expect(val).toHaveProperty('mapErr'); expect(val.mapErr).toBeInstanceOf(Function);
  expect(val).toHaveProperty('flatMap'); expect(val.flatMap).toBeInstanceOf(Function);
  expect(val).toHaveProperty('orElse'); expect(val.orElse).toBeInstanceOf(Function);
  expect(val).toHaveProperty('match'); expect(val.match).toBeInstanceOf(Function);
}

export function expectAnOk(val) : void {
  expectAResult(val);
  expect(val.isOk()).toBe(true);
  expect(val.isErr()).toBe(false);
}

export function expectAnErr(val) : void {
  expectAResult(val);
  expect(val.isOk()).toBe(false);
  expect(val.isErr()).toBe(true);
}

export function expectAValidation(val): void {
  expect(val).toHaveProperty('isSuccess'); expect(val.isSuccess).toBeInstanceOf(Function);
  expect(val).toHaveProperty('isFailure'); expect(val.isFailure).toBeInstanceOf(Function);
  expect(val).toHaveProperty('getSuccess'); expect(val.getSuccess).toBeInstanceOf(Function);
  expect(val).toHaveProperty('getFailure'); expect(val.getFailure).toBeInstanceOf(Function);
  expect(val).toHaveProperty('assert'); expect(val.assert).toBeInstanceOf(Function);
  expect(val).toHaveProperty('flatMap'); expect(val.flatMap).toBeInstanceOf(Function);
  expect(val).toHaveProperty('or'); expect(val.or).toBeInstanceOf(Function);
  expect(val).toHaveProperty('orElse'); expect(val.orElse).toBeInstanceOf(Function);
  expect(val).toHaveProperty('mapSuccess'); expect(val.mapSuccess).toBeInstanceOf(Function);
  expect(val).toHaveProperty('mapFailure'); expect(val.mapFailure).toBeInstanceOf(Function);
}

export function expectASuccess(val): void {
  expectAValidation(val);
  expect(val.isSuccess()).toBe(true);
  expect(val.isFailure()).toBe(false);
}

export function expectAFailure(val): void {
  expectAValidation(val);
  expect(val.isSuccess()).toBe(false);
  expect(val.isFailure()).toBe(true);
}
