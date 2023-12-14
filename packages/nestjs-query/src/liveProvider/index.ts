import { LiveProvider } from "@refinedev/core";

import { Client } from "graphql-ws";

import { generateSubscription } from "../utils";

type SubscriptionAction = "created" | "updated" | "deleted";

export const liveProvider = (client: Client): LiveProvider => {
    const subscriptions: {
        [K in SubscriptionAction]: { [key: string]: boolean };
    } = {
        created: {},
        updated: {},
        deleted: {},
    };

    const alreadySubscribed = (
        action: SubscriptionAction,
        resource: string,
    ) => {
        return !!subscriptions[action][resource];
    };

    const resetSubscriptions = () => {
        subscriptions.created = {};
        subscriptions.updated = {};
        subscriptions.deleted = {};
    };

    const subscribeToResource = (
        client: Client,
        callback: Function,
        params: any,
        meta: any,
        action: SubscriptionAction,
        resource: string,
        unsubscribes: Function[],
    ) => {
        if (!alreadySubscribed(action, resource)) {
            const unsubscribe = generateSubscription(
                client,
                { callback, params, meta },
                action,
            );
            subscriptions[action][resource] = true;
            unsubscribes.push(unsubscribe);
        }
    };

    return {
        subscribe({ callback, params, meta }) {
            const { resource, subscriptionType } = params ?? {};

            if (!meta || !subscriptionType || !resource) {
                throw new Error(
                    "[useSubscription]: `meta`, `subscriptionType` and `resource` are required in `params` for graphql subscriptions",
                );
            }

            const unsubscribes: any[] = [];

            if (params?.subscriptionType === "useList") {
                ["created", "updated", "deleted"].forEach((action) =>
                    subscribeToResource(
                        client,
                        callback,
                        params,
                        meta,
                        action as SubscriptionAction,
                        resource,
                        unsubscribes,
                    ),
                );
            }

            if (params?.subscriptionType === "useOne") {
                subscribeToResource(
                    client,
                    callback,
                    params,
                    meta,
                    "updated",
                    resource,
                    unsubscribes,
                );
            }

            const unsubscribe = () => {
                resetSubscriptions();
                unsubscribes.forEach((unsubscribe) => unsubscribe());
            };

            return unsubscribe;
        },
        unsubscribe(unsubscribe) {
            unsubscribe();
        },
    };
};
