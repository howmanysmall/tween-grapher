const STRING_ARRAY = new Set(["true", "t", "yes", "y", "on", "1"]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function toBoolean(value: any): boolean {
	switch (Object.prototype.toString.call(value)) {
		case "[object String]": {
			return STRING_ARRAY.has(value.trim().toLowerCase());
		}

		case "[object Number]": {
			return value.valueOf() === 1;
		}

		case "[object Boolean]": {
			return value.valueOf();
		}

		default: {
			return false;
		}
	}
}
