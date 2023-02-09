import {
    MetaDataQuery,
    Pagination,
    CrudSorting,
    CrudFilters,
} from "@pankod/refine-core";
import * as gql from "gql-query-builder";
import camelCase from "camelcase";

import { generateFilter, genereteSort } from "../../dataProvider";

type GenereteUseListSubscriptionParams = {
    resource: string;
    metaData: MetaDataQuery;
    pagination?: Pagination;
    hasPagination?: boolean;
    sort?: CrudSorting;
    sorters?: CrudSorting;
    filters?: CrudFilters;
};

type GenereteUseListSubscriptionReturnValues = {
    variables: any;
    query: string;
    operation: string;
};

export const genereteUseListSubscription = ({
    resource,
    metaData,
    pagination,
    hasPagination,
    sort,
    sorters,
    filters,
}: GenereteUseListSubscriptionParams): GenereteUseListSubscriptionReturnValues => {
    const { current = 1, pageSize = 10 } = pagination ?? {};

    //`sort` is deprecated with refine@4, refine will pass `sorters` instead, however, we still support `sort` for backward compatibility
    const sortBy = genereteSort(sorters ?? sort);
    const filterBy = generateFilter(filters);

    const camelResource = camelCase(resource);

    const operation = metaData.operation ?? camelResource;

    const { query, variables } = gql.query({
        operation,
        variables: {
            ...metaData.variables,
            sort: sortBy,
            where: { value: filterBy, type: "JSON" },
            ...(hasPagination
                ? {
                      start: (current - 1) * pageSize,
                      limit: pageSize,
                  }
                : {}),
        },
        fields: metaData.fields,
    });

    return { query, variables, operation };
};
