import LFUCache from "../classes/lfu-cache";
import EasingFunctions from "../meta/easing-functions";
import EasingFunctionsMeta from "../meta/easing-functions-meta";

export type EasingData = Array<{
	readonly x: number;
	readonly y: number;
}>;
export type CombinedEasingData = Array<{
	readonly name: string;
	readonly x: number;
	readonly y: number;
}>;
const easingFunctionDataCache = new LFUCache<EasingFunctions, EasingData>(30);

export function createEasingData(easingFunction: EasingFunctions): EasingData {
	const cached = easingFunctionDataCache.get(easingFunction);
	if (cached) return cached;

	const metadata = EasingFunctionsMeta[easingFunction];
	if (!metadata) throw new Error(`Invalid easing function? (${easingFunction})`);

	const easingData: EasingData = Array.from({ length: 100 });
	for (let index = 0; index < 101; index += 1) {
		const x = index / 100;
		const y = metadata(x);
		easingData[index] = { x, y };
	}

	return easingData;
}

export function combineEasingFunctions(easingFunction0: EasingFunctions, easingFunction1: EasingFunctions) {
	const name0 = EasingFunctions[easingFunction0];
	const name1 = EasingFunctions[easingFunction1];

	const combinedEasingData: CombinedEasingData = Array.from({ length: 200 });
	let index = 0;

	for (const { x, y } of createEasingData(easingFunction0)) combinedEasingData[index++] = { name: name0, x, y };
	for (const { x, y } of createEasingData(easingFunction1)) combinedEasingData[index++] = { name: name1, x, y };

	return combinedEasingData;
}
