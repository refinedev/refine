import path from "path";
import fs from "fs";

export const getPackages = (projectPath: string = process.cwd()) => {
    const packageJson = JSON.parse(
        fs.readFileSync(path.join(projectPath, "package.json"), "utf-8"),
    );

    const refinePackages = Object.keys(packageJson.dependencies).filter(
        (packageName) => packageName.startsWith("@refinedev/"),
    );

    return refinePackages;
};
