import { Command } from "commander";
import { copySync, unlinkSync, moveSync, pathExists } from "fs-extra";
import temp from "temp";
import { plural } from "pluralize";
import execa from "execa";

import { getProjectType, getUIFramework } from "@utils/project";
import { compileDir } from "@utils/compile";
import { uppercaseFirstChar } from "@utils/text";

const defaultActions = ["list", "create", "edit", "show"];
const load = (program: Command) => {
    return program
        .command("generate:resource <name>")
        .description("Generate a new resource")
        .option(
            "-a, --actions [actions]",
            "Only generate the specified actions. (ex: list,create,edit,delete)",
            defaultActions,
        )
        .option(
            "-p, --path [path]",
            "Path to generate the resource",
            "src/pages",
        )
        .action(action);
};

const action = async (resourceName: string, options: any) => {
    const customActions = options.actions
        ? options.actions.split(",")
        : undefined;

    // uppercase first letter
    const resource = uppercaseFirstChar(resourceName);

    // get the project type
    const projectType = getProjectType();
    const uiFramework = getUIFramework();

    const sourceDir = `${__dirname}/../templates/resource/${projectType}`;

    // create temp dir
    const tempDir = generateTempDir();

    // copy template files
    copySync(sourceDir, tempDir);

    const compileParams = {
        resourceName,
        resource,
        actions: customActions || defaultActions,
        projectType,
        uiFramework,
    };

    // compile dir
    compileDir(tempDir, compileParams);

    // delete ignored actions
    if (customActions) {
        defaultActions.forEach((action) => {
            if (!customActions.includes(action)) {
                unlinkSync(`${tempDir}/${action}.tsx`);
            }
        });
    }

    // copy to destination
    const resourceFolderName = plural(resourceName).toLowerCase();
    const destinationResourcePath = `${options.path}/${resourceFolderName}`;

    let moveSyncOptions = {};

    // empty dir override
    if (!pathExists(destinationResourcePath)) {
        moveSyncOptions = { overwrite: true };
    }
    moveSync(tempDir, destinationResourcePath, moveSyncOptions);

    // clear temp dir
    temp.cleanupSync();

    const jscodeshiftExecutable = require.resolve(".bin/jscodeshift");
    const { stderr } = execa.sync(jscodeshiftExecutable, [
        "./src/",
        "--extensions=ts,tsx,js,jsx",
        "--parser=tsx",
        `--transform=${__dirname}/../src/transformers/resource.ts`,
        // pass custom params to transformer file
        `--__actions=${compileParams.actions}`,
        `--__path=${options.path}`,
        `--__resourceFolderName=${resourceFolderName}`,
        `--__resource=${resource}`,
        `--__resourceName=${resourceName}`,
    ]);

    // console.log(stdout);

    if (stderr) {
        console.log(stderr);
    }

    console.log(
        `Resource (${destinationResourcePath}) generated successfully! 🎉`,
    );
};

const generateTempDir = (): string => {
    temp.track();
    return temp.mkdirSync("resource");
};

export default load;
