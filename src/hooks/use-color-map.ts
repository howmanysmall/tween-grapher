import { useMemo, useRef } from "react";
import EasingFunctions from "../meta/easing-functions";
import getRandomColor from "../utilities/get-random-color";

export default function useColorMap(easingFunctions: ReadonlyArray<EasingFunctions>, saturation = 0.5, value = 0.95) {
	const colorMapReference = useRef({} as Record<EasingFunctions, string>);

	useMemo(
		function memoizeColorMap() {
			for (const easingFunction of easingFunctions)
				if (!colorMapReference.current[easingFunction])
					colorMapReference.current[easingFunction] = getRandomColor(saturation, value);
		},
		[easingFunctions, saturation, value],
	);

	return colorMapReference.current;
}
