import {expect} from "@playwright/test";

export class ArrayAssertionUtil {
    static expectEmptyArray(value: unknown) {
        expect(Array.isArray(value)).toBe(true);
        expect((value as Array<unknown>).length).toBe(0);
    }

    static expectNonEmptyArray(value: unknown) {
        expect(Array.isArray(value)).toBe(true);
        expect((value as Array<unknown>).length).toBeGreaterThan(0);
    }

    static expectArrayWithLength(value: unknown, length: number) {
        expect(Array.isArray(value)).toBe(true);
        expect((value as Array<unknown>).length).toBe(length);
    }

    static expectArrayWithLengthGreaterThan(value: unknown, length: number) {
        expect(Array.isArray(value)).toBe(true);
        expect((value as Array<unknown>).length).toBeGreaterThan(length);
    }

    static expectArrayWithLengthLessThan(value: unknown, length: number) {
        expect(Array.isArray(value)).toBe(true);
        expect((value as Array<unknown>).length).toBeLessThan(length);
    }

    static expectArrayWithLengthBetween(value: unknown, minLength: number, maxLength: number) {
        expect(Array.isArray(value)).toBe(true);
        const length = (value as Array<unknown>).length;
        expect(length).toBeGreaterThanOrEqual(minLength);
        expect(length).toBeLessThanOrEqual(maxLength);
    }

    static expectArrayWithFieldValue(value: unknown, field: string, expectedValue: unknown) {
        expect(Array.isArray(value)).toBe(true);
        const array = value as Array<Record<string, unknown>>;
        const hasFieldValue = array.some(item => item[field] === expectedValue);
        expect(hasFieldValue).toBe(true);
    }
}
