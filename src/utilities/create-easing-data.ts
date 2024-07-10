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
