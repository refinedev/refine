import { API, Collection, FileInfo, JSCodeshift } from "jscodeshift";
import fs from "fs";
import path from "path";
import {
    addPackage,
    install,
    isPackageJsonUpdated,
    removePackage,
} from "../../helpers";
import checkPackageLock from "../../helpers/checkPackageLock";

export const parser = "tsx";

const previousScope = "@pankod/refine-";
const newScope = "@refinedev/";

const renameImports = (j: JSCodeshift, source: Collection) => {
    source
        .find(j.ImportDeclaration)
        .filter((path) =>
            path.node.source.value?.toString()?.startsWith(previousScope),
        )
        .forEach((path) => {
            const oldName = path.node.source.value?.toString() ?? "";
            const newName = `${newScope}${oldName.replace(previousScope, "")}`;

            addPackage(process.cwd(), { [newName]: "latest" });
            removePackage(process.cwd(), [oldName]);

            j(path).replaceWith(
                j.importDeclaration(path.node.specifiers, j.literal(newName)),
            );
        });
};

const renameExports = (j: JSCodeshift, source: Collection) => {
    source
        .find(j.ExportNamedDeclaration)
        .filter(
            (path) =>
                path.node.source &&
                path.node.source.value?.toString()?.startsWith(previousScope),
        )
        .forEach((path) => {
            const oldName = path.node.source.value?.toString() ?? "";
            const newName = `${newScope}${oldName.replace(previousScope, "")}`;

            addPackage(process.cwd(), { [newName]: "latest" });
            removePackage(process.cwd(), [oldName]);

            j(path).replaceWith(
                j.exportNamedDeclaration(
                    path.node.declaration,
                    path.node.specifiers,
                    j.literal(newName),
                ),
            );
        });
};

export const replacePankodImportsWithRefineDevPostTransform = async (
    files: any,
    flags: any,
) => {
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
};

export const replacePankodImportsWithRefineDev = async (
    j: JSCodeshift,
    source: Collection,
) => {
    renameImports(j, source);
    renameExports(j, source);
};
