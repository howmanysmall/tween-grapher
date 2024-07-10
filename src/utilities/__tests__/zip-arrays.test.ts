import { test, expect, describe } from "bun:test";
import zipArrays from "../zip-arrays";

describe("zipArrays", () => {
	test("it should zip together two arrays", () => {
		const array0 = [1, 2, 3];
		const array1 = ["a", "b", "c"];

		const result = zipArrays(array0, array1);
		expect(result).toBeArrayOfSize(3);

		expect(result[0]).toBeArray();
		expect(result[0][0]).toBe(1);
		expect(result[0][1]).toBe("a");

		expect(result[1]).toBeArray();
		expect(result[1][0]).toBe(2);
		expect(result[1][1]).toBe("b");

		expect(result[2]).toBeArray();
		expect(result[2][0]).toBe(3);
		expect(result[2][1]).toBe("c");
	});

	test("it should not modify the original arrays", () => {
		const array0 = [1, 2, 3];
		const array1 = ["a", "b", "c"];

		zipArrays(array0, array1);

		expect(array0).toBeArrayOfSize(3);
		expect(array0[0]).toBe(1);
		expect(array0[1]).toBe(2);
		expect(array0[2]).toBe(3);

		expect(array1).toBeArrayOfSize(3);
		expect(array1[0]).toBe("a");
		expect(array1[1]).toBe("b");
		expect(array1[2]).toBe("c");
	});
});
