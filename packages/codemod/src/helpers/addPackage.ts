import fs from "fs";
import path from "path";

const getSpacing = (content: string) => {
    const lines = content.split("\n");
    const depsLine = lines.find((line) => line.includes('"dependencies":'));
    if (!depsLine) {
        return 4;
    } else {
        const match = depsLine.match(/(\s*)/);
        if (match) {
            return match?.[0]?.length ?? 4;
        }
    }
    return 4;
};

export const addPackage = (root: string, deps: Record<string, string>) => {
    try {
        const hasPackageJson = fs.existsSync(path.join(root, "package.json"));
        if (!hasPackageJson) {
            return;
        }
        if (Object.keys(deps).length === 0) {
            return;
        }
        const content = fs.readFileSync(
            path.join(root, "package.json"),
            "utf8",
        );
        const packageJson = JSON.parse(content);
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
            JSON.stringify(newContent, null, getSpacing(content)),
        );
    } catch (err) {}
};
