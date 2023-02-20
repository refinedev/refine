import { BaseKey, MetaQuery, pickNotDeprecated } from "@pankod/refine-core";
import * as gql from "gql-query-builder";
import camelCase from "camelcase";

type GenerateUseManySubscriptionParams = {
    resource: string;
    meta?: MetaQuery;
    metaData?: MetaQuery;
    ids?: BaseKey[];
};

type GenerateUseManySubscriptionReturnValues = {
    variables: any;
    query: string;
    operation: string;
};

export const generateUseManySubscription = ({
    resource,
    meta,
    metaData,
    ids,
}: GenerateUseManySubscriptionParams): GenerateUseManySubscriptionReturnValues => {
    if (!ids) {
        console.error(
            "[useSubscription]: `ids` is required in `params` for graphql subscriptions",
        );
    }

    const camelResource = camelCase(resource);

    const operation =
        pickNotDeprecated(meta, metaData)?.operation ?? camelResource;

    const { query, variables } = gql.query({
        operation,
        variables: {
            where: {
                value: { id_in: ids },
                type: "JSON",
            },
        },
        fields: pickNotDeprecated(meta, metaData)?.fields,
    });

    return { query, variables, operation };
};
