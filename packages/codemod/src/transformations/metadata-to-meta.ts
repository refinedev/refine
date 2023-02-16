import { API, JSCodeshift, Collection, FileInfo } from "jscodeshift";

export const parser = "tsx";

const metaDataToMeta = (j: JSCodeshift, source: Collection) => {
    // find all JSX elements
    source.find(j.JSXElement).forEach((path) => {
        const attributes = path.node.openingElement.attributes;

        // if they have a meta attribute, skip them.
        const hasMeta = attributes.some(
            (attribute) => attribute["name"]["name"] === "meta",
        );
        if (hasMeta) return;

        // if they have a metaData change it to meta.
        path.node.openingElement.attributes.forEach((attribute) => {
            if (attribute["name"]["name"] === "metaData") {
                attribute["name"]["name"] = "meta";
            }
        });
    });

    // find all call expressions
    source.find(j.CallExpression).forEach((path) => {
        // find all arguments
        path.node.arguments.forEach((argument) => {
            const properties = argument["properties"];

            // if they have a meta argument, skip them.
            const hasMeta = properties.some(
                (property) => property["key"]["name"] === "meta",
            );
            if (hasMeta) return;

            // if they have a metaData change it to meta.
            properties.forEach((property) => {
                if (property["key"]["name"] === "metaData") {
                    property["key"]["name"] = "meta";
                }
            });
        });
    });
};

export default function transformer(file: FileInfo, api: API): string {
    if (file.path !== "src/pages/admin/movies/list.tsx") return;
    const j = api.jscodeshift;
    const source = j(file.source);

    metaDataToMeta(j, source);

    return source.toSource();
}
