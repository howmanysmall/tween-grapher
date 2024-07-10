import { noNull } from "../null-utilities";
import type { Token } from "./types";

const TOKEN_RULE =
	/(?:%(?<flag>([+0-]|-\+))?(?<width>\d+)?(?<position>\d+\$)?(?<precision>\.\d+)?(?<conversion>[%BCESXb-joqsux]))|(\\%)/g;

export default function tokenize(subject: string): ReadonlyArray<Token> {
	const tokens = new Array<Token>();
	let matchResult: RegExpExecArray | undefined;
	let argumentIndex = 0;
	let lastIndex = 0;
	let lastToken: Token | undefined = undefined;

	while ((matchResult = noNull(TOKEN_RULE.exec(subject))) !== undefined) {
		if (matchResult.index > lastIndex)
			tokens.push(
				(lastToken = {
					literal: subject.slice(lastIndex, matchResult.index),
					type: "literal",
				}),
			);

		const match = matchResult[0];
		lastIndex = matchResult.index + match.length;

		if (match === String.raw`\%` || match === "%%") {
			if (lastToken && lastToken.type === "literal") lastToken.literal += "%";
			else
				tokens.push(
					(lastToken = {
						literal: "%",
						type: "literal",
					}),
				);
		} else if (matchResult.groups)
			tokens.push(
				(lastToken = {
					conversion: matchResult.groups.conversion,
					flag: (matchResult.groups.flag as never) || undefined,
					placeholder: match,
					position: matchResult.groups.position
						? Number.parseInt(matchResult.groups.position, 10) - 1
						: argumentIndex++,

					precision: matchResult.groups.precision
						? Number.parseInt(matchResult.groups.precision.slice(1), 10)
						: undefined,

					type: "placeholder",
					width: matchResult.groups.width ? Number.parseInt(matchResult.groups.width, 10) : undefined,
				}),
			);
	}

	if (lastIndex <= subject.length - 1) {
		if (lastToken && lastToken.type === "literal") lastToken.literal += subject.slice(lastIndex);
		else
			tokens.push({
				literal: subject.slice(lastIndex),
				type: "literal",
			});
	}

	return tokens;
}
