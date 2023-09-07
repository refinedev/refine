import path from "path";
import fs from "fs";

export const getInstalledPackageData = async (packageName: string) => {
    try {
        const packagePath = require.resolve(packageName);

        if (!packagePath) {
            return null;
        }

        const packageDirectoryName = packageName.replace(/^@.*\//, "");
        const packageDirectoryPath = packagePath.replace(
            new RegExp(`/${packageDirectoryName}.*$`),
            `/${packageDirectoryName}`,
        );

        const packageJsonPath = path.join(packageDirectoryPath, "package.json");

        const parsed = JSON.parse(
            fs.readFileSync(packageJsonPath, { encoding: "utf-8" }),
        );

        return {
            name: parsed.name,
            version: parsed.version,
        };
    } catch (e) {
        return null;
    }
};
