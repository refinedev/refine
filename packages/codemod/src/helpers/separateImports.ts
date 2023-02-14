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
    currentLibName: string;
    nextLibName: string;
}) {
    const { j, source, imports, renameImports, currentLibName, nextLibName } =
        payload;
    const nextLibImports: ImportSpecifier[] = [];

    const refineImport = source.find(j.ImportDeclaration, {
        source: {
            value: currentLibName,
        },
    });

    refineImport.replaceWith((path) => {
        for (const item of path.node.specifiers) {
            if (imports.includes(item.local.name)) {
                nextLibImports.push(item as ImportSpecifier);
            }
        }

        path.node.specifiers = path.node.specifiers.filter(
            (p) => !nextLibImports.includes(p as ImportSpecifier),
        );

        return path.node;
    });

    if (imports.length > 0) {
        // rename imports
        nextLibImports.forEach((item) => {
            if (renameImports[item.imported.name]) {
                item.imported.name = renameImports[item.imported.name];
            }
        });

        source
            .find(j.ImportDeclaration, {
                source: {
                    value: currentLibName,
                },
            })
            .insertAfter(
                j.importDeclaration(nextLibImports, j.literal(nextLibName)),
            );
    }
}
