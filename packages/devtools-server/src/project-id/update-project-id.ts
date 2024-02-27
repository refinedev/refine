import { setProjectIdToPackageJson } from "./set-project-id-to-package-json";
import { setProjectIdToRefineComponent } from "./set-project-id-to-refine-component";

export const updateProjectId = async (
  projectId: string,
  projectPath = process.cwd(),
) => {
  try {
    await Promise.all([
      setProjectIdToPackageJson(projectId, projectPath),
      setProjectIdToRefineComponent(projectId, projectPath),
    ]);

    return true;
  } catch (_) {
    return false;
  }
};
