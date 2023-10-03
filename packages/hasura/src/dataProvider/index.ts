import { BaseRecord, DataProvider } from "@refinedev/core";
import camelCase from "camelcase";
import * as gql from "gql-query-builder";
import { GraphQLClient } from "graphql-request";
import {
    camelizeKeys,
    generateFilters,
    generateSorting,
    upperCaseValues,
} from "../utils";

type IDType = "uuid" | "Int" | "String" | "Numeric";

export type NamingConvention = "hasura-default" | "graphql-default";

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
            const operation = defaultNamingConvention
                ? `${meta?.operation ?? resource}_by_pk`
                : camelCase(`${meta?.operation ?? resource}_by_pk`);

            const { query, variables } = gql.query({
                operation,
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

            const hasuraFilters = generateFilters(filters, namingConvention);

            const operation = defaultNamingConvention
                ? meta?.operation ?? resource
                : camelCase(meta?.operation ?? resource);

            const aggregateOperation = defaultNamingConvention
                ? `${operation}_aggregate`
                : camelCase(`${operation}_aggregate`);

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
                    operation: aggregateOperation,
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

            const insertOperation = defaultNamingConvention
                ? `insert_${operation}_one`
                : camelCase(`insert_${operation}_one`);

            const insertType = defaultNamingConvention
                ? `${operation}_insert_input`
                : camelCase(`${operation}_insert_input`, { pascalCase: true });

            const { query, variables: gqlVariables } = gql.mutation({
                operation: insertOperation,
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

            const insertOperation = defaultNamingConvention
                ? `insert_${operation}`
                : camelCase(`insert_${operation}`);

            const insertType = defaultNamingConvention
                ? `[${operation}_insert_input!]`
                : `[${camelCase(`${operation}_insert_input!`, {
                      pascalCase: true,
                  })}]`;

            const { query, variables: gqlVariables } = gql.mutation({
                operation: insertOperation,
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

            const updateOperation = defaultNamingConvention
                ? `update_${operation}_by_pk`
                : camelCase(`update_${operation}_by_pk`);

            const pkColumnsType = defaultNamingConvention
                ? `${operation}_pk_columns_input`
                : camelCase(`${operation}_pk_columns_input!`, {
                      pascalCase: true,
                  });
            const setInputType = defaultNamingConvention
                ? `${operation}_set_input`
                : camelCase(`${operation}_set_input`, { pascalCase: true });

            const { query, variables: gqlVariables } = gql.mutation({
                operation: updateOperation,
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

            const updateOperation = defaultNamingConvention
                ? `update_${operation}`
                : camelCase(`update_${operation}`);

            const whereType = defaultNamingConvention
                ? `${operation}_bool_exp`
                : camelCase(`${operation}_bool_exp`, { pascalCase: true });
            const setInputType = defaultNamingConvention
                ? `${operation}_set_input`
                : camelCase(`${operation}_set_input`, { pascalCase: true });

            const { query, variables: gqlVariables } = gql.mutation({
                operation: updateOperation,
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

            const deleteOperation = defaultNamingConvention
                ? `delete_${operation}_by_pk`
                : camelCase(`delete_${operation}_by_pk`);

            const { query, variables } = gql.mutation({
                operation: deleteOperation,
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

            const deleteOperation = defaultNamingConvention
                ? `delete_${operation}`
                : camelCase(`delete_${operation}`);

            const whereType = defaultNamingConvention
                ? `${operation}_bool_exp`
                : camelCase(`${operation}_bool_exp`, { pascalCase: true });

            const { query, variables } = gql.mutation({
                operation: deleteOperation,
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
