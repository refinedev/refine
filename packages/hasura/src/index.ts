// import { DataProvider } from '@pankod/refine';
import { GraphQLClient } from 'graphql-request';
import * as gql from 'gql-query-builder';
import camelCase from 'camelcase';
import {
    CrudOperators,
    CrudFilters,
    CrudSorting,
    DataProvider,
} from '@pankod/refine';

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
        getList: async ({ resource, sort, filters, pagination, metaData }) => {
            const current = pagination?.current ?? 1;
            const limit = pagination?.pageSize || 10;
            const offset = (current - 1) * limit;

            const hasuraSorting = generateSorting(sort);
            const hasuraFilters = generateFilters(filters);

            const camelResource = camelCase(resource);

            const operation = metaData?.operation ?? camelResource;

            const { query, variables } = gql.query([
                {
                    operation,
                    fields: metaData?.fields,
                    variables: {
                        limit,
                        offset,
                        ...(hasuraSorting && {
                            order_by: {
                                value: hasuraSorting,
                                type: `[${operation}_order_by!]`,
                            },
                        }),
                        ...(hasuraSorting && {
                            where: {
                                value: hasuraFilters,
                                type: `${operation}_bool_exp`,
                            },
                        }),
                    },
                },
                {
                    operation: `${operation}_aggregate`,
                    fields: [{ aggregate: ['count'] }],
                },
            ]);

            const result = await client.request(query, variables);

            return {
                data: result[operation],
                total: result[`${operation}_aggregate`].aggregate.count,
            };
        },
    };
};

export default dataProvider;
