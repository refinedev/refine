import { Command } from "commander";
import Handlebars from "handlebars";
import {
    copySync,
    readdirSync,
    readFileSync,
    createFileSync,
    writeFileSync,
    unlinkSync,
} from "fs-extra";
import temp from "temp";

const load = (program: Command) => {
    return program
        .command("generate:resource <name>")
        .description("Generate a new resource")
        .option(
            "-a, --actions [actions]",
            "Only generate the specified actions. (ex: list,create,edit,delete)",
        )
        .action(action);
};

const action = async (resourceName: string, options: any) => {
    console.log(`resourceName: ${resourceName}`);
    console.log("options", options);

    const defaultActions = ["list", "create", "edit", "show"];
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
    files.forEach((file) => {
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
    // TODO: get destination from config

    // readdirSync(tempDir).forEach((file) => {
    //     console.log(`--${file}`, readFileSync(`${tempDir}/${file}`).toString());
    // });
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

    const template = Handlebars.compile(content.toString());
    return template(params);
};

export default load;
