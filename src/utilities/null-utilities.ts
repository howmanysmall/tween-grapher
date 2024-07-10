export function noNull<T>(value?: T | null): T | undefined {
	if (value === null || value === undefined) return undefined;
	return value;
}

export function isNull<T>(value?: T | null): value is null {
	return value === null || value === undefined;
}
