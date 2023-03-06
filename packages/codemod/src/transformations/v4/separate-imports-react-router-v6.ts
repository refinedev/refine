import { Collection, JSCodeshift } from "jscodeshift";
import fs from "fs";
import path from "path";
import { install } from "../../helpers";
import checkPackageLock from "../../helpers/checkPackageLock";
import separateImports from "../../helpers/separateImports";
import { exported } from "../../definitions/separated-imports/react-router-v6";

export const separateImportsReactRouterV6PostTransform = async (
    files: any,
    flags: any,
) => {
    const rootDir = path.join(process.cwd(), files[0]);
    const packageJsonPath = path.join(rootDir, "package.json");
    const useYarn = checkPackageLock(rootDir) === "yarn.lock";

    // Check root package.json exists
    try {
        JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    } catch (err) {
        console.error(
            `Error: failed to load package.json from ${packageJsonPath}, ensure provided directory is root.`,
        );
    }

    if (!flags.dry) {
        await install(rootDir, ["react-router-dom@^6.8.1"], {
            useYarn,
            isOnline: true,
        });
    }
};

export const separateImportsReactRouterV6 = (
    j: JSCodeshift,
    source: Collection,
) => {
    separateImports({
        j,
        source,
        imports: exported,
        renameImports: {},
        otherImports: {},
        currentLibName: "@pankod/refine-react-router-v6",
        nextLibName: "react-router-dom",
    });
};
