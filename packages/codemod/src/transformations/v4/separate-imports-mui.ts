import { Collection, JSCodeshift } from "jscodeshift";
import fs from "fs";
import path from "path";
import { install } from "../../helpers";
import checkPackageLock from "../../helpers/checkPackageLock";
import separateImports from "../../helpers/separateImports";
import { exported } from "../../definitions/separated-imports/mui";

export const separateImportsMUIPostTransform = async (
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
        await install(
            rootDir,
            [
                "@emotion/react@^11.8.2",
                "@emotion/styled@^11.8.1",
                "@mui/lab@^5.0.0-alpha.85",
                "@mui/material@^5.8.6",
                "@mui/x-data-grid@^5.12.1",
            ],
            {
                useYarn,
                isOnline: true,
            },
        );
    }
};

export const separateImportsMUI = (j: JSCodeshift, source: Collection) => {
    separateImports({
        j,
        source,
        imports: ["MuiList"],
        renameImports: {
            MuiList: "List",
        },
        otherImports: exported,
        currentLibName: "@pankod/refine-mui",
        nextLibName: "@mui/material",
    });
};
