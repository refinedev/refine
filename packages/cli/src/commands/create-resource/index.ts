import { Command } from "commander";
import {
    copySync,
    unlinkSync,
    moveSync,
    pathExistsSync,
    mkdirSync,
} from "fs-extra";
import temp from "temp";
import { plural } from "pluralize";
import execa from "execa";
import inquirer from "inquirer";
import { join } from "path";

import { getProjectType, getUIFramework } from "@utils/project";
import { compileDir } from "@utils/compile";
import { uppercaseFirstChar } from "@utils/text";
import { getResourcePath } from "@utils/resource";

const defaultActions = ["list", "create", "edit", "show"];
const load = (program: Command) => {
    const projectType = getProjectType();
    const { path } = getResourcePath(projectType);

    return program
        .command("create-resource")
        .allowExcessArguments(true)
        .description("Create a new resource files")
        .option(
            "-a, --actions [actions]",
            "Only generate the specified actions. (ex: list,create,edit,show)",
            "list,create,edit,show",
        )
        .option(
            "-p, --path [path]",
            "Path to generate the resource files",
            path,
        )
        .action(action);
};

const action = async (
    params: { actions: string; path: string },
    options: Command,
) => {
    let { args } = options;
    let actions = params.actions;

    if (!args.length) {
        // TODO: Show inquirer
        const { name, selectedActions } = await inquirer.prompt<{
            name: string;
            selectedActions: string[];
        }>([
            {
                type: "input",
                name: "name",
                message: "Resource Name",
                validate: (value) => {
                    if (!value) {
                        return "Resource Name is required";
                    }

                    return true;
                },
            },
            {
                type: "checkbox",
                name: "selectedActions",
                message: "Select Actions",
                choices: defaultActions,
                default: params.actions.split(","),
            },
        ]);

        args = [name];
        actions = selectedActions.join(",");
    }

    args.forEach((resourceName) => {
        const customActions = actions ? actions.split(",") : undefined;
        const { path, alias } = getResourcePath(getProjectType());
        const resourceFolderName = plural(resourceName).toLowerCase();

        // check exist resource
        const resourcePath = join(process.cwd(), path, resourceFolderName);

        if (pathExistsSync(resourcePath)) {
            console.error(
                `Resource (${join(
                    path,
                    resourceFolderName,
                )}) already exist! ❌`,
            );
            return;
        }

        // uppercase first letter
        const resource = uppercaseFirstChar(resourceName);

        // get the project type
        const uiFramework = getUIFramework();

        const sourceDir = `${__dirname}/../templates/resource`;

        // create temp dir
        const tempDir = generateTempDir();

        // copy template files
        copySync(sourceDir, tempDir);

        const compileParams = {
            resourceName,
            resource,
            actions: customActions || defaultActions,
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

        // create desctination dir
        mkdirSync(params.path, { recursive: true });

        // copy to destination
        const destinationResourcePath = `${params.path}/${resourceFolderName}`;

        let moveSyncOptions = {};

        // empty dir override
        if (pathExistsSync(destinationResourcePath)) {
            moveSyncOptions = { overwrite: true };
        }
        moveSync(tempDir, destinationResourcePath, moveSyncOptions);

        // clear temp dir
        temp.cleanupSync();

        const jscodeshiftExecutable = require.resolve(".bin/jscodeshift");
        const { stderr, stdout } = execa.sync(jscodeshiftExecutable, [
            "./",
            "--extensions=ts,tsx,js,jsx",
            "--parser=tsx",
            `--transform=${__dirname}/../src/transformers/resource.ts`,
            `--ignore-pattern=**/.cache/**`,
            `--ignore-pattern=**/node_modules/**`,
            `--ignore-pattern=**/build/**`,
            `--ignore-pattern=**/.next/**`,
            // pass custom params to transformer file
            `--__actions=${compileParams.actions}`,
            `--__pathAlias=${alias}`,
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
    });

    return;
};

const generateTempDir = (): string => {
    temp.track();
    return temp.mkdirSync("resource");
};

export default load;
