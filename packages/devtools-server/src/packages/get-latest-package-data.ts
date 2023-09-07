import execa from "execa";

export const getLatestPackageData = async (
    packageName: string,
): Promise<{ name: string; version?: string; description?: string }> => {
    try {
        const { stdout } = await execa("npm", [
            "view",
            packageName,
            "name",
            "version",
            "description",
            "--json",
        ]);
        const parsed = JSON.parse(stdout);

        return parsed;
    } catch (e) {
        return { name: packageName };
    }
};
