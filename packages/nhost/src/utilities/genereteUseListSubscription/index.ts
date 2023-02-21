import {
    MetaQuery,
    Pagination,
    CrudSorting,
    CrudFilters,
    pickNotDeprecated,
} from "@pankod/refine-core";
import * as gql from "gql-query-builder";

import { generateFilters, generateSorting } from "../../dataProvider";

type GenereteUseListSubscriptionParams = {
    resource: string;
    meta: MetaQuery;
    metaData: MetaQuery;
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
    meta: _meta,
    metaData,
    pagination,
    hasPagination,
    sort,
    sorters,
    filters,
}: GenereteUseListSubscriptionParams): GenereteUseListSubscriptionReturnValues => {
    // `pagination` has default values. However, it will be removed next major version
    const { current = 1, pageSize: limit = 10, mode } = pagination ?? {};

    //`hasPagination` is deprecated with refine@4, refine will pass `pagination.mode` instead, however, we still support `hasPagination` for backward compatibility
    const hasPaginationString = hasPagination === false ? "off" : "server";
    const isServerPaginationEnabled =
        pickNotDeprecated(mode, hasPaginationString) === "server";

    //`sort` is deprecated with refine@4, refine will pass `sorters` instead, however, we still support `sort` for backward compatibility
    const hasuraSorting = generateSorting(pickNotDeprecated(sorters, sort));
    const hasuraFilters = generateFilters(filters);

    const meta = pickNotDeprecated(_meta, metaData);
    const operation = meta.operation ?? resource;

    const hasuraSortingType = `[${operation}_order_by!]`;
    const hasuraFiltersType = `${operation}_bool_exp`;

    const { query, variables } = gql.subscription([
        {
            operation,
            fields: meta.fields,
            variables: {
                ...(isServerPaginationEnabled
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
