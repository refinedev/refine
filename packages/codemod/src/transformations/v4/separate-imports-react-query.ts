import { API, FileInfo } from "jscodeshift";
import fs from "fs";
import path from "path";
import { install, addPackage, isPackageJsonUpdated } from "../../helpers";
import checkPackageLock from "../../helpers/checkPackageLock";
import separateImports from "../../helpers/separateImports";
import { exported } from "../../definitions/separated-imports/react-query";

export const parser = "tsx";

export async function postTransform(files: any, flags: any) {
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
}

const REFINE_LIB_PATH = "@pankod/refine-core";
const REACT_QUERY_PATH = "@tanstack/react-query";
const REACT_QUERY_VERSION = "^4.10.1";

export default function transformer(file: FileInfo, api: API): string {
    const j = api.jscodeshift;
    const source = j(file.source);

    separateImports({
        j,
        source,
        imports: exported,
        renameImports: {},
        otherImports: {},
        currentLibName: REFINE_LIB_PATH,
        nextLibName: REACT_QUERY_PATH,
    });

    // if use `@tanstack/react-query` add package.json
    const reactQuery = source.find(j.ImportDeclaration, {
        source: {
            value: REACT_QUERY_PATH,
        },
    });

    if (reactQuery.length) {
        addPackage(process.cwd(), { [REACT_QUERY_PATH]: REACT_QUERY_VERSION });
    }

    return source.toSource();
}
