import { ProjectTypes } from "@definitions/projectTypes";
import { getProjectType } from "@utils/project";
import chalk from "chalk";
import { Integration, availableIntegrations } from "../../../add-integration";
import { QuestionCollection } from "inquirer";

const projectType = getProjectType();

const integrationChoicesMap: Record<
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
        integrationChoicesMap[integration]();

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

export const integrationQuestions: QuestionCollection[] = [
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
];
