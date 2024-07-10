import React, { useMemo } from "react";
import EasingFunctions from "../meta/easing-functions";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { createEasingData, type EasingData } from "../utilities/create-easing-data";
import format from "../utilities/format";
import useColorMap from "../hooks/use-color-map";

function formatter(value: number, name: string) {
	return [format("%.2f", value), name];
}

interface GraphData {
	readonly easingData: EasingData;
	readonly easingFunction: EasingFunctions;
}

export interface GraphedTweensProperties {
	readonly easingFunctions: Array<EasingFunctions>;
}

export function GraphedTweensNoMemo({ easingFunctions }: GraphedTweensProperties): React.ReactElement {
	const graphData = useMemo((): ReadonlyArray<GraphData> => {
		const graphData = new Array<GraphData>();
		let length = 0;
		for (const easingFunction of easingFunctions)
			graphData[length++] = {
				easingData: createEasingData(easingFunction),
				easingFunction,
			};
		return graphData;
	}, [easingFunctions]);

	const colorMap = useColorMap(easingFunctions);
	const children = useMemo(
		() =>
			graphData.map(({ easingData, easingFunction }) => (
				<Line
					data={easingData}
					dataKey="y"
					dot={false}
					key={`Line-${easingFunction}`}
					label={easingFunction}
					name={easingFunction}
					stroke={colorMap[easingFunction]}
					strokeWidth={2}
					type="monotone"
				/>
			)),
		[colorMap, graphData],
	);

	return (
		<ResponsiveContainer height="100%" width="100%">
			<LineChart height={300} key="LineChart" margin={{ bottom: 5, left: 20, right: 30, top: 5 }} width={500}>
				<CartesianGrid key="Grid" strokeDasharray="3 3" />
				<Legend height={36} key="Legend" verticalAlign="top" />
				<YAxis
					allowDataOverflow
					dataKey="y"
					domain={["auto", "auto"]}
					interval={0}
					key="YAxis"
					label={{
						angle: -90,
						offset: 0,
						position: "left",
						style: { textAnchor: "middle" },
						value: "y",
					}}
					strokeWidth={1}
					type="number"
				/>
				<XAxis
					allowDataOverflow
					dataKey="x"
					domain={["auto", "auto"]}
					interval={0}
					label={{
						key: "xAxisLabel",
						position: "bottom",
						value: "x",
					}}
					strokeWidth={1}
					type="number"
				/>
				<Tooltip
					contentStyle={{ backgroundColor: "Background", border: "Border" }}
					formatter={formatter}
					key="Tooltip"
					labelClassName="text-foreground"
				/>
				{children}
			</LineChart>
		</ResponsiveContainer>
	);
}

export const GraphedTweens = React.memo(GraphedTweensNoMemo);
GraphedTweens.displayName = "GraphedTweens";
export default GraphedTweens;
