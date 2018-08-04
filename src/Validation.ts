import OptionT from "./OptionT";

export default abstract class Validation<T, E> {
  static success<A>(val: A): Validation<A, any> {
    return new Success(val);
  }
  static failure<A>(val: A): Validation<any, A> {
    return new Failure([val]);
  }

  abstract isSuccess(): boolean;
  abstract isFailure(): boolean;

  abstract getSuccess(): OptionT<T>;
  abstract getFailure(): OptionT<Array<E>>;

  // todo: add assertWith: looks like flat map, but aggregates errors like assert
  abstract assert(other: Validation<T, E>): Validation<T, E>;
  abstract flatMap(func: (val: T) => Validation<T, E>): Validation<T, E>;

  abstract or(other: Validation<T, E>): Validation<T, E>;
  abstract orElse(func: (errors: Array<E>) => Validation<T, E>): Validation<T, E>;

  abstract mapSuccess<U>(func: (val: T) => U): Validation<U, E>;
  abstract mapFailure<F>(func: (errors: Array<E>) => F): Validation<T, F>;
}

class Success<T> extends Validation<T, any> {
  private value: T;

  constructor(val: T) {
    super();
    this.value = val;
  }

  isSuccess(): boolean {
    return true;
  }

  isFailure(): boolean {
    return false;
  }

  getSuccess(): OptionT<T> {
    return OptionT.some(this.value);
  }

  getFailure(): OptionT<Array<any>> {
    return OptionT.none();
  }

  assert(other: Validation<T, any>): Validation<T, any> {
    return other;
  }

  flatMap(func: (val: T) => Validation<T, any>): Validation<T, any> {
    return func(this.value);
  }

  or(other: Validation<T, any>): Validation<T, any> {
    return this;
  }

  orElse(func: (errors: Array<any>) => Validation<T, any>): Validation<T, any> {
    return this;
  }

  mapSuccess<U>(func: (val: T) => U): Validation<U, any> {
    return Validation.success(func(this.value));
  }

  mapFailure<F>(func: (errors: Array<any>) => F): Validation<T, F> {
    return Validation.success(this.value);
  }
}

class Failure<E> extends Validation<any, E> {
  private errors: Array<E>;

  constructor(errs: Array<E>) {
    super();
    this.errors = errs;
  }

  isSuccess(): boolean {
    return false;
  }

  isFailure(): boolean {
    return true;
  }

  getSuccess(): OptionT<any> {
    return OptionT.none();
  }

  getFailure(): OptionT<Array<E>> {
    return OptionT.some(this.errors);
  }

  assert(other: Validation<any, E>): Validation<any, E> {
    return other.getFailure().match({
      some: (errors) => {
        return new Failure([...this.errors, ...errors]);
      },
      none: () => {
        return new Failure(this.errors);
      },
    });
  }

  flatMap(func: (val: any) => Validation<any, E>): Validation<any, E> {
    return new Failure(this.errors);
  }

  or(other: Validation<any, E>): Validation<any, E> {
    return other;
  }

  orElse(func: (errors: Array<E>) => Validation<any, E>): Validation<any, E> {
    return func(this.errors);
  }

  mapSuccess<U>(func: (val: any) => U): Validation<U, any> {
    return new Failure(this.errors);
  }

  mapFailure<F>(func: (errors: Array<E>) => F): Validation<any, F> {
    return Validation.failure(func(this.errors));
  }
}
