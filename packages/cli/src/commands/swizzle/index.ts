import path from "path";
import inquirer from "inquirer";
import { Command, OptionValues } from "commander";
import { isPackageHaveRefineConfig } from "../../utils/package/index";
import { getInstalledRefinePackagesFromNodeModules } from "@utils/package";
import { ensureFile, pathExists, readFile, writeFile } from "fs-extra";
import { getRefineConfig } from "@utils/swizzle";
import { SwizzleFile } from "@definitions";

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

const action = async (_options: OptionValues) => {
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
            type: "list",
            name: "selectedPackage",
            message: "Which package do you want to swizzle?",
            choices: packagesWithConfig.map((pkg) => ({
                name: pkg.name,
                value: pkg,
            })),
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
            type: "list",
            name: "selectedComponent",
            message: "Which component do you want to swizzle?",
            choices: items.map((component) => ({
                name: component.label,
                value: component,
            })),
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
                    transform?.(srcContent) ?? srcContent;

                await writeFile(destPath, transformedContent);

                return destPath;
            }

            return undefined;
        }),
    );

    const createdFiles = createdResponse.filter(Boolean);

    if (createdFiles.length > 0) {
        console.log("Done swizzling ${selectedComponent.label} component.");
        console.log("Created files:");
        console.log(
            createdFiles.filter(Boolean).map((file) => ` - ${file} \n`),
        );
    }
};

export default swizzle;
