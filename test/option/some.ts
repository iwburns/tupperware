import 'mocha';
import { OptionT } from '../../src/index';
import { expect } from 'chai';

describe('#OptionT', () => {
  it('should be an object with some', () => {
    expect(OptionT)
      .to.be.a('object')
      .that.has.property('some');

    expect(OptionT.some).to.be.a('function');
  });
});

describe('#OptionT.some', () => {
  it('should have the function isSome', () => {
    const one = OptionT.some(1);

    expect(one)
      .to.be.a('object')
      .that.has.property('isSome');

    expect(one.isSome).to.be.a('function');
    expect(one.isSome()).to.be.true;
  });

  it('should have the function isNone', () => {
    const one = OptionT.some(1);

    expect(one)
      .to.be.a('object')
      .that.has.property('isNone');

    expect(one.isNone).to.be.a('function');
    expect(one.isNone()).to.be.false;
  });

  it('should have the function expect', () => {
    const one = OptionT.some(1);

    expect(one)
      .to.be.a('object')
      .that.has.property('expect');

    expect(one.expect).to.be.a('function');
    expect(one.expect('it failed')).to.equal(1);
  });

  it('should have the function unwrap', () => {
    const one = OptionT.some(1);

    expect(one)
      .to.be.a('object')
      .that.has.property('unwrap');

    expect(one.unwrap).to.be.a('function');
    expect(one.unwrap()).to.equal(1);
  });

  it('should have the function unwrapOr', () => {
    const one = OptionT.some(1);

    expect(one)
      .to.be.a('object')
      .that.has.property('unwrapOr');

    expect(one.unwrapOr).to.be.a('function');
    expect(one.unwrapOr(10)).to.equal(1);
  });

  it('should have the function unwrapOrElse', () => {
    const one = OptionT.some(1);

    expect(one)
      .to.be.a('object')
      .that.has.property('unwrapOrElse');

    expect(one.unwrapOrElse).to.be.a('function');
    expect(one.unwrapOrElse(() => 2)).to.equal(1);
  });

  it('should have the function map', () => {
    const one = OptionT.some(1);

    expect(one)
      .to.be.a('object')
      .that.has.property('map');
    expect(one.map).to.be.a('function');

    const two = one.map((val) => 2);

    expect(two)
      .to.be.a('object')
      .that.has.property('isSome');
    expect(two.isSome).to.be.a('function');
    expect(two.isSome()).to.equal(true);

    expect(two).to.have.property('unwrap');
    expect(two.unwrap).to.be.a('function');
    expect(two.unwrap()).to.equal(2);

    const three = one.map(() => null);

    expect(three)
      .to.be.a('object')
      .that.has.property('isSome');
    expect(three.isSome).to.be.a('function');
    expect(three.isSome()).to.equal(false);

    const four = one.map(() => {return;});

    expect(four)
      .to.be.a('object')
      .that.has.property('isSome');
    expect(four.isSome).to.be.a('function');
    expect(four.isSome()).to.equal(false);
  });

  it('should have the function and', () => {
    const one = OptionT.some(1);

    expect(one)
      .to.be.a('object')
      .that.has.property('and');
    expect(one.and).to.be.a('function');

    const two = OptionT.some(2);
    const maybeTwo = one.and(two);

    expect(maybeTwo)
      .to.be.a('object')
      .that.has.property('isSome');

    expect(maybeTwo.isSome).to.be.a('function');
    expect(maybeTwo.isSome()).to.equal(true);

    expect(maybeTwo).to.have.property('unwrap');
    expect(maybeTwo.unwrap).to.be.a('function');
    expect(maybeTwo.unwrap()).to.equal(2);

    const none = OptionT.none();
    const maybeThree = one.and(none);

    expect(maybeThree)
      .to.be.a('object')
      .that.has.property('isSome');

    expect(maybeThree.isSome).to.be.a('function');
    expect(maybeThree.isSome()).to.equal(false);
  });

  it('should have the function flatMap', () => {
    const one = OptionT.some(1);

    expect(one)
      .to.be.a('object')
      .that.has.property('flatMap');
    expect(one.flatMap).to.be.a('function');

    const maybeTwo = one.flatMap((val) => {
      return OptionT.some(val * 2);
    });

    expect(maybeTwo)
      .to.be.a('object')
      .that.has.property('isSome');

    expect(maybeTwo.isSome).to.be.a('function');
    expect(maybeTwo.isSome()).to.equal(true);

    expect(maybeTwo).to.have.property('unwrap');
    expect(maybeTwo.unwrap).to.be.a('function');
    expect(maybeTwo.unwrap()).to.equal(2);

    const maybeThree = one.flatMap(() => {
      return OptionT.none();
    });

    expect(maybeThree)
      .to.be.a('object')
      .that.has.property('isSome');

    expect(maybeThree.isSome).to.be.a('function');
    expect(maybeThree.isSome()).to.equal(false);
  });

  it('should have the function or', () => {
    const one = OptionT.some(1);

    expect(one)
      .to.be.a('object')
      .that.has.property('or');
    expect(one.or).to.be.a('function');

    const two = OptionT.some(2);
    const maybeOne = one.or(two);

    expect(maybeOne)
      .to.be.a('object')
      .that.has.property('isSome');

    expect(maybeOne.isSome).to.be.a('function');
    expect(maybeOne.isSome()).to.equal(true);

    expect(maybeOne).to.have.property('unwrap');
    expect(maybeOne.unwrap).to.be.a('function');
    expect(maybeOne.unwrap()).to.equal(1);

    const three = OptionT.none();
    const maybeOneAgain = one.or(three);

    expect(maybeOneAgain)
      .to.be.a('object')
      .that.has.property('isSome');

    expect(maybeOneAgain.isSome).to.be.a('function');
    expect(maybeOneAgain.isSome()).to.equal(true);

    expect(maybeOneAgain).to.have.property('unwrap');
    expect(maybeOneAgain.unwrap).to.be.a('function');
    expect(maybeOneAgain.unwrap()).to.equal(1);
  });

  it('should have the function orElse', () => {
    const one = OptionT.some(1);

    expect(one)
      .to.be.a('object')
      .that.has.property('orElse');
    expect(one.orElse).to.be.a('function');

    const maybeOne = one.orElse(() => OptionT.some(2));

    expect(maybeOne)
      .to.be.a('object')
      .that.has.property('isSome');

    expect(maybeOne.isSome).to.be.a('function');
    expect(maybeOne.isSome()).to.equal(true);

    expect(maybeOne).to.have.property('unwrap');
    expect(maybeOne.unwrap).to.be.a('function');
    expect(maybeOne.unwrap()).to.equal(1);

    const maybeOneAgain = one.orElse(() => OptionT.none());

    expect(maybeOneAgain)
      .to.be.a('object')
      .that.has.property('isSome');

    expect(maybeOneAgain.isSome).to.be.a('function');
    expect(maybeOneAgain.isSome()).to.equal(true);

    expect(maybeOneAgain).to.have.property('unwrap');
    expect(maybeOneAgain.unwrap).to.be.a('function');
    expect(maybeOneAgain.unwrap()).to.equal(1);
  });

  it('should have the function match', () => {
    const one = OptionT.some(1);

    expect(one)
      .to.be.a('object')
      .that.has.property('match');
    expect(one.match).to.be.a('function');

    const doubled = one.match({
      some: (val) => val * 2,
      none: () => 0,
    });

    expect(doubled).to.be.a('number');
    expect(doubled).to.equal(2);

    let three = 0;
    one.match({
      some: () => {three = 3;},
      none: () => {},
    });

    expect(three).to.equal(3);
  });

  it('should have the function toString', () => {
    const one = OptionT.some(1);

    expect(one)
      .to.be.a('object')
      .that.has.property('toString');
    expect(one.toString).to.be.a('function');
    expect(one.toString()).to.equal('Some( 1 )');
  });


});
