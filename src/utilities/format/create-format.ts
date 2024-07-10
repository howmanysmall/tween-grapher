import toBoolean from "../to-boolean";
import tokenize from "./tokenize";
import type { Flag, PlaceholderToken, Token } from "./types";

type FormatUnboundExpression = (
	subject: string,
	token: PlaceholderToken,
	boundValues: ReadonlyArray<unknown>,
) => string;

const formatDefaultUnboundExpression = (_subject: string, token: PlaceholderToken): string => token.placeholder;

interface Configuration {
	formatUnboundExpression: FormatUnboundExpression;
}

type Format = (subject: string, ...boundValues: ReadonlyArray<unknown>) => string;

function padValue(value: string, width: number | undefined, flag?: Flag): string {
	width = width === undefined ? 0 : width;

	switch (flag) {
		case "-": {
			return value.padEnd(width, " ");
		}

		case "-+": {
			return ((Number(value) >= 0 ? "+" : "") + value).padEnd(width, " ");
		}

		case "+": {
			return ((Number(value) >= 0 ? "+" : "") + value).padStart(width, " ");
		}

		case "0": {
			return value.padStart(width, "0");
		}

		default: {
			return value.padStart(width, " ");
		}
	}
}

function addQuoted(value: string) {
	let length = value.length;
	const buffer = Array.from<string>({ length: length + 2 });
	buffer.push('"');

	let index = 0;

	while (length--) {
		const character = value[index];
		switch (character) {
			case '"':
			case "\\":
			case "\n": {
				buffer.push("\\", character);
				break;
			}

			case "\r": {
				buffer.push(String.raw`\r`);
				break;
			}

			case "\0": {
				buffer.push(String.raw`\000`);
				break;
			}

			default: {
				buffer.push(character);
				break;
			}
		}

		index += 1;
	}

	buffer.push('"');
	return buffer.join("");
}

export default function createFormat(configuration?: Configuration): Format {
	const formatUnboundExpression = configuration?.formatUnboundExpression ?? formatDefaultUnboundExpression;

	const cache: Record<string, Array<Token>> = {}; // eslint-disable-next-line complexity

	return (subject: string, ...boundValues: Array<any>): string => {
		let tokens = cache[subject];
		if (!tokens) tokens = cache[subject] = tokenize(subject);

		let result = "";

		for (const token of tokens)
			if (token.type === "literal") result += token.literal;
			else {
				let boundValue = boundValues[token.position];

				if (boundValue === undefined) result += formatUnboundExpression(subject, token, boundValues);
				else
					switch (token.conversion) {
						case "b": {
							result += toBoolean(boundValue) ? "true" : "false";
							break;
						}

						case "B": {
							result += toBoolean(boundValue) ? "TRUE" : "FALSE";
							break;
						}

						case "c": {
							result += boundValue;
							break;
						}

						case "C": {
							result += String(boundValue).toUpperCase();
							break;
						}

						case "i":
						case "d": {
							boundValue = String(Math.trunc(boundValue));
							if (token.width !== undefined) {
								boundValue = padValue(boundValue, token.width, token.flag);
							}

							result += boundValue;
							break;
						}

						case "e": {
							result += Number(boundValue).toExponential();
							break;
						}

						case "E": {
							result += Number(boundValue).toExponential().toUpperCase();
							break;
						}

						case "f": {
							if (token.precision !== undefined) {
								boundValue = Number(boundValue).toFixed(token.precision);
							}

							if (token.width !== undefined) {
								boundValue = padValue(String(boundValue), token.width, token.flag);
							}

							result += boundValue;
							break;
						}

						case "o": {
							result += (Number.parseInt(String(boundValue), 10) >>> 0).toString(8);

							break;
						}

						case "s": {
							if (token.width !== undefined)
								boundValue = padValue(String(boundValue), token.width, token.flag);

							result += boundValue;
							break;
						}

						case "S": {
							if (token.width !== undefined)
								boundValue = padValue(String(boundValue), token.width, token.flag);

							result += String(boundValue).toUpperCase();
							break;
						}

						case "u": {
							result += Number.parseInt(String(boundValue), 10) >>> 0;
							break;
						}

						case "x": {
							boundValue = (Number.parseInt(String(boundValue), 10) >>> 0).toString(16);

							if (token.width !== undefined)
								boundValue = padValue(String(boundValue), token.width, token.flag);

							result += boundValue;
							break;
						}

						case "X": {
							boundValue = (Number.parseInt(String(boundValue), 10) >>> 0).toString(16).toUpperCase();

							if (token.width !== undefined)
								boundValue = padValue(String(boundValue), token.width, token.flag);

							result += boundValue;
							break;
						}

						case "j": {
							result += JSON.stringify(boundValue);
							break;
						}

						case "J": {
							result += JSON.stringify(boundValue, undefined, 4);
							break;
						}

						case "q": {
							result += addQuoted(boundValue);
							break;
						}

						default: {
							throw new Error("Unknown format specifier.");
						}
					}
			}

		return result;
	};
}
