/* eslint-disable unicorn/no-array-callback-reference */
import Option from "../classes/option";

export enum EasingFunctions {
	Acceleration = "Acceleration",
	Deceleration = "Deceleration",
	EntranceExpressive = "EntranceExpressive",
	EntranceProductive = "EntranceProductive",
	ExitExpressive = "ExitExpressive",
	ExitProductive = "ExitProductive",
	FabricAccelerate = "FabricAccelerate",
	FabricDecelerate = "FabricDecelerate",
	FabricStandard = "FabricStandard",
	InBack = "InBack",
	InBounce = "InBounce",
	InCirc = "InCirc",
	InCubic = "InCubic",
	InElastic = "InElastic",
	InExpo = "InExpo",
	InOutBack = "InOutBack",
	InOutBounce = "InOutBounce",
	InOutCirc = "InOutCirc",
	InOutCubic = "InOutCubic",
	InOutElastic = "InOutElastic",
	InOutExpo = "InOutExpo",
	InOutQuad = "InOutQuad",
	InOutQuart = "InOutQuart",
	InOutQuint = "InOutQuint",
	InOutSine = "InOutSine",
	InQuad = "InQuad",
	InQuart = "InQuart",
	InQuint = "InQuint",
	InSine = "InSine",
	Linear = "Linear",
	MozillaCurve = "MozillaCurve",
	OutBack = "OutBack",
	OutBounce = "OutBounce",
	OutCirc = "OutCirc",
	OutCubic = "OutCubic",
	OutElastic = "OutElastic",
	OutExpo = "OutExpo",
	OutInBack = "OutInBack",
	OutInBounce = "OutInBounce",
	OutInCirc = "OutInCirc",
	OutInCubic = "OutInCubic",
	OutInElastic = "OutInElastic",
	OutInExpo = "OutInExpo",
	OutInQuad = "OutInQuad",
	OutInQuart = "OutInQuart",
	OutInQuint = "OutInQuint",
	OutInSine = "OutInSine",
	OutQuad = "OutQuad",
	OutQuart = "OutQuart",
	OutQuint = "OutQuint",
	OutSine = "OutSine",
	RevBack = "RevBack",
	RidiculousWiggle = "RidiculousWiggle",
	Sharp = "Sharp",
	Smooth = "Smooth",
	Smoother = "Smoother",
	SoftSpring = "SoftSpring",
	Spring = "Spring",
	Standard = "Standard",
	StandardExpressive = "StandardExpressive",
	StandardProductive = "StandardProductive",
	UWPAccelerate = "UWPAccelerate",
}

const ENTRIES = Object.entries(EasingFunctions);

export function castToEasingFunction(value: unknown): Option<EasingFunctions> {
	for (const [name, easingFunction] of ENTRIES)
		if (value === easingFunction || value === name) return Option.some(easingFunction as EasingFunctions);

	return Option.none();
}

export default EasingFunctions;
