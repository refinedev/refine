import fs from "fs/promises";

export type CreateOutputDirOptions = {
  outputDir: string;
};

export const createOutputDir = async ({
  outputDir,
}: CreateOutputDirOptions) => {
  try {
    await fs.access(outputDir);
  } catch (error) {
    await fs.mkdir(outputDir);
  }
};
