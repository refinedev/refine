import { DataProvider, BaseRecord } from "@refinedev/core";
import { GraphQLClient } from "graphql-request";
import * as gql from "gql-query-builder";
import camelCase from "camelcase";
import {
    generateFilters,
    generateSorting,
    camelizeKeys,
    upperCaseValues,
} from "../utils";

type IDType = "uuid" | "Int" | "String" | "Numeric";

type NamingConvention = "hasura-default" | "graphql-default";

export type HasuraDataProviderOptions = {
    idType?: IDType | ((resource: string) => IDType);
    namingConvention?: NamingConvention;
};

const dataProvider = (
    client: GraphQLClient,
    options?: HasuraDataProviderOptions,
): Required<DataProvider> => {
    const { idType, namingConvention = "hasura-default" } = options ?? {};
    const defaultNamingConvention = namingConvention === "hasura-default";

    const getIdType = (resource: string) => {
        if (typeof idType === "function") {
            return idType(resource);
        }
        return idType ?? "uuid";
    };

    return {
        getOne: async ({ resource, id, meta }) => {
            const operation = `${meta?.operation ?? resource}_by_pk`;
            const camelizedOperation = camelCase(operation);

            const { query, variables } = gql.query({
                operation: defaultNamingConvention
                    ? operation
                    : camelizedOperation,
                variables: {
                    id: {
                        value: id,
                        type: getIdType(resource),
                        required: true,
                    },
                    ...meta?.variables,
                },
                fields: meta?.fields,
            });

            const response = await client.request<BaseRecord>(query, variables);

            return {
                data: response[operation],
            };
        },

        getMany: async ({ resource, ids, meta }) => {
            const operation = defaultNamingConvention
                ? meta?.operation ?? resource
                : camelCase(meta?.operation ?? resource);

            const type = defaultNamingConvention
                ? `${operation}_bool_exp`
                : camelCase(`${operation}_bool_exp`, { pascalCase: true });

            const { query, variables } = gql.query({
                operation,
                fields: meta?.fields,
                variables: meta?.variables ?? {
                    where: {
                        type,
                        value: {
                            id: {
                                _in: ids,
                            },
                        },
                    },
                },
            });

            const result = await client.request<BaseRecord>(query, variables);

            return {
                data: result[operation],
            };
        },

        getList: async ({ resource, sorters, filters, pagination, meta }) => {
            const {
                current = 1,
                pageSize: limit = 10,
                mode = "server",
            } = pagination ?? {};
            const hasuraSorting = defaultNamingConvention
                ? generateSorting(sorters)
                : upperCaseValues(camelizeKeys(generateSorting(sorters)));

            const hasuraFilters = generateFilters(filters);

            const operation = defaultNamingConvention
                ? meta?.operation ?? resource
                : camelCase(meta?.operation ?? resource);

            const aggregateOperation = `${operation}_aggregate`;

            const camelizedAggregateOperation = camelCase(aggregateOperation);

            const hasuraSortingType = defaultNamingConvention
                ? `[${operation}_order_by!]`
                : `[${camelCase(`${operation}_order_by!`, {
                      pascalCase: true,
                  })}]`;

            const hasuraFiltersType = defaultNamingConvention
                ? `${operation}_bool_exp`
                : camelCase(`${operation}_bool_exp`, { pascalCase: true });

            const { query, variables } = gql.query([
                {
                    operation,
                    fields: meta?.fields,
                    variables: {
                        ...(mode === "server"
                            ? {
                                  limit,
                                  offset: (current - 1) * limit,
                              }
                            : {}),
                        ...(hasuraSorting &&
                            (namingConvention === "graphql-default"
                                ? {
                                      orderBy: {
                                          value: hasuraSorting,
                                          type: hasuraSortingType,
                                      },
                                  }
                                : {
                                      order_by: {
                                          value: hasuraSorting,
                                          type: hasuraSortingType,
                                      },
                                  })),
                        ...(hasuraFilters && {
                            where: {
                                value: hasuraFilters,
                                type: hasuraFiltersType,
                            },
                        }),
                    },
                },
                {
                    operation: defaultNamingConvention
                        ? aggregateOperation
                        : camelizedAggregateOperation,
                    fields: [{ aggregate: ["count"] }],
                    variables: {
                        where: {
                            value: hasuraFilters,
                            type: hasuraFiltersType,
                        },
                    },
                },
            ]);

            const result = await client.request<BaseRecord>(query, variables);

            return {
                data: result[operation],
                total: result[aggregateOperation].aggregate.count,
            };
        },

        create: async ({ resource, variables, meta }) => {
            const operation = defaultNamingConvention
                ? meta?.operation ?? resource
                : camelCase(meta?.operation ?? resource);

            const insertOperation = `insert_${operation}_one`;
            const camelizedInsertOperation = camelCase(insertOperation);

            const insertType = defaultNamingConvention
                ? `${operation}_insert_input`
                : camelCase(`${operation}_insert_input`, { pascalCase: true });

            const { query, variables: gqlVariables } = gql.mutation({
                operation: defaultNamingConvention
                    ? insertOperation
                    : camelizedInsertOperation,
                variables: {
                    object: {
                        type: insertType,
                        value: variables,
                        required: true,
                    },
                },
                fields: meta?.fields ?? ["id", ...Object.keys(variables || {})],
            });

            const response = await client.request<BaseRecord>(
                query,
                gqlVariables,
            );

            return {
                data: response[insertOperation],
            };
        },

        createMany: async ({ resource, variables, meta }) => {
            const operation = meta?.operation ?? resource;

            const insertOperation = `insert_${operation}`;
            const camelizedInsertOperation = camelCase(insertOperation);

            const insertType = defaultNamingConvention
                ? `[${operation}_insert_input!]`
                : `[${camelCase(`${operation}_insert_input!`, {
                      pascalCase: true,
                  })}]`;

            const { query, variables: gqlVariables } = gql.mutation({
                operation: defaultNamingConvention
                    ? insertOperation
                    : camelizedInsertOperation,
                variables: {
                    objects: {
                        type: insertType,
                        value: variables,
                        required: true,
                    },
                },
                fields: [
                    {
                        returning: meta?.fields ?? ["id"],
                    },
                ],
            });

            const response = await client.request<BaseRecord>(
                query,
                gqlVariables,
            );

            return {
                data: response[insertOperation]["returning"],
            };
        },

        update: async ({ resource, id, variables, meta }) => {
            const operation = meta?.operation ?? resource;

            const updateOperation = `update_${operation}_by_pk`;
            const camelizedUpdateOperation = camelCase(updateOperation);

            const pkColumnsType = defaultNamingConvention
                ? `${operation}_pk_columns_input`
                : camelCase(`${operation}_pk_columns_input!`, {
                      pascalCase: true,
                  });
            const setInputType = defaultNamingConvention
                ? `${operation}_set_input`
                : camelCase(`${operation}_set_input`, { pascalCase: true });

            const { query, variables: gqlVariables } = gql.mutation({
                operation: defaultNamingConvention
                    ? updateOperation
                    : camelizedUpdateOperation,
                variables: {
                    ...(defaultNamingConvention
                        ? {
                              pk_columns: {
                                  type: pkColumnsType,
                                  value: {
                                      id: id,
                                  },
                                  required: true,
                              },
                          }
                        : {
                              pkColumns: {
                                  type: pkColumnsType,
                                  value: {
                                      id: id,
                                  },
                              },
                          }),
                    _set: {
                        type: setInputType,
                        value: variables,
                        required: true,
                    },
                },
                fields: meta?.fields ?? ["id"],
            });

            const response = await client.request<BaseRecord>(
                query,
                gqlVariables,
            );

            return {
                data: response[updateOperation],
            };
        },
        updateMany: async ({ resource, ids, variables, meta }) => {
            const operation = meta?.operation ?? resource;

            const updateOperation = `update_${operation}`;
            const camelizedUpdateOperation = camelCase(updateOperation);

            const whereType = defaultNamingConvention
                ? `${operation}_bool_exp`
                : camelCase(`${operation}_bool_exp`, { pascalCase: true });
            const setInputType = defaultNamingConvention
                ? `${operation}_set_input`
                : camelCase(`${operation}_set_input`, { pascalCase: true });

            const { query, variables: gqlVariables } = gql.mutation({
                operation: defaultNamingConvention
                    ? updateOperation
                    : camelizedUpdateOperation,
                variables: {
                    where: {
                        type: whereType,
                        value: {
                            id: {
                                _in: ids,
                            },
                        },
                        required: true,
                    },
                    _set: {
                        type: setInputType,
                        value: variables,
                        required: true,
                    },
                },
                fields: [
                    {
                        returning: meta?.fields ?? ["id"],
                    },
                ],
            });

            const response = await client.request<BaseRecord>(
                query,
                gqlVariables,
            );

            return {
                data: response[updateOperation]["returning"],
            };
        },

        deleteOne: async ({ resource, id, meta }) => {
            const operation = meta?.operation ?? resource;

            const deleteOperation = `delete_${operation}_by_pk`;
            const camelizedDeleteOperation = camelCase(deleteOperation);

            const { query, variables } = gql.mutation({
                operation: defaultNamingConvention
                    ? deleteOperation
                    : camelizedDeleteOperation,
                variables: {
                    id: {
                        value: id,
                        type: getIdType(resource),
                        required: true,
                    },
                    ...meta?.variables,
                },
                fields: meta?.fields ?? ["id"],
            });

            const response = await client.request<BaseRecord>(query, variables);

            return {
                data: response[deleteOperation],
            };
        },

        deleteMany: async ({ resource, ids, meta }) => {
            const operation = meta?.operation ?? resource;

            const deleteOperation = `delete_${operation}`;
            const camelizedDeleteOperation = camelCase(deleteOperation);

            const whereType = defaultNamingConvention
                ? `${operation}_bool_exp`
                : camelCase(`${operation}_bool_exp`, { pascalCase: true });

            const { query, variables } = gql.mutation({
                operation: defaultNamingConvention
                    ? deleteOperation
                    : camelizedDeleteOperation,
                fields: [
                    {
                        returning: meta?.fields ?? ["id"],
                    },
                ],
                variables: meta?.variables ?? {
                    where: {
                        type: whereType,
                        required: true,
                        value: {
                            id: {
                                _in: ids,
                            },
                        },
                    },
                },
            });

            const result = await client.request<BaseRecord>(query, variables);

            return {
                data: result[deleteOperation]["returning"],
            };
        },

        getApiUrl: () => {
            throw new Error(
                "getApiUrl method is not implemented on refine-hasura data provider.",
            );
        },

        custom: async ({ url, method, headers, meta }) => {
            let gqlClient = client;

            if (url) {
                gqlClient = new GraphQLClient(url, { headers });
            }

            if (meta) {
                if (meta.operation) {
                    if (method === "get") {
                        const { query, variables } = gql.query({
                            operation: meta.operation,
                            fields: meta.fields,
                            variables: meta.variables,
                        });

                        const response = await gqlClient.request<BaseRecord>(
                            query,
                            variables,
                        );
                        response.data;

                        return {
                            data: response[meta.operation],
                        };
                    } else {
                        const { query, variables } = gql.mutation({
                            operation: meta.operation,
                            fields: meta.fields,
                            variables: meta.variables,
                        });

                        const response = await gqlClient.request<BaseRecord>(
                            query,
                            variables,
                        );

                        return {
                            data: response[meta.operation],
                        };
                    }
                } else {
                    throw Error("GraphQL operation name required.");
                }
            } else {
                throw Error(
                    "GraphQL need to operation, fields and variables values in meta object.",
                );
            }
        },
    };
};

export default dataProvider;
