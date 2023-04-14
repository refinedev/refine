import {
    MetaQuery,
    Pagination,
    CrudSorting,
    CrudFilters,
} from "@refinedev/core";
import * as gql from "gql-query-builder";

import { generateFilters } from "./generateFilters";
import { generateSorting } from "./generateSorting";

type GenerateUseListSubscriptionParams = {
    resource: string;
    meta: MetaQuery;
    pagination?: Pagination;
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
    pagination,
    sorters,
    filters,
}: GenerateUseListSubscriptionParams): GenerateUseListSubscriptionReturnValues => {
    const {
        current = 1,
        pageSize: limit = 10,
        mode = "server",
    } = pagination ?? {};

    const hasuraSorting = generateSorting(sorters);
    const hasuraFilters = generateFilters(filters);

    const operation = meta.operation ?? resource;

    const hasuraSortingType = `[${operation}_order_by!]`;
    const hasuraFiltersType = `${operation}_bool_exp`;

    const { query, variables } = gql.subscription([
        {
            operation,
            fields: meta.fields,
            variables: {
                ...(mode === "server"
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

/**
 * @deprecated Please use `generateUseListSubscription` instead.
 */
export const genereteUseListSubscription = generateUseListSubscription;
