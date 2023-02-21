import {
    CrudFilters,
    CrudSorting,
    DataProvider,
    LogicalFilter,
    pickNotDeprecated,
} from "@pankod/refine-core";
import { GraphQLClient } from "graphql-request";
import * as gql from "gql-query-builder";
import pluralize from "pluralize";
import camelCase from "camelcase";

export const generateSort = (sorters?: CrudSorting) => {
    if (sorters && sorters.length > 0) {
        const sortQuery = sorters.map((i) => {
            return `${i.field}:${i.order}`;
        });

        return sortQuery.join();
    }

    return [];
};

/**
 * @deprecated Please use `generateSort` instead.
 */
export const genereteSort = generateSort;

export const generateFilter = (filters?: CrudFilters) => {
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
        getList: async ({
            resource,
            hasPagination = true,
            pagination,
            sort,
            sorters,
            filters,
            meta,
            metaData,
        }) => {
            // `pagination` has default values. However, it will be removed next major version
            const { current = 1, pageSize = 10, mode } = pagination ?? {};

            //`hasPagination` is deprecated with refine@4, refine will pass `pagination.mode` instead, however, we still support `hasPagination` for backward compatibility
            const hasPaginationString =
                hasPagination === false ? "off" : "server";
            const isServerPaginationEnabled =
                pickNotDeprecated(mode, hasPaginationString) === "server";

            //`sort` is deprecated with refine@4, refine will pass `sorters` instead, however, we still support `sort` for backward compatibility
            const sortBy = genereteSort(pickNotDeprecated(sorters, sort));
            const filterBy = generateFilter(filters);

            const camelResource = camelCase(resource);

            const operation =
                pickNotDeprecated(meta, metaData)?.operation ?? camelResource;

            const { query, variables } = gql.query({
                operation,
                variables: {
                    ...pickNotDeprecated(meta, metaData)?.variables,
                    sort: sortBy,
                    where: { value: filterBy, type: "JSON" },
                    ...(isServerPaginationEnabled
                        ? {
                              start: (current - 1) * pageSize,
                              limit: pageSize,
                          }
                        : {}),
                },
                fields: pickNotDeprecated(meta, metaData)?.fields,
            });

            const response = await client.request(query, variables);

            return {
                data: response[operation],
                total: response[operation].count,
            };
        },

        getMany: async ({ resource, ids, meta, metaData }) => {
            const camelResource = camelCase(resource);

            const operation =
                pickNotDeprecated(meta, metaData)?.operation ?? camelResource;

            const { query, variables } = gql.query({
                operation,
                variables: {
                    where: {
                        value: { id_in: ids },
                        type: "JSON",
                    },
                },
                fields: pickNotDeprecated(meta, metaData)?.fields,
            });

            const response = await client.request(query, variables);

            return {
                data: response[operation],
            };
        },

        create: async ({ resource, variables, meta, metaData }) => {
            const singularResource = pluralize.singular(resource);
            const camelCreateName = camelCase(`create-${singularResource}`);

            const operation =
                pickNotDeprecated(meta, metaData)?.operation ?? camelCreateName;

            const { query, variables: gqlVariables } = gql.mutation({
                operation,
                variables: {
                    input: {
                        value: { data: variables },
                        type: `${camelCreateName}Input`,
                    },
                },
                fields: pickNotDeprecated(meta, metaData)?.fields ?? [
                    {
                        operation: singularResource,
                        fields: ["id"],
                        variables: {},
                    },
                ],
            });
            const response = await client.request(query, gqlVariables);

            return {
                data: response[operation][singularResource],
            };
        },

        createMany: async ({ resource, variables, meta, metaData }) => {
            const singularResource = pluralize.singular(resource);
            const camelCreateName = camelCase(`create-${singularResource}`);

            const operation =
                pickNotDeprecated(meta, metaData)?.operation ?? camelCreateName;

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
                        fields: pickNotDeprecated(meta, metaData)?.fields ?? [
                            {
                                operation: singularResource,
                                fields: ["id"],
                                variables: {},
                            },
                        ],
                    });
                    const result = await client.request(query, gqlVariables);

                    return result[operation][singularResource];
                }),
            );
            return {
                data: response,
            };
        },

        update: async ({ resource, id, variables, meta, metaData }) => {
            const singularResource = pluralize.singular(resource);
            const camelUpdateName = camelCase(`update-${singularResource}`);

            const operation =
                pickNotDeprecated(meta, metaData)?.operation ?? camelUpdateName;

            const { query, variables: gqlVariables } = gql.mutation({
                operation,
                variables: {
                    input: {
                        value: { where: { id }, data: variables },
                        type: `${camelUpdateName}Input`,
                    },
                },
                fields: pickNotDeprecated(meta, metaData)?.fields ?? [
                    {
                        operation: singularResource,
                        fields: ["id"],
                        variables: {},
                    },
                ],
            });
            const response = await client.request(query, gqlVariables);

            return {
                data: response[operation][singularResource],
            };
        },

        updateMany: async ({ resource, ids, variables, meta, metaData }) => {
            const singularResource = pluralize.singular(resource);
            const camelUpdateName = camelCase(`update-${singularResource}`);

            const operation =
                pickNotDeprecated(meta, metaData)?.operation ?? camelUpdateName;

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
                        fields: pickNotDeprecated(meta, metaData)?.fields ?? [
                            {
                                operation: singularResource,
                                fields: ["id"],
                                variables: {},
                            },
                        ],
                    });
                    const result = await client.request(query, gqlVariables);

                    return result[operation][singularResource];
                }),
            );
            return {
                data: response,
            };
        },

        getOne: async ({ resource, id, meta, metaData }) => {
            const singularResource = pluralize.singular(resource);
            const camelResource = camelCase(singularResource);

            const operation =
                pickNotDeprecated(meta, metaData)?.operation ?? camelResource;

            const { query, variables } = gql.query({
                operation,
                variables: {
                    id: { value: id, type: "ID", required: true },
                },
                fields: pickNotDeprecated(meta, metaData)?.fields,
            });

            const response = await client.request(query, variables);

            return {
                data: response[operation],
            };
        },

        deleteOne: async ({ resource, id, meta, metaData }) => {
            const singularResource = pluralize.singular(resource);
            const camelDeleteName = camelCase(`delete-${singularResource}`);

            const operation =
                pickNotDeprecated(meta, metaData)?.operation ?? camelDeleteName;

            const { query, variables } = gql.mutation({
                operation,
                variables: {
                    input: {
                        value: { where: { id } },
                        type: `${camelDeleteName}Input`,
                    },
                },
                fields: pickNotDeprecated(meta, metaData)?.fields ?? [
                    {
                        operation: singularResource,
                        fields: ["id"],
                        variables: {},
                    },
                ],
            });

            const response = await client.request(query, variables);

            return {
                data: response[operation][singularResource],
            };
        },

        deleteMany: async ({ resource, ids, meta, metaData }) => {
            const singularResource = pluralize.singular(resource);
            const camelDeleteName = camelCase(`delete-${singularResource}`);

            const operation =
                pickNotDeprecated(meta, metaData)?.operation ?? camelDeleteName;

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
                        fields: pickNotDeprecated(meta, metaData)?.fields ?? [
                            {
                                operation: singularResource,
                                fields: ["id"],
                                variables: {},
                            },
                        ],
                    });
                    const result = await client.request(query, gqlVariables);

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

        custom: async ({ url, method, headers, meta: _meta, metaData }) => {
            let gqlClient = client;
            const meta = pickNotDeprecated(_meta, metaData);

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

                        const response = await gqlClient.request(
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

                        const response = await gqlClient.request(
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
