import {
    API,
    FileInfo,
    JSXAttribute,
    ObjectExpression,
    JSXExpressionContainer,
    ArrayExpression,
} from "jscodeshift";

export default function transformer(file: FileInfo, api: API, options: any) {
    const j = api.jscodeshift;
    const source = j(file.source);

    console.log("options", options);
    console.log("file", file.path);

    const rootElement = source.find(j.JSXElement, {
        openingElement: {
            name: {
                name: "Refine",
            },
        },
    });

    if (rootElement.length === 0) {
        return;
    }

    rootElement.replaceWith((path) => {
        const attributes = path.node.openingElement.attributes;

        if (!attributes) {
            return path.node;
        }

        const resourcePropInex = attributes.findIndex(
            (attr) =>
                attr.type === "JSXAttribute" && attr.name.name === "resources",
        );

        if (resourcePropInex === undefined) {
            return path.node;
        }

        const resourceElements = (
            (
                (attributes[resourcePropInex] as JSXAttribute)
                    .value as JSXExpressionContainer
            ).expression as ArrayExpression
        ).elements as ObjectExpression[];

        attributes[resourcePropInex] = j.jsxAttribute(
            j.jsxIdentifier("resources"),
            j.jsxExpressionContainer(
                j.arrayExpression([
                    ...resourceElements,
                    j.objectExpression([
                        j.property(
                            "init",
                            j.identifier("name"),
                            j.stringLiteral("categories"),
                        ),
                    ]),
                ]),
            ),
        );

        return path.node;
    });

    return source.toSource();
}
