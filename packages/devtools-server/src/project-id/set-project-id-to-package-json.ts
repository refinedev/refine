import execa from "execa";

export const setProjectIdToPackageJson = async (
  projectId: string,
  projectPath = process.cwd(),
) => {
  try {
    execa.sync("npm", ["pkg", "set", `refine.projectId=${projectId}`], {
      cwd: projectPath,
    });
    return true;
  } catch (e) {
    return null;
  }
};
