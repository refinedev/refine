import { MetaDataQuery, BaseKey } from "@pankod/refine-core";
import * as gql from "gql-query-builder";

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

    const operation = metaData.operation ?? resource;

    const { query, variables } = gql.subscription({
        operation,
        fields: metaData.fields,
        variables: metaData.variables ?? {
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
