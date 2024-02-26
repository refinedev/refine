import { readJSON } from "fs-extra";
import path from "path";

export const getProjectIdFromPackageJson = async (
  projectPath = process.cwd(),
) => {
  try {
    const packageJson = await readJSON(path.join(projectPath, "package.json"), {
      encoding: "utf-8",
    });

    const projectId = packageJson?.refine?.projectId as string;

    if (projectId) {
      return projectId;
    }

    return false;
  } catch (e) {
    return null;
  }
};
