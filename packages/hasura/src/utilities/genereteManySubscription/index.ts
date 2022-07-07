import { MetaDataQuery, BaseKey } from "@pankod/refine-core";
import * as gql from "gql-query-builder";

type GenereteManySubscriptionParams = {
    resource: string;
    metaData?: MetaDataQuery;
    ids: BaseKey[];
};

type GenereteManySubscriptionReturnValues = {
    variables: any;
    query: string;
    operation: string;
};

export const genereteManySubscription = ({
    resource,
    metaData,
    ids,
}: GenereteManySubscriptionParams): GenereteManySubscriptionReturnValues => {
    const operation = metaData?.operation ?? resource;

    const { query, variables } = gql.subscription({
        operation,
        fields: metaData?.fields,
        variables: metaData?.variables ?? {
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
