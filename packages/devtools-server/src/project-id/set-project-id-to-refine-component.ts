import execa from "execa";
import path from "path";

export const setProjectIdToRefineComponent = async (
  projectId: string,
  projectPath = process.cwd(),
) => {
  try {
    const jscodeshiftExecutable = require.resolve(".bin/jscodeshift");

    const execution = execa.sync(
      jscodeshiftExecutable,
      [
        "./",
        "--extensions=ts,tsx,js,jsx",
        "--parser=tsx",
        `--transform=${path.resolve(
          path.join(__dirname, "..", "src", "project-id", "transform.ts"),
        )}`,
        "--ignore-pattern=**/.cache/**",
        "--ignore-pattern=**/node_modules/**",
        "--ignore-pattern=**/build/**",
        "--ignore-pattern=**/dist/**",
        "--ignore-pattern=**/.next/**",
        `--__projectId=${projectId}`,
      ],
      {
        cwd: projectPath,
        timeout: 1000 * 10,
      },
    );

    if (execution.stderr) {
      console.error(execution.stderr);
    }
  } catch (error) {
    console.error(error);
  }
  return;
};
