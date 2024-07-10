/* eslint-disable unicorn/no-nested-ternary */
/* eslint-disable unicorn/no-negated-condition */
import type { defined } from "../types/utilities";

function asSomeString(value: unknown) {
	return `Option.some(${value})`;
}
function asNoneString() {
	return "Option.none";
}

export default class Option<T extends defined> {
	protected constructor(protected readonly value: T | undefined) {}

	public static none<T extends defined>(): Option<T> {
		return new Option<T>(undefined);
	}

	public static some<T extends defined>(value: T): Option<T> {
		return new Option<T>(value);
	}

	public static wrap<T extends defined>(value: T | undefined): Option<T> {
		return new Option<T>(value);
	}

	public isSome() {
		return this.value !== undefined;
	}

	public isNone() {
		return this.value === undefined;
	}

	public expect(message: unknown): T | never {
		if (this.value !== undefined) return this.value;

		throw message;
	}

	public unwrap(): T | never {
		return this.expect("called `Option.unwrap()` on a `None` value");
	}

	public unwrapOr(defaultValue: T): T {
		return this.value === undefined ? defaultValue : this.value;
	}

	public unwrapOrElse(getDefaultValue: () => T): T {
		return this.value === undefined ? getDefaultValue() : this.value;
	}

	public map<U extends defined>(map: (item: T) => U): Option<U> {
		return this.value === undefined ? Option.none() : Option.some(map(this.value));
	}

	public inspect(inspector: (item: T) => void): this {
		if (this.value !== undefined) inspector(this.value);
		return this;
	}

	public mapOr<U>(defaultValue: U, map: (item: T) => U): U {
		return this.value === undefined ? defaultValue : map(this.value);
	}

	public mapOrElse<U>(getDefaultValue: () => U, map: (item: T) => U): U {
		return this.value === undefined ? getDefaultValue() : map(this.value);
	}

	public and<U extends defined>(other: Option<U>): Option<U> {
		return this.isNone() ? Option.none() : other;
	}

	public andWith<U extends defined>(other: (value: T) => Option<U>): Option<U> {
		return this.value === undefined ? Option.none() : other(this.value);
	}

	public filter(predicate: (value: T) => boolean): Option<T> {
		return this.value === undefined
			? Option.none()
			: predicate(this.value)
				? // eslint-disable-next-line unicorn/no-array-callback-reference
					Option.some(this.value)
				: Option.none();
	}

	public or(other: Option<T>): Option<T> {
		// eslint-disable-next-line unicorn/no-array-callback-reference
		return this.value === undefined ? other : Option.some(this.value);
	}

	public orElse(other: () => Option<T>): Option<T> {
		// eslint-disable-next-line unicorn/no-array-callback-reference
		return this.value === undefined ? other() : Option.some(this.value);
	}

	public xor(other: Option<T>): Option<T> {
		return this.value !== undefined
			? other.value !== undefined
				? Option.none()
				: // eslint-disable-next-line unicorn/no-array-callback-reference
					Option.some(this.value)
			: other.value !== undefined
				? // eslint-disable-next-line unicorn/no-array-callback-reference
					Option.some(other.value)
				: Option.none();
	}

	public zip<U extends defined>(other: Option<U>): Option<[T, U]> {
		if (this.value !== undefined && other.value !== undefined) return Option.some([this.value, other.value as U]);

		return Option.none();
	}

	public zipWith<U extends defined, R extends defined>(other: Option<U>, zipIt: (self: T, other: U) => R): Option<R> {
		if (this.value !== undefined && other.value !== undefined)
			return Option.some(zipIt(this.value, other.value as U));

		return Option.none();
	}

	public copied(): Option<T> {
		return Option.wrap(this.value);
	}

	public cloned(this: Option<{ cloned: () => T }>): Option<T> {
		return this.map((index) => index.cloned());
	}

	public flatten<I extends defined>(this: Option<Option<I>>): Option<I> {
		return this.value === undefined ? Option.none() : Option.wrap(this.value!.value);
	}

	/**
	 * Executes one of two callbacks based on the type of the contained value.
	 * Replacement for Rust's `match` expression.
	 * @param ifSome Callback executed when this Option contains a Some value.
	 * @param ifNone Callback executed when this Option contains a None value.
	 */
	public match<R>(ifSome: (value: T) => R, ifNone: () => R): R {
		return this.value === undefined ? ifNone() : ifSome(this.value);
	}

	/**
	 * Returns the contained value directly. Only meant for special cases like serialisation.
	 */
	public asPointer(): T | undefined {
		return this.value;
	}

	public toString() {
		return this.match(asSomeString, asNoneString);
	}
}
