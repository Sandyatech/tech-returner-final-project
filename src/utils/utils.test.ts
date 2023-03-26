import { createConsecutiveArray } from "./utils";

it("test createConsecutiveArray", async () => {
    expect(createConsecutiveArray(5)).toEqual([0, 1, 2, 3, 4]);
    expect(createConsecutiveArray(10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(createConsecutiveArray(0)).toEqual([]);
});
