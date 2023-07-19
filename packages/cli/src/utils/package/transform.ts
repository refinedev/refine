export const transformRefineOptions = (
    j: any,
    root: any,
    projectId: string,
) => {
    root.findJSXElements("Refine").forEach((path: any) => {
        const props = path.node.openingElement.attributes;

        const optionsProp = props.find(
            (attribute: any) =>
                attribute.type === "JSXAttribute" &&
                attribute.name.name === "options",
        );
        if (!optionsProp) {
            path.node.openingElement.attributes.push(
                j.jsxAttribute(
                    j.jsxIdentifier("options"),
                    j.jsxExpressionContainer(
                        j.objectExpression([
                            j.objectProperty(
                                j.identifier("projectId"),
                                j.stringLiteral(projectId),
                            ),
                        ]),
                    ),
                ),
            );

            return;
        }

        // for  options={optionsProp}
        if (!optionsProp.value.expression.properties) {
            return;
        }

        // for options has already projectId
        const hasProjectId = optionsProp.value.expression.properties.find(
            (p) => {
                if (p.type === "ObjectProperty") {
                    return p.key.name === "projectId";
                }

                return false;
            },
        );
        if (hasProjectId) return;

        optionsProp.value.expression.properties.push(
            j.objectProperty(
                j.identifier("projectId"),
                j.stringLiteral(projectId),
            ),
        );
    });

    return root;
};
