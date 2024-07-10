export default function mapFiltered<T, U>(
	array: Array<T>,
	callback: (value: T, index: number, array: Array<T>) => U | undefined,
) {
	return array
		.map((element, index, array) => callback(element, index, array))
		.filter((value) => value !== undefined) as Array<U>;
}
