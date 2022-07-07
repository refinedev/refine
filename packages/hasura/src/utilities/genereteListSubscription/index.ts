import {
    MetaDataQuery,
    Pagination,
    CrudSorting,
    CrudFilters,
} from "@pankod/refine-core";
import * as gql from "gql-query-builder";

import { generateFilters, generateSorting } from "src/dataProvider";

type GenereteListSubscriptionParams = {
    resource: string;
    metaData?: MetaDataQuery;
    pagination?: Pagination;
    hasPagination?: boolean;
    sort?: CrudSorting;
    filters?: CrudFilters;
};

type GenereteListSubscriptionReturnValues = {
    variables: any;
    query: string;
    operation: string;
};

export const genereteListSubscription = ({
    resource,
    metaData,
    pagination,
    hasPagination,
    sort,
    filters,
}: GenereteListSubscriptionParams): GenereteListSubscriptionReturnValues => {
    const { current = 1, pageSize: limit = 10 } = pagination ?? {};

    const hasuraSorting = generateSorting(sort);
    const hasuraFilters = generateFilters(filters);

    const operation = metaData?.operation ?? resource;

    const hasuraSortingType = `[${operation}_order_by!]`;
    const hasuraFiltersType = `${operation}_bool_exp`;

    const { query, variables } = gql.subscription([
        {
            operation,
            fields: metaData?.fields,
            variables: {
                ...(hasPagination
                    ? {
                          limit,
                          offset: (current - 1) * limit,
                      }
                    : {}),
                ...(hasuraSorting && {
                    order_by: {
                        value: hasuraSorting,
                        type: hasuraSortingType,
                    },
                }),
                ...(hasuraFilters && {
                    where: {
                        value: hasuraFilters,
                        type: hasuraFiltersType,
                    },
                }),
            },
        },
    ]);

    return { query, variables, operation };
};
