import inquirer from "inquirer";
import chalk from "chalk";

import { getResourcePath } from "@utils/resource";
import { getProjectType } from "@utils/project";

import { Integration, availableIntegrations } from "./add-integration";
import { providerChoices, getDefaultPath, Provider } from "./create-provider";
import { ProjectTypes } from "@definitions/projectTypes";

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

const printProviderChoice = (provider: Provider) => {
    const { title, description } = providerChoicesMap[provider];
    return `${chalk.blueBright(title)} - ${chalk.greenBright(description)}`;
};

const projectType = getProjectType();

const integrationChoisesMap: Record<
    Integration,
    () => { title: string; description: string; disabled: boolean }
> = {
    "react-router": () => {
        const title = "React Router";

        if (projectType === ProjectTypes.NEXTJS) {
            return {
                title,
                description: `Can't be used with Next.js. https://nextjs.org/docs/app/building-your-application/routing`,
                disabled: true,
            };
        }

        if (projectType === ProjectTypes.REMIX) {
            return {
                title,
                description: `Can't be used with Remix. https://remix.run/docs/en/main/discussion/routes`,
                disabled: true,
            };
        }

        return {
            title,
            description: "Setup routing with React Router",
            disabled: false,
        };
    },
    "ant-design": () => {
        const title = "Ant Design";

        if ([ProjectTypes.NEXTJS, ProjectTypes.REMIX].includes(projectType)) {
            return {
                title,
                description: `Automatic setup only available Vite for now. See the documentation for manual installation: https://refine.dev/docs/ui-integrations/ant-design/introduction/#installation`,
                disabled: true,
            };
        }

        return {
            title,
            description: "Setup Ant Design with Refine",
            disabled: false,
        };
    },
};

const buildIntegrationChoice = (integration: Integration) => {
    const { title, description, disabled } =
        integrationChoisesMap[integration]();

    return {
        value: integration,
        name: `${chalk.blueBright(title)} - ${
            disabled
                ? chalk.redBright(description)
                : chalk.greenBright(description)
        }`,
        disabled,
    };
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
                name: printProviderChoice(provider),
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
            choices: (_answers) => {
                const integrationChoices = availableIntegrations.map(
                    (integration) => buildIntegrationChoice(integration),
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
            },
            when: (answers) => answers.component === "integration",
            default: "none",
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
