import { Argument, Command } from "commander";
import { Provider, createProviders, providerArgs } from "./create-provider";
import { createResources } from "./create-resource";
import { Integration, integrationChoices } from "./add-integration";
import { integrateAntDesign } from "./integrations/ant-design";
import { integrateReactRouter } from "./integrations/react-router";

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
        )
        .addCommand(
            new Command("integration")
                .addArgument(
                    new Argument("<name>", "Name of the integration").choices(
                        integrationChoices,
                    ),
                )
                .action(addIntegrationAction),
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

const addIntegrationAction = async (name: Integration) => {
    if (name === "ant-design") {
        await integrateAntDesign();
    }

    if (name === "react-router") {
        await integrateReactRouter();
    }
};

export default load;
