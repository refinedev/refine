import { API, FileInfo } from "jscodeshift";
import fs from "fs";
import path from "path";
import { addPackage, install, isPackageJsonUpdated } from "../helpers";
import checkPackageLock from "../helpers/checkPackageLock";
import separateImports from "../helpers/separateImports";
import {
    exported,
    rename,
    renameToDefault,
    other,
} from "../definitions/separated-imports/antd";

export const parser = "tsx";

const REFINE_ANTD_PATH = "@pankod/refine-antd";
const ANTD_PATH = "antd";
const ANTD_VERSION = "^5.0.5";
const ANTD_ICONS_PATH = "@ant-design/icons";
const ANTD_ICONS_VERSION = "^5.0.1";

export async function postTransform(files: any, flags: any) {
    const rootDir = path.join(process.cwd(), files[0]);
    const packageJsonPath = path.join(rootDir, "package.json");
    const useYarn = checkPackageLock(rootDir) === "yarn.lock";
    const needsInstall = isPackageJsonUpdated(rootDir);

    if (!needsInstall) {
        return;
    }

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

export default function transformer(file: FileInfo, api: API): string {
    const j = api.jscodeshift;
    const source = j(file.source);

    separateImports({
        j,
        source,
        imports: exported,
        renameImports: rename,
        renameToDefault: renameToDefault,
        otherImports: other,
        currentLibName: REFINE_ANTD_PATH,
        nextLibName: ANTD_PATH,
    });

    let addIcons = false;

    const addAntd =
        source.find(j.ImportDeclaration, {
            source: {
                value: ANTD_PATH,
            },
        }).length > 0;

    // check Icons import
    const refineImport = source.find(j.ImportDeclaration, {
        source: {
            value: REFINE_ANTD_PATH,
        },
    });

    refineImport.replaceWith((p) => {
        for (const item of p.node.specifiers) {
            if (item.local.name === "Icons") {
                // flag for adding `@antd-design/icons` dependency
                addIcons = true;

                // add new icon namespace import
                source
                    .find(j.ImportDeclaration, {
                        source: {
                            value: REFINE_ANTD_PATH,
                        },
                    })
                    .forEach((path, i) => {
                        if (i === 0) {
                            path.insertAfter(
                                j.importDeclaration(
                                    [
                                        j.importNamespaceSpecifier(
                                            j.identifier("Icons"),
                                        ),
                                    ],
                                    j.literal(ANTD_ICONS_PATH),
                                ),
                            );
                        }
                    });
            }
        }

        p.node.specifiers = p.node.specifiers.filter(
            (p) => p.local.name !== "Icons",
        );

        return p.node;
    });

    if (addIcons) {
        addPackage(process.cwd(), { [ANTD_ICONS_PATH]: ANTD_ICONS_VERSION });
    }
    if (addAntd) {
        addPackage(process.cwd(), { [ANTD_PATH]: ANTD_VERSION });
    }

    // remove empty imports
    source
        .find(j.ImportDeclaration, {
            source: {
                value: REFINE_ANTD_PATH,
            },
        })
        .filter((path) => path.node.specifiers.length === 0)
        .remove();

    return source.toSource();
}
