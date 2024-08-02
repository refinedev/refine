import { ProjectTypes } from "@definitions/projectTypes";
import * as utilsProject from "../../../../utils/project/index";
import * as testTargetModule from "@commands/add/sub-commands/resource/create-resources";
import { existsSync, readFileSync, rmdirSync } from "fs-extra";

const srcDirPath = `${__dirname}/../../../..`;

describe("add", () => {
  beforeEach(() => {
    jest.spyOn(global.console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should generate next js pages", () => {
    jest
      .spyOn(utilsProject, "getProjectType")
      .mockReturnValue(ProjectTypes.NEXTJS);

    // if the execution path is left as it is, it will be "src\commands\add\sub-commands\resource",
    // so you will not be able to find the template directory unless you move it up.
    jest
      .spyOn(testTargetModule, "getCommandRootDir")
      .mockReturnValue(srcDirPath);

    const actions = testTargetModule.defaultActions;
    testTargetModule.createResources({ actions: actions.join(",") }, ["tmps"]);

    const nextComponentDirPath = `${srcDirPath}/components/tmps`;
    const nextPageRootDirPath = `${srcDirPath}/app`;

    expect(existsSync(nextComponentDirPath)).toBe(true);
    expect(existsSync(`${nextPageRootDirPath}/tmps`)).toBe(true);

    // cleanup
    rmdirSync(nextComponentDirPath, { recursive: true });
    rmdirSync(nextPageRootDirPath, { recursive: true });
  });

  it("should include use client in the component if use Next.js", () => {
    jest
      .spyOn(utilsProject, "getProjectType")
      .mockReturnValue(ProjectTypes.NEXTJS);

    jest
      .spyOn(testTargetModule, "getCommandRootDir")
      .mockReturnValue(srcDirPath);

    const actions = testTargetModule.defaultActions;
    testTargetModule.createResources({ actions: actions.join(",") }, ["tmps"]);

    const nextComponentDirPath = `${srcDirPath}/components/tmps`;

    actions.forEach((action) => {
      const componentFilePath = `${nextComponentDirPath}/${action}.tsx`;
      const componentContent = readFileSync(componentFilePath, "utf-8");
      expect(componentContent).toContain("use client");
    });

    // cleanup
    const nextPageRootDirPath = `${srcDirPath}/app`;
    rmdirSync(nextComponentDirPath, { recursive: true });
    rmdirSync(nextPageRootDirPath, { recursive: true });
  });

  it("should not include use client in the component if don't use Next.js", () => {
    jest
      .spyOn(utilsProject, "getProjectType")
      .mockReturnValue(ProjectTypes.REACT_SCRIPT);

    jest
      .spyOn(testTargetModule, "getCommandRootDir")
      .mockReturnValue(srcDirPath);

    const actions = testTargetModule.defaultActions;
    testTargetModule.createResources({ actions: actions.join(",") }, ["tmps"]);

    const reactComponentRootDirPath = `${srcDirPath}/pages`;

    actions.forEach((action) => {
      const componentFilePath = `${reactComponentRootDirPath}/tmps/${action}.tsx`;
      const componentContent = readFileSync(componentFilePath, "utf-8");
      expect(componentContent).not.toContain("use client");
    });

    // cleanup
    rmdirSync(reactComponentRootDirPath, { recursive: true });
  });
});
