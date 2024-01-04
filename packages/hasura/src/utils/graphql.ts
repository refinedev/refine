import { DocumentNode, visit, SelectionSetNode } from "graphql";

export const getOperationFields = (documentNode: DocumentNode) => {
    const fieldLines: string[] = [];
    let isInitialEnter = true;
    let depth = 0;
    let isNestedField = false;

    visit(documentNode, {
        Field: {
            enter(node): SelectionSetNode | void {
                if (isInitialEnter) {
                    isInitialEnter = false;

                    if (typeof node.selectionSet === "undefined") {
                        throw new Error("Operation must have a selection set");
                    }

                    return node.selectionSet;
                }

                fieldLines.push(
                    `${
                        depth > 0
                            ? "  ".repeat(isNestedField ? depth : depth - 1)
                            : ""
                    }${node.name.value}${node.selectionSet ? " {" : ""}`,
                );

                if (node.selectionSet) {
                    depth++;
                    isNestedField = true;
                }
            },
            leave(node) {
                if (node.selectionSet) {
                    depth--;
                    fieldLines.push(`${"  ".repeat(depth)}}`);
                    isNestedField = false;
                }
            },
        },
    });

    return fieldLines.join("\n").trim();
};

export const isMutation = (documentNode: DocumentNode) => {
    let isMutation = false;

    visit(documentNode, {
        OperationDefinition: {
            enter(node) {
                if (node.operation === "mutation") {
                    isMutation = true;
                }
            },
        },
    });

    return isMutation;
};
