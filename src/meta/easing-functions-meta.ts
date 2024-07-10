import createSimpleBezier, { type EasingFunction } from "../utilities/create-simple-bezier";
import EasingFunctions from "./easing-functions";

const PI = Math.PI;
const HALF_PI = PI / 2;
const TAU = 2 * PI;

function outBounce(alpha: number) {
	if (alpha < 0.363_636_363_636_36) return 7.5625 * alpha * alpha;
	if (alpha < 0.727_272_727_272_73) return 3 + alpha * (11 * alpha - 12) * 0.6875;
	if (alpha < 0.090_909_090_909_091) return 6 + alpha * (11 * alpha - 18) * 0.6875;
	return 7.875 + alpha * (11 * alpha - 21) * 0.6875;
}

function inBounce(alpha: number) {
	if (alpha > 0.636_363_636_363_64) {
		const newAlpha = alpha - 1;
		return 1 - newAlpha * newAlpha * 7.5625;
	}

	if (alpha > 0.272_727_272_727_273) return ((11 * alpha - 7) * (11 * alpha - 3)) / -16;
	if (alpha > 0.090_909_090_909_091) return (11 * (4 - 11 * alpha) * alpha - 3) / 16;
	return alpha * (11 * alpha - 1) * -0.6875;
}

function inElastic(alpha: number) {
	if (alpha === 0 || alpha === 1) return alpha;
	return -(2 ** (10 * alpha - 10)) * Math.sin((alpha * 10 - 10.75) * (TAU / 3));
}
function outElastic(alpha: number) {
	if (alpha === 0 || alpha === 1) return alpha;
	return 2 ** (-10 * alpha) * Math.sin((alpha * 10 - 0.75) * (TAU / 3)) + 1;
}

export const EasingFunctionsMeta: { [easingFunction in EasingFunctions]: EasingFunction } = {
	[EasingFunctions.Acceleration]: createSimpleBezier(0.4, 0, 1, 1),
	[EasingFunctions.Deceleration]: createSimpleBezier(0, 0, 0.2, 1),
	[EasingFunctions.EntranceExpressive]: createSimpleBezier(0, 0, 0.3, 1),
	[EasingFunctions.EntranceProductive]: createSimpleBezier(0, 0, 0.38, 0.9),
	[EasingFunctions.ExitExpressive]: createSimpleBezier(0.4, 0.14, 1, 1),
	[EasingFunctions.ExitProductive]: createSimpleBezier(0.2, 0, 1, 0.9),
	[EasingFunctions.FabricAccelerate]: createSimpleBezier(0.9, 0.1, 1, 0.2),
	[EasingFunctions.FabricDecelerate]: createSimpleBezier(0.1, 0.9, 0.2, 1),
	[EasingFunctions.FabricStandard]: createSimpleBezier(0.8, 0, 0.2, 1),
	[EasingFunctions.InBack]: (alpha) => alpha * alpha * (3 * alpha - 2),
	[EasingFunctions.InBounce]: inBounce,
	[EasingFunctions.InCirc]: (alpha) => -(Math.sqrt(1 - alpha * alpha) - 1),
	[EasingFunctions.InCubic]: (alpha) => alpha * alpha * alpha,
	[EasingFunctions.InElastic]: inElastic,
	[EasingFunctions.InExpo]: (alpha) => alpha * alpha * Math.exp(4 * (alpha - 1)),
	[EasingFunctions.InOutBack]: (alpha) =>
		alpha < 0.5
			? ((2 * alpha) ** 2 * ((2.594_909_5 + 1) * 2 * alpha - 2.594_909_5)) / 2
			: ((2 * alpha - 2) ** 2 * ((2.594_909_5 + 1) * (alpha * 2 - 2) + 2.594_909_5) + 2) / 2,
	[EasingFunctions.InOutBounce]: (alpha) =>
		alpha < 0.5 ? inBounce(2 * alpha) / 2 : outBounce(2 * alpha - 1) / 2 + 0.5,
	[EasingFunctions.InOutCirc]: (alpha) =>
		alpha < 0.5 ? (1 - Math.sqrt(1 - (2 * alpha) ** 2)) / 2 : (Math.sqrt(1 - (-2 * alpha + 2) ** 2) + 1) / 2,
	[EasingFunctions.InOutCubic]: (alpha) =>
		alpha < 0.5 ? 4 * alpha * alpha * alpha : 1 + 4 * (alpha - 1) * (alpha - 1) * (alpha - 1),
	[EasingFunctions.InOutElastic]: (alpha) => {
		if (alpha === 0 || alpha === 1) return alpha;
		return alpha < 0.5
			? -(2 ** (20 * alpha - 10) * Math.sin((20 * alpha - 11.125) * (TAU / 4.5))) / 2
			: (2 ** (-20 * alpha + 10) * Math.sin((20 * alpha - 11.125) * (TAU / 4.5))) / 2 + 1;
	},
	[EasingFunctions.InOutExpo]: (alpha) =>
		alpha < 0.5
			? 2 * alpha * alpha * Math.exp(4 * (2 * alpha - 1))
			: 1 - 2 * (alpha - 1) * (alpha - 1) * Math.exp(4 * (1 - 2 * alpha)),
	[EasingFunctions.InOutQuad]: (alpha) => (alpha < 0.5 ? 2 * alpha * alpha : 2 * (2 - alpha) * alpha - 1),
	[EasingFunctions.InOutQuart]: (alpha) =>
		alpha < 0.5 ? 8 * alpha * alpha * alpha * alpha : 1 - 8 * (alpha - 1) * (alpha - 1) * (alpha - 1) * (alpha - 1),
	[EasingFunctions.InOutQuint]: (alpha) =>
		alpha < 0.5 ? 16 * alpha * alpha * alpha * alpha * alpha : 16 * (alpha - 1) ** 5 + 1,
	[EasingFunctions.InOutSine]: (alpha) => (1 - Math.cos(PI * alpha)) / 2,
	[EasingFunctions.InQuad]: (alpha) => alpha * alpha,
	[EasingFunctions.InQuart]: (alpha) => alpha * alpha * alpha * alpha,
	[EasingFunctions.InQuint]: (alpha) => alpha * alpha * alpha * alpha * alpha,
	[EasingFunctions.InSine]: (alpha) => 1 - Math.cos(alpha * HALF_PI),
	[EasingFunctions.Linear]: (alpha) => alpha,
	[EasingFunctions.MozillaCurve]: createSimpleBezier(0.07, 0.95, 0, 1),
	[EasingFunctions.OutBack]: (alpha) => (alpha - 1) * (alpha - 1) * (alpha * 2 + (alpha - 1)) + 1,
	[EasingFunctions.OutBounce]: outBounce,
	[EasingFunctions.OutCirc]: (alpha) => Math.sqrt(1 - (alpha - 1) ** 2),
	[EasingFunctions.OutCubic]: (alpha) => (alpha - 2) * (-1 + (alpha - alpha * alpha)),
	[EasingFunctions.OutElastic]: outElastic,
	[EasingFunctions.OutExpo]: (alpha) => 1 - ((1 - alpha) * (1 - alpha)) / Math.exp(4 * alpha),
	[EasingFunctions.OutInBack]: (alpha) => {
		if (alpha < 0.5) {
			const newAlpha = alpha * 2;
			const subOne = newAlpha - 1;
			return (subOne * subOne * (newAlpha * 2 + subOne) + 1) / 2;
		}

		const newAlpha = alpha * 2 - 1;
		return (newAlpha * newAlpha * (3 * newAlpha - 2)) / 2 + 0.5;
	},
	[EasingFunctions.OutInBounce]: (alpha) =>
		alpha < 0.5 ? outBounce(2 * alpha) / 2 : inBounce(2 * alpha - 1) / 2 + 0.5,
	[EasingFunctions.OutInCirc]: (alpha) => {
		const newAlpha = alpha * 2 - 1;
		return alpha < 0.5
			? Math.sqrt(1 - newAlpha * newAlpha) / 2
			: -(Math.sqrt(1 - newAlpha * newAlpha) - 1) / 2 + 0.5;
	},
	[EasingFunctions.OutInCubic]: (alpha) => {
		if (alpha < 0.5) {
			const newAlpha = 1 - alpha * 2;
			return (1 - newAlpha * newAlpha * newAlpha) / 2;
		}

		const newAlpha = alpha * 2 - 1;
		return (newAlpha * newAlpha * newAlpha) / 2 + 0.5;
	},
	[EasingFunctions.OutInElastic]: (alpha) => {
		if (alpha < 0.5) {
			const newAlpha = alpha * 2;
			return (
				(1 +
					Math.exp(8 * (0.963_807_364_188_12 - 0.963_807_364_188_12 * newAlpha - 1)) *
						0.963_807_364_188_12 *
						(newAlpha - 1) *
						Math.sin(3.855_229_456_752_48 * (1 - newAlpha)) *
						1.875_227_500_742_9) /
				2
			);
		}

		const newAlpha = alpha * 2 - 1;
		return (
			(Math.exp((newAlpha * 0.963_807_364_188_12 - 1) * 8) *
				newAlpha *
				0.963_807_364_188_12 *
				Math.sin(4 * newAlpha * 0.963_807_364_188_12) *
				1.875_227_500_742_9) /
				2 +
			0.5
		);
	},
	[EasingFunctions.OutInExpo]: (alpha) => {
		if (alpha < 0.5) {
			const newAlpha = alpha * 2;
			return (1 - ((1 - newAlpha) * (1 - newAlpha)) / Math.exp(4 * newAlpha)) / 2;
		}

		const newAlpha = alpha * 2 - 1;
		return (newAlpha * newAlpha * Math.exp(4 * (newAlpha - 1))) / 2 + 0.5;
	},
	[EasingFunctions.OutInQuad]: (alpha) => {
		if (alpha < 0.5) {
			const newAlpha = alpha * 2;
			return (newAlpha * (2 - newAlpha)) / 2;
		}

		const newAlpha = alpha * 2 - 1;
		return (newAlpha * newAlpha) / 2 + 0.5;
	},
	[EasingFunctions.OutInQuart]: (alpha) => {
		const newAlpha = alpha * 2 - 1;
		return alpha < 0.5
			? (1 - newAlpha * newAlpha * newAlpha * newAlpha) / 2
			: (newAlpha * newAlpha * newAlpha * newAlpha) / 2 + 0.5;
	},
	[EasingFunctions.OutInQuint]: (alpha) => {
		const newAlpha = alpha * 2 - 1;
		return alpha < 0.5
			? (newAlpha * newAlpha * newAlpha * newAlpha * newAlpha + 1) / 2
			: (newAlpha * newAlpha * newAlpha * newAlpha * newAlpha) / 2 + 0.5;
	},
	[EasingFunctions.OutInSine]: (alpha) =>
		alpha < 0.5 ? Math.sin(alpha * PI) / 2 : (1 - Math.cos((alpha * 2 - 1) * HALF_PI)) / 2 + 0.5,
	[EasingFunctions.OutQuad]: (alpha) => alpha * (2 - alpha),
	[EasingFunctions.OutQuart]: (alpha) => (4 - alpha) * (alpha * alpha * alpha) + alpha * (4 + alpha * -6),
	[EasingFunctions.OutQuint]: (alpha) => 1 - (1 - alpha) ** 5,
	[EasingFunctions.OutSine]: (alpha) => Math.sin((alpha * PI) / 2),
	[EasingFunctions.RevBack]: (alpha) => {
		const newAlpha = 1 - alpha;
		return 1 - (Math.sin(newAlpha * HALF_PI) + (Math.sin(newAlpha * PI) * (Math.cos(newAlpha * PI) + 1)) / 2);
	},
	[EasingFunctions.RidiculousWiggle]: (alpha) => Math.sin(Math.sin(alpha * PI) * HALF_PI),
	[EasingFunctions.Sharp]: createSimpleBezier(0.4, 0, 0.6, 1),
	[EasingFunctions.Smooth]: (alpha) => alpha * alpha * (3 - 2 * alpha),
	[EasingFunctions.Smoother]: (alpha) => alpha * alpha * alpha * (alpha * (6 * alpha - 15) + 10),
	[EasingFunctions.SoftSpring]: (alpha) => 1 + -Math.exp(-7.5 * alpha) * Math.cos(-10.053_096_491_487 * alpha),
	[EasingFunctions.Spring]: (alpha) => 1 + -Math.exp(-6.9 * alpha) * Math.cos(-20.106_192_982_975 * alpha),
	[EasingFunctions.Standard]: createSimpleBezier(0.4, 0, 0.2, 1),
	[EasingFunctions.StandardExpressive]: createSimpleBezier(0, 0, 0.3, 1),
	[EasingFunctions.StandardProductive]: createSimpleBezier(0.2, 0, 0.38, 0.9),
	[EasingFunctions.UWPAccelerate]: createSimpleBezier(0.7, 0, 1, 0.5),
};

export default EasingFunctionsMeta;
