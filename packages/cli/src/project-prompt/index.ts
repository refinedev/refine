import { ENV } from "@utils/env";
import { addProjectIdToPackageJson, getRefineProjectId } from "@utils/package";
import inquirer from "inquirer";
import fetch from "node-fetch";
import os from "os";
import path from "path";
import { outputFileSync, existsSync } from "fs-extra";

export const projectPrompt = async () => {
    if (isProjectPromptDisabled()) {
        return;
    }

    try {
        const response = await inquirer.prompt({
            type: "input",
            name: "email",
            message: "Do you want to share your work email?",
            validate: (input) => {
                if (!input) {
                    return "Please enter your email";
                }

                return true;
            },
        });

        if (response.email) {
            let projectId = getRefineProjectId();

            if (projectId) {
                await updateProject(projectId, response.email);
            } else {
                projectId = await createNewProject(response.email);

                addProjectIdToPackageJson(projectId);
            }

            createSkipPromptFile();
        }
    } catch (e) {
        createSkipPromptFile();
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

const getConfigDir = () => {
    return (
        process.env["CONFIG_DIR"] ||
        process.env["XDG_CONFIG_HOME"] ||
        (os.platform() === "win32" && process.env["LOCALAPPDATA"]) ||
        path.join(os.homedir(), ".config")
    );
};

const createSkipPromptFile = () => {
    const configDir = getConfigDir();
    const skipPromptFilePath = path.join(configDir, "refine", "skip-prompt");

    outputFileSync(skipPromptFilePath, "");
};

const isSkipPromptFileExists = () => {
    const configDir = getConfigDir();
    const skipPromptFilePath = path.join(configDir, "refine", "skip-prompt");

    return existsSync(skipPromptFilePath);
};

export const isProjectPromptDisabled = () => {
    return (
        ENV.REFINE_PROJECT_PROMPT_DISABLED ||
        ENV.NODE_ENV !== "development" ||
        isSkipPromptFileExists()
    );
};
