import execa from "execa";
import preferredPM from "preferred-pm";
import spinner from "src/utils/spinner";

export type PM = "npm" | "pnpm" | "yarn";

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
        outdatedJson: ["outdated", "--json"],
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
