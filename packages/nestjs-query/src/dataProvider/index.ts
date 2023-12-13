import {
    BaseKey,
    BaseRecord,
    DataProvider,
    GetManyResponse,
    LogicalFilter,
    MetaQuery,
} from "@refinedev/core";
import camelcase from "camelcase";
import * as gql from "gql-query-builder";
import VariableOptions from "gql-query-builder/build/VariableOptions";
import { GraphQLClient } from "graphql-request";
import { singular } from "pluralize";
import {
    generatePaging,
    generateFilters,
    generateSorting,
    fieldsToString,
    isMutation,
} from "../utils";
import gqlTag from "graphql-tag";

const dataProvider = (client: GraphQLClient): Required<DataProvider> => {
    return {
        getList: async ({ resource, pagination, sorters, filters, meta }) => {
            const operation = camelcase(resource);

            const paging = generatePaging(pagination || {});

            const queryVariables: VariableOptions = {};

            if (filters) {
                queryVariables["filter"] = {
                    type: camelcase(`${singular(resource)}Filter`, {
                        pascalCase: true,
                    }),
                    required: true,
                    value: generateFilters(filters as LogicalFilter[]),
                };
            }

            if (sorters) {
                queryVariables["sorting"] = {
                    type: camelcase(`${singular(resource)}Sort`, {
                        pascalCase: true,
                    }),
                    required: true,
                    list: [true],
                    value: generateSorting(sorters),
                };
            }

            if (paging) {
                queryVariables["paging"] = {
                    type: "OffsetPaging",
                    required: true,
                    value: paging,
                };
            }

            let query;
            let variables;

            if (meta?.gqlQuery) {
                query = meta?.gqlQuery;

                variables = {
                    filter: filters
                        ? generateFilters(filters as LogicalFilter[])
                        : {},
                    sorting: sorters ? generateSorting(sorters) : [],
                    paging,
                };
            } else {
                const gqlQuery = gql.query({
                    operation,
                    fields: [{ nodes: meta?.fields }, "totalCount"],
                    variables: queryVariables,
                });

                query = gqlQuery.query;
                variables = gqlQuery.variables;
            }

            const response = await client.request<BaseRecord>(query, variables);

            return {
                data: response[operation].nodes,
                total: response[operation].totalCount,
            };
        },

        getMany: async ({ resource, ids, meta }) => {
            const operation = camelcase(resource);

            if (meta?.gqlQuery) {
                const response = await client.request<BaseRecord>(
                    meta.gqlQuery,
                    {
                        filter: {
                            id: { in: ids },
                        },
                    },
                );

                return {
                    data: response[operation].nodes,
                };
            }

            const { query, variables } = gql.query({
                operation,
                fields: [{ nodes: meta?.fields || ["id"] }],
                variables: {
                    filter: {
                        type: camelcase(`${singular(resource)}Filter`, {
                            pascalCase: true,
                        }),
                        required: true,
                        value: {
                            id: { in: ids },
                        },
                    },
                },
            });

            const response = await client.request<BaseRecord>(query, variables);

            return {
                data: response[operation].nodes,
            };
        },

        create: async ({ resource, variables, meta }) => {
            const operation = `createOne${camelcase(singular(resource), {
                pascalCase: true,
            })}`;

            if (meta?.gqlQuery) {
                const response = await client.request<BaseRecord>(
                    meta.gqlQuery,
                    { input: { [camelcase(singular(resource))]: variables } },
                );

                return {
                    data: response[operation],
                };
            }

            const { query, variables: queryVariables } = gql.mutation({
                operation,
                fields: meta?.fields || ["id"],
                variables: {
                    input: {
                        type: `CreateOne${camelcase(singular(resource), {
                            pascalCase: true,
                        })}Input`,
                        required: true,
                        value: {
                            [camelcase(singular(resource))]: variables,
                        },
                    },
                },
            });

            const response = await client.request<BaseRecord>(
                query,
                queryVariables,
            );

            return {
                data: response[operation],
            };
        },

        createMany: async ({ resource, variables, meta }) => {
            const operation = `createMany${camelcase(resource, {
                pascalCase: true,
            })}`;

            const { query, variables: queryVariables } = gql.mutation({
                operation,
                fields: meta?.fields || ["id"],
                variables: {
                    input: {
                        type: `CreateMany${camelcase(resource, {
                            pascalCase: true,
                        })}Input`,
                        required: true,
                        value: {
                            [camelcase(resource)]: variables,
                        },
                    },
                },
            });

            const response = await client.request<BaseRecord>(
                query,
                queryVariables,
            );

            return {
                data: response[operation],
            };
        },
        update: async ({ resource, id, variables, meta }) => {
            const operation = `updateOne${camelcase(singular(resource), {
                pascalCase: true,
            })}`;

            if (meta?.gqlQuery) {
                const response = await client.request<BaseRecord>(
                    meta.gqlQuery,
                    {
                        input: {
                            id,
                            update: variables,
                        },
                    },
                );

                return {
                    data: response[operation],
                };
            }

            const { query, variables: queryVariables } = gql.mutation({
                operation,
                fields: meta?.fields || ["id"],
                variables: {
                    input: {
                        type: `UpdateOne${camelcase(singular(resource), {
                            pascalCase: true,
                        })}Input`,
                        required: true,
                        value: {
                            id,
                            update: variables,
                        },
                    },
                },
            });

            const response = await client.request<BaseRecord>(
                query,
                queryVariables,
            );

            return {
                data: response[operation],
            };
        },
        updateMany: async ({ resource, ids, variables, meta }) => {
            const operation = `updateMany${camelcase(resource, {
                pascalCase: true,
            })}`;

            const { query, variables: queryVariables } = gql.mutation({
                operation,
                fields: ["updatedCount"],
                variables: {
                    input: {
                        type: `UpdateMany${camelcase(resource, {
                            pascalCase: true,
                        })}Input`,
                        required: true,
                        value: {
                            filter: {
                                id: { in: ids },
                            },
                            update: variables,
                        },
                    },
                },
            });

            await client.request<BaseRecord>(query, queryVariables);

            return await handleGetMany(client, { resource, ids, meta });
        },
        getOne: async ({ resource, id, meta }) => {
            const operation = camelcase(singular(resource));

            if (meta?.gqlQuery) {
                let query = meta.gqlQuery;
                const variables = { id };

                if (isMutation(meta.gqlQuery)) {
                    const stringFields = fieldsToString(meta?.gqlQuery);

                    query = gqlTag`
                        query Get${camelcase(singular(resource), {
                            pascalCase: true,
                        })}($id: ID!) {
                            ${operation}(id: $id) {
                            ${stringFields}
                            }
                        }
                    `;
                }

                const response = await client.request<BaseRecord>(
                    query,
                    variables,
                );

                return {
                    data: response[operation],
                };
            }

            const { query, variables } = gql.query({
                operation,
                fields: meta?.fields || ["id"],
                variables: {
                    id: {
                        type: "ID",
                        required: true,
                        value: id,
                    },
                },
            });

            const response = await client.request<BaseRecord>(query, variables);

            return {
                data: response[operation],
            };
        },
        deleteOne: async ({ resource, id, meta }) => {
            const pascalResource = camelcase(singular(resource), {
                pascalCase: true,
            });

            const operation = `deleteOne${pascalResource}`;

            const query = gqlTag`
                    mutation DeleteOne${pascalResource}($input: DeleteOne${pascalResource}Input!) {
                        ${operation}(input: $input) {
                            id
                        }
                    }
                `;

            const response = await client.request<BaseRecord>(query, {
                input: { id },
            });

            return {
                data: response[operation],
            };
        },
        deleteMany: async ({ resource, ids, meta }) => {
            const operation = `deleteMany${camelcase(resource, {
                pascalCase: true,
            })}`;

            const { query, variables } = gql.mutation({
                operation,
                fields: ["deletedCount"],
                variables: {
                    input: {
                        type: `DeleteMany${camelcase(resource, {
                            pascalCase: true,
                        })}Input`,
                        required: true,
                        value: {
                            filter: {
                                id: { in: ids },
                            },
                        },
                    },
                },
            });

            await client.request<BaseRecord>(query, variables);

            return {
                data: [],
            };
        },
        getApiUrl: () => {
            throw Error(
                "Not implemented on refine-nestjs-query data provider.",
            );
        },
        custom: async ({ url, method, headers, meta }) => {
            if (url) {
                client.setEndpoint(url);
            }

            if (headers) {
                client.setHeaders(headers);
            }

            if (meta?.gqlQuery) {
                const response: any = await client.request(
                    meta.gqlQuery,
                    meta.variables,
                );

                return { data: response };
            }

            if (meta?.rawQuery) {
                const response = await client.request<BaseRecord>(
                    meta.rawQuery,
                    meta.variables,
                );

                return { data: response };
            }

            if (meta) {
                if (meta.operation) {
                    let query, variables;

                    if (method === "get") {
                        const gqlQuery = gql.query({
                            operation: meta.operation,
                            fields: meta.fields,
                            variables: meta.variables,
                        });

                        query = gqlQuery.query;
                        variables = gqlQuery.variables;
                    } else {
                        const gqlMutation = gql.mutation({
                            operation: meta.operation,
                            fields: meta.fields,
                            variables: meta.variables,
                        });

                        query = gqlMutation.query;
                        variables = gqlMutation.variables;
                    }

                    const response = await client.request<BaseRecord>(
                        query,
                        variables,
                    );

                    return {
                        data: response[meta.operation],
                    };
                } else {
                    throw Error("GraphQL operation name required.");
                }
            } else {
                throw Error(
                    "GraphQL needs operation, fields and variables values in meta object.",
                );
            }
        },
    };
};

export default dataProvider;
