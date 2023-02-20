import {
    MetaQuery,
    Pagination,
    CrudSorting,
    CrudFilters,
    pickNotDeprecated,
} from "@pankod/refine-core";
import * as gql from "gql-query-builder";
import camelCase from "camelcase";

import { generateFilter, generateSort } from "../../dataProvider";

type GenerateUseListSubscriptionParams = {
    resource: string;
    meta?: MetaQuery;
    metaData?: MetaQuery;
    pagination?: Pagination;
    hasPagination?: boolean;
    sort?: CrudSorting;
    sorters?: CrudSorting;
    filters?: CrudFilters;
};

type GenerateUseListSubscriptionReturnValues = {
    variables: any;
    query: string;
    operation: string;
};

export const generateUseListSubscription = ({
    resource,
    meta,
    metaData,
    pagination,
    hasPagination,
    sort,
    sorters,
    filters,
}: GenerateUseListSubscriptionParams): GenerateUseListSubscriptionReturnValues => {
    const { current = 1, pageSize = 10 } = pagination ?? {};

    //`sort` is deprecated with refine@4, refine will pass `sorters` instead, however, we still support `sort` for backward compatibility
    const sortBy = generateSort(sorters ?? sort);
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
            ...(hasPagination
                ? {
                      start: (current - 1) * pageSize,
                      limit: pageSize,
                  }
                : {}),
        },
        fields: pickNotDeprecated(meta, metaData)?.fields,
    });

    return { query, variables, operation };
};
