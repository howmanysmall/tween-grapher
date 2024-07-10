import React, { useCallback } from "react";
import type EasingFunctions from "../meta/easing-functions";
import { useSetAtom } from "jotai";
import selectedEasingFunctions from "../states/selected-easing-functions";
import { Chip } from "@nextui-org/react";

export interface RemovableChipProperties extends React.PropsWithChildren {
	readonly easingFunction: EasingFunctions;
}

export function RemovableChipNoMemo({ children, easingFunction }: RemovableChipProperties): React.ReactElement {
	const setSelectedEasingFunctions = useSetAtom(selectedEasingFunctions);
	const onClose = useCallback(
		() =>
			setSelectedEasingFunctions((easingFunctions) => {
				const newEasingFunctions = new Set(easingFunctions);
				if (newEasingFunctions.delete(easingFunction)) return newEasingFunctions;
				return easingFunctions;
			}),
		[easingFunction, setSelectedEasingFunctions],
	);

	return <Chip onClose={onClose}>{children}</Chip>;
}

export const RemovableChip = React.memo(RemovableChipNoMemo);
RemovableChip.displayName = "RemovableChip";
export default RemovableChip;
