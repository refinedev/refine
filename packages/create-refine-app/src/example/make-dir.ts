import fs from "fs";

export async function makeDir(
    root: string,
    options = { recursive: true },
): Promise<void> {
    if (fs.existsSync(root)) {
        return;
    }
    return fs.promises.mkdir(root, options);
}
