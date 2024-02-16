import { Argument, Command } from "commander";

import { Integration, availableIntegrations } from "./add-integration";
import {
    Provider,
    availableProviders,
    createProviders,
} from "./create-provider";
import { createResources } from "./create-resource";
import { integrateAntDesign } from "./integrations/ant-design";
import { integrateReactRouter } from "./integrations/react-router";
import {
    AddCommandAnswers,
    addCommandPrompt,
} from "./prompts/add-command.prompt";

const load = (program: Command) => {
    return program
        .command("add")
        .allowExcessArguments(false)
        .action(addCommandAction)
        .addCommand(
            new Command("provider")
                .addArgument(
                    new Argument("[providers...]", "Create provider(s)")
                        .choices(availableProviders)
                        .default([]),
                )
                .option("-p, --path [path]", "Path to generate providers")
                .action(createProviderAction),
        )
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
                    new Argument("[name]", "Name of the integration").choices(
                        availableIntegrations,
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

const createProviderAction = async (
    providers: Provider[],
    options: { path?: string },
) => {
    if (!providers.length) {
        const promptResult = await addCommandPrompt({ component: "provider" });

        return await handlePromptResult(promptResult);
    }

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

const addIntegrationAction = async (name?: Integration) => {
    if (!name) {
        const promptResult = await addCommandPrompt({
            component: "integration",
        });

        await handlePromptResult(promptResult);
    }

    if (name === "ant-design") {
        await integrateAntDesign();
    }

    if (name === "react-router") {
        await integrateReactRouter();
    }
};

const handlePromptResult = async (promptResult: AddCommandAnswers) => {
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

export default load;
