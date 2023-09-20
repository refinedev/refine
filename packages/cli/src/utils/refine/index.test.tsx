import * as utilsPackage from "@utils/package";
import { hasDefaultScript } from ".";

test("Has refine script", () => {
    const testCases = [
        {
            input: {
                scripts: {
                    dev: "refine dev",
                },
            },
            output: {
                dev: "default",
            },
        },
        {
            input: {
                scripts: {
                    dev: "PORT=5252 refine dev --force",
                },
            },
            output: {
                dev: "default",
            },
        },
        {
            input: {
                scripts: {
                    dev: "vite start",
                },
            },
            output: {
                dev: "modified",
            },
        },
    ];

    testCases.forEach((testCase) => {
        jest.spyOn(utilsPackage, "getPackageJson").mockReturnValueOnce(
            testCase.input,
        );

        const result = hasDefaultScript();

        expect(result).toEqual(testCase.output);
    });
});
