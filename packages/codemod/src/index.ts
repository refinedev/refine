import { API, FileInfo, Options } from "jscodeshift";

export const parser = "tsx";

export default function transformer(file: FileInfo, api: API) {
    const j = api.jscodeshift;
    const source = j(file.source);

    // Import route provider
    source
        .find(j.ImportDeclaration, {
            source: {
                value: "@pankod/refine",
            },
        })
        .insertAfter(
            j.importDeclaration(
                [j.importDefaultSpecifier(j.identifier("routerProvider"))],
                j.literal("@pankod/refine-react-router"),
            ),
        );

    // Add routerProvider attribute
    source
        .find(j.JSXElement, {
            openingElement: {
                name: {
                    name: "Refine",
                },
            },
        })
        .replaceWith((path) => {
            const openingElement = path.node.openingElement;

            let routesExpression: any;

            const routesAttributeIndex = openingElement.attributes?.findIndex(
                (attribute) =>
                    attribute.type === "JSXAttribute" &&
                    attribute.name.type === "JSXIdentifier" &&
                    attribute.name.name === "routes",
            );

            if (
                routesAttributeIndex !== undefined &&
                routesAttributeIndex > -1
            ) {
                const routesAttribute =
                    openingElement.attributes?.[routesAttributeIndex];

                if (routesAttribute?.type === "JSXAttribute") {
                    const attributeValue = routesAttribute.value;

                    if (attributeValue?.type === "JSXExpressionContainer") {
                        routesExpression = attributeValue.expression;
                    }
                }
            }

            if (routesExpression) {
                openingElement.attributes?.push(
                    j.jsxAttribute(
                        j.jsxIdentifier("routerProvider"),
                        j.jsxExpressionContainer(
                            j.objectExpression([
                                j.spreadElement(j.identifier("routerProvider")),
                                j.property(
                                    "init",
                                    j.identifier("routes"),
                                    routesExpression,
                                ),
                            ]),
                        ),
                    ),
                );

                if (routesAttributeIndex !== undefined) {
                    openingElement.attributes?.splice(routesAttributeIndex, 1);
                }
            } else {
                openingElement.attributes?.push(
                    j.jsxAttribute(
                        j.jsxIdentifier("routerProvider"),
                        j.jsxExpressionContainer(
                            j.identifier("routerProvider"),
                        ),
                    ),
                );
            }

            return path.node;
        });

    const newResources: { [key: string]: any }[] = [];

    // Get resources data
    source
        .find(j.JSXElement, {
            openingElement: {
                name: {
                    name: "Resource",
                },
            },
        })
        .forEach((resources) => {
            const newResource: { [key: string]: any } = {};

            resources.node.openingElement.attributes?.forEach((resource) => {
                if (
                    resource.type === "JSXAttribute" &&
                    resource.name.type === "JSXIdentifier" &&
                    resource.value
                ) {
                    newResource[resource.name.name] = resource.value;
                }
            });

            newResources.push(newResource);
        });

    // Construct a resources attribute with the resources data
    const newAttributes = j.jsxAttribute(
        j.jsxIdentifier("resources"),
        j.jsxExpressionContainer(
            j.arrayExpression(
                newResources.map((resource) => {
                    const newValue = j.objectExpression(
                        Object.entries(resource).map(([key, value]) => {
                            const valueToPut = value.expression
                                ? value.expression
                                : value;
                            return j.property(
                                "init",
                                j.identifier(key),
                                valueToPut as any,
                            );
                        }),
                    );

                    return newValue;
                }),
            ),
        ),
    );

    // Add resources attribute
    source
        .find(j.JSXElement, {
            openingElement: {
                name: {
                    name: "Refine",
                },
            },
        })
        .replaceWith((path) => {
            const openingElement = path.node.openingElement;
            openingElement.attributes?.push(newAttributes);

            return path.node;
        });

    // Remove resources
    source
        .find(j.JSXElement, {
            openingElement: {
                name: {
                    name: "Resource",
                },
            },
        })
        .remove();

    // Remove import of Resource component
    source
        .find(j.ImportSpecifier, {
            imported: {
                name: "Resource",
            },
        })
        .remove();

    // Clear the body of Refine component
    source
        .find(j.JSXElement, {
            openingElement: {
                name: {
                    name: "Refine",
                },
            },
        })
        .replaceWith((path) => {
            const openingElement = path.node.openingElement;

            path.node.closingElement = null;
            openingElement.selfClosing = true;

            return path.node;
        });

    console.log(source.toSource());

    return source.toSource();
}
