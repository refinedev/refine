import fs from "fs";
import path from "path";

export const addPackage = (root: string, deps: Record<string, string>) => {
    try {
        const hasPackageJson = fs.existsSync(path.join(root, "package.json"));
        if (!hasPackageJson) {
            return;
        }
        if (Object.keys(deps).length === 0) {
            return;
        }
        const packageJson = JSON.parse(
            fs.readFileSync(path.join(root, "package.json"), "utf8"),
        );
        const { dependencies = {} } = packageJson;

        const newContent = {
            ...packageJson,
            dependencies: {
                ...dependencies,
                ...deps,
            },
        };

        fs.writeFileSync(
            path.join(root, "package.json"),
            JSON.stringify(newContent, null, 2),
        );
    } catch (err) {}
};
