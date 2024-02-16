import { Command } from "commander";

import { IntegrationCommand } from "./sub-commands/integration/command";
import { ResourceCommand } from "./sub-commands/resource/command";
import {
    ProviderCommand,
    createProviderAction,
} from "./sub-commands/provider/command";
import { ProviderId } from "./sub-commands/provider/providers";
import { addCommandPrompt } from "./prompt";
import { createProviders } from "./sub-commands/provider/create-providers";
import { availableIntegrations } from "./sub-commands/integration/packages";
import { createResources } from "./sub-commands/resource/create-resources";

const load = (program: Command) => {
    return program
        .command("add")
        .allowExcessArguments(false)
        .action(addCommandAction)
        .addCommand(ResourceCommand)
        .addCommand(ProviderCommand)
        .addCommand(IntegrationCommand);
};

const addCommandAction = async (
    providersArg: ProviderId[],
    options: { path?: string },
) => {
    if (providersArg.length) {
        return await createProviderAction(providersArg, options);
    }

    const { component } = await addCommandPrompt();

    console.log("COMPONENT", component);
    if (component.group === "provider") {
        createProviders([component.value], options.path);
    }

    if (component.group === "integration") {
        const integration = availableIntegrations.find(
            (integration) => integration.id === component.value,
        );

        await integration?.runTransformer();
    }

    if (component.group === "resource") {
        await createResources({}, []);
    }
};

export default load;
