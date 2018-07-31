export default abstract class Validation<T, E> {
  static success<A>(val: A): Validation<A, any> {
    return new Success(val);
  }
  static failure<A>(val: A): Validation<any, A> {
    return new Failure([val]);
  }

  abstract isSuccess(): boolean;
  abstract isFailure(): boolean;

  // can throw
  abstract unwrap(): T;
  // can throw
  abstract unwrapFailure(): Array<E>;

  abstract assert<U, F>(other: Validation<U, F>): Validation<T | U, E | F>;
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

  unwrap(): T {
    return this.value;
  }

  unwrapFailure(): any {
    throw new Error('Cannot call unwrapFailure on a Success instance.');
  }

  assert<U, F>(other: Validation<U, F>): Validation<T | U, F> {
    return other;
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

  unwrap(): any {
    throw new Error('Cannot call unwrap on a Failure instance.');
  }

  unwrapFailure(): Array<E> {
    return this.errors;
  }

  assert<U, F>(other: Validation<U, F>): Validation<U, E | F> {
    if (other.isSuccess()) {
      return new Failure(this.errors);
    }
    return new Failure([...this.errors, ...other.unwrapFailure()]);
  }
}
