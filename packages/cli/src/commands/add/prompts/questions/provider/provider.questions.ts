import chalk from "chalk";

import {
    Provider,
    getDefaultPath,
    availableProviders,
} from "../../../create-provider";
import { QuestionCollection } from "inquirer";
import { AddCommandAnswers } from "../../add-command.prompt";

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

export const buildProviderChoices = () =>
    availableProviders.map((provider) => ({
        value: provider,
        name: printProviderChoice(provider),
    }));

export const providerQuestions: QuestionCollection<AddCommandAnswers>[] = [
    {
        type: "checkbox",
        name: "providers",
        message: "Which providers do you want to add?",
        when: (answers) => answers.component === "provider",
        choices: buildProviderChoices,
    },
    {
        type: "input",
        name: "providersPath",
        message: "Where do you want to generate the providers?",
        when: (answers) => answers.component === "provider",
        default: getDefaultPath(),
    },
];
