import { readFileSync, existsSync } from "fs-extra";

// TODO: Add package.json type
export const getPackageJson = (): any => {
    if (!existsSync("package.json")) {
        throw new Error("./package.json not found");
    }

    return JSON.parse(readFileSync("package.json", "utf8"));
};

export const getDependencies = (): string[] => {
    const packageJson = getPackageJson();
    return Object.keys(packageJson.dependencies || {});
};

export const getDependenciesWithVersion = (): string[] => {
    const packageJson = getPackageJson();
    return packageJson.dependencies;
};
