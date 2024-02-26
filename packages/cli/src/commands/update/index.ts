import { Command, Option } from "commander";
import { isRefineUptoDate } from "@commands/check-updates";
import spinner from "@utils/spinner";
import { getPreferedPM, installPackages, pmCommands } from "@utils/package";
import { promptInteractiveRefineUpdate } from "@commands/update/interactive";
import { RefinePackageInstalledVersionData } from "@definitions/package";

enum Tag {
  Wanted = "wanted",
  Latest = "latest",
  Next = "next",
}

interface OptionValues {
  tag: Tag;
  dryRun: boolean;
  all: boolean;
}

const load = (program: Command) => {
  return program
    .command("update")
    .description(
      "Interactively select and update all `refine` packages to selected version. To skip the interactive mode, use the `--all` option.",
    )
    .addOption(
      new Option("-t, --tag [tag]", "Select version to update to.")
        .choices(["next", "latest"])
        .default(
          "wanted",
          "Version ranges in the `package.json` will be installed",
        ),
    )
    .option(
      "-a, --all",
      "Update all `refine` packages to the selected `tag`. If `tag` is not provided, version ranges in the `package.json` will be installed. This option skips the interactive mode.",
      false,
    )
    .option(
      "-d, --dry-run",
      "Get outdated packages installation command without automatic updating. If `tag` is not provided, version ranges in the `package.json` will be used.",
      false,
    )
    .action(action);
};

const action = async (options: OptionValues) => {
  const { tag, dryRun, all } = options;

  const packages = await spinner(isRefineUptoDate, "Checking for updates...");
  if (!packages?.length) {
    console.log("All `refine` packages are up to date 🎉");
    return;
  }

  const selectedPackages = all
    ? runAll(tag, packages)
    : await promptInteractiveRefineUpdate(packages);

  if (!selectedPackages) return;

  if (dryRun) {
    printInstallCommand(selectedPackages);
    return;
  }

  pmInstall(selectedPackages);
};

const runAll = (tag: Tag, packages: RefinePackageInstalledVersionData[]) => {
  if (tag === Tag.Wanted) {
    const isAllPackagesAtWantedVersion = packages.every(
      (pkg) => pkg.current === pkg.wanted,
    );
    if (isAllPackagesAtWantedVersion) {
      console.log(
        "All `refine` packages are up to date with the wanted version 🎉",
      );
      return null;
    }
  }

  const packagesWithVersion = packages.map((pkg) => {
    const version = tag === Tag.Wanted ? pkg.wanted : tag;
    return `${pkg.name}@${version}`;
  });

  return packagesWithVersion;
};

const printInstallCommand = async (packages: string[]) => {
  const pm = await getPreferedPM();
  const commandInstall = pmCommands[pm.name].install;
  console.log(`${pm.name} ${commandInstall.join(" ")} ${packages.join(" ")}`);
};

const pmInstall = (packages: string[]) => {
  console.log("Updating `refine` packages...");
  console.log(packages);
  installPackages(packages);
};

export default load;
