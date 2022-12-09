import execa from "execa";
import path from "path";
import rimraf from "rimraf";

function isInGitRepository(): boolean {
    try {
        execa.sync("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
        return true;
    } catch (_) {}
    return false;
}

function isInMercurialRepository(): boolean {
    try {
        execa.sync("hg --cwd . root", { stdio: "ignore" });
        return true;
    } catch (_) {}
    return false;
}

export function gitInit(root: string, message: string): boolean {
    let didInit = false;
    try {
        execa.sync("git --version", { stdio: "ignore" });
        if (isInGitRepository() || isInMercurialRepository()) {
            return false;
        }

        execa.sync("git init", { stdio: "ignore" });
        didInit = true;

        execa.sync("git checkout -b main", { stdio: "ignore" });

        execa.sync("git add -A", { stdio: "ignore" });
        execa.sync(`git commit -m "${message}"`, {
            stdio: "ignore",
        });
        return true;
    } catch (e) {
        if (didInit) {
            try {
                rimraf.sync(path.join(root, ".git"));
            } catch (_) {}
        }
        return false;
    }
}
