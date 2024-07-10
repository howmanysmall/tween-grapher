export default function zipArrays<T extends ReadonlyArray<Array<unknown>>>(...arrays: T) {
	const arraysCount = arrays.length;
	const result = new Array<{
		[K in keyof T]: T[K] extends Array<infer V> ? V : never;
	}>();

	if (arraysCount === 0) return result;

	// eslint-disable-next-line unicorn/no-array-reduce
	const minimumLength = arrays.reduce((accumulator, value) => Math.min(accumulator, value.length), arrays[0].length);

	for (let index = 0; index < minimumLength; index += 1) {
		const values = new Array<unknown>();
		for (const argumentArray of arrays) values.push(argumentArray[index]);
		result.push(values as { [K in keyof T]: T[K] extends Array<infer V> ? V : never });
	}

	return result;
}
