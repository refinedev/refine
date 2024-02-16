import { ProjectTypes } from "@definitions/projectTypes";
import { getProjectType } from "@utils/project";
import chalk from "chalk";
import { Integration, availableIntegrations } from "../../../add-integration";
import { QuestionCollection } from "inquirer";

const projectType = getProjectType();

const integrationChoicesMap: Record<
    Integration,
    () => { title: string; description: string; disabled?: string }
> = {
    "react-router": () => {
        const title = "React Router";
        const description = "Setup routing with React Router";
        let disabled;

        if (projectType === ProjectTypes.NEXTJS) {
            disabled = `Can't be used with Next.js. https://nextjs.org/docs/app/building-your-application/routing`;
        }

        if (projectType === ProjectTypes.REMIX) {
            disabled = `Can't be used with Remix. https://remix.run/docs/en/main/discussion/routes`;
        }

        return {
            title,
            description,
            disabled,
        };
    },
    "ant-design": () => {
        const title = "Ant Design";
        const description = "Setup Ant Design with Refine";
        let disabled;

        if ([ProjectTypes.NEXTJS, ProjectTypes.REMIX].includes(projectType)) {
            disabled = `Automatic setup only available Vite for now. See the documentation for manual installation: https://refine.dev/docs/ui-integrations/ant-design/introduction/#installation`;
        }

        return {
            title,
            description,
            disabled,
        };
    },
};

const buildIntegrationChoice = (integration: Integration) => {
    const { title, description, disabled } =
        integrationChoicesMap[integration]();

    if (disabled) {
        return {
            value: integration,
            name: `${chalk.gray(title)}`,
            disabled: chalk.redBright(disabled),
        };
    }

    return {
        value: integration,
        name: `${chalk.blueBright(title)} - ${description}`,
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
