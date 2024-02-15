import * as utilsProject from "../../utils/project/index";
import * as utilsResource from "../../utils/resource/index";
import {
    getDefaultPath,
    getProviderOptions,
    providerArgs,
    providerOptions,
} from "./create-provider";
import { ProjectTypes } from "@definitions/projectTypes";

describe("add", () => {
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
