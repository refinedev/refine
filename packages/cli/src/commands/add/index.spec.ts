import { ProjectTypes } from "@definitions/projectTypes";
import * as utilsProject from "../../utils/project/index";
import * as utilsResource from "../../utils/resource/index";
import { getDefaultPath } from "./sub-commands/provider/create-providers";

describe("add", () => {
  it("should get default provider path for provider", () => {
    jest
      .spyOn(utilsProject, "getProjectType")
      .mockReturnValue(ProjectTypes.VITE);

    jest.spyOn(utilsResource, "getProviderPath").mockReturnValue({
      alias: "test-alias",
      path: "test-path",
    });

    const path = getDefaultPath();
    expect(path).toEqual("test-path");
  });
});
