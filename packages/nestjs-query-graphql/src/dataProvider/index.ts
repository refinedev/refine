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
import { generatePaging, generateFilters, generateSorting } from "../utils";

const handleGetMany = async <TData>(
    client: GraphQLClient,
    {
        resource,
        ids,
        meta,
    }: { resource: string; ids: BaseKey[]; meta?: MetaQuery },
): Promise<GetManyResponse<TData>> => {
    const operation = camelcase(resource);

    const { query, variables } = gql.query({
        operation,
        fields: [{ nodes: meta?.fields || ["id"] }],
        variables: {
            filter: {
                type: camelcase(`${singular(resource)}_filter`, {
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
};

const dataProvider = (client: GraphQLClient): Required<DataProvider> => {
    return {
        getList: async ({ resource, pagination, sorters, filters, meta }) => {
            const operation = camelcase(resource);

            const paging = generatePaging(pagination || {});

            const queryVariables: VariableOptions = {};

            if (filters) {
                queryVariables["filter"] = {
                    type: camelcase(`${singular(resource)}_filter`, {
                        pascalCase: true,
                    }),
                    required: true,
                    value: generateFilters(filters as LogicalFilter[]),
                };
            }

            if (sorters) {
                queryVariables["sorting"] = {
                    type: camelcase(`${singular(resource)}_sort`, {
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

            const { query, variables } = gql.query({
                operation,
                fields: [{ nodes: meta?.fields }, "totalCount"],
                variables: queryVariables,
            });

            const response = await client.request<BaseRecord>(query, variables);

            return {
                data: response[operation].nodes,
                total: response[operation].totalCount,
            };
        },

        getMany: async ({ resource, ids, meta }) => {
            return await handleGetMany(client, { resource, ids, meta });
        },

        create: async ({ resource, variables, meta }) => {
            const operation = `createOne${camelcase(singular(resource), {
                pascalCase: true,
            })}`;

            const { query, variables: queryVariables } = gql.mutation({
                operation,
                fields: meta?.fields || ["id"],
                variables: {
                    input: {
                        type: `CreateOne${camelcase(singular(resource), {
                            pascalCase: true,
                        })}Input`,
                        required: true,
                        value: { [camelcase(singular(resource))]: variables },
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
            const operation = `deleteOne${camelcase(singular(resource), {
                pascalCase: true,
            })}`;

            const { query, variables } = gql.mutation({
                operation,
                fields: meta?.fields || ["id"],
                variables: {
                    input: {
                        type: `DeleteOne${camelcase(singular(resource), {
                            pascalCase: true,
                        })}Input`,
                        required: true,
                        value: {
                            id,
                        },
                    },
                },
            });

            const response = await client.request<BaseRecord>(query, variables);

            return {
                data: response[operation],
            };
        },
        deleteMany: async ({ resource, ids }) => {
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
                "Not implemented on refine-nestjs-query-graphql data provider.",
            );
        },
        custom: async ({ url, method, headers, meta }) => {
            let gqlClient = client;

            if (url) {
                gqlClient = new GraphQLClient(url, { headers });
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
                    "GraphQL needs operation, fields and variables values in meta object.",
                );
            }
        },
    };
};

export default dataProvider;
