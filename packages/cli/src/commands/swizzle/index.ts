import path from "path";
import inquirer from "inquirer";
import inquirerAutoCompletePrompt from "inquirer-autocomplete-prompt";
import { Command, OptionValues } from "commander";
import { isPackageHaveRefineConfig } from "../../utils/package/index";
import { getInstalledRefinePackagesFromNodeModules } from "@utils/package";
import { ensureFile, pathExists, readFile, writeFile } from "fs-extra";
import { getRefineConfig } from "@utils/swizzle";
import { SwizzleFile } from "@definitions";
import chalk from "chalk";

const swizzle = (program: Command) => {
    return (
        program
            .command("swizzle")
            .description("Swizzle")
            // .option("-c, --component <component>", "Component to swizzle.")
            // .option("-l, --list", "List all the components available to swizzle.")
            .action(action)
    );
};

const getAutocompleteSource =
    (
        rawList: Array<{
            label: string;
            group?: string;
            value?: Record<string, unknown>;
        }>,
    ) =>
    (_answers: {}, input = "") => {
        const filtered = rawList.filter(
            (el) =>
                el.label.toLowerCase().includes(input.toLowerCase()) ||
                el.group?.toLowerCase().includes(input.toLowerCase()),
        );

        return filtered.flatMap((component, index, arr) => {
            const hasTitle =
                component?.group && arr[index - 1]?.group !== component.group;
            const withTitle = hasTitle
                ? [new inquirer.Separator(`${chalk.bold(component.group)}`)]
                : [];

            return [
                ...withTitle,
                {
                    name: ` ${component.label}`,
                    value: component?.value ? component.value : component,
                },
            ];
        });
    };

const action = async (_options: OptionValues) => {
    inquirer.registerPrompt("autocomplete", inquirerAutoCompletePrompt);

    const installedPackages = await getInstalledRefinePackagesFromNodeModules();

    const packagesWithConfig: Array<{ name: string; path: string }> = [];

    await Promise.all(
        installedPackages.map(async (pkg) => {
            const hasConfig = await isPackageHaveRefineConfig(pkg.path);
            if (hasConfig) {
                packagesWithConfig.push(pkg);
            }
        }),
    );

    if (packagesWithConfig.length === 0) {
        console.log("No refine packages found with refine.config.js");
        return;
    }

    const { selectedPackage } = await inquirer.prompt<{
        selectedPackage: { name: string; path: string };
    }>([
        {
            type: "autocomplete",
            name: "selectedPackage",
            message: "Which package do you want to swizzle?",
            emptyText: "No packages found.",
            source: getAutocompleteSource(
                packagesWithConfig.map((pkg) => ({
                    label: pkg.name,
                    value: pkg,
                })),
            ),
        },
    ]);

    const {
        swizzle: { items, transform },
    } = (await getRefineConfig(selectedPackage.path)) ?? {
        swizzle: { items: [] },
    };

    if (items.length === 0) {
        console.log(`No swizzle items found for ${selectedPackage.name}`);
        return;
    }

    const { selectedComponent } = await inquirer.prompt<{
        selectedComponent: SwizzleFile;
    }>([
        {
            type: "autocomplete",
            name: "selectedComponent",
            message: "Which component do you want to swizzle?",
            emptyText: "No components found.",
            source: getAutocompleteSource(
                items.sort((a, b) => a.group.localeCompare(b.group)),
            ),
        },
    ]);

    const createdResponse = await Promise.all(
        selectedComponent.files.map(async (file) => {
            const srcPath = file.src
                ? path.join(selectedPackage.path, file.src)
                : undefined;
            const destPath = file.dest
                ? path.join(process.cwd(), file.dest)
                : undefined;

            if (!srcPath) {
                console.log("Source path is not defined");
                return;
            }

            if (!destPath) {
                console.log("Destination path is not defined");
                return;
            }

            const hasSrc = await pathExists(srcPath);

            if (!hasSrc) {
                console.log(`Source file not found: ${srcPath}`);
                return;
            }

            if (hasSrc) {
                const srcContent = await readFile(srcPath, "utf-8");
                const isDestExist = await pathExists(destPath);

                if (isDestExist) {
                    console.log("File already exist");
                    return;
                }

                await ensureFile(destPath);

                const transformedContent =
                    transform?.(srcContent, srcPath, destPath) ?? srcContent;

                await writeFile(destPath, transformedContent);

                return destPath;
            }

            return undefined;
        }),
    );

    const createdFiles = createdResponse.filter(Boolean);

    if (createdFiles.length > 0) {
        console.log(`Done swizzling ${selectedComponent.label} component! 🎉`);
        console.log("Created files:");
        console.log(
            createdFiles
                .filter(Boolean)
                .map(
                    (file) =>
                        ` - ${chalk.cyanBright(
                            file?.replace(process.cwd(), ""),
                        )}`,
                )
                .join("\n"),
        );
    }
};

export default swizzle;
