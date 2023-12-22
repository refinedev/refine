import { DocumentNode, visit } from "graphql";

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
