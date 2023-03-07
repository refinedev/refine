import { Collection, JSCodeshift } from "jscodeshift";
import { CONFIG_FILE_NAME, CodemodConfig } from "../../helpers";

export const parser = "tsx";

const previousScope = "@pankod/refine-";
const newScope = "@refinedev/";

const deprecatedPackages = [
    "@pankod/refine-react-location",
    "@pankod/refine-react-router",
];

const getOldPackageName = (oldName: string) => {
    return `${previousScope}${oldName.replace(previousScope, "")}`;
};

const getNewPackageName = (oldName: string) => {
    return `${newScope}${oldName.replace(previousScope, "")}`;
};

const renameImports = (j: JSCodeshift, source: Collection) => {
    const config = new CodemodConfig(CONFIG_FILE_NAME);

    source
        .find(j.ImportDeclaration)
        .filter(
            (path) =>
                path.node.source.value?.toString()?.startsWith(previousScope) &&
                !deprecatedPackages.includes(
                    path.node.source.value?.toString() ?? "",
                ),
        )
        .forEach((path) => {
            const oldName = getOldPackageName(
                path.node.source.value?.toString() ?? "",
            );
            const newName = getNewPackageName(oldName);

            config.addPackage(newName);
            config.removePackage(oldName);

            j(path).replaceWith(
                j.importDeclaration(path.node.specifiers, j.literal(newName)),
            );
        });
};

const renameExports = (j: JSCodeshift, source: Collection) => {
    const config = new CodemodConfig(CONFIG_FILE_NAME);

    source
        .find(j.ExportNamedDeclaration)
        .filter(
            (path) =>
                path.node.source &&
                path.node.source.value?.toString()?.startsWith(previousScope) &&
                !deprecatedPackages.includes(
                    path.node.source.value?.toString() ?? "",
                ),
        )
        .forEach((path) => {
            const oldName = getOldPackageName(
                path.node.source.value?.toString() ?? "",
            );
            const newName = getNewPackageName(oldName);

            config.addPackage(newName);
            config.removePackage(oldName);

            j(path).replaceWith(
                j.exportNamedDeclaration(
                    path.node.declaration,
                    path.node.specifiers,
                    j.literal(newName),
                ),
            );
        });
};

export const replacePankodImportsWithRefineDev = async (
    j: JSCodeshift,
    source: Collection,
) => {
    renameImports(j, source);
    renameExports(j, source);
};
