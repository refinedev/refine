import execa from "execa";
import simpleGit from "simple-git";

export type GitInitOptions = {
  cwd: string;
};

export const gitInit = async ({ cwd }: GitInitOptions) => {
  try {
    await simpleGit(cwd).init();
    return true;
  } catch (error) {
    return false;
  }
};
