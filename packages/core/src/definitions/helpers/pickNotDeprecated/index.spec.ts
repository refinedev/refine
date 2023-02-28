import { pickNotDeprecated } from ".";

describe("pickNotDeprecated", () => {
    test("should returns a first value that is not undefined", () => {
        const testCases = [
            {
                args: [undefined, 1, undefined],
                expected: 1,
            },
            {
                args: [undefined, 0, true],
                expected: 0,
            },
            {
                args: [false, {}],
                expected: false,
            },
            {
                args: [{ id: 1 }, undefined],
                expected: { id: 1 },
            },
        ];

        testCases.forEach(({ args, expected }) => {
            expect(pickNotDeprecated(...args)).toEqual(expected);
        });
    });
});
