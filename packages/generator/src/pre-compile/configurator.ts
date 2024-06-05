import { type Options as PrettierOptions } from "prettier";
import type { OutputFileTransformer } from "../compile/output-file-transforms";
import type { PackageJsonTransformer } from "../post-compile/package-json-transformer";
import { Chalk } from "chalk";

export type ConfiguratorOptions = {
  answers: Record<string, any>;
  context: Record<string, any>;
};

export type ConfiguratorOutput = {
  files?: Record<string | "package.json", string>;
  excludePatterns?: string[];
  outputFileTransforms?: OutputFileTransformer;
  transformPackageJson?: PackageJsonTransformer;
  formatOptions?: PrettierOptions;
  answers: Record<string, any>;
  context: Record<string, any>;
  inputDir: string;
  outputDir?: string;
  installDependencies?: boolean;
  initializeGit?: boolean;
  sendCommit?: boolean;
  endMessage?: (chalk: Chalk) => string | string;
};

export type Configurator = (
  opts: ConfiguratorOptions
) => ConfiguratorOutput | Promise<ConfiguratorOutput>;
