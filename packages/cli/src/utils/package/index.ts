import { readFileSync, existsSync, readJSON, pathExists } from "fs-extra";
import execa from "execa";
import globby from "globby";
import path from "path";
import preferredPM from "preferred-pm";
import spinner from "@utils/spinner";

// TODO: Add package.json type
export const getPackageJson = (): any => {
    if (!existsSync("package.json")) {
        throw new Error("./package.json not found");
    }

    return JSON.parse(readFileSync("package.json", "utf8"));
};

export const getDependencies = (): string[] => {
    const packageJson = getPackageJson();
    return Object.keys(packageJson.dependencies || {});
};

export const getDependenciesWithVersion = (): string[] => {
    const packageJson = getPackageJson();
    return packageJson.dependencies;
};

export const getDevDependencies = (): string[] => {
    const packageJson = getPackageJson();
    return Object.keys(packageJson.devDependencies || {});
};

export const getScripts = (): Record<string, string> => {
    const packageJson = getPackageJson();
    return packageJson.scripts;
};

export const getInstalledRefinePackages = async () => {
    try {
        const execution = await execa("npm", ["ls", "--depth=0", "--json"], {
            reject: false,
        });

        const dependencies = JSON.parse(execution.stdout)?.dependencies || {};
        const refineDependencies = Object.keys(dependencies).filter(
            (dependency) => dependency.startsWith("@refinedev"),
        );

        const normalize: {
            name: string;
            version: string;
        }[] = [];

        for (const dependency of refineDependencies) {
            const version = dependencies[dependency].version;
            normalize.push({
                name: dependency,
                version,
            });
        }

        return normalize;
    } catch (error) {
        return Promise.resolve(null);
    }
};

export const getInstalledRefinePackagesFromNodeModules = async () => {
    const REFINE_PACKAGES = ["core"];

    try {
        const packagesFromGlobbySearch = await globby(
            "node_modules/@refinedev/*",
            {
                onlyDirectories: true,
            },
        );

        const packageDirsFromModules = REFINE_PACKAGES.flatMap((pkg) => {
            try {
                const pkgPath = require.resolve(
                    path.join("@refinedev", pkg, "package.json"),
                );

                return [path.dirname(pkgPath)];
            } catch (err) {
                return [];
            }
        });

        const refinePackages: Array<{ name: string; path: string }> = [];

        await Promise.all(
            [...packageDirsFromModules, ...packagesFromGlobbySearch].map(
                async (packageDir) => {
                    const hasPackageJson = await pathExists(
                        `${packageDir}/package.json`,
                    );
                    if (hasPackageJson) {
                        const packageJson = await readJSON(
                            `${packageDir}/package.json`,
                        );

                        refinePackages.push({
                            name: packageJson.name,
                            path: packageDir,
                        });
                    }
                },
            ),
        );

        return refinePackages;
    } catch (err) {
        return [];
    }
};
export const isPackageHaveRefineConfig = async (packagePath: string) => {
    return await pathExists(`${packagePath}/refine.config.js`);
};

export const pmCommands = {
    npm: {
        install: ["install", "--save"],
        installDev: ["install", "--save-dev"],
        outdatedJson: ["outdated", "--json"],
    },
    yarn: {
        install: ["add"],
        installDev: ["add", "-D"],
        outdatedJson: ["outdated", "--json"],
    },
    pnpm: {
        install: ["add"],
        installDev: ["add", "-D"],
        outdatedJson: ["outdated", "--format", "json"],
    },
};

export const getPreferedPM = async () => {
    const pm = await spinner(
        () => preferredPM(process.cwd()),
        "Getting package manager...",
    );

    if (!pm) {
        throw new Error("Package manager not found.");
    }

    return pm;
};

export const installPackages = async (packages: string[]) => {
    const pm = await getPreferedPM();

    try {
        const installCommand = pmCommands[pm.name].install;

        const execution = execa(pm.name, [...installCommand, ...packages], {
            stdio: "inherit",
        });

        execution.on("message", (message) => {
            console.log(message);
        });

        execution.on("error", (error) => {
            console.log(error);
        });

        execution.on("exit", (exitCode) => {
            if (exitCode === 0) {
                console.log("All `refine` packages updated  🎉");
                return;
            }

            console.log(`Application exited with code ${exitCode}`);
        });
    } catch (error: any) {
        throw new Error(error);
    }
};

export interface PackageNameAndVersion {
    name: string;
    version: string | null;
}

export const parsePackageNameAndVersion = (
    str: string,
): PackageNameAndVersion => {
    const versionStartIndex = str.lastIndexOf("@");

    if (versionStartIndex <= 0) {
        return {
            name: str,
            version: null,
        };
    }

    return {
        name: str.slice(0, versionStartIndex),
        version: str.slice(versionStartIndex + 1),
    };
};
