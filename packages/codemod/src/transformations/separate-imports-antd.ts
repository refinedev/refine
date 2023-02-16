import { API, FileInfo } from "jscodeshift";
import fs from "fs";
import path from "path";
import { install } from "../helpers";
import checkPackageLock from "../helpers/checkPackageLock";
import separateImports from "../helpers/separateImports";
import { exported, rename, other } from "../definitions/separated-imports/antd";

export const parser = "tsx";

const REFINE_ANTD_PATH = "@pankod/refine-antd";
const ANTD_PATH = "antd";
const ANTD_ICONS_PATH = "@ant-design/icons";
const ANTD_ICONS_VERSION = "^5.0.1";

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
        await install(rootDir, [`antd@^5.0.5`], {
            useYarn,
            isOnline: true,
        });
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
        otherImports: other,
        currentLibName: REFINE_ANTD_PATH,
        nextLibName: ANTD_PATH,
    });

    // check Icons import
    const refineImport = source.find(j.ImportDeclaration, {
        source: {
            value: REFINE_ANTD_PATH,
        },
    });

    refineImport.replaceWith((p) => {
        for (const item of p.node.specifiers) {
            if (item.local.name === "Icons") {
                // install `@antd-design/icons`
                const rootDir = path.join(process.cwd(), file.path);
                const useYarn = checkPackageLock(rootDir) === "yarn.lock";
                install(rootDir, [`${ANTD_ICONS_PATH}@${ANTD_ICONS_VERSION}`], {
                    useYarn,
                    isOnline: true,
                });

                // add new icon namespace import
                source
                    .find(j.ImportDeclaration, {
                        source: {
                            value: REFINE_ANTD_PATH,
                        },
                    })
                    .insertAfter(
                        j.importDeclaration(
                            [j.importNamespaceSpecifier(j.identifier("Icons"))],
                            j.literal(ANTD_ICONS_PATH),
                        ),
                    );
            }
        }

        p.node.specifiers = p.node.specifiers.filter(
            (p) => p.local.name !== "Icons",
        );

        return p.node;
    });

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
