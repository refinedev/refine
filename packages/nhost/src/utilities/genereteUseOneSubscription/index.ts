import { MetaDataQuery, BaseKey } from "@pankod/refine-core";
import * as gql from "gql-query-builder";

type GenereteUseOneSubscriptionParams = {
    resource: string;
    metaData: MetaDataQuery;
    id?: BaseKey;
};

type GenereteUseOneSubscriptionReturnValues = {
    variables: any;
    query: string;
    operation: string;
};

export const genereteUseOneSubscription = ({
    resource,
    metaData,
    id,
}: GenereteUseOneSubscriptionParams): GenereteUseOneSubscriptionReturnValues => {
    if (!id) {
        console.error(
            "[useSubscription]: `id` is required in `params` for graphql subscriptions",
        );
    }

    const operation = `${metaData.operation ?? resource}_by_pk`;

    const { query, variables } = gql.subscription({
        operation,
        variables: {
            id: { value: id, type: "uuid", required: true },
            ...metaData.variables,
        },
        fields: metaData.fields,
    });

    return { query, variables, operation };
};
