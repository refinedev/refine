import { Argument, Command } from "commander";
import { Provider, createProviders, providerArgs } from "./create-provider";
import { createResources } from "./create-resource";

const load = (program: Command) => {
    return program
        .command("add")
        .allowExcessArguments(false)
        .addArgument(
            new Argument("[providers...]", "Create provider(s)").choices(
                providerArgs,
            ),
        )
        .option("-p, --path [path]", "Path to generate providers")
        .action(createProviderAction)
        .addCommand(
            new Command("resource")
                .addArgument(
                    new Argument("[resources...]", "Create new resource(s)"),
                )
                .option("-p, --path [path]", "Path to generated resource files")
                .option(
                    "-a, --actions [actions]",
                    "Only generate the specified resource actions. (ex: list,create,edit,show)",
                    "list,create,edit,show",
                )
                .action(createResourceAction),
        );
};

const createProviderAction = async (
    providers: Provider[],
    options: { path?: string },
) => {
    createProviders(providers, options?.path);
};

const createResourceAction = async (
    resources: string[],
    options: { actions: string },
    command: Command,
) => {
    createResources(
        {
            actions: options?.actions,
            path: command.optsWithGlobals().path,
        },
        resources,
    );
};

export default load;
