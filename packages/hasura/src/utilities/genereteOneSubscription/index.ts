import { MetaDataQuery, BaseKey } from "@pankod/refine-core";
import * as gql from "gql-query-builder";

type GenereteOneSubscriptionParams = {
    resource: string;
    metaData?: MetaDataQuery;
    id: BaseKey;
};

type GenereteOneSubscriptionReturnValues = {
    variables: any;
    query: string;
    operation: string;
};

export const genereteOneSubscription = ({
    resource,
    metaData,
    id,
}: GenereteOneSubscriptionParams): GenereteOneSubscriptionReturnValues => {
    const operation = `${metaData?.operation ?? resource}_by_pk`;

    const { query, variables } = gql.subscription({
        operation,
        variables: {
            id: { value: id, type: "uuid", required: true },
            ...metaData?.variables,
        },
        fields: metaData?.fields,
    });

    return { query, variables, operation };
};
