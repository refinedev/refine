import {
    MetaDataQuery,
    Pagination,
    CrudSorting,
    CrudFilters,
} from "@pankod/refine-core";
import * as gql from "gql-query-builder";

import { generateFilters, generateSorting } from "../../dataProvider";

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
    const { current = 1, pageSize: limit = 10 } = pagination ?? {};

    const hasuraSorting = generateSorting(sort);
    const hasuraFilters = generateFilters(filters);

    const operation = metaData.operation ?? resource;

    const hasuraSortingType = `[${operation}_order_by!]`;
    const hasuraFiltersType = `${operation}_bool_exp`;

    const { query, variables } = gql.subscription([
        {
            operation,
            fields: metaData.fields,
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
