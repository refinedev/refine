import { MetaQuery, BaseKey, pickNotDeprecated } from "@pankod/refine-core";
import * as gql from "gql-query-builder";
import pluralize from "pluralize";
import camelCase from "camelcase";

type GenerateUseOneSubscriptionParams = {
    resource: string;
    meta?: MetaQuery;
    metaData?: MetaQuery;
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
    metaData,
    id,
}: GenerateUseOneSubscriptionParams): GenerateUseOneSubscriptionReturnValues => {
    if (!id) {
        console.error(
            "[useSubscription]: `id` is required in `params` for graphql subscriptions",
        );
    }

    const singularResource = pluralize.singular(resource);
    const camelResource = camelCase(singularResource);

    const operation =
        pickNotDeprecated(meta, metaData)?.operation ?? camelResource;

    const { query, variables } = gql.query({
        operation,
        variables: {
            id: { value: id, type: "ID", required: true },
        },
        fields: pickNotDeprecated(meta, metaData)?.fields,
    });

    return { query, variables, operation };
};
