import React, { useCallback } from "react";
import EasingFunctions, { castToEasingFunction } from "../meta/easing-functions";
import mapFiltered from "../utilities/map-filtered";
import { SelectItem, Select, type SelectedItems, Chip, type Selection } from "@nextui-org/react";
import { createSetSizeLimiter } from "../utilities/limit-set-size";

interface EasingFunctionData {
	readonly easingFunction: EasingFunctions;
	readonly name: string;
}

const limitToTwo = createSetSizeLimiter(2);

const ITEMS: ReadonlyArray<EasingFunctionData> = mapFiltered(
	Object.entries(EasingFunctions),
	([name, easingFunction]) => ({ easingFunction, name }),
);

export interface EasingSelectionProperties {
	readonly currentSelections: Set<EasingFunctions>;
	readonly onSelectionChanged?: (easingFunctions: Set<EasingFunctions>) => void;
}

export function EasingSelectionNoMemo({
	currentSelections,
	onSelectionChanged,
}: EasingSelectionProperties): React.ReactElement {
	const renderValue = useCallback(
		(items: SelectedItems<EasingFunctionData>) => (
			<div className="flex flex-wrap gap-2" key="RenderedItems">
				{items.map((item) => (
					<Chip key={item.key}>{item.data!.name}</Chip>
				))}
			</div>
		),
		[],
	);

	const onSelectionChange = useCallback(
		(keys: Selection) => {
			if (!onSelectionChanged) return;
			if (keys === "all") {
				console.warn("We do not support 'all'.");
				return;
			}

			const selection = new Set<EasingFunctions>();
			for (const key of keys)
				castToEasingFunction(key).match(
					(easingFunction) => selection.add(easingFunction),
					() => console.warn(`Skipping ${key} (could not cast)`),
				);

			onSelectionChanged(limitToTwo(selection));
		},
		[onSelectionChanged],
	);

	const renderChildren = useCallback(
		(easingFunctionData: EasingFunctionData) => (
			<SelectItem key={easingFunctionData.name} textValue={easingFunctionData.name}>
				<div className="flex gap-2 items-center" key="ContainerDiv">
					<span className="text-small" key="EasingFunctionName">
						{easingFunctionData.name}
					</span>
				</div>
			</SelectItem>
		),
		[],
	);

	return (
		<Select
			classNames={{
				base: "max-w-xs",
				trigger: "min-h-12 py-2",
			}}
			isMultiline
			items={ITEMS}
			label="Easing Functions"
			labelPlacement="outside"
			onSelectionChange={onSelectionChange}
			placeholder="Select Easing Function(s)"
			renderValue={renderValue}
			selectedKeys={currentSelections}
			selectionMode="multiple"
			variant="bordered"
		>
			{renderChildren}
		</Select>
	);
}

export const EasingSelection = React.memo(EasingSelectionNoMemo);
EasingSelection.displayName = "EasingSelection";
export default EasingSelection;
