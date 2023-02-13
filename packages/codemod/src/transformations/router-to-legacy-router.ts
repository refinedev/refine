import { API, JSCodeshift, Collection, FileInfo } from "jscodeshift";

export const parser = "tsx";

const CURRENT_SOURCE_VALUE = "@pankod/refine-react-router-v6";
const NEW_SOURCE_VALUE = "@pankod/refine-react-router-v6/legacy";

const renameImport = (
    j: JSCodeshift,
    source: Collection,
    from: string,
    to: string,
) => {
    source
        .find(j.ImportDeclaration)
        .filter((path) => path.node.source.value === from)
        .forEach((path) => {
            j(path).replaceWith(
                j.importDeclaration(path.node.specifiers, j.literal(to)),
            );
        });
};

export default function transformer(file: FileInfo, api: API): string {
    const j = api.jscodeshift;
    const source = j(file.source);

    renameImport(j, source, CURRENT_SOURCE_VALUE, NEW_SOURCE_VALUE);

    return source.toSource();
}
