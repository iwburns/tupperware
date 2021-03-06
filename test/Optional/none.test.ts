import { Optional } from '../../src/tupperware';

describe('#Optional - None', () => {
  it('should have the function isSome', () => {
    const none = Optional.none();
    expect(none.isSome()).toEqual(false);
  });

  it('should have the function isNone', () => {
    const none = Optional.none();
    expect(none.isNone()).toEqual(true);
  });

  it('should have the function toString', () => {
    const none = Optional.none();
    expect(none.toString()).toEqual('None()');
  });

  it('should have the function unwrap', () => {
    const none = Optional.none();

    expect(() => none.unwrap()).toThrow('tupperware:unwrap_on_none: Called unwrap on a None value.');
    expect(() => none.unwrap('failed')).toThrow('tupperware:unwrap_on_none: failed');
  });

  it('should have the function unwrapOr', () => {
    const none = Optional.none();
    expect(none.unwrapOr(10)).toEqual(10);
    expect(none.unwrapOr(() => 10)).toEqual(10);
  });

  it('should have the function map', () => {
    const none = Optional.none();
    const mapResult = none.map(x => x * 2);
    expect(mapResult.isNone()).toEqual(true);
  });

  it('should have the function and', () => {
    const none = Optional.none();
    expect(none.and(Optional.some(1)).isNone()).toEqual(true);
    expect(none.and(Optional.none()).isNone()).toEqual(true);
  });

  it('should have the function or', () => {
    const none = Optional.none();
    const orResult = none.or(Optional.some(1));

    expect(orResult.isSome()).toEqual(true);
    expect(orResult.unwrap()).toEqual(1);
    expect(none.or(Optional.none()).isNone()).toEqual(true);

    const nothing = () => Optional.none();
    const something = () => Optional.some(1);

    expect(none.or(nothing).isNone()).toEqual(true);
    expect(none.or(something).isSome()).toEqual(true);

    const result = none.or(() => Optional.some('foobar'));
    expect(result.isSome()).toEqual(true);
    expect(result.unwrap()).toEqual('foobar');
  });

  it('should have the function flatMap', () => {
    const none = Optional.none();

    const nothing = () => Optional.none();
    const something = () => Optional.some(1);

    expect(none.flatMap(nothing).isNone()).toEqual(true);
    expect(none.flatMap(something).isNone()).toEqual(true);
  });

  it('should have the function ap', () => {
    const makeDivider = (x: number) => {
      if (x === 0) {
        return Optional.none();
      }
      const divider = (y: number) => y / x;
      return Optional.some(divider);
    };

    const div2 = makeDivider(2);
    const div0 = makeDivider(0);

    const none = Optional.none();

    const maybe = none.ap(div2);
    expect(maybe.isNone()).toEqual(true);

    const three = none.ap(div0);
    expect(three.isNone()).toEqual(true);
  });

  it('should have the function match', () => {
    const none = Optional.none();

    expect(none.match({
      some: () => 1,
      none: () => 0,
    })).toEqual(0);
  });

  it('should have the function filter', () => {
    const none = Optional.none();
    const filtered = none.filter(x => x > 0);
    expect(filtered.isSome()).toEqual(false);
  });

  it('should have the function forEach', () => {
    const none = Optional.none();
    let val = 0;

    none.forEach(x => val = x);
    expect(val).toEqual(0);
  });

  it('should have the function toArray', () => {
    const none = Optional.none();

    const data = none.toArray();
    expect(data.length).toEqual(0);
  });
});
