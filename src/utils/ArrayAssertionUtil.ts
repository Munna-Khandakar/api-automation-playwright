import {expect} from "@playwright/test";
import {ArrayAssertion} from "../libs/ArrayAssertion";

export class ArrayAssertionUtil {
    static expectEmptyArray(array: unknown) {
        expect(Array.isArray(array)).toBe(true);
        expect((array as Array<unknown>).length).toBe(0);
    }

    static expectNonEmptyArray(array: unknown) {
        return new ArrayAssertion(array);
    }

    static expectArrayWithFieldValue(value: unknown, field: string, expectedValue: unknown) {
        expect(Array.isArray(value)).toBe(true);
        const array = value as Array<Record<string, unknown>>;
        const hasFieldValue = array.some(item => item[field] === expectedValue);
        expect(hasFieldValue).toBe(true);
    }

    static expectArrayContains(value: unknown, expected: string | string[]) {
        expect(Array.isArray(value)).toBe(true);
        const array = value as Array<unknown>;
        const expectedValues = Array.isArray(expected) ? expected : [expected];
        for (const val of expectedValues) {
            expect(array.includes(val)).toBe(true);
        }
    }
}
