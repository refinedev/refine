import { MetaQuery, BaseKey } from "@refinedev/core";
import * as gql from "gql-query-builder";

type GenereteUseOneSubscriptionParams = {
    resource: string;
    meta: MetaQuery;
    id?: BaseKey;
};

type GenereteUseOneSubscriptionReturnValues = {
    variables: any;
    query: string;
    operation: string;
};

export const genereteUseOneSubscription = ({
    resource,
    meta,
    id,
}: GenereteUseOneSubscriptionParams): GenereteUseOneSubscriptionReturnValues => {
    if (!id) {
        console.error(
            "[useSubscription]: `id` is required in `params` for graphql subscriptions",
        );
    }

    const operation = `${meta.operation ?? resource}_by_pk`;

    const { query, variables } = gql.subscription({
        operation,
        variables: {
            id: { value: id, type: "uuid", required: true },
            ...meta.variables,
        },
        fields: meta.fields,
    });

    return { query, variables, operation };
};
