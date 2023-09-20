import { getPackageJson } from "@utils/package";

type ReturnType = {
    dev: "default" | "modified";
};

/**
 * Checks if the project has a refine script in package.json
 */
export const hasDefaultScript = (): ReturnType => {
    const packageJson = getPackageJson();

    const scripts = packageJson.scripts || {};

    const isModified = !scripts.dev.includes("refine dev");

    return {
        dev: isModified ? "modified" : "default",
    };
};
