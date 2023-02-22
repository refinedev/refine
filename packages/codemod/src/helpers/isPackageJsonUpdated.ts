import fs from "fs";
import path from "path";

export const isPackageJsonUpdated = (root: string) => {
    // check if the package.json file has been updated
    const packageJsonPath = path.join(root, "package.json");

    try {
        const packageJsonStats = fs.statSync(packageJsonPath);
        const modifiedTime = packageJsonStats.mtimeMs;

        return modifiedTime > process.uptime() * 1000;
    } catch (e) {
        return true;
    }
};
