import inquirer from "inquirer";
import { Integration, integrationChoices } from "./add-integration";
import { providerChoices, getDefaultPath, Provider } from "./create-provider";
import { getResourcePath } from "@utils/resource";
import { getProjectType } from "@utils/project";

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
            choices: providerChoices,
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
