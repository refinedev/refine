import React from "react";
import { Command } from "commander";
import preferredPM from "preferred-pm";
import { render } from "ink";
import shell from "shelljs";
import UpdateWarningTable from "src/components/update-warning-table";
import ora from "ora";
import { NpmOutdatedResponse, RefinePackages } from "src/interfaces";

const load = (program: Command) => {
    return program
        .command("check-updates")
        .description("Check all installed `refine` packages are up to date")
        .action(action);
};

const action = async () => {
    const spinner = ora("Checking versions of `refine` packages").start();
    const dependencies = await isRefineUptoDate();
    spinner.stop();

    if (!dependencies?.length) {
        console.log("All `refine` packages are up to date 🎉");
        return;
    }

    render(<UpdateWarningTable data={dependencies} />);
};

/**
 * Displays update warning if there is any `refine` package update available.
 */
export const getUpdateWarning = async () => {
    const dependencies = await isRefineUptoDate();
    if (!dependencies) return;

    render(<UpdateWarningTable data={dependencies} />);
};

/**
 *
 * @returns `refine` packages that have updates.
 * @returns `null` if no refine package found.
 * @returns `null` if all `refine` packages are up to date.
 */
export const isRefineUptoDate = async () => {
    const pm = await preferredPM(process.cwd());
    if (!pm) return null;

    const refinePackages = await getOutdatedRefinePackages(pm.name);
    if (!refinePackages.length) return null;

    return refinePackages;
};

const getOutdatedRefinePackages = async (pm: "npm" | "pnpm" | "yarn") => {
    const packages = await getOutdatedPackageList(pm);
    if (!packages) return [];

    const list: RefinePackages = [];

    Object.keys(packages).forEach((packageName) => {
        const dependency = packages[packageName];

        if (packageName.includes("@pankod/refine")) {
            list.push({
                name: packageName,
                current: dependency.current,
                wanted: dependency.wanted,
                latest: dependency.latest,
            });
        }
    });

    return list;
};

const getOutdatedPackageList = async (pm: "npm" | "pnpm" | "yarn") => {
    try {
        const stdout = shell.exec(`${pm} outdated --json`, {
            cwd: process.cwd(),
            timeout: 10000,
            silent: true,
        }).stdout;

        return JSON.parse(stdout) as NpmOutdatedResponse | null;
    } catch (e) {
        return null;
    }
};

export default load;
