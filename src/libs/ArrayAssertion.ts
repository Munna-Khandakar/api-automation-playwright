import {expect} from "@playwright/test";

export class ArrayAssertion {
    private array: unknown[];

    constructor(array: unknown) {
        expect(Array.isArray(array)).toBe(true);
        this.array = array as unknown[];
        expect(this.array.length).toBeGreaterThan(0);
    }

    matchKeys(keys: string[]) {
        for (const item of this.array) {
            for (const key of keys) {
                expect(item).toHaveProperty(key);
            }
        }
        return this;
    }
}
