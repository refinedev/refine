import { API, Collection, FileInfo, JSCodeshift } from "jscodeshift";

export const parser = "tsx";

const updateStyles = (j: JSCodeshift, root: Collection<any>) => {
    const styleMinCssImport = root.find(j.ImportDeclaration, {
        source: {
            value: "@pankod/refine-antd/dist/styles.min.css",
        },
    });

    styleMinCssImport.replaceWith((path) => {
        path.node.source.value = "@pankod/refine-antd/dist/reset.css";

        return path.node;
    });
};

export default function transformer(file: FileInfo, api: API): string {
    const j = api.jscodeshift;
    const source = j(file.source);

    updateStyles(j, source);

    return source.toSource();
}
