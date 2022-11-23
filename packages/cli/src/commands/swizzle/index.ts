import path from "path";
import inquirer from "inquirer";
import { Command, OptionValues } from "commander";
import { getInstalledRefinePackages } from "@utils/package";
import {
    ensureFileSync,
    existsSync,
    readFileSync,
    writeFileSync,
} from "fs-extra";

type SwizzleFile = {
    label: string;
    files: { src: string; dist: string }[];
};

type SwizzleConfig = {
    items: Array<SwizzleFile>;
    transform?: any;
    move?: any;
};

type RefineConfig = {
    swizzle: SwizzleConfig;
};

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

const action = async (options: OptionValues) => {
    // get installed packages
    const installedPackages = await getInstalledRefinePackages();

    // check for packages with refine.config.js
    const configPackages = installedPackages.flatMap(({ name }) => {
        const configPath = path.join(
            "./node_modules",
            name,
            "refine.config.js",
        );
        const isExist = existsSync(configPath);

        return isExist
            ? [
                  {
                      name,
                      path: path.join(process.cwd(), configPath),
                  },
              ]
            : [];
    });

    // get selected package
    const { package: selectedPackageName } = await inquirer.prompt<{
        package: string;
    }>([
        {
            type: "list",
            name: "package",
            message: "Which package do you want to swizzle?",
            choices: configPackages.map(({ name }) => name),
        },
    ]);

    const selectedPackage = configPackages.find(
        ({ name }) => name === selectedPackageName,
    );

    if (!selectedPackage) {
        console.log(":(");
        return;
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { swizzle } = require(selectedPackage.path) as RefineConfig;

        const { items } = swizzle;

        // get selected package
        const { selectedItem } = await inquirer.prompt<{
            selectedItem: SwizzleFile;
        }>([
            {
                type: "list",
                name: "selectedItem",
                message: "Which item do you want to swizzle?",
                choices: items.map((item) => ({
                    name: item.label,
                    value: item,
                })),
            },
        ]);

        const { src, dist } = selectedItem.files[0];

        const srcPath = path.join(path.dirname(selectedPackage.path), src);

        if (!existsSync(srcPath)) {
            console.log("File not found");
            return;
        }

        const fileContent = readFileSync(srcPath, "utf-8");

        const distPath = path.join(process.cwd(), dist);

        const transformed = fileContent;

        if (existsSync(distPath)) {
            console.log("already exist");
            return;
        }

        ensureFileSync(distPath);
        writeFileSync(distPath, transformed);

        console.log("ok");
    } catch (error) {
        console.log("er", error);
    }
};

export default swizzle;
