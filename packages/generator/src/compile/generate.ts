import path from "path";
import ora from "ora";
import chalk from "chalk";

import type { PromptObject, Answers } from "prompts";
import type { Configurator } from "../pre-compile/configurator";

import { handlePrompts } from "../pre-compile/handle-prompts";
import { INITIAL_PROMPTS } from "../pre-compile/initial-prompts";
import { generateRandomName } from "../utils/generate-random-name";
import { noOpOutputFileTransforms } from "./output-file-transforms";
import { noOpPackageJsonTransformer } from "../post-compile/package-json-transformer";
import { slugify } from "../utils/slugify";
import { oraPromise } from "../utils/ora-promise";
import { createOutputDir } from "../pre-compile/create-output-dir";
import { compileDir } from "./compile-dir";
import { handlePackageJson } from "../post-compile/handle-package-json";
import { createFilesFromConfig } from "../post-compile/create-files-from-config";
import { formatOutputDir } from "../post-compile/format-output-dir";
import { installDependencies } from "../post-compile/install-dependencies";
import { isInGitRepository } from "../git/is-in-git-repository";
import { gitInit } from "../git/git-init";
import { commitInitial } from "../git/commit-initial";
import { defaultEndMessage } from "src/post-compile/default-end-message";

export type GeneratorOptions = [
  prompts: PromptObject<string>[],
  configurator: Configurator,
  configDir: string,
];

export type GenerateFunction = (...args: GeneratorOptions) => Promise<void>;

export const generate: GenerateFunction = async (
  inputPrompts,
  configurator,
  configDir
) => {
  const defaultProjectName = generateRandomName();

  let answers: Answers<string> = {};

  if (inputPrompts.length > 0) {
    const initialPrompts = INITIAL_PROMPTS(defaultProjectName);
    const filteredInitialPrompts = initialPrompts.filter(
      (prompt) =>
        !inputPrompts.find((inputPrompt) => inputPrompt.name === prompt.name)
    );

    answers = await handlePrompts({
      prompts: [...filteredInitialPrompts, ...inputPrompts],
    });
  }

  const configuration = await configurator({
    answers,
    context: {},
  });

  const {
    files = {},
    excludePatterns = [],
    outputFileTransforms = noOpOutputFileTransforms,
    transformPackageJson = noOpPackageJsonTransformer,
    context,
    inputDir: _inputDir,
    outputDir: _outputDir,
    answers: latestAnswers,
    formatOptions,
    initializeGit = true,
    installDependencies: installDeps = true,
    sendCommit = true,
    endMessage = defaultEndMessage,
  } = configuration;

  const projectName = latestAnswers.projectName || defaultProjectName;
  const slugged = path.join("./", slugify({ input: projectName }));

  const outputDir = _outputDir || path.resolve(slugged);
  const inputDir = path.resolve(path.join(configDir, _inputDir));

  ora().succeed(
    "Project will be created at: " +
      chalk.bold.blueBright(path.relative(process.cwd(), slugged))
  );

  const data = {
    ...latestAnswers,
    ...context,
  };

  await oraPromise(
    createOutputDir({ outputDir }),
    "Creating output directory..."
  );

  await oraPromise(
    compileDir({
      inputDir,
      outputDir,
      data,
      outputFileTransforms,
      excludePatterns: excludePatterns,
    }),
    "Compiling directory..."
  );

  await oraPromise(
    handlePackageJson({
      transformPackageJson,
      inputDir,
      outputDir,
    }),
    "Handling package.json..."
  );

  await oraPromise(
    createFilesFromConfig({
      files,
      outputDir,
    }),
    "Creating files from config..."
  );

  await oraPromise(formatOutputDir({ outputDir, formatOptions }), "Formatting");

  if (installDeps) {
    await oraPromise(
      installDependencies({
        pm: "npm",
        outputDir,
      }),
      "Installing dependencies..."
    );
  }

  if (initializeGit) {
    const isInGitRepo = await oraPromise(
      isInGitRepository({ cwd: outputDir }),
      "Checking if in git repository..."
    );

    if (!isInGitRepo) {
      await oraPromise(gitInit({ cwd: outputDir }), "Initializing git...");
    }
  }

  if (sendCommit) {
    await oraPromise(
      commitInitial({ cwd: outputDir, message: "Initial commit" }),
      "Sending initial commit..."
    );
  }

  ora("Success!").succeed();

  if (typeof endMessage === "function") {
    console.log(endMessage(chalk));
  } else if (typeof endMessage === "string") {
    console.log(endMessage);
  }
};
