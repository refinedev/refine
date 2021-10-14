// import { DataProvider } from '@pankod/refine';
import { GraphQLClient } from 'graphql-request';
import * as gql from 'gql-query-builder';
import {
    CrudOperators,
    CrudFilters,
    CrudSorting,
    DataProvider,
} from '@pankod/refine';
import pluralize from 'pluralize';

export type HasuraSortingType = Record<string, 'asc' | 'desc'>;

export type GenerateSortingType = {
    (sorting?: CrudSorting): HasuraSortingType | undefined;
};

export const generateSorting: GenerateSortingType = (sorting?: CrudSorting) => {
    if (!sorting) {
        return undefined;
    }

    const sortingQueryResult: Record<string, 'asc' | 'desc'> = {};

    sorting.forEach((sortItem) => {
        sortingQueryResult[sortItem.field] = sortItem.order;
    });

    return sortingQueryResult as HasuraSortingType;
};

export type HasuraFilterCondition =
    | '_and'
    | '_not'
    | '_or'
    | '_eq'
    | '_gt'
    | '_gte'
    | '_lt'
    | '_lte'
    | '_neq'
    | '_in'
    | '_nin'
    | '_like'
    | '_nlike'
    | '_ilike'
    | '_nilike'
    | '_is_null';

const hasuraFilters: Record<CrudOperators, HasuraFilterCondition> = {
    eq: '_eq',
    ne: '_neq',
    lt: '_lt',
    gt: '_gt',
    lte: '_lte',
    gte: '_gte',
    in: '_in',
    nin: '_nin',
    contains: '_ilike',
    ncontains: '_nilike',
    containss: '_like',
    ncontainss: '_nlike',
    null: '_is_null',
};

export const generateFilters: any = (filters?: CrudFilters) => {
    if (!filters) {
        return undefined;
    }

    const resultFilter: any = {};

    filters.forEach((filter) => {
        resultFilter[filter.field] = {};
        resultFilter[filter.field][hasuraFilters[filter.operator]] =
            filter.value;
    });

    return resultFilter;
};

const dataProvider = (client: GraphQLClient): Partial<DataProvider> => {
    return {
        getOne: async ({ resource, id, metaData }) => {
            const operation = `${pluralize.plural(
                metaData?.operation ?? resource
            )}_by_pk`;

            const { query, variables } = gql.query({
                operation,
                variables: {
                    id: { value: id, type: 'uuid', required: true },
                    ...metaData?.variables,
                },
                fields: metaData?.fields,
            });

            const response = await client.request(query, variables);

            return {
                data: response[operation],
            };
        },

        getMany: async ({ resource, ids, metaData }) => {
            const operation = pluralize.plural(metaData?.operation ?? resource);

            const { query, variables } = gql.query({
                operation,
                fields: metaData?.fields,
                variables: metaData?.variables ?? {
                    where: {
                        type: `${operation}_bool_exp`,
                        value: {
                            id: {
                                _in: ids,
                            },
                        },
                    },
                },
            });

            const result = await client.request(query, variables);

            return {
                data: result[operation],
            };
        },

        getList: async ({ resource, sort, filters, pagination, metaData }) => {
            const current = pagination?.current ?? 1;
            const limit = pagination?.pageSize || 10;
            const offset = (current - 1) * limit;

            const hasuraSorting = generateSorting(sort);
            const hasuraFilters = generateFilters(filters);

            const pluralResource = pluralize.plural(
                metaData?.operation ?? resource
            );

            const aggreateOperation = `${pluralResource}_aggregate`;

            const hasuraSortingType = `[${pluralResource}_order_by!]`;
            const hasuraFiltersType = `${pluralResource}_bool_exp`;

            const { query, variables } = gql.query([
                {
                    operation: pluralResource,
                    fields: metaData?.fields,
                    variables: {
                        limit,
                        offset,
                        ...(hasuraSorting && {
                            order_by: {
                                value: hasuraSorting,
                                type: hasuraSortingType,
                            },
                        }),
                        ...(hasuraSorting && {
                            where: {
                                value: hasuraFilters,
                                type: hasuraFiltersType,
                            },
                        }),
                    },
                },
                {
                    operation: aggreateOperation,
                    fields: [{ aggregate: ['count'] }],
                },
            ]);

            const result = await client.request(query, variables);

            return {
                data: result[pluralResource],
                total: result[aggreateOperation].aggregate.count,
            };
        },

        create: async ({ resource, variables, metaData }) => {
            const pluralResource = pluralize.plural(
                metaData?.operation ?? resource
            );

            const operation = `insert_${pluralResource}_one`;

            const insertType = `${pluralResource}_insert_input`;

            const { query, variables: gqlVariables } = gql.mutation({
                operation,
                variables: {
                    object: {
                        type: insertType,
                        value: variables,
                        required: true,
                    },
                },
                fields: metaData?.fields ?? ['id', ...Object.keys(variables)],
            });

            const response = await client.request(query, gqlVariables);

            return {
                data: response[operation],
            };
        },

        createMany: async ({ resource, variables, metaData }) => {
            const pluralResource = pluralize.plural(
                metaData?.operation ?? resource
            );

            const operation = `insert_${pluralResource}`;

            const insertType = `[${pluralResource}_insert_input!]`;

            const { query, variables: gqlVariables } = gql.mutation({
                operation,
                variables: {
                    objects: {
                        type: insertType,
                        value: variables,
                        required: true,
                    },
                },
                fields: [
                    {
                        returning: metaData?.fields ?? ['id'],
                    },
                ],
            });

            const response = await client.request(query, gqlVariables);

            return {
                data: response[operation],
            };
        },

        update: async ({ resource, id, variables, metaData }) => {
            const pluralResource = pluralize.plural(
                metaData?.operation ?? resource
            );

            const operation = `update_${pluralResource}_by_pk`;

            const pkColumnsType = `${pluralResource}_pk_columns_input`;

            const setInputType = `${pluralResource}_set_input`;

            const { query, variables: gqlVariables } = gql.mutation({
                operation,
                variables: {
                    pk_columns: {
                        type: pkColumnsType,
                        value: {
                            id: id,
                        },
                        required: true,
                    },
                    _set: {
                        type: setInputType,
                        value: variables,
                        required: true,
                    },
                },
                fields: metaData?.fields ?? ['id'],
            });

            const response = await client.request(query, gqlVariables);

            return {
                data: response[operation],
            };
        },
        updateMany: async ({ resource, ids, variables, metaData }) => {
            const pluralResource = pluralize.plural(
                metaData?.operation ?? resource
            );

            const operation = `update_${pluralResource}`;

            const whereType = `${pluralResource}_bool_exp`;

            const setInputType = `${pluralResource}_set_input`;

            const { query, variables: gqlVariables } = gql.mutation({
                operation,
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
                        returning: metaData?.fields ?? ['id'],
                    },
                ],
            });

            const response = await client.request(query, gqlVariables);

            return {
                data: response[operation],
            };
        },

        deleteOne: async ({ resource, id, metaData }) => {
            const pluralResource = pluralize.plural(
                metaData?.operation ?? resource
            );

            const operation = `delete_${pluralResource}_by_pk`;

            const { query, variables } = gql.query({
                operation,
                variables: {
                    id: { value: id, type: 'uuid', required: true },
                    ...metaData?.variables,
                },
                fields: metaData?.fields ?? ['id'],
            });

            const response = await client.request(query, variables);

            return {
                data: response[operation],
            };
        },

        deleteMany: async ({ resource, ids, metaData }) => {
            const pluralResource = pluralize.plural(
                metaData?.operation ?? resource
            );

            const operation = `delete_${pluralResource}`;

            const whereType = `${pluralResource}_bool_exp`;

            const { query, variables } = gql.mutation({
                operation,
                fields: [
                    {
                        returning: metaData?.fields ?? ['id'],
                    },
                ],
                variables: metaData?.variables ?? {
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

            const result = await client.request(query, variables);

            return {
                data: result[operation],
            };
        },
    };
};

export default dataProvider;
