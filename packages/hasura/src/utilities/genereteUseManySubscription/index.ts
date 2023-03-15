import { MetaQuery, BaseKey } from "@refinedev/core";
import * as gql from "gql-query-builder";

type GenereteUseManySubscriptionParams = {
    resource: string;
    meta: MetaQuery;
    ids?: BaseKey[];
};

type GenereteUseManySubscriptionReturnValues = {
    variables: any;
    query: string;
    operation: string;
};

export const genereteUseManySubscription = ({
    resource,
    meta,
    ids,
}: GenereteUseManySubscriptionParams): GenereteUseManySubscriptionReturnValues => {
    if (!ids) {
        console.error(
            "[useSubscription]: `ids` is required in `params` for graphql subscriptions",
        );
    }

    const operation = meta.operation ?? resource;

    const { query, variables } = gql.subscription({
        operation,
        fields: meta.fields,
        variables: meta.variables ?? {
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

    return { query, variables, operation };
};
