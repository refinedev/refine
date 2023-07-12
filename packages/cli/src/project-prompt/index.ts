import { ENV } from "@utils/env";
import { addProjectIdToPackageJson, getRefineProjectId } from "@utils/package";
import inquirer from "inquirer";
import fetch from "node-fetch";

export const projectPrompt = async () => {
    if (isProjectPromptDisabled()) {
        return;
    }

    const response = await inquirer.prompt({
        type: "input",
        name: "email",
        message: "Do you want to share your work email?",
    });

    if (response.email) {
        let projectId = getRefineProjectId();

        if (projectId) {
            await updateProject(projectId, response.email);
        } else {
            projectId = await createNewProject(response.email);

            addProjectIdToPackageJson(projectId);
        }
    }
};

const createNewProject = async (email: string) => {
    const res = await fetch("https://telemetry.refine.dev/projects", {
        method: "POST",
        body: JSON.stringify({
            email,
        }),
        headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    return data.projectId;
};

const updateProject = async (projectId: string, email: string) => {
    await fetch(`https://telemetry.refine.dev/projects/${projectId}`, {
        method: "PATCH",
        body: JSON.stringify({
            email,
        }),
        headers: { "Content-Type": "application/json" },
    });
};

export const isProjectPromptDisabled = () => {
    return ENV.REFINE_PROJECT_PROMPT_DISABLED || ENV.NODE_ENV !== "development";
};
