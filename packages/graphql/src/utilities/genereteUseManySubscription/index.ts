import { MetaDataQuery, BaseKey } from "@pankod/refine-core";
import * as gql from "gql-query-builder";
import camelCase from "camelcase";

type GenereteUseManySubscriptionParams = {
    resource: string;
    metaData: MetaDataQuery;
    ids?: BaseKey[];
};

type GenereteUseManySubscriptionReturnValues = {
    variables: any;
    query: string;
    operation: string;
};

export const genereteUseManySubscription = ({
    resource,
    metaData,
    ids,
}: GenereteUseManySubscriptionParams): GenereteUseManySubscriptionReturnValues => {
    if (!ids) {
        console.error(
            "[useSubscription]: `ids` is required in `params` for graphql subscriptions",
        );
    }

    const camelResource = camelCase(resource);

    const operation = metaData.operation ?? camelResource;

    const { query, variables } = gql.query({
        operation,
        variables: {
            where: {
                value: { id_in: ids },
                type: "JSON",
            },
        },
        fields: metaData.fields,
    });

    return { query, variables, operation };
};
