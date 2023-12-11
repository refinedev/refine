import { LiveProvider } from "@refinedev/core";
import { Client } from "graphql-ws";
import { generateSubscription } from "../utils";

export const liveProvider = (client: Client): LiveProvider => {
    return {
        subscribe({ callback, params, meta }) {
            const { resource, subscriptionType } = params ?? {};

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

            const unsubscribes: any[] = [];

            if (params?.subscriptionType === "useList") {
                const createdUnsubscribe = generateSubscription(
                    client,
                    { callback, params, meta },
                    "created",
                );

                const updatedUnsubscribe = generateSubscription(
                    client,
                    { callback, params, meta },
                    "updated",
                );

                const deletedUnsubscribe = generateSubscription(
                    client,
                    { callback, params, meta },
                    "deleted",
                );

                unsubscribes.push(createdUnsubscribe);
                unsubscribes.push(updatedUnsubscribe);
                unsubscribes.push(deletedUnsubscribe);
            }

            if (params?.subscriptionType === "useOne") {
                const updatedUnsubscribe = generateSubscription(
                    client,
                    { callback, params, meta },
                    "updated",
                );

                unsubscribes.push(updatedUnsubscribe);
            }

            const unsubscribe = () => {
                unsubscribes.forEach((unsubscribe) => unsubscribe());
            };

            return unsubscribe;
        },
        unsubscribe(unsubscribe) {
            unsubscribe();
        },
    };
};
