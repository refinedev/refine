import { LiveProvider, LogicalFilter } from "@refinedev/core";
import camelcase from "camelcase";
import VariableOptions from "gql-query-builder/build/VariableOptions";
import * as gql from "gql-query-builder";
import { Client } from "graphql-ws";
import { singular } from "pluralize";
import { generateFilters } from "../utils";

const generateListSubscription = ({ resource, filters, meta }: any) => {
    const operation = `created${camelcase(singular(resource), {
        pascalCase: true,
    })}`;

    const queryVariables: VariableOptions = {};

    if (filters) {
        queryVariables["input"] = {
            type: camelcase(
                `create_${singular(resource)}_subscription_filter_input`,
                {
                    pascalCase: true,
                },
            ),
            required: true,
            value: {
                filter: generateFilters(filters as LogicalFilter[]),
            },
        };
    }

    const { query, variables } = gql.subscription({
        operation,
        fields: meta.fields,
        variables: queryVariables,
    });

    return { query, variables, operation };
};

export const liveProvider = (client: Client): LiveProvider => {
    return {
        subscribe({ callback, params }) {
            const { resource, meta, filters, subscriptionType, id, ids } =
                params ?? {};

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

            const { query, variables, operation } = generateListSubscription({
                ids,
                id,
                resource,
                filters,
                meta,
            });

            const onNext = (payload: any) => {
                callback(payload.data[operation]);
            };

            const unsubscribe = client.subscribe(
                { query, variables },
                {
                    next: onNext,
                    error: console.error,
                    complete: () => null,
                },
            );

            return unsubscribe;
        },
        unsubscribe(unsubscribe) {
            unsubscribe();
        },
    };
};
