import path from "path";
import fs from "fs/promises";

import {
  noOpPackageJsonTransformer,
  type PackageJsonTransformer,
} from "./package-json-transformer";

export type HandlePackageJsonOptions = {
  transformPackageJson: PackageJsonTransformer;
  inputDir: string;
  outputDir: string;
};

export const handlePackageJson = async ({
  transformPackageJson = noOpPackageJsonTransformer,
  inputDir,
  outputDir,
}: HandlePackageJsonOptions) => {
  const input = path.join(inputDir, "package.json");
  const output = path.join(outputDir, "package.json");

  const inputContent = await fs.readFile(input, "utf-8");
  const parsed = JSON.parse(inputContent) as Record<string, any>;

  if (parsed?.name) {
    parsed.name = path.basename(outputDir);
  }

  const transformed = transformPackageJson(parsed);

  const stringified = JSON.stringify(transformed, null, 2);

  await fs.writeFile(output, stringified);
};
