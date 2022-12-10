import path from "path";
import chalk from "chalk";
import { existsInRepo } from "./exists-in-repo";
import { makeDir } from "./make-dir";
import { downloadAndExtract } from "./download-and-extract";
import { findPM, installDependencies } from "./install-dependencies";
import { gitInit } from "./git-init";
import ora from "ora";

const GITHUB_ORG = "refinedev";
const GITHUB_REPO = "refine";
const GITHUB_BRANCH = "master";
// const GITHUB_BRANCH = "feat/create-with-example";

const run = async (
    example: string | boolean | undefined,
    destination?: string,
) => {
    if (typeof example !== "string") {
        ora("You must specify an example name").fail();
        return;
    }

    const root = path.resolve(destination || example);

    const existSpinner = ora("Checking if example exists in refine").start();
    const found = await existsInRepo({
        organization: GITHUB_ORG,
        repository: GITHUB_REPO,
        example,
        branch: GITHUB_BRANCH,
    });

    if (found) {
        existSpinner.succeed("Example found in refine repository");
    } else {
        existSpinner.fail(
            `Could not locate an example named ${chalk.red(`"${example}"`)}`,
        );
        process.exit(1);
    }

    const cdPath = root.includes(path.resolve(process.cwd()))
        ? root.replace(path.resolve(process.cwd()), ".")
        : root;

    const downloadSpinner = ora(
        `Downloading files for example ${chalk.cyan(
            example,
        )}. This might take a moment.`,
    ).start();

    const dirStatus = await makeDir(root);

    if (dirStatus === "already") {
        downloadSpinner.warn(
            `Directory ${chalk.cyan(
                cdPath,
            )} already exists. Files will be overwritten.`,
        );
    }

    if (dirStatus === "failed") {
        downloadSpinner.fail(
            `Failed to create directory ${chalk.cyan(cdPath)}.`,
        );
        process.exit(1);
    }

    const downloadStatus = await downloadAndExtract({
        root,
        name: example,
        branch: GITHUB_BRANCH,
        repo: GITHUB_REPO,
        org: GITHUB_ORG,
    });

    if (downloadStatus === "download-failed") {
        downloadSpinner.fail(
            `Failed to download files for example ${chalk.cyan(example)}.`,
        );
        process.exit(1);
    }

    if (downloadStatus === "extract-failed") {
        downloadSpinner.fail(
            `Failed to extract files for example ${chalk.cyan(example)}.`,
        );
        process.exit(1);
    }

    downloadSpinner.succeed(
        `Files downloaded and extracted for example ${chalk.cyan(example)}.`,
    );

    const installSpinner = ora(
        "Installing packages. This might take a couple of minutes.",
    ).start();

    const installStatus = await installDependencies(root);

    if (installStatus) {
        installSpinner.succeed("Packages installed successfully.");
    } else {
        installSpinner.fail(
            "Failed to install packages. You can try again manually.",
        );
    }

    const gitSpinner = ora(
        `Initializing Git in ${chalk.cyan(cdPath)}.`,
    ).start();

    const gitStatus = gitInit(root, "Initial commit from Create Refine App");

    if (gitStatus === "git-not-found") {
        gitSpinner.warn(
            `Git was not found in your PATH. Skipping Git initialization.`,
        );
    }

    if (gitStatus === "already-in-repository") {
        gitSpinner.warn(
            `Directory ${chalk.cyan(
                cdPath,
            )} is already a Git repository. Skipping Git initialization.`,
        );
    }

    if (gitStatus === "git-init-failed") {
        gitSpinner.warn(
            `Failed to initialize Git repository in ${chalk.cyan(cdPath)}.`,
        );
    }

    if (gitStatus === "git-commit-failed") {
        gitSpinner.warn(
            `Failed to commit initial commit to Git repository in ${chalk.cyan(
                cdPath,
            )}.`,
        );
    }

    if (gitStatus === "success") {
        gitSpinner.succeed("Created Git repository with initial commit.");
    }

    const packageManager = findPM();

    const packageManagerRun = packageManager === "yarn" ? "" : "run ";

    console.log();
    console.log(
        `${chalk.green("Success!")} Created ${chalk.cyan(
            example,
        )} at ${chalk.cyan(cdPath)}`,
    );
    console.log();
    console.log(`Start using ${chalk.bold("refine")} by running:`);
    console.log();
    console.log(chalk.cyan("  cd"), cdPath);
    console.log();
    console.log(chalk.cyan(`  ${packageManager} ${packageManagerRun}start`));
    console.log();
};

export default run;
