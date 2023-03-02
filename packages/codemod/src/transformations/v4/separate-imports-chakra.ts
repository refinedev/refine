import { Collection, JSCodeshift } from "jscodeshift";
import fs from "fs";
import path from "path";
import { install } from "../../helpers";
import checkPackageLock from "../../helpers/checkPackageLock";
import separateImports from "../../helpers/separateImports";
import { exported, rename } from "../../definitions/separated-imports/chakra";

export const separateImportsChakraPostTransform = async (
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
        await install(rootDir, ["@chakra-ui/react@^2.3.6"], {
            useYarn,
            isOnline: true,
        });
    }
};

export const separateImportsChakra = (j: JSCodeshift, source: Collection) => {
    separateImports({
        j,
        source,
        imports: exported,
        renameImports: rename,
        otherImports: {},
        currentLibName: "@pankod/refine-chakra-ui",
        nextLibName: "@chakra-ui/react",
    });
};
