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

export const removePackage = (root: string, deps: string[]) => {
    try {
        const hasPackageJson = fs.existsSync(path.join(root, "package.json"));
        if (!hasPackageJson) {
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
            dependencies: Object.entries(dependencies)
                .flatMap(([key, value]) => {
                    if (deps.includes(key)) {
                        return [];
                    }
                    return [[key, value]];
                })
                .reduce((acc, [key, value]) => {
                    acc[key as any] = value;
                    return acc;
                }, {}),
        };

        fs.writeFileSync(
            path.join(root, "package.json"),
            JSON.stringify(newContent, null, getSpacing(content)),
        );
    } catch (err) {}
};
