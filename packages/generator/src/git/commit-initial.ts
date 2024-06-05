import simpleGit from "simple-git";

export type CommitInitialOptions = {
  cwd: string;
  message: string;
};

export const commitInitial = async ({ cwd, message }: CommitInitialOptions) => {
  try {
    await simpleGit(cwd).add(".");
    await simpleGit(cwd).commit(message);
    return true;
  } catch (error) {
    return false;
  }
};
