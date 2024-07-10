import { useAtom } from "jotai";
import EasingSelection from "./components/easing-selection";
import selectedEasingFunctions from "./states/selected-easing-functions";
import { useCallback } from "react";
import EasingFunctions, { castToEasingFunction } from "./meta/easing-functions";
import GraphedTweens from "./components/graphed-tweens";

export function App() {
	const [easingFunctions, setEasingFunctions] = useAtom(selectedEasingFunctions);

	const onSelectionChanged = useCallback(
		(easingFunctions: Set<EasingFunctions>) => {
			const mappedEasingFunctions = new Set<EasingFunctions>();
			for (const easingFunction of easingFunctions)
				castToEasingFunction(easingFunction).match(
					(easingFunction) => mappedEasingFunctions.add(easingFunction),
					() => console.warn(`Skipping ${easingFunction} (could not cast)`),
				);

			setEasingFunctions(mappedEasingFunctions);
		},
		[setEasingFunctions],
	);

	return (
		<>
			<EasingSelection
				currentSelections={easingFunctions}
				key="Selections"
				onSelectionChanged={onSelectionChanged}
			/>
			<GraphedTweens easingFunctions={[...easingFunctions]} key="GraphedTweens" />
		</>
	);
}

export default App;
