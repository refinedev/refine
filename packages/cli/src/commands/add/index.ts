import { Argument, Command } from "commander";

import { Provider, createProviders, providerChoices } from "./create-provider";
import { createResources } from "./create-resource";
import { Integration, integrationChoices } from "./add-integration";
import { integrateAntDesign } from "./integrations/ant-design";
import { integrateReactRouter } from "./integrations/react-router";
import { AddCommandPrompt, addCommandPrompt } from "./prompt";

const load = (program: Command) => {
    return program
        .command("add")
        .allowExcessArguments(false)
        .addArgument(
            new Argument("[providers...]", "Create provider(s)").choices(
                providerChoices,
            ),
        )
        .option("-p, --path [path]", "Path to generate providers")
        .action(addCommandAction)
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

const addCommandAction = async (
    providersArg: Provider[],
    options: { path?: string },
) => {
    if (providersArg.length) {
        return await createProviderAction(providersArg, options);
    }

    const promptResult = await addCommandPrompt();

    await handlePromptResult(promptResult);
};

const handlePromptResult = async (promptResult: AddCommandPrompt) => {
    if (promptResult.component === "provider") {
        return createProviders(
            promptResult.providers,
            promptResult.providersPath,
        );
    }

    if (promptResult.component === "integration") {
        return await addIntegrationAction(promptResult.integration);
    }

    if (promptResult.component === "resource") {
        return await createResources({ path: promptResult.resourcePath }, []);
    }
};

const createProviderAction = async (
    providers: Provider[],
    options: { path?: string },
) => {
    createProviders(providers, options.path);
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
