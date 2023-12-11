import { LiveProvider } from "@refinedev/core";
import { Client } from "graphql-ws";
import { generateSubscription } from "../utils";

const subscriptions: any = {
    create: {},
    update: {},
    delete: {},
};

const alreadySubscribed = (
    action: "create" | "update" | "delete",
    resource: string,
) => {
    return !!subscriptions[action][resource];
};

const resetSubscriptions = () => {
    subscriptions.create = {};
    subscriptions.update = {};
    subscriptions.delete = {};
};

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
                if (!alreadySubscribed("create", resource)) {
                    const createdUnsubscribe = generateSubscription(
                        client,
                        { callback, params, meta },
                        "created",
                    );
                    subscriptions["create"][resource] = true;

                    unsubscribes.push(createdUnsubscribe);
                }

                if (!alreadySubscribed("update", resource)) {
                    const updatedUnsubscribe = generateSubscription(
                        client,
                        { callback, params, meta },
                        "updated",
                    );

                    subscriptions["update"][resource] = true;

                    unsubscribes.push(updatedUnsubscribe);
                }

                if (!alreadySubscribed("delete", resource)) {
                    const deletedUnsubscribe = generateSubscription(
                        client,
                        { callback, params, meta },
                        "deleted",
                    );
                    subscriptions["delete"][resource] = true;

                    unsubscribes.push(deletedUnsubscribe);
                }
            }

            if (params?.subscriptionType === "useOne") {
                if (!alreadySubscribed("update", resource)) {
                    const updatedUnsubscribe = generateSubscription(
                        client,
                        { callback, params, meta },
                        "updated",
                    );

                    subscriptions["update"][resource] = true;

                    unsubscribes.push(updatedUnsubscribe);
                }
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
