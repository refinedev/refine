import { GraphQLClient } from "graphql-request";
import * as gql from "gql-query-builder";
import {
    CrudOperators,
    CrudFilters,
    CrudSorting,
    DataProvider,
    CrudFilter,
    BaseRecord,
} from "@refinedev/core";
import setWith from "lodash/setWith";
import set from "lodash/set";
import mapKeys from "lodash/mapKeys";
import camelCase from "camelcase";
import { mapValues } from "lodash";

export type HasuraSortingType = Record<string, "asc" | "desc">;

export type GenerateSortingType = {
    (sorting?: CrudSorting): HasuraSortingType | undefined;
};

export const generateSorting: GenerateSortingType = (sorters?: CrudSorting) => {
    if (!sorters) {
        return undefined;
    }

    const sortingQueryResult: Record<
        string,
        "asc" | "desc" | HasuraSortingType
    > = {};

    sorters.forEach((sortItem) => {
        set(sortingQueryResult, sortItem.field, sortItem.order);
    });

    return sortingQueryResult as HasuraSortingType;
};

export type HasuraFilterCondition =
    | "_and"
    | "_not"
    | "_or"
    | "_eq"
    | "_gt"
    | "_gte"
    | "_lt"
    | "_lte"
    | "_neq"
    | "_in"
    | "_nin"
    | "_like"
    | "_nlike"
    | "_ilike"
    | "_nilike"
    | "_is_null"
    | "_similar"
    | "_nsimilar"
    | "_regex"
    | "_iregex";

const hasuraFilters: Record<CrudOperators, HasuraFilterCondition | undefined> =
    {
        eq: "_eq",
        ne: "_neq",
        lt: "_lt",
        gt: "_gt",
        lte: "_lte",
        gte: "_gte",
        in: "_in",
        nin: "_nin",
        contains: "_ilike",
        ncontains: "_nilike",
        containss: "_like",
        ncontainss: "_nlike",
        null: "_is_null",
        or: "_or",
        and: "_and",
        between: undefined,
        nbetween: undefined,
        nnull: "_is_null",
        startswith: "_iregex",
        nstartswith: "_iregex",
        endswith: "_iregex",
        nendswith: "_iregex",
        startswiths: "_similar",
        nstartswiths: "_nsimilar",
        endswiths: "_similar",
        nendswiths: "_nsimilar",
    };

export const handleFilterValue = (operator: CrudOperators, value: any) => {
    switch (operator) {
        case "startswiths":
        case "nstartswiths":
            return `${value}%`;
        case "endswiths":
        case "nendswiths":
            return `%${value}`;
        case "startswith":
            return `^${value}`;
        case "nstartswith":
            return `^(?!${value})`;
        case "endswith":
            return `${value}$`;
        case "nendswith":
            return `(?<!${value})$`;
        case "nnull":
            return false;
        case "contains":
        case "containss":
        case "ncontains":
        case "ncontainss":
            return `%${value}%`;
        default:
            return value;
    }
};

const generateNestedFilterQuery = (filter: CrudFilter): any => {
    const { operator } = filter;

    if (operator !== "or" && operator !== "and" && "field" in filter) {
        const { field, value } = filter;

        const hasuraOperator = hasuraFilters[filter.operator];
        if (!hasuraOperator) {
            throw new Error(`Operator ${operator} is not supported`);
        }

        const fieldsArray = field.split(".");
        const fieldsWithOperator = [...fieldsArray, hasuraOperator];
        const filteredValue = handleFilterValue(operator, value);

        return {
            ...setWith({}, fieldsWithOperator, filteredValue, Object),
        };
    }

    return {
        [`_${operator}`]: filter.value.map((f) => generateNestedFilterQuery(f)),
    };
};

export const generateFilters: any = (filters?: CrudFilters) => {
    if (!filters) {
        return undefined;
    }

    const nestedQuery = generateNestedFilterQuery({
        operator: "and",
        value: filters,
    });

    return nestedQuery;
};

const camelizeKeys = (obj: any): any => {
    if (!obj) return undefined;
    return mapKeys(obj, (_v, k) => camelCase(k));
};

const uperCaseValues = (obj: any): any => {
    if (!obj) return undefined;
    return mapValues(obj, (v: string) => v.toUpperCase());
};

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
                : uperCaseValues(camelizeKeys(generateSorting(sorters)));

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
