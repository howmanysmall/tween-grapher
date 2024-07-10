export type Flag = "+" | "-" | "-+" | "0";

interface LiteralToken {
	literal: string;
	type: "literal";
}

export interface PlaceholderToken {
	conversion: string;
	flag?: Flag;
	placeholder: string;
	position: number;
	precision?: number;
	type: "placeholder";
	width?: number;
}

export type Token = LiteralToken | PlaceholderToken;
