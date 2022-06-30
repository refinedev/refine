import {
    API,
    JSCodeshift,
    Collection,
    FileInfo,
    ImportSpecifier,
    JSXExpressionContainer,
    ObjectExpression,
    ObjectProperty,
    Identifier,
    Property,
    Node,
} from "jscodeshift";
import fs from "fs";
import path from "path";
import { install, remove } from "../helpers";
import checkPackageLock from "../helpers/checkPackageLock";

export const parser = "tsx";

const updateSetEditIdToSetId = (j: JSCodeshift, root: Collection<any>) => {
    const updatedFormHooks = ["useDataGrid"];

    for (const formHook of updatedFormHooks) {
        const useEditableTableHook = root.find(j.CallExpression, {
            callee: {
                name: formHook,
            },
        });

        useEditableTableHook.replaceWith((p) => {
            const hede = (
                p.node.arguments[0] as unknown as ObjectExpression
            ).properties.filter(
                (p: Property) => (p.key as Identifier).name !== "columns",
            );
            console.log("hede", hede.length);

            (p.node.arguments[0] as unknown as ObjectExpression).properties =
                hede;

            return p.node;
        });
    }
};

export default function transformer(file: FileInfo, api: API): string {
    const j = api.jscodeshift;
    const source = j(file.source);

    const refineMuiUseDataGridImports = source.find(j.ImportDeclaration, {
        source: {
            value: "@pankod/refine-mui",
        },
        specifiers: [
            {
                imported: {
                    name: "useDataGrid",
                },
            },
        ],
    });

    if (refineMuiUseDataGridImports.length === 0) {
        return;
    }

    updateSetEditIdToSetId(j, source);

    return source.toSource();
}
