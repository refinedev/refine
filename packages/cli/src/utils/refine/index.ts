import { getInstalledRefinePackages, getPackageJson } from "@utils/package";

type ReturnType = {
    dev: boolean;
};

/**
 * Checks if the project has a refine script in package.json
 */
export const hasDefaultScript = (): ReturnType => {
    const packageJson = getPackageJson();

    const scripts = packageJson.scripts || {};

    const isDefault =
        ((scripts?.dev || "") as string).match(/refine dev(\s|$|;){1}/) !==
        null;

    return {
        dev: isDefault,
    };
};

export const getRefineCorePackage = async () => {
    const installedRefinePackages = await getInstalledRefinePackages();
    const corePackage = installedRefinePackages?.find(
        (pkg) =>
            pkg.name === "@refinedev/core" ||
            pkg.name === "@pankod/refine-core",
    );

    return corePackage;
};
