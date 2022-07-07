import { LiveProvider } from "@pankod/refine-core";
import { Client } from "graphql-ws";

import {
    genereteListSubscription,
    genereteManySubscription,
    genereteOneSubscription,
} from "src/utilities";

const subscriptions = {
    list: genereteListSubscription,
    one: genereteOneSubscription,
    many: genereteManySubscription,
};

export const liveProvider = (client: Client): LiveProvider => {
    return {
        subscribe: ({
            callback,
            params,
            resource,
            metaData,
            pagination,
            hasPagination,
            sort,
            filters,
            subscriptionType,
        }) => {
            const genereteSubscription = subscriptions[subscriptionType];

            const { query, variables, operation } = genereteSubscription({
                id: params?.ids?.[0] || "",
                ids: params?.ids || [],
                resource,
                filters,
                hasPagination,
                metaData,
                pagination,
                sort,
            });

            const onNext = (payload: any) => {
                callback(payload.data[operation]);
            };

            const unsubscribe = client.subscribe(
                {
                    query,
                    variables,
                },
                {
                    next: onNext,
                    error: () => null,
                    complete: () => null,
                },
            );

            return unsubscribe;
        },
        unsubscribe: (unsubscribe) => {
            unsubscribe();
        },
    };
};
