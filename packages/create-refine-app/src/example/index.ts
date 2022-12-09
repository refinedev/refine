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
// const GITHUB_BRANCH = "master";
const GITHUB_BRANCH = "feat/create-with-example";

const run = async (
    example: string | boolean | undefined,
    destination?: string,
) => {
    if (typeof example !== "string") {
        console.error(`You must specify an example name.`);
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

    const downloadSpinner = ora(
        `Downloading files for example ${chalk.cyan(
            example,
        )}. This might take a moment.`,
    ).start();

    await makeDir(root);
    await downloadAndExtract({
        root,
        name: example,
        branch: GITHUB_BRANCH,
        repo: GITHUB_REPO,
        org: GITHUB_ORG,
    });

    downloadSpinner.succeed(
        `Files downloaded for example ${chalk.cyan(example)}.`,
    );

    const installSpinner = ora(
        "Installing packages. This might take a couple of minutes.",
    ).start();

    installDependencies(root);

    installSpinner.succeed("Packages installed.");

    const gitSpinner = ora(`Initializing Git in ${chalk.cyan(root)}.`).start();

    if (gitInit(root, "Initial commit from Create Refine App")) {
        gitSpinner.succeed("Created Git repository with initial commit.");
    } else {
        gitSpinner.warn("Failed to initialize Git repository.");
    }

    const packageManager = findPM();
    const packageManagerRun = packageManager === "yarn" ? "" : "run ";

    console.log(`${chalk.green("Success!")} Created ${example} at ${root}`);

    console.log(`Start using ${chalk.bold("refine")} by running:`);
    console.log();
    console.log(chalk.cyan("  cd"), root);
    console.log();
    console.log(chalk.cyan(`  ${packageManager} ${packageManagerRun}start`));
    console.log();
};

export default run;
