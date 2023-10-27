import {
    CrudFilters,
    CrudSorting,
    DataProvider,
    LogicalFilter,
    BaseRecord,
} from "@refinedev/core";
import { GraphQLClient } from "graphql-request";
import * as gql from "gql-query-builder";
import pluralize from "pluralize";
import camelCase from "camelcase";

const genereteSort = (sorters?: CrudSorting) => {
    if (sorters && sorters.length > 0) {
        const sortQuery = sorters.map((i) => {
            return `${i.field}:${i.order}`;
        });

        return sortQuery.join();
    }

    return [];
};

const generateFilter = (filters?: CrudFilters) => {
    const queryFilters: { [key: string]: any } = {};

    if (filters) {
        filters.map((filter) => {
            if (
                filter.operator !== "or" &&
                filter.operator !== "and" &&
                "field" in filter
            ) {
                const { field, operator, value } = filter;

                if (operator === "eq") {
                    queryFilters[`${field}`] = value;
                } else {
                    queryFilters[`${field}_${operator}`] = value;
                }
            } else {
                const value = filter.value as LogicalFilter[];

                const orFilters: any[] = [];
                value.map((val) => {
                    orFilters.push({
                        [`${val.field}_${val.operator}`]: val.value,
                    });
                });

                queryFilters["_or"] = orFilters;
            }
        });
    }

    return queryFilters;
};

const dataProvider = (client: GraphQLClient): Required<DataProvider> => {
    return {
        getList: async ({ resource, pagination, sorters, filters, meta }) => {
            const {
                current = 1,
                pageSize = 10,
                mode = "server",
            } = pagination ?? {};

            const sortBy = genereteSort(sorters);
            const filterBy = generateFilter(filters);

            const camelResource = camelCase(resource);

            const operation = meta?.operation ?? camelResource;

            const operationConnection = `${operation}Connection`;

            const { query, variables } = gql.query([
                {
                    operation: operationConnection,
                    variables: {
                        ...meta?.variables,
                        where: { value: filterBy, type: "JSON" },
                    },
                    fields: [{ aggregate: ["count"] }],
                },
                {
                    operation,
                    variables: {
                        ...meta?.variables,
                        sort: sortBy,
                        where: { value: filterBy, type: "JSON" },
                        ...(mode === "server"
                            ? {
                                  start: (current - 1) * pageSize,
                                  limit: pageSize,
                              }
                            : {}),
                    },
                    fields: meta?.fields,
                },
            ]);

            const response = await client.request<BaseRecord>(query, variables);

            return {
                data: response[operation],
                total: response[operationConnection].aggregate.count,
            };
        },

        getMany: async ({ resource, ids, meta }) => {
            const camelResource = camelCase(resource);

            const operation = meta?.operation ?? camelResource;

            const { query, variables } = gql.query({
                operation,
                variables: {
                    where: {
                        value: { id_in: ids },
                        type: "JSON",
                    },
                },
                fields: meta?.fields,
            });

            const response = await client.request<BaseRecord>(query, variables);

            return {
                data: response[operation],
            };
        },

        create: async ({ resource, variables, meta }) => {
            const singularResource = pluralize.singular(resource);
            const camelCreateName = camelCase(`create-${singularResource}`);

            const operation = meta?.operation ?? camelCreateName;

            const { query, variables: gqlVariables } = gql.mutation({
                operation,
                variables: {
                    input: {
                        value: { data: variables },
                        type: `${camelCreateName}Input`,
                    },
                },
                fields: meta?.fields ?? [
                    {
                        operation: singularResource,
                        fields: ["id"],
                        variables: {},
                    },
                ],
            });
            const response = await client.request<BaseRecord>(
                query,
                gqlVariables,
            );

            return {
                data: response[operation][singularResource],
            };
        },

        createMany: async ({ resource, variables, meta }) => {
            const singularResource = pluralize.singular(resource);
            const camelCreateName = camelCase(`create-${singularResource}`);

            const operation = meta?.operation ?? camelCreateName;

            const response = await Promise.all(
                variables.map(async (param) => {
                    const { query, variables: gqlVariables } = gql.mutation({
                        operation,
                        variables: {
                            input: {
                                value: { data: param },
                                type: `${camelCreateName}Input`,
                            },
                        },
                        fields: meta?.fields ?? [
                            {
                                operation: singularResource,
                                fields: ["id"],
                                variables: {},
                            },
                        ],
                    });
                    const result = await client.request<BaseRecord>(
                        query,
                        gqlVariables,
                    );

                    return result[operation][singularResource];
                }),
            );
            return {
                data: response,
            };
        },

        update: async ({ resource, id, variables, meta }) => {
            const singularResource = pluralize.singular(resource);
            const camelUpdateName = camelCase(`update-${singularResource}`);

            const operation = meta?.operation ?? camelUpdateName;

            const { query, variables: gqlVariables } = gql.mutation({
                operation,
                variables: {
                    input: {
                        value: { where: { id }, data: variables },
                        type: `${camelUpdateName}Input`,
                    },
                },
                fields: [
                    {
                        operation: singularResource,
                        fields: meta?.fields ?? ["id"],
                        variables: {},
                    },
                ],
            });
            const response = await client.request<BaseRecord>(
                query,
                gqlVariables,
            );

            return {
                data: response[operation][singularResource],
            };
        },

        updateMany: async ({ resource, ids, variables, meta }) => {
            const singularResource = pluralize.singular(resource);
            const camelUpdateName = camelCase(`update-${singularResource}`);

            const operation = meta?.operation ?? camelUpdateName;

            const response = await Promise.all(
                ids.map(async (id) => {
                    const { query, variables: gqlVariables } = gql.mutation({
                        operation,
                        variables: {
                            input: {
                                value: { where: { id }, data: variables },
                                type: `${camelUpdateName}Input`,
                            },
                        },
                        fields: [
                            {
                                operation: singularResource,
                                fields: meta?.fields ?? ["id"],
                                variables: {},
                            },
                        ],
                    });
                    const result = await client.request<BaseRecord>(
                        query,
                        gqlVariables,
                    );

                    return result[operation][singularResource];
                }),
            );
            return {
                data: response,
            };
        },

        getOne: async ({ resource, id, meta }) => {
            const singularResource = pluralize.singular(resource);
            const camelResource = camelCase(singularResource);

            const operation = meta?.operation ?? camelResource;

            const { query, variables } = gql.query({
                operation,
                variables: {
                    id: { value: id, type: "ID", required: true },
                },
                fields: meta?.fields,
            });

            const response = await client.request<BaseRecord>(query, variables);

            return {
                data: response[operation],
            };
        },

        deleteOne: async ({ resource, id, meta }) => {
            const singularResource = pluralize.singular(resource);
            const camelDeleteName = camelCase(`delete-${singularResource}`);

            const operation = meta?.operation ?? camelDeleteName;

            const { query, variables } = gql.mutation({
                operation,
                variables: {
                    input: {
                        value: { where: { id } },
                        type: `${camelDeleteName}Input`,
                    },
                },
                fields: meta?.fields ?? [
                    {
                        operation: singularResource,
                        fields: ["id"],
                        variables: {},
                    },
                ],
            });

            const response = await client.request<BaseRecord>(query, variables);

            return {
                data: response[operation][singularResource],
            };
        },

        deleteMany: async ({ resource, ids, meta }) => {
            const singularResource = pluralize.singular(resource);
            const camelDeleteName = camelCase(`delete-${singularResource}`);

            const operation = meta?.operation ?? camelDeleteName;

            const response = await Promise.all(
                ids.map(async (id) => {
                    const { query, variables: gqlVariables } = gql.mutation({
                        operation,
                        variables: {
                            input: {
                                value: { where: { id } },
                                type: `${camelDeleteName}Input`,
                            },
                        },
                        fields: meta?.fields ?? [
                            {
                                operation: singularResource,
                                fields: ["id"],
                                variables: {},
                            },
                        ],
                    });
                    const result = await client.request<BaseRecord>(
                        query,
                        gqlVariables,
                    );

                    return result[operation][singularResource];
                }),
            );
            return {
                data: response,
            };
        },

        getApiUrl: () => {
            throw Error("Not implemented on refine-graphql data provider.");
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
