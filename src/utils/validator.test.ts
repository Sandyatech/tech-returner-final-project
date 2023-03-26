import { dateValidator } from "./validator";

describe("test dateValidator", () => {
    it("test dateValidator input:-1 pass", async () => {
        expect(dateValidator(-1, 1)).toEqual(true);
        expect(dateValidator(-1, 2)).toEqual(true);
        expect(dateValidator(-1, 3)).toEqual(true);
        expect(dateValidator(-1, 4)).toEqual(true);
        expect(dateValidator(-1, 5)).toEqual(true);
        expect(dateValidator(-1, 6)).toEqual(true);
        expect(dateValidator(-1, 7)).toEqual(true);
        expect(dateValidator(-1, 8)).toEqual(true);
    });

    it("test dateValidator input:-1 fail", async () => {
        expect(dateValidator(-1, 0)).toEqual(false);
        expect(dateValidator(-1, 9)).toEqual(false);
        expect(dateValidator(-1, 13)).toEqual(false);
    });

    it("test dateValidator input:1 pass", async () => {
        expect(dateValidator(1, 0)).toEqual(true);
        expect(dateValidator(1, 1)).toEqual(true);
        expect(dateValidator(1, 2)).toEqual(true);
        expect(dateValidator(1, 3)).toEqual(true);
        expect(dateValidator(1, 4)).toEqual(true);
        expect(dateValidator(1, 5)).toEqual(true);
        expect(dateValidator(1, 6)).toEqual(true);
    });

    it("test dateValidator input:1 fail", async () => {
        expect(dateValidator(1, 7)).toEqual(false);
        expect(dateValidator(1, 10)).toEqual(false);
    });
});
