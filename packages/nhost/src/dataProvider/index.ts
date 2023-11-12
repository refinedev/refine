import { NhostClient } from "@nhost/nhost-js";
import * as gql from "gql-query-builder";
import {
    CrudOperators,
    CrudFilters,
    CrudSorting,
    DataProvider,
    HttpError,
    CrudFilter,
} from "@refinedev/core";
import setWith from "lodash/setWith";
import set from "lodash/set";
import camelCase from "camelcase";
import { mapValues, mapKeys } from "lodash";

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

export const camelizeKeys = (obj: any): any => {
    if (!obj) return undefined;
    return mapKeys(obj, (_v, k) => camelCase(k));
};

export const upperCaseValues = (obj: any): any => {
    if (!obj) return undefined;
    return mapValues(obj, (v: string) => v.toUpperCase());
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
        default:
            return value;
    }
};

const convertHasuraOperatorToGraphqlDefaultNaming = (
    hasuraOperator?: HasuraFilterCondition,
) => {
    return hasuraOperator
        ? `_${camelCase(hasuraOperator)}`
        : undefined;
};

const generateNestedFilterQuery = (
    filter: CrudFilter,
    namingConvention: NamingConvention = 'hasura-default'
): any => {
    const { operator } = filter;

    if (operator !== "or" && operator !== "and" && "field" in filter) {
        const { field, value } = filter;

        const defaultNamingConvention = namingConvention === "hasura-default";

        const hasuraOperator = defaultNamingConvention
            ? hasuraFilters[filter.operator]
            : convertHasuraOperatorToGraphqlDefaultNaming
                (hasuraFilters[filter.operator]
                );

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

export const generateFilters: any = (
    filters?: CrudFilters,
    namingConvention: NamingConvention = "hasura-default"
) => {
    if (!filters) {
        return undefined;
    }

    const nestedQuery = generateNestedFilterQuery({
        operator: "and",
        value: filters,
    }, namingConvention);

    return nestedQuery;
};

const handleError = (error: object | Error) => {
    const customError: HttpError = {
        ...error,
        message: Array.isArray(error)
            ? error.map((p) => p.message).join(", ")
            : JSON.stringify(error),
        statusCode: 200,
    };

    return Promise.reject(customError);
};

export type NamingConvention = "hasura-default" | "graphql-default";

export type NHostDataProviderOptions = {
    idType?: "uuid" | "Int" | ((resource: string) => "uuid" | "Int");
    namingConvention?: NamingConvention
};

const dataProvider = (
    client: NhostClient,
    options?: NHostDataProviderOptions,
): Required<DataProvider> => {
    const { idType, namingConvention = 'hasura-default' } = options ?? {};
    const defaultNamingConvention = namingConvention === 'hasura-default'

    const getIdType = (resource: string) => {
        if (typeof idType === "function") {
            return idType(resource);
        }
        return idType ?? "uuid";
    };
    return {
        getOne: async ({ resource, id, meta }) => {
            const operation = defaultNamingConvention ?
                `${meta?.operation ?? resource}_by_pk`
                : camelCase(`${meta?.operation ?? resource}_by_pk`)

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

            const { data, error } = await client.graphql.request(
                query,
                variables,
            );

            if (error) {
                return await handleError(error);
            }

            return {
                data: (data as any)?.[operation],
            };
        },

        getMany: async ({ resource, ids, meta }) => {
            const operation = defaultNamingConvention
                ? meta?.operation ?? resource
                : camelCase(meta?.operation ?? resource)

            const type = defaultNamingConvention
                ? `${operation}_bool_exp`
                : camelCase(`${operation}_bool_exp`, { pascalCase: true })

            const { query, variables } = gql.query({
                operation,
                fields: meta?.fields,
                variables: meta?.variables ?? {
                    where: {
                        type: type,
                        value: {
                            id: {
                                _in: ids,
                            },
                        },
                    },
                },
            });

            const { data, error } = await client.graphql.request(
                query,
                variables,
            );

            if (error) {
                return await handleError(error);
            }

            return {
                data: (data as any)?.[operation],
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
                    pascalCase: true
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
                            (namingConvention === 'graphql-default'
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

            const { data, error } = await client.graphql.request(
                query,
                variables,
            );

            if (error) {
                return await handleError(error);
            }

            return {
                data: (data as any)?.[operation],
                total: (data as any)?.[aggregateOperation]?.aggregate?.count,
            };
        },

        create: async ({ resource, variables, meta }) => {
            const operation = meta?.operation ?? resource;

            const insertOperation = defaultNamingConvention
                ? `insert_${operation}_one`
                : camelCase(`insert_${operation}_one`)

            const insertType = defaultNamingConvention
                ? `${operation}_insert_input`
                : camelCase(`${operation}_insert_input`, { pascalCase: true })

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

            const { data, error } = await client.graphql.request(
                query,
                gqlVariables,
            );

            if (error) {
                return await handleError(error);
            }
            return {
                data: (data as any)?.[insertOperation],
            };
        },

        createMany: async ({ resource, variables, meta }) => {
            const operation = meta?.operation ?? resource;

            const insertOperation = defaultNamingConvention
                ? `insert_${operation}`
                : camelCase(`insert_${operation}`)

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

            const { data, error } = await client.graphql.request(
                query,
                gqlVariables,
            );

            if (error) {
                return await handleError(error);
            }

            return {
                data: (data as any)?.[insertOperation]?.["returning"],
            };
        },

        update: async ({ resource, id, variables, meta }) => {
            const operation = meta?.operation ?? resource;

            const updateOperation = defaultNamingConvention
                ? `update_${operation}_by_pk`
                : camelCase(`update_${operation}_by_pk`)

            const pkColumnsType = defaultNamingConvention
                ? `${operation}_pk_columns_input`
                : camelCase(`${operation}_pk_columns_input!`, {
                    pascalCase: true
                })

            const setInputType = defaultNamingConvention
                ? `${operation}_set_input`
                : camelCase(`${operation}_set_input`, { pascalCase: true })

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
                            }
                        }
                        : {
                            pkColumns: {
                                type: pkColumnsType,
                                value: {
                                    id: id,
                                },
                            }
                        }
                    ),
                    _set: {
                        type: setInputType,
                        value: variables,
                        required: true,
                    },
                },
                fields: meta?.fields ?? ["id"],
            });

            const { data, error } = await client.graphql.request(
                query,
                gqlVariables,
            );

            if (error) {
                return await handleError(error);
            }

            return {
                data: (data as any)?.[updateOperation],
            };
        },
        updateMany: async ({ resource, ids, variables, meta }) => {
            const operation = meta?.operation ?? resource;

            const updateOperation = defaultNamingConvention
                ? `update_${operation}`
                : camelCase(`update_${operation}`)

            const whereType = defaultNamingConvention
                ? `${operation}_bool_exp`
                : camelCase(`${operation}_bool_exp`, { pascalCase: true })

            const setInputType = defaultNamingConvention
                ? `${operation}_set_input`
                : camelCase(`${operation}_set_input`, { pascalCase: true })

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

            const { data, error } = await client.graphql.request(
                query,
                gqlVariables,
            );

            if (error) {
                return await handleError(error);
            }

            return {
                data: (data as any)?.[updateOperation]?.["returning"],
            };
        },

        deleteOne: async ({ resource, id, meta }) => {
            const operation = meta?.operation ?? resource;

            const deleteOperation = defaultNamingConvention
                ? `delete_${operation}_by_pk`
                : camelCase(`delete_${operation}_by_pk`)

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

            const { data, error } = await client.graphql.request(
                query,
                variables,
            );

            if (error) {
                return await handleError(error);
            }

            return {
                data: (data as any)?.[deleteOperation],
            };
        },

        deleteMany: async ({ resource, ids, meta }) => {
            const operation = meta?.operation ?? resource;

            const deleteOperation = defaultNamingConvention
                ? `delete_${operation}`
                : camelCase(`delete_${operation}`)

            const whereType = defaultNamingConvention
                ? `${operation}_bool_exp`
                : camelCase(`${operation}_bool_exp`, { pascalCase: true })

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

            const { data, error } = await client.graphql.request(
                query,
                variables,
            );

            if (error) {
                return await handleError(error);
            }

            return {
                data: (data as any)?.[deleteOperation]?.["returning"],
            };
        },

        getApiUrl: () => {
            return client.graphql.getUrl();
        },

        custom: () => {
            throw Error("useCustom is not implemented in @refinedev/nhost");
        },
    };
};

export default dataProvider;
