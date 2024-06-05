import execa from "execa";

export type InstallDependenciesOptions = {
  pm: "npm" | "yarn" | "pnpm" | "bun";
  outputDir: string;
};

export const installDependencies = async ({
  pm,
  outputDir,
}: InstallDependenciesOptions) => {
  const command = `${pm} install`;

  await execa.command(command, {
    cwd: outputDir,
    stdout: "ignore",
  });
};
