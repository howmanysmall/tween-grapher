export function limitSetSize<T>(set: Set<T>, maxSize: number) {
	const newSet = new Set<T>();
	let length = 0;

	for (const item of set) {
		if (length >= maxSize) break;
		newSet.add(item);
		length += 1;
	}

	return newSet;
}

export function createSetSizeLimiter(maxSize: number) {
	return function limitSetSize<T>(set: Set<T>) {
		const newSet = new Set<T>();
		let length = 0;

		for (const item of set) {
			if (length >= maxSize) break;
			newSet.add(item);
			length += 1;
		}

		return newSet;
	};
}
