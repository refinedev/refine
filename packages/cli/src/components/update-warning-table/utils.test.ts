import * as packageUtils from "@utils/package";
import { getCommand } from ".";

test("Update warning npm command", async () => {
    const testCases: {
        output: string;
        dependencies: string[];
        scripts: Record<string, string>;
    }[] = [
        // have script, have dependency
        {
            output: "npm run refine update",
            dependencies: ["@refinedev/cli"],
            scripts: {
                refine: "refine",
            },
        },
        // has script, no dependency
        {
            output: "npm run refine update",
            dependencies: ["@pankod/tefine-cli"],
            scripts: {
                refine: "refine",
            },
        },
        // no script, has dependency
        {
            output: "npx refine update",
            dependencies: ["@refinedev/cli"],
            scripts: {
                tefine: "refine",
            },
        },
        // no script, no dependency
        {
            output: "npx @refinedev/cli update",
            dependencies: [],
            scripts: {},
        },
    ];

    for (const testCase of testCases) {
        jest.spyOn(packageUtils, "getDependencies").mockReturnValue(
            testCase.dependencies,
        );
        jest.spyOn(packageUtils, "getScripts").mockReturnValue(
            testCase.scripts,
        );

        expect(await getCommand()).toBe(testCase.output);
    }
});
