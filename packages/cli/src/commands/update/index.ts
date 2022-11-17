import { Command, Option } from "commander";
import { isRefineUptoDate } from "../check-updates";
import spinner from "src/utils/spinner";
import {
    getPreferedPM,
    installPackages,
    pmCommands,
} from "src/lib/package-manager";

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
        .summary(
            "Interactively select and update all `refine` packages to selected version. To skip the interactive mode, use the `--all` option.",
        )
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

    if (!all) {
        console.log("Interactive mode not implemented yet.");
        return;
    }

    if (tag === Tag.Wanted) {
        const isAllPackagesAtWantedVersion = packages.every(
            (pkg) => pkg.current === pkg.wanted,
        );
        if (isAllPackagesAtWantedVersion) {
            console.log(
                "All `refine` packages are up to date with the wanted version 🎉",
            );
            return;
        }
    }

    const packagesWithVersion = packages
        .map((pkg) => {
            const version = tag === Tag.Wanted ? pkg.wanted : tag;
            return `${pkg.name}@${version}`;
        })
        .join(" ");

    if (dryRun) {
        const pm = await getPreferedPM();
        const commandInstall = pmCommands[pm.name].install;
        console.log(`${pm.name} ${commandInstall} ${packagesWithVersion}`);
        return;
    }

    pmInstall(packagesWithVersion.split(" "));
};

const pmInstall = (packages: string[]) => {
    console.log("Updating `refine` packages...");
    console.log(packages);
    installPackages(packages);
};

export default load;
