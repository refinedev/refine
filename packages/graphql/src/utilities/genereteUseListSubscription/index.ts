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
    filters,
}: GenereteUseListSubscriptionParams): GenereteUseListSubscriptionReturnValues => {
    const { current = 1, pageSize = 10 } = pagination ?? {};

    const sortBy = genereteSort(sort);
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
