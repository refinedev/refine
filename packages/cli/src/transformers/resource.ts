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

    const getComponentName = (resource: string, action: string) => {
        return `${resource}${uppercaseFirstChar(action)}`;
    };

    const getPath = (resourceName: string, action: string) => {
        if (action === "list") {
            return `/${resourceName}`;
        }

        if (action === "create") {
            return `/${resourceName}/create`;
        }

        if (action === "edit") {
            return `/${resourceName}/edit/:id`;
        }

        if (action === "show") {
            return `/${resourceName}/show/:id`;
        }

        return `/${resourceName}`;
    };

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
                j.stringLiteral(getPath(options.__resourceName, item)),
            ),
        );
    });

    const lines = [
        `* `,
        ` *`,
        ` * Resource is default with default paths, you need to add the components to the paths accordingly.`,
        ` * You can also add custom paths to the resource.`,
        ` * `,
    ];

    actions.map((item: string) => {
        lines.push(
            ` * Use \`<${getComponentName(
                options.__resource,
                item,
            )}/>\` component at \`${getPath(
                options.__resourceName,
                item,
            )}\` path.`,
        );
    });

    lines.push(` *`, ` *`);

    rootElement.replaceWith((path) => {
        const attributes = path.node.openingElement.attributes;
        if (!attributes) {
            return path.node;
        }

        const resourcePropIndex = attributes.findIndex(
            (attr) =>
                attr.type === "JSXAttribute" && attr.name.name === "resources",
        );

        const resourceObjectExpression = j.objectExpression(resourceProperty);

        resourceObjectExpression.properties[0].comments = [
            {
                type: "Block",
                value: `${lines.join("\n")}`,
                leading: true,
            },
        ];

        // if no resources prop, add it
        if (resourcePropIndex === -1) {
            attributes.push(
                j.jsxAttribute(
                    j.jsxIdentifier("resources"),
                    j.jsxExpressionContainer(
                        j.arrayExpression([resourceObjectExpression]),
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
                        resourceObjectExpression,
                    ]),
                ),
            );

            return path.node;
        }

        // resources={[...resources]} => resources={[...resources, {name: "post", list: List}]}
        const resourceArray = resourceValue.expression as ArrayExpression;
        resourceArray.elements.push(resourceObjectExpression);

        return path.node;
    });

    return source.toSource();
}
