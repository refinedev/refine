import { LiveProvider } from "@refinedev/core";
import { Client } from "graphql-ws";

import {
    genereteUseListSubscription,
    genereteUseManySubscription,
    genereteUseOneSubscription,
} from "../utilities";

const subscriptions = {
    useList: genereteUseListSubscription,
    useOne: genereteUseOneSubscription,
    useMany: genereteUseManySubscription,
};

export const liveProvider = (client: Client): LiveProvider => {
    return {
        subscribe: ({ callback, params }) => {
            const {
                resource,
                meta,
                pagination,
                sorters,
                filters,
                subscriptionType,
                id,
                ids,
            } = params ?? {};

            if (!meta) {
                throw new Error(
                    "[useSubscription]: `meta` is required in `params` for graphql subscriptions",
                );
            }

            if (!subscriptionType) {
                throw new Error(
                    "[useSubscription]: `subscriptionType` is required in `params` for graphql subscriptions",
                );
            }

            if (!resource) {
                throw new Error(
                    "[useSubscription]: `resource` is required in `params` for graphql subscriptions",
                );
            }

            const genereteSubscription = subscriptions[subscriptionType];

            const { query, variables, operation } = genereteSubscription({
                ids,
                id,
                resource,
                filters,
                meta,
                pagination,
                sorters,
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
