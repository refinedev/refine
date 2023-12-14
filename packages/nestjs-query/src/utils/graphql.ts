import { FieldNode, DocumentNode, visit } from "graphql";

export const isNodesField = (node: FieldNode) => {
    return (
        node.selectionSet &&
        node.selectionSet.selections.length &&
        node.selectionSet.selections[0].kind === "Field" &&
        node.selectionSet.selections[0].name.value === "nodes"
    );
};

export function removeNodesField(inputString: string) {
    if (inputString.startsWith("nodes")) {
        const lines = inputString.split("\n");

        const filteredLines = lines
            .filter((line) => line.trim() !== "nodes {" && line.trim() !== "}")
            .map((line) => line.trim());

        return filteredLines.join("\n");
    }

    return inputString;
}

export function fieldsToString(documentNode: DocumentNode) {
    const fieldLines: string[] = [];
    let depth = 0;
    let isNestedField = false;

    visit(documentNode, {
        Field: {
            enter(node) {
                if (node.selectionSet && !isNestedField) {
                    isNestedField = true;
                    return;
                }

                if (isNodesField(node) || node.name.value === "totalCount")
                    return;

                if (node.selectionSet) {
                    depth++;
                } else {
                    fieldLines.push(`${"  ".repeat(depth)}${node.name.value}`);
                }
            },
            leave(node) {
                if (node.selectionSet && isNestedField) {
                    const nestedFieldLines = fieldLines.splice(
                        -node.selectionSet.selections.length,
                    );
                    if (depth > 0) {
                        fieldLines.push(
                            `${"  ".repeat(depth - 1)}${
                                node.name.value
                            } {\n${nestedFieldLines.join("\n")}\n${"  ".repeat(
                                depth - 1,
                            )}}`,
                        );
                    }
                    if (depth > 0) {
                        depth--;
                    }
                    if (depth === 0) {
                        isNestedField = false;
                    }
                }
            },
        },
    });

    if (fieldLines.length && fieldLines[0].startsWith("nodes")) {
        fieldLines[0] = removeNodesField(fieldLines[0]);
    }

    return fieldLines.join("\n").trim();
}

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
