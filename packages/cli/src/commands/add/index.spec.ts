import { getGroupedArgs } from ".";

describe("add", () => {
    it.each([
        {
            args: ["auth", "live", "resource", "user", "post", "data"],
            expected: {
                providers: ["auth", "live"],
                resources: ["user", "post", "data"],
            },
        },
        {
            args: ["resource", "auth", "live", "user", "post", "data"],
            expected: {
                providers: [],
                resources: ["auth", "live", "user", "post", "data"],
            },
        },
        {
            args: ["auth", "live", "data", "resource"],
            expected: {
                providers: ["auth", "live", "data"],
                resources: [],
            },
        },
        {
            args: ["auth", "live", "data", "not-provider"],
            expected: {
                providers: ["auth", "live", "data"],
                resources: [],
            },
        },
    ])("should group by args", ({ args, expected }) => {
        const { providers, resources } = getGroupedArgs(args);

        expect(providers).toEqual(expected.providers);
        expect(resources).toEqual(expected.resources);
    });
});
