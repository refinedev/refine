import { Collection, JSCodeshift } from "jscodeshift";
import fs from "fs";
import path from "path";
import { addPackage, install, isPackageJsonUpdated } from "../../helpers";
import checkPackageLock from "../../helpers/checkPackageLock";
import separateImports from "../../helpers/separateImports";
import { exported } from "../../definitions/separated-imports/react-hook-form";

export const separateImportsReactHookFormPostTransform = async (
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
        if (isPackageJsonUpdated(rootDir)) {
            await install(rootDir, null, {
                useYarn,
                isOnline: true,
            });
        }
    }
};

const REFINE_LIB_PATH = "@pankod/refine-react-hook-form";
const REACT_HOOK_FORM_PATH = "react-hook-form";
const REACT_HOOK_FORM_VERSION = "^7.22.1";

export const separateImportsReactHookForm = (
    j: JSCodeshift,
    source: Collection,
) => {
    separateImports({
        j,
        source,
        imports: exported,
        renameImports: {},
        otherImports: {},
        currentLibName: REFINE_LIB_PATH,
        nextLibName: REACT_HOOK_FORM_PATH,
    });

    // if use `react-hook-form` add package.json
    const reactQuery = source.find(j.ImportDeclaration, {
        source: {
            value: REACT_HOOK_FORM_PATH,
        },
    });

    if (reactQuery.length) {
        addPackage(process.cwd(), {
            [REACT_HOOK_FORM_PATH]: REACT_HOOK_FORM_VERSION,
        });
    }
};
