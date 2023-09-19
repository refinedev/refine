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
import { compileDir } from "@utils/compile";
import { uppercaseFirstChar } from "@utils/text";
import { getProjectType, getUIFramework } from "@utils/project";
import { getResourcePath } from "@utils/resource";

const defaultActions = ["list", "create", "edit", "show"];

export const createResources = async (
    params: { actions?: string; path?: string },
    resources: string[],
) => {
    const destinationPath =
        params?.path || getResourcePath(getProjectType()).path;
    let actions = params.actions || defaultActions.join(",");

    if (!resources.length) {
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
                default: params?.actions?.split(","),
            },
        ]);

        resources = [name];
        actions = selectedActions.join(",");
    }

    resources.forEach((resourceName) => {
        const customActions = actions ? actions.split(",") : undefined;
        const resourceFolderName = plural(resourceName).toLowerCase();

        // check exist resource
        const resourcePath = join(
            process.cwd(),
            destinationPath,
            resourceFolderName,
        );

        if (pathExistsSync(resourcePath)) {
            console.error(
                `❌ Resource (${join(
                    destinationPath,
                    resourceFolderName,
                )}) already exist!`,
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
        mkdirSync(destinationPath, { recursive: true });

        // copy to destination
        const destinationResourcePath = `${destinationPath}/${resourceFolderName}`;

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
            `--__pathAlias=${getResourcePath(getProjectType()).alias}`,
            `--__resourceFolderName=${resourceFolderName}`,
            `--__resource=${resource}`,
            `--__resourceName=${resourceName}`,
        ]);

        // console.log(stdout);

        if (stderr) {
            console.log(stderr);
        }

        console.log(
            `🎉 Resource (${destinationResourcePath}) generated successfully!`,
        );
    });

    return;
};

const generateTempDir = (): string => {
    temp.track();
    return temp.mkdirSync("resource");
};
