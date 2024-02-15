import inquirer from "inquirer";
import chalk from "chalk";

import { getResourcePath } from "@utils/resource";
import { getProjectType } from "@utils/project";

import { Integration, integrationChoices } from "./add-integration";
import { providerChoices, getDefaultPath, Provider } from "./create-provider";

export type AddCommandPrompt =
    | {
          component: "provider";
          providers: Provider[];
          providersPath: string;
      }
    | {
          component: "integration";
          integration: Integration;
      }
    | {
          component: "resource";
          resourcePath: string;
      };

const providerChoicesMap: Record<
    Provider,
    { title: string; description: string }
> = {
    auth: {
        title: "Auth provider",
        description: "Manage user authentication and authorization",
    },
    live: {
        title: "Live provider",
        description: "Enable real-time updates and synchronization",
    },
    data: { title: "Data provider", description: "Communicate with your API" },
    "access-control": {
        title: "Access Control",
        description: "Manage user permissions & roles",
    },
    notification: {
        title: "Notification provider",
        description: "Display in-app alerts and messages",
    },
    i18n: {
        title: "I18n provider",
        description: "Support multiple languages and locales",
    },
    "audit-log": {
        title: "Audit Log provider",
        description: "Display audit logs for your resources",
    },
};

const printProviderChoices = (provider: Provider) => {
    const { title, description } = providerChoicesMap[provider];
    return `${chalk.blueBright(title)} - ${chalk.greenBright(description)}`;
};

export const addCommandPrompt = async () => {
    const result = await inquirer.prompt<AddCommandPrompt>([
        {
            type: "list",
            name: "component",
            message: "What do you want to add?",
            choices: ["provider", "integration", "resource"],
        },
        {
            type: "checkbox",
            name: "providers",
            message: "Which providers do you want to add?",
            choices: providerChoices.map((provider) => ({
                value: provider,
                name: printProviderChoices(provider),
            })),
            when: (answers) => answers.component === "provider",
        },
        {
            type: "input",
            name: "providersPath",
            message: "Where do you want to generate the providers?",
            when: (answers) => answers.component === "provider",
            default: getDefaultPath(),
        },
        {
            type: "list",
            name: "integration",
            message: "Which integration do you want to add?",
            choices: integrationChoices,
            when: (answers) => answers.component === "integration",
        },
        {
            type: "input",
            name: "resourcePath",
            message: "Where do you want to generate the resources?",
            when: (answers) => answers.component === "resource",
            default: getResourcePath(getProjectType())?.path,
        },
    ]);

    return result;
};
