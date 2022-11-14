import { Command } from "commander";
import Handlebars from "handlebars";
import {
    copySync,
    readdirSync,
    readFileSync,
    createFileSync,
    writeFileSync,
    unlinkSync,
    moveSync,
    emptyDirSync,
} from "fs-extra";
import temp from "temp";
import { plural } from "pluralize";

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
            "./src/pages",
        )
        .action(action);
};

const action = async (resourceName: string, options: any) => {
    const customActions = options.actions
        ? options.actions.split(",")
        : undefined;

    const sourceDir = `${__dirname}/../templates/resource`;

    // create temp dir
    const tempDir = generateTempDir();

    // copy template files
    copySync(sourceDir, tempDir);

    // compile files
    const files = readdirSync(tempDir);
    files.forEach((file: string) => {
        const templateFilePath = `${tempDir}/${file}`;
        // create file
        const compiledFilePath = `${tempDir}/${file.replace(".hbs", "")}`;
        createFileSync(compiledFilePath);

        // write compiled file
        writeFileSync(
            compiledFilePath,
            compile(templateFilePath, {
                resourceName,
                actions: customActions || defaultActions,
            }),
        );

        // delete template file (*.hbs)
        unlinkSync(templateFilePath);
    });

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

    let moveSyncOptions = {};

    // empty dir override
    if (readdirSync(`${options.path}/${resourceFolderName}`).length === 0) {
        moveSyncOptions = { overwrite: true };
    }
    moveSync(tempDir, `${options.path}/${resourceFolderName}`, moveSyncOptions);

    // clear temp dir
    temp.cleanupSync();

    console.log(
        `Resource (${options.path}/${resourceFolderName}) generated successfully! 🎉`,
    );
};

const generateTempDir = (): string => {
    temp.track();
    return temp.mkdirSync("resource");
};

// TODO: Move to utils
const compile = (filePath: string, params: any): string => {
    const content = readFileSync(filePath);

    Handlebars.registerHelper("ifIn", function (elem, list, options) {
        if (elem.includes(list)) {
            return options.fn(Handlebars);
        }
        return options.inverse(Handlebars);
    });

    Handlebars.registerHelper("capitalize", function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    });

    const template = Handlebars.compile(content.toString());
    return template(params);
};

export default load;
