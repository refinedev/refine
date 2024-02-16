import { Command, Argument } from "commander";
import { addIntegrationPrompt } from "./prompt";
import { availableIntegrations } from "./packages";

const addIntegrationAction = async (name?: string) => {
    let integrationID = name;

    if (!integrationID) {
        const answer = await addIntegrationPrompt();

        integrationID = answer.id;
    }

    const integration = availableIntegrations.find(
        (integration) => integration.id === integrationID,
    );

    if (integration) {
        await integration.runTransformer();
    }
};

export const IntegrationCommand = new Command("integration")
    .addArgument(
        new Argument("[name]", "Name of the integration").choices(
            availableIntegrations.map((integration) => integration.id),
        ),
    )
    .action(addIntegrationAction);
