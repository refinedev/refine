import inquirer from "inquirer";

import { getResourcePath } from "@utils/resource";
import { getProjectType } from "@utils/project";

import { Integration } from "../add-integration";
import { Provider } from "../create-provider";
import { providerQuestions } from "./questions/provider/provider.questions";
import { integrationQuestions } from "./questions/integration/integration.questions";

export type AddCommandAnswers =
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

export const addCommandPrompt = async (
    initialAnswers?: Partial<AddCommandAnswers>,
) => {
    const result = await inquirer.prompt<AddCommandAnswers>(
        [
            {
                type: "list",
                name: "component",
                message: "What do you want to add?",
                choices: ["provider", "integration", "resource"],
            },
            ...providerQuestions,
            ...integrationQuestions,
            {
                type: "input",
                name: "resourcePath",
                message: "Where do you want to generate the resources?",
                when: (answers) => answers.component === "resource",
                default: getResourcePath(getProjectType())?.path,
            },
        ],
        initialAnswers,
    );

    return result;
};
