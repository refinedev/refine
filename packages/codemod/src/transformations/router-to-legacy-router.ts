import { API, JSCodeshift, Collection, FileInfo } from "jscodeshift";

export const parser = "tsx";

const legacyMap = {
    "@pankod/refine-react-router-v6": "@pankod/refine-react-router-v6/legacy",
    "@pankod/refine-nextjs-router": "@pankod/refine-nextjs-router/legacy",
    "@pankod/refine-nextjs-router/app":
        "@pankod/refine-nextjs-router/legacy-app",
    "@pankod/refine-nextjs-router/pages":
        "@pankod/refine-nextjs-router/legacy-pages",
    "@pankod/refine-remix-router": "@pankod/refine-remix-router/legacy",
};

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

    Object.entries(legacyMap).forEach(([from, to]) => {
        renameImport(j, source, from, to);
    });

    return source.toSource();
}
