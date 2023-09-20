import * as utilsProject from "../../utils/project/index";
import * as utilsResource from "../../utils/resource/index";
import { getGroupedArgs } from ".";
import {
    getDefaultPath,
    getProviderOptions,
    providerArgs,
    providerOptions,
} from "./create-provider";
import { ProjectTypes } from "@definitions/projectTypes";

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

    it.each(providerArgs)(
        "should return proivder options for %s",
        (provider) => {
            const option = getProviderOptions(provider);
            expect(option).toEqual(providerOptions[provider]);
        },
    );

    it("should get default provider path for provider", () => {
        jest.spyOn(utilsProject, "getProjectType").mockReturnValue(
            ProjectTypes.VITE,
        );

        jest.spyOn(utilsResource, "getProviderPath").mockReturnValue({
            alias: "test-alias",
            path: "test-path",
        });

        const path = getDefaultPath();
        expect(path).toEqual("test-path");
    });
});
