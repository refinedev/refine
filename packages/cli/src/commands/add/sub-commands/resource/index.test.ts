import { ProjectTypes } from "@definitions/projectTypes";
import * as utilsProject from "../../../../utils/project/index";
import * as testTargetModule from "@commands/add/sub-commands/resource/create-resources";
import { existsSync, rmdirSync } from "fs-extra";

const srcDirPath = __dirname.split("\\").slice(0, -4).join("\\");
const tmpComponentDirPath = `${srcDirPath}/components/tmps`;
const pageRootDirPath = `${srcDirPath}/app`;

describe("add", () => {
  it("should generate next js pages", () => {
    jest
      .spyOn(utilsProject, "getProjectType")
      .mockReturnValue(ProjectTypes.NEXTJS);

    // if the execution path is left as it is, it will be "src\commands\add\sub-commands\resource",
    // so you will not be able to find the template directory unless you move it up.
    jest
      .spyOn(testTargetModule, "getCommandRootDir")
      .mockReturnValue(srcDirPath);

    testTargetModule.createResources({ actions: "list,create,edit,show" }, [
      "tmps",
    ]);

    expect(existsSync(tmpComponentDirPath)).toBe(true);
    expect(existsSync(`${pageRootDirPath}/tmps`)).toBe(true);
  });

  afterAll(() => {
    rmdirSync(tmpComponentDirPath, { recursive: true });
    rmdirSync(pageRootDirPath, { recursive: true });
  });
});
