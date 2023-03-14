import {
    NpmOutdatedResponse,
    RefinePackageInstalledVersionData,
} from "@definitions/package";
import * as checkUpdates from "./index";
const { getOutdatedRefinePackages } = checkUpdates;

test("Get outdated refine packages", async () => {
    const testCases: {
        input: NpmOutdatedResponse;
        output: RefinePackageInstalledVersionData[];
    }[] = [
        {
            input: {
                "@refinedev/core": {
                    current: "1.0.0",
                    wanted: "1.0.1",
                    latest: "2.0.0",
                },
                "@refinedev/cli": {
                    current: "1.1.1",
                    wanted: "1.1.1",
                    latest: "1.1.0",
                },
                "@pankod/canvas2video": {
                    current: "1.1.1",
                    wanted: "1.1.1",
                    latest: "1.1.1",
                },
                "@owner/package-name": {
                    current: "1.1.1",
                    wanted: "1.1.1",
                    latest: "1.1.0",
                },
                "@owner/package-name1": {
                    current: "N/A",
                    wanted: "undefined",
                    latest: "NaN",
                },
                "@owner/refine-react": {
                    current: "1.0.0",
                    wanted: "1.0.1",
                    latest: "2.0.0",
                },
            },
            output: [
                {
                    name: "@refinedev/core",
                    current: "1.0.0",
                    wanted: "1.0.1",
                    latest: "2.0.0",
                },
            ],
        },
    ];

    for (const testCase of testCases) {
        jest.spyOn(checkUpdates, "getOutdatedPackageList").mockResolvedValue(
            testCase.input,
        );

        const result = await getOutdatedRefinePackages();
        expect(result).toEqual(testCase.output);
    }
});
