export function expectAnOptional(val: any): void {
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

export function expectASome(val: any): void {
  expectAnOptional(val);
  expect(val.isSome()).toEqual(true);
  expect(val.isNone()).toEqual(false);
}

export function expectANone(val: any): void {
  expectAnOptional(val);
  expect(val.isSome()).toEqual(false);
  expect(val.isNone()).toEqual(true);
}

export function expectAResult(val: any): void {
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

export function expectAnOk(val: any): void {
  expectAResult(val);
  expect(val.isOk()).toBe(true);
  expect(val.isErr()).toBe(false);
}

export function expectAnErr(val: any): void {
  expectAResult(val);
  expect(val.isOk()).toBe(false);
  expect(val.isErr()).toBe(true);
}
