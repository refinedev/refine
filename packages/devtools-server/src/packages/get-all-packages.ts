import { PackageType } from "@refinedev/devtools-shared";
import { getInstalledPackageData } from "./get-installed-package-data";
import { getLatestPackageData } from "./get-latest-package-data";
import { getPackagesFromPackageJSON } from "./get-packages-from-package-json";
import { getChangelog } from "./get-changelog";
import { getDocumentation } from "./get-documentation";

export const getAllPackages = async (projectPath?: string) => {
    try {
        const refinePackages = await getPackagesFromPackageJSON(projectPath);
        const installedVersions = await Promise.all(
            refinePackages.map(async (packageName) => {
                const [latestInfo, currentInfo] = await Promise.all([
                    getLatestPackageData(packageName),
                    getInstalledPackageData(packageName),
                ]);

                return {
                    name: packageName,
                    latestVersion: latestInfo?.version ?? currentInfo?.version,
                    currentVersion: currentInfo?.version,
                    description: latestInfo?.description,
                    changelog: getChangelog(packageName),
                    documentation: getDocumentation(packageName),
                } as PackageType;
            }),
        );

        return installedVersions;
    } catch (error) {
        return [];
    }
};
