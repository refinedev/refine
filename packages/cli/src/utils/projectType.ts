import { readFileSync, existsSync } from "fs-extra";

import { ProjectTypes } from "@definitions/projectTypes";

export const getProjectType = (): ProjectTypes => {
    // read package.json
    if (!existsSync("package.json")) {
        throw new Error("./package.json not found");
    }

    // read dependencies from package.json
    const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
    const dependencies = Object.keys(packageJson.dependencies || {});

    // check for react-scripts
    if (dependencies.includes("react-scripts")) {
        return ProjectTypes.REACT_SCRIPT;
    }

    // check for next
    if (dependencies.includes("next")) {
        return ProjectTypes.NEXTJS;
    }

    // check for remix
    if (dependencies.includes("@remix-run/react")) {
        return ProjectTypes.REMIX;
    }

    throw new Error("Project type not found");
};
