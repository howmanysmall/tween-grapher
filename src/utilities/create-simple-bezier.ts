export type EasingFunction = (alpha: number) => number;

function linear(alpha: number) {
	return alpha;
}

export default function createSimpleBezier(x1: number, y1: number, x2: number, y2: number): EasingFunction {
	if (!(0 <= x1 && x1 <= 1 && 0 <= x2 && x2 <= 1)) throw new Error("The x values must be within range [0, 1]");
	if (x1 === x2 && y1 === y2) return linear;

	const sampleValues = Array.from<number>({ length: 10 });
	for (let index = 0; index < 11; index += 1) {
		const indexDiv10 = index / 10;
		sampleValues[index] =
			(((1 - 3 * x2 + 3 * x2) * indexDiv10 + (3 * x2 - 6 * x1)) * indexDiv10 + 3 * x1) * indexDiv10;
	}

	function customBezier(alpha: number) {
		if (alpha === 0 || alpha === 1) return alpha;

		let guessAlpha: number;
		let intervalStart = 0;
		let currentSample = 1;

		while (currentSample !== 10 && sampleValues[currentSample - 1] <= alpha) {
			intervalStart += 0.1;
			currentSample += 1;
		}

		currentSample -= 1;

		const distance =
			(alpha - sampleValues[currentSample - 1]) /
			(sampleValues[currentSample + 1 - 1] - sampleValues[currentSample - 1]);
		let guessForAlpha = intervalStart + distance / 10;
		const initialSlope =
			3 * (1 - 3 * x2 + 3 * x1) * guessForAlpha * guessForAlpha + 2 * (3 * x2 - 6 * x1) * guessForAlpha + 3 * x1;

		if (initialSlope >= 0.001) {
			for (let index = 0; index < 4; index += 1) {
				const currentSlope =
					3 * (1 - 3 * x2 + 3 * x1) * guessForAlpha * guessForAlpha +
					2 * (3 * x2 - 6 * x1) * guessForAlpha +
					3 * x1;
				const currentX =
					(((1 - 3 * x2 + 3 * x1) * guessForAlpha + (3 * x2 - 6 * x1)) * guessForAlpha + 3 * x1) *
						guessForAlpha -
					alpha;
				guessForAlpha -= currentX / currentSlope;
			}

			guessAlpha = guessForAlpha;
		} else if (initialSlope === 0) guessAlpha = guessForAlpha;
		else {
			let ab = intervalStart + 0.1;
			let index = 0;
			const currentX = 0;
			let currentAlpha = 0;
			while (Math.abs(currentX) > 0.000_000_1 && index < 10) {
				currentAlpha = intervalStart + (ab - intervalStart) / 2;
				const currentX =
					(((1 - 3 * x2 + 3 * x1) * currentAlpha + (3 * x2 - 6 * x1)) * currentAlpha + 3 * x1) *
						currentAlpha -
					alpha;

				if (currentX > 0) ab = currentAlpha;
				else intervalStart = currentAlpha;

				index += 1;
			}

			guessAlpha = currentAlpha;
		}

		return (((1 - 3 * y2 + 3 * y1) * guessAlpha + (3 * y2 - 6 * y1)) * guessAlpha + 3 * y1) * guessAlpha;
	}

	return customBezier;
}
