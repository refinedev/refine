import inquirer from "inquirer";

import { availableIntegrations } from "./packages";
import { getProjectType } from "@utils/project";

export const buildIntegrationChoices = () => {
    const projectType = getProjectType();

    const integrationChoices = availableIntegrations.map((integration) =>
        integration.getChoice(projectType),
    );

    if (integrationChoices.every((choice) => choice.disabled)) {
        return [
            {
                value: "none",
                name: "No integration available for this project type.",
            },
            ...integrationChoices,
        ];
    } else {
        return integrationChoices;
    }
};

export const addIntegrationPrompt = async () => {
    return await inquirer.prompt<{ id: string }>([
        {
            type: "list",
            name: "id",
            message: "Which integration do you want to add?",
            choices: buildIntegrationChoices(),
            default: "none",
        },
    ]);
};
