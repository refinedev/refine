import inquirer from "inquirer";
import center from "center-align";
import { type Command, Option } from "commander";
import spinner from "@utils/spinner";
import { isRefineUptoDate } from "@commands/check-updates";
import { getPreferedPM, installPackages, pmCommands } from "@utils/package";
import { promptInteractiveRefineUpdate } from "@commands/update/interactive";
import type { RefinePackageInstalledVersionData } from "@definitions/package";
import { getVersionTable } from "@components/version-table";

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
      "Interactively select and update all `Refine` packages to selected version. To skip the interactive mode, use the `--all` option.",
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
      "Update all `Refine` packages to the selected `tag`. If `tag` is not provided, version ranges in the `package.json` will be installed. This option skips the interactive mode.",
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
    console.log("All `Refine` packages are up to date 🎉");
    return;
  }

  let selectedPackages: string[] | null | undefined = null;

  if (all) {
    runAll(tag, packages);
  } else {
    const { table, width } = getVersionTable(packages) ?? "";

    console.log(center("Available Updates", width));
    console.log(table);

    const { allByPrompt } = await inquirer.prompt<{ allByPrompt: boolean }>([
      {
        type: "list",
        name: "allByPrompt",
        message:
          "Do you want to update all Refine packages for minor and patch versions?",
        choices: [
          {
            name: "Yes (Recommended)",
            value: true,
          },
          {
            name: "No, use interactive mode",
            value: false,
          },
        ],
      },
    ]);

    if (allByPrompt) {
      selectedPackages = runAll(tag, packages);
    } else {
      selectedPackages = await promptInteractiveRefineUpdate(packages);
    }
  }

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
        "All `Refine` packages are up to date with the wanted version 🎉",
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
  console.log("Updating `Refine` packages...");
  console.log(packages.map((pkg) => ` - ${pkg}`).join("\n"));
  installPackages(packages);
};

export default load;
