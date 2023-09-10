import preferredPM from "preferred-pm";
import execa from "execa";

export const updatePackage = async (
    packageName: string,
    projectPath: string = process.cwd(),
) => {
    try {
        const { name: pm } = (await preferredPM(projectPath)) ?? {
            name: "npm",
        };

        const { failed } = await execa(pm ?? "npm", [
            "install",
            `${packageName}@latest`,
        ]);

        return !failed;
    } catch (error) {
        return false;
    }
};
