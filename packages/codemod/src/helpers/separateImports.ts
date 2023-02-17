import { Collection, ImportSpecifier, JSCodeshift } from "jscodeshift";

/**
 * Separate imports from currentLibName to nextLibName
 * import { Create, Button, Form } from "@pankod/refine-antd";
 * to
 * import { Create } from "@pankod/refine-antd";
 * import { Button, Form } from "antd";
 */
export default function separateImports(payload: {
    j: JSCodeshift;
    source: Collection<any>;
    imports: string[];
    renameImports: { [key: string]: string };
    otherImports: { [key: string]: string };
    currentLibName: string;
    nextLibName: string;
}) {
    const {
        j,
        source,
        imports,
        renameImports,
        otherImports,
        currentLibName,
        nextLibName,
    } = payload;
    const nextLibImports: ImportSpecifier[] = [];
    const otherImportItems: ImportSpecifier[] = [];

    const refineImport = source.find(j.ImportDeclaration, {
        source: {
            value: currentLibName,
        },
    });

    refineImport.replaceWith((path) => {
        for (const item of path.node.specifiers) {
            // also checking for imported name which is actually the correct one to check for renamed ones
            if (
                imports.includes(item.local.name) ||
                imports.includes((item as ImportSpecifier)?.imported?.name)
            ) {
                nextLibImports.push(item as ImportSpecifier);
            }

            if (otherImports[item.local.name]) {
                otherImportItems.push(item as ImportSpecifier);
            }
        }

        path.node.specifiers = path.node.specifiers
            .filter((p) => !nextLibImports.includes(p as ImportSpecifier))
            .filter((p) => !otherImportItems.includes(p as ImportSpecifier));

        return path.node;
    });

    if (nextLibImports.length > 0) {
        // rename imports
        nextLibImports.forEach((item) => {
            if (renameImports[item.imported.name]) {
                // if imported and local names are different, then means its renamed. we can continue to do our swap
                // if imported and local are same, means we're changing the imported elements name, then we need to change the local name as well
                if (item.imported.name !== item.local.name) {
                    // if the renamed name is the same as local name, then we don't need to rename it
                    if (item.local.name === renameImports[item.imported.name]) {
                        item.imported.name = renameImports[item.imported.name];
                        item.local = undefined;
                    } else {
                        item.imported.name = renameImports[item.imported.name];
                    }
                } else if (item.imported.name === item.local.name) {
                    item.imported.name = `${
                        renameImports[item.imported.name]
                    } as ${item.imported.name}`;
                }
            }
        });

        source
            .find(j.ImportDeclaration, {
                source: {
                    value: currentLibName,
                },
            })
            .forEach((path, i) => {
                if (i === 0) {
                    path.insertAfter(
                        j.importDeclaration(
                            nextLibImports,
                            j.literal(nextLibName),
                        ),
                    );
                }
            });
    }

    // add other imports
    if (otherImportItems.length > 0) {
        const otherImportPaths: { [key: string]: ImportSpecifier[] } = {};
        otherImportItems.forEach((item) => {
            // find import path
            const importPath = otherImports[item.local.name];

            if (otherImportPaths[importPath]) {
                otherImportPaths[importPath].push(item);
            } else {
                otherImportPaths[importPath] = [item];
            }
        });

        Object.keys(otherImportPaths).forEach((importPath) => {
            source
                .find(j.ImportDeclaration, {
                    source: {
                        value: currentLibName,
                    },
                })
                .forEach((path, i) => {
                    if (i === 0) {
                        path.insertAfter(
                            j.importDeclaration(
                                otherImportPaths[importPath],
                                j.literal(importPath),
                            ),
                        );
                    }
                });
        });
    }

    // remove empty imports
    source
        .find(j.ImportDeclaration, {
            source: {
                value: currentLibName,
            },
        })
        .filter((path) => path.node.specifiers.length === 0)
        .remove();
}
