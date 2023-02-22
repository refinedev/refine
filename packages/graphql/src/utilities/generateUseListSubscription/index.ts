import {
    MetaQuery,
    Pagination,
    CrudSorting,
    CrudFilters,
} from "@pankod/refine-core";
import * as gql from "gql-query-builder";
import camelCase from "camelcase";

import { generateFilter, generateSort } from "../../dataProvider";

type GenerateUseListSubscriptionParams = {
    resource: string;
    meta: MetaQuery;
    pagination?: Required<Pagination>;
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
    const { current = 1, pageSize = 10, mode } = pagination ?? {};

    const sortBy = generateSort(sorters);
    const filterBy = generateFilter(filters);

    const camelResource = camelCase(resource);

    const operation = meta.operation ?? camelResource;

    const { query, variables } = gql.query({
        operation,
        variables: {
            ...meta.variables,
            sort: sortBy,
            where: { value: filterBy, type: "JSON" },
            ...(mode === "server"
                ? {
                      start: (current - 1) * pageSize,
                      limit: pageSize,
                  }
                : {}),
        },
        fields: meta.fields,
    });

    return { query, variables, operation };
};
