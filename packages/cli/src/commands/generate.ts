import { Command } from "commander";

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

const action = (resourceName: string, options: any) => {
    console.log(`resourceName: ${resourceName}`);
    console.log("options", options);
};

export default load;
