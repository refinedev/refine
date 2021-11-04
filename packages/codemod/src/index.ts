import {
    API,
    FileInfo,
    Options,
    JSXAttribute,
    JSXExpressionContainer,
} from "jscodeshift";

export const parser = "tsx";

export default function transformer(
    file: FileInfo,
    api: API,
    options: Options,
) {
    const j = api.jscodeshift;
    const source = j(file.source);

    const newResources: { [key: string]: any }[] = [];

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
        .find(j.JSXAttribute)
        .filter((path) => {
            return path.parent.node.name.name === "Refine";
        })
        .at(-1)
        .insertAfter(newAttributes);

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

    console.log(source.toSource());

    return source.toSource();
}
