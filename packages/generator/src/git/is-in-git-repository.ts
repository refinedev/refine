import simpleGit from "simple-git";

export type IsInGitRepositoryOptions = {
  cwd: string;
};

export const isInGitRepository = async ({ cwd }: IsInGitRepositoryOptions) => {
  try {
    return await simpleGit(cwd).checkIsRepo();
  } catch (error) {
    return false;
  }
};
