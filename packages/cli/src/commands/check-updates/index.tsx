import type { Command } from "commander";
import { printUpdateWarningTable } from "@components/update-warning-table";
import { pmCommands } from "@utils/package";
import execa from "execa";
import spinner from "@utils/spinner";
import type {
  NpmOutdatedResponse,
  RefinePackageInstalledVersionData,
} from "@definitions/package";
import semverDiff from "semver-diff";

const load = (program: Command) => {
  return program
    .command("check-updates")
    .description("Check all installed `Refine` packages are up to date")
    .action(action);
};

const action = async () => {
  const packages = await spinner(isRefineUptoDate, "Checking for updates...");
  if (!packages.length) {
    console.log("All `Refine` packages are up to date 🎉\n");
    return;
  }

  await printUpdateWarningTable({ data: packages });
};

/**
 *
 * @returns `Refine` packages that have updates.
 * @returns `[]` if no Refine package found.
 * @returns `[]` if all `Refine` packages are up to date.
 */
export const isRefineUptoDate = async () => {
  const refinePackages = await getOutdatedRefinePackages();

  return refinePackages;
};

export const getOutdatedRefinePackages = async () => {
  const packages = await getOutdatedPackageList();
  if (!packages) return [];

  const list: RefinePackageInstalledVersionData[] = [];
  let changelog: string | undefined = undefined;

  Object.keys(packages).forEach((packageName) => {
    const dependency = packages[packageName];

    if (packageName.includes("@refinedev")) {
      changelog = packageName.replace(/@refinedev\//, "https://c.refine.dev/");

      list.push({
        name: packageName,
        current: dependency.current,
        wanted: dependency.wanted,
        latest: dependency.latest,
        changelog,
      });
    }
  });

  // When user has installed `next` version, it will be ahead of the `latest` version. But `npm outdated` command still returns as an outdated package.
  // So we need to filter out the if `current` version is ahead of `latest` version.
  // ex: in the npm registry `next` version is 1.1.1 -> [current:1.1.1, wanted:1.1.1, latest:1.1.0]
  const filteredList = list.filter((item) => {
    const diff = semverDiff(item.current, item.latest);
    return !!diff;
  });

  return filteredList;
};

export const getOutdatedPackageList = async () => {
  const pm = "npm";

  const { stdout, timedOut } = await execa(pm, pmCommands[pm].outdatedJson, {
    reject: false,
    timeout: 25 * 1000,
  });

  if (timedOut) {
    throw new Error("Timed out while checking for updates.");
  }

  if (!stdout) return null;

  return JSON.parse(stdout) as NpmOutdatedResponse | null;
};

export default load;
