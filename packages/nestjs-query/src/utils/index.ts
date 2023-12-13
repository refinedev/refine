import {
    CrudOperators,
    LogicalFilter,
    CrudSorting,
    Pagination,
    CrudFilter,
} from "@refinedev/core";
import camelcase from "camelcase";
import VariableOptions from "gql-query-builder/build/VariableOptions";
import * as gql from "gql-query-builder";
import { singular } from "pluralize";
import set from "lodash/set";
import { Client } from "graphql-ws";
import { DocumentNode, SelectionNode, visit } from "graphql";

export const generateSubscription = (
    client: Client,
    { callback, params, meta }: any,
    type: string,
) => {
    const generatorMap: any = {
        created: generateCreatedSubscription,
        updated: generateUpdatedSubscription,
        deleted: generateDeletedSubscription,
    };

    const { resource, filters, subscriptionType, id, ids } = params ?? {};

    const generator = generatorMap[type];

    const { operation, query, variables, operationName } = generator({
        ids,
        id,
        resource,
        filters,
        meta,
        subscriptionType,
    });

    const onNext = (payload: any) => {
        callback(payload.data[operation]);
    };

    const unsubscribe = client.subscribe(
        { query, variables, operationName },
        {
            next: onNext,
            error: console.error,
            complete: () => null,
        },
    );

    return unsubscribe;
};

const operatorMap: { [key: string]: string } = {
    eq: "eq",
    ne: "neq",
    lt: "lt",
    gt: "gt",
    lte: "lte",
    gte: "gte",
    in: "in",
    nin: "notIn",
};

const operatorMapper = (
    operator: CrudOperators,
    value: any,
): { [key: string]: any } => {
    if (operator === "contains") {
        return { iLike: `%${value}%` };
    }

    if (operator === "ncontains") {
        return { notILike: `%${value}%` };
    }

    if (operator === "startswith") {
        return { iLike: `${value}%` };
    }

    if (operator === "nstartswith") {
        return { notILike: `${value}%` };
    }

    if (operator === "endswith") {
        return { iLike: `%${value}` };
    }

    if (operator === "nendswith") {
        return { notILike: `%${value}` };
    }

    if (operator === "null") {
        return { is: null };
    }

    if (operator === "nnull") {
        return { isNot: null };
    }

    if (operator === "between") {
        if (!Array.isArray(value)) {
            throw new Error("Between operator requires an array");
        }

        if (value.length !== 2) {
            return {};
        }

        return { between: { lower: value[0], upper: value[1] } };
    }

    return { [operatorMap[operator]]: value };
};

export const generateFilters = (filters: LogicalFilter[]) => {
    const result: { [key: string]: { [key: string]: string | number } } = {};

    filters
        .filter((f) => {
            if (Array.isArray(f.value) && f.value.length === 0) {
                return false;
            }

            return !!f.value;
        })
        .map((filter: LogicalFilter | CrudFilter) => {
            if (filter.operator === "and" || filter.operator === "or") {
                return set(result, filter.operator, [
                    generateFilters(filter.value as LogicalFilter[]),
                ]);
            } else if ("field" in filter) {
                return set(
                    result,
                    filter.field,
                    operatorMapper(filter.operator, filter.value),
                );
            } else {
                return {};
            }
        });

    return result;
};

export const generateSorting = (sorters: CrudSorting) => {
    return sorters.map((sorter) => {
        return {
            field: sorter.field,
            direction: sorter.order.toUpperCase(),
        };
    });
};

export const generatePaging = (pagination: Pagination) => {
    // maximum value of 32 bit signed integer
    if (pagination.mode === "off") return { limit: 2147483647 };

    if (pagination.mode !== "server") return undefined;

    if (!pagination.current || !pagination.pageSize) return undefined;

    return {
        limit: pagination.pageSize,
        offset: (pagination.current - 1) * pagination.pageSize,
    };
};

export const generateCreatedSubscription = ({
    resource,
    filters,
    meta,
}: any) => {
    if (meta?.gqlQuery) {
        const singularResourceName = camelcase(singular(resource), {
            pascalCase: true,
        });

        const operationName = `Created${singularResourceName}`;

        const operation = `created${singularResourceName}`;

        const query = `
            subscription ${operationName}($input: Create${singularResourceName}SubscriptionFilterInput) {
                ${operation}(input: $input) {
                    id
                }
            }
        `;

        const variables: VariableOptions = {};

        if (filters) {
            variables["input"] = {
                filter: generateFilters(
                    filters.filter(
                        (filter: LogicalFilter) => !filter.field.includes("."),
                    ),
                ),
            };
        }

        return { query, variables, operation, operationName };
    }

    const operation = `created${camelcase(singular(resource), {
        pascalCase: true,
    })}`;

    const queryVariables: VariableOptions = {};

    if (filters) {
        queryVariables["input"] = {
            type: camelcase(
                `create_${singular(resource)}_subscription_filter_input`,
                {
                    pascalCase: true,
                },
            ),
            required: true,
            value: {
                filter: generateFilters(
                    filters.filter(
                        (filter: LogicalFilter) => !filter.field.includes("."),
                    ),
                ),
            },
        };
    }

    const { query, variables } = gql.subscription({
        operation,
        fields: meta.fields,
        variables: queryVariables,
    });

    return { query, variables, operation };
};

export const generateUpdatedSubscription = ({
    id,
    resource,
    filters,
    meta,
}: any) => {
    if (meta?.gqlQuery) {
        const singularResourceName = camelcase(singular(resource), {
            pascalCase: true,
        });

        const operationName = `Updated${singularResourceName}`;

        const operation = `updatedOne${singularResourceName}`;

        const query = `
            subscription ${operationName}($input: UpdateOne${singularResourceName}SubscriptionFilterInput) {
                ${operation}(input: $input) {
                    id
                }
            }
        `;

        const variables: VariableOptions = {};

        if (filters) {
            variables["input"] = {
                filter: generateFilters(
                    filters.filter(
                        (filter: LogicalFilter) => !filter.field.includes("."),
                    ),
                ),
            };
        }

        if (id) {
            variables["input"] = {
                filter: {
                    id: { eq: id },
                },
            };
        }

        return { query, variables, operation, operationName };
    }

    const operation = `updatedOne${camelcase(singular(resource), {
        pascalCase: true,
    })}`;

    const queryVariables: VariableOptions = {};

    if (filters) {
        queryVariables["input"] = {
            type: camelcase(
                `update_one_${singular(resource)}_subscription_filter_input`,
                {
                    pascalCase: true,
                },
            ),
            required: true,
            value: {
                filter: generateFilters(
                    filters.filter(
                        (filter: LogicalFilter) => !filter.field.includes("."),
                    ),
                ),
            },
        };
    }

    if (id) {
        queryVariables["input"] = {
            type: camelcase(
                `update_one_${singular(resource)}_subscription_filter_input`,
                {
                    pascalCase: true,
                },
            ),
            required: true,
            value: {
                filter: {
                    id: { eq: id },
                },
            },
        };
    }

    const { query, variables } = gql.subscription({
        operation,
        fields: meta.fields,
        variables: queryVariables,
    });

    return { query, variables, operation };
};

export const generateDeletedSubscription = ({
    resource,
    filters,
    meta,
}: any) => {
    if (meta?.gqlQuery) {
        const singularResourceName = camelcase(singular(resource), {
            pascalCase: true,
        });

        const operationName = `Deleted${singularResourceName}`;

        const operation = `deletedOne${singularResourceName}`;

        const query = `
            subscription ${operationName}($input: DeleteOne${singularResourceName}SubscriptionFilterInput) {
                ${operation}(input: $input) {
                    id
                }
            }
        `;

        const variables: VariableOptions = {};

        if (filters) {
            variables["input"] = {
                filter: generateFilters(
                    filters.filter(
                        (filter: LogicalFilter) => !filter.field.includes("."),
                    ),
                ),
            };
        }

        return { query, variables, operation, operationName };
    }

    const operation = `deletedOne${camelcase(singular(resource), {
        pascalCase: true,
    })}`;

    const queryVariables: VariableOptions = {};

    if (filters) {
        queryVariables["input"] = {
            type: camelcase(
                `delete_one_${singular(resource)}_subscription_filter_input`,
                {
                    pascalCase: true,
                },
            ),
            required: true,
            value: {
                filter: generateFilters(
                    filters.filter(
                        (filter: LogicalFilter) => !filter.field.includes("."),
                    ),
                ),
            },
        };
    }

    const { query, variables } = gql.subscription({
        operation,
        fields: meta.fields.filter(
            (field: string | object) => typeof field !== "object",
        ),
        variables: queryVariables,
    });

    return { query, variables, operation };
};

//  const extractFields = (selections: SelectionNode[]) => {
//     const fields: string[] = [];

//     selections.forEach((selection) => {
//         if (
//             selection.kind === "Field" &&
//             typeof selection.selectionSet === "undefined"
//         ) {
//             fields.push(selection.name.value);
//         }
//     });
// };

// function fieldsToString(documentNode: DocumentNode) {
//     let fieldString = "{";

//     visit(documentNode, {
//         Field: {
//             enter(node, key, parent, path, ancestors) {
//                 if (!node.selectionSet) {
//                     // Leaf node
//                     const prefix = ancestors.some(
//                         (a) => (a as any).kind === "Field",
//                     )
//                         ? "  "
//                         : "";
//                     fieldString += `${prefix}${node.name.value}\n`;
//                 }
//             },
//             leave(node) {
//                 if (
//                     node.selectionSet &&
//                     node.selectionSet.selections[0].kind === "Field" &&
//                     node.selectionSet.selections[0].name.value !== "company"
//                 ) {
//                     // Nested object, wrap it with its field name
//                     const lines = fieldString.split("\n");
//                     const nestedFields = lines
//                         .splice(-node.selectionSet.selections.length)
//                         .join("\n");
//                     fieldString = `${lines.join("\n")}${
//                         node.name.value
//                     } {\n${nestedFields}}\n`;
//                 }
//             },
//         },
//     });

//     return fieldString.trim();
// }

// function fieldsToString(documentNode: DocumentNode) {
//     let fieldString = "";
//     let depth = 0;

//     visit(documentNode, {
//         Field: {
//             enter(node) {
//                 if (node.selectionSet) {
//                     // Increase depth for nested fields
//                     depth++;
//                 } else {
//                     // Add fields with proper indentation
//                     fieldString += `${"  ".repeat(depth)}${node.name.value}\n`;
//                 }
//             },
//             leave(node) {
//                 if (node.selectionSet) {
//                     // Decrease depth and wrap nested fields
//                     const nestedFields = fieldString
//                         .split("\n")
//                         .slice(-node.selectionSet.selections.length)
//                         .join("\n");
//                     fieldString = `${fieldString
//                         .split("\n")
//                         .slice(0, -node.selectionSet.selections.length)
//                         .join("\n")}${"  ".repeat(depth - 1)}${
//                         node.name.value
//                     } {\n${nestedFields}\n${"  ".repeat(depth - 1)}}\n`;
//                     depth--;
//                 }
//             },
//         },
//     });

//     return fieldString.trim();
// }

// function fieldsToString(documentNode: DocumentNode) {
//     let fieldString = "";
//     let depth = 0;
//     let startExtracting = false;

//     visit(documentNode, {
//         Field: {
//             enter(node) {
//                 if (startExtracting) {
//                     if (node.selectionSet) {
//                         // Increase depth for nested fields
//                         depth++;
//                     } else {
//                         // Add fields with proper indentation
//                         fieldString += `${"  ".repeat(depth)}${
//                             node.name.value
//                         }\n`;
//                     }
//                 } else if (node.selectionSet) {
//                     // Start extracting from the first nested selection set
//                     startExtracting = true;
//                 }
//             },
//             leave(node) {
//                 if (startExtracting && node.selectionSet) {
//                     // Decrease depth and wrap nested fields
//                     const nestedFields = fieldString
//                         .split("\n")
//                         .slice(-node.selectionSet.selections.length)
//                         .join("\n");
//                     fieldString = `${fieldString
//                         .split("\n")
//                         .slice(0, -node.selectionSet.selections.length)
//                         .join("\n")}${"  ".repeat(depth)}${
//                         node.name.value
//                     } {\n${nestedFields}${"  ".repeat(depth)}}\n`;
//                     depth--;
//                     if (depth === 0) {
//                         // Stop extracting after the first nested selection set
//                         startExtracting = false;
//                     }
//                 }
//             },
//         },
//     });

//     return fieldString.trim();
// }

// function fieldsToString(documentNode: DocumentNode) {
//     let fieldString = "";
//     let depth = 0;
//     let startExtracting = false;

//     visit(documentNode, {
//         Field: {
//             enter(node) {
//                 if (startExtracting) {
//                     if (node.selectionSet) {
//                         // Increase depth for nested fields
//                         depth++;
//                     } else {
//                         // Add fields with proper indentation
//                         fieldString += `${"  ".repeat(depth)}${
//                             node.name.value
//                         }\n`;
//                     }
//                 } else if (node.selectionSet) {
//                     // Start extracting from the first nested selection set
//                     startExtracting = true;
//                 }
//             },
//             leave(node) {
//                 if (startExtracting && node.selectionSet) {
//                     // Prepare the nested fields string
//                     const nestedFields = fieldString
//                         .split("\n")
//                         .slice(-node.selectionSet.selections.length)
//                         .join("\n");
//                     fieldString = `${fieldString
//                         .split("\n")
//                         .slice(0, -node.selectionSet.selections.length)
//                         .join("\n")}${"  ".repeat(depth - 1)}${
//                         node.name.value
//                     } {\n${nestedFields}\n${"  ".repeat(depth - 1)}}\n`;
//                     depth--;

//                     if (depth === 0) {
//                         // Stop extracting after processing the first nested selection set
//                         startExtracting = false;
//                     }
//                 }
//             },
//         },
//     });

//     return fieldString.trim();
// }

// function fieldsToString(documentNode: DocumentNode) {
//     const fieldLines: any[] = [];
//     let depth = 0;

//     visit(documentNode, {
//         Field: {
//             enter(node) {
//                 if (node.selectionSet) {
//                     depth++;
//                 } else {
//                     // Add leaf fields with proper indentation
//                     fieldLines.push(`${"  ".repeat(depth)}${node.name.value}`);
//                 }
//             },
//             leave(node) {
//                 if (node.selectionSet) {
//                     // Construct and add nested field strings
//                     const nestedFieldLines = fieldLines.splice(
//                         -node.selectionSet.selections.length,
//                     );
//                     fieldLines.push(
//                         `${"  ".repeat(depth - 1)}${
//                             node.name.value
//                         } {\n${nestedFieldLines.join("\n")}\n${"  ".repeat(
//                             depth - 1,
//                         )}}`,
//                     );
//                     depth--;
//                 }
//             },
//         },
//     });

//     // Join all field lines into a single string
//     return fieldLines.join("\n");
// }

// function fieldsToString(documentNode: DocumentNode) {
//     const fieldLines: any[] = [];
//     let depth = 1;
//     let skipFirstField = true;

//     visit(documentNode, {
//         Field: {
//             enter(node) {
//                 if (skipFirstField) {
//                     // Skip the first field (outermost field)
//                     skipFirstField = false;
//                     return;
//                 }

//                 if (node.selectionSet) {
//                     depth++;
//                 } else {
//                     // Add leaf fields with proper indentation
//                     fieldLines.push(`${"  ".repeat(depth)}${node.name.value}`);
//                 }
//             },
//             leave(node) {
//                 if (!skipFirstField && node.selectionSet) {
//                     // Construct and add nested field strings
//                     const nestedFieldLines = fieldLines.splice(
//                         -node.selectionSet.selections.length,
//                     );
//                     fieldLines.push(
//                         `${"  ".repeat(depth - 1)}${
//                             node.name.value
//                         } {\n${nestedFieldLines.join("\n")}\n${"  ".repeat(
//                             depth - 1,
//                         )}}`,
//                     );
//                     depth--;
//                 }
//             },
//         },
//     });

//     // Join all field lines into a single string
//     return fieldLines.join("\n").trim();
// }

export function fieldsToString(documentNode: DocumentNode) {
    const fieldLines: any[] = [];
    let depth = 0;
    let isNestedField = false;

    visit(documentNode, {
        Field: {
            enter(node) {
                if (node.selectionSet && !isNestedField) {
                    // Start extraction from the first nested field
                    isNestedField = true;
                    return;
                }

                if (node.selectionSet) {
                    depth++;
                } else {
                    // Add leaf fields with proper indentation
                    fieldLines.push(`${"  ".repeat(depth)}${node.name.value}`);
                }
            },
            leave(node) {
                if (node.selectionSet && isNestedField) {
                    // Construct and add nested field strings
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
                    depth--;
                    if (depth === 0) {
                        // Reset isNestedField after leaving the first nested field
                        isNestedField = false;
                    }
                }
            },
        },
    });

    // Join all field lines into a single string
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
