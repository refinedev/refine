import { MetaQuery, BaseKey } from "@refinedev/core";
import * as gql from "gql-query-builder";

type GenerateUseOneSubscriptionParams = {
    resource: string;
    meta: MetaQuery;
    id?: BaseKey;
};

type GenerateUseOneSubscriptionReturnValues = {
    variables: any;
    query: string;
    operation: string;
};

export const generateUseOneSubscription = ({
    resource,
    meta,
    id,
}: GenerateUseOneSubscriptionParams): GenerateUseOneSubscriptionReturnValues => {
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

/**
 * @deprecated Please use `generateUseOneSubscription` instead.
 */
export const genereteUseOneSubscription = generateUseOneSubscription;
