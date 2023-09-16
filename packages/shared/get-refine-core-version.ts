import fs from "fs";
import path from "path";

export const getRefineCoreVersion = async () => {
    const packages = await fs.promises.readFile(
        path.join("..", "core", "package.json"),
        "utf8",
    );
    const { version } = JSON.parse(packages);
    return version;
};
