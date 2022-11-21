import {
    API,
    FileInfo,
    JSXAttribute,
    JSXExpressionContainer,
    ArrayExpression,
} from "jscodeshift";
import { uppercaseFirstChar } from "../utils/text";

export const parser = "tsx";

export default function transformer(file: FileInfo, api: API, options: any) {
    const j = api.jscodeshift;
    const source = j(file.source);

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

    // prepare actions
    const actions = options.__actions.split(",");
    const actionPageComponents = actions.map(
        (action: string) =>
            `${options.__resource}${uppercaseFirstChar(action)}`,
    );

    // add import for resource
    const newImport = j.importDeclaration(
        [
            j.importDefaultSpecifier(
                j.identifier(`{ ${actionPageComponents.join(", ")} }`),
            ),
        ],
        j.stringLiteral(
            `${options.__pathAlias}/${options.__resourceFolderName}`,
        ),
    );

    const resourceProperty = [
        j.property(
            "init",
            j.identifier("name"),
            j.stringLiteral(options.__resourceName),
        ),
    ];
    actions.map((item: string) => {
        resourceProperty.push(
            j.property(
                "init",
                j.identifier(item),
                j.identifier(
                    `${options.__resource}${uppercaseFirstChar(item)}`,
                ),
            ),
        );
    });

    // find last import index
    const lastImportIndex = source.find(j.ImportDeclaration).length - 1;

    // add import
    source.find(j.ImportDeclaration).at(lastImportIndex).insertAfter(newImport);

    rootElement.replaceWith((path) => {
        const attributes = path.node.openingElement.attributes;
        if (!attributes) {
            return path.node;
        }

        const resourcePropIndex = attributes.findIndex(
            (attr) =>
                attr.type === "JSXAttribute" && attr.name.name === "resources",
        );

        // if no resources prop, add it
        if (resourcePropIndex === -1) {
            attributes.push(
                j.jsxAttribute(
                    j.jsxIdentifier("resources"),
                    j.jsxExpressionContainer(
                        j.arrayExpression([
                            j.objectExpression(resourceProperty),
                        ]),
                    ),
                ),
            );

            return path.node;
        }

        const resourceValue = (attributes[resourcePropIndex] as JSXAttribute)
            .value as JSXExpressionContainer;

        // resources={RESOURCE_CONSTANT} => resources={[...RESOURCE_CONSTANT, {name: "post", list: List}]}
        if (resourceValue.expression.type === "Identifier") {
            attributes[resourcePropIndex] = j.jsxAttribute(
                j.jsxIdentifier("resources"),
                j.jsxExpressionContainer(
                    j.arrayExpression([
                        j.spreadElement(resourceValue.expression),
                        j.objectExpression(resourceProperty),
                    ]),
                ),
            );

            return path.node;
        }

        // resources={[...resources]} => resources={[...resources, {name: "post", list: List}]}
        const resourceArray = resourceValue.expression as ArrayExpression;
        resourceArray.elements.push(j.objectExpression(resourceProperty));

        return path.node;
    });

    console.log(source.toSource());
    return source.toSource();
}
