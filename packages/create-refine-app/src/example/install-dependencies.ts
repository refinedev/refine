import execa from "execa";
import whichPMRuns from "which-pm-runs";

export function findPM() {
    try {
        const { name } = whichPMRuns() || {};
        return name ?? "npm";
    } catch (err) {
        return "npm";
    }
}

export async function installDependencies(root: string) {
    await execa(findPM(), ["install"], {
        cwd: root,
        stdio: "inherit",
    });
}
