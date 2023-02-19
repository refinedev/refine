import React from "react";
import { useResource } from "../../resource";
import { Action, IResourceItem } from "../../../interfaces";
import { getActionRoutesFromResource } from "../../../definitions/helpers/router";
import { useParsed } from "../use-parsed";
import { composeRoute } from "../../../definitions/helpers/router/compose-route";
import { useRouterType } from "./../../../contexts/router-picker";

type UseToPathParams = {
    resource?: IResourceItem;
    action: Action;
    meta?: Record<string, unknown>;
    legacy?: boolean;
};

type GetToPathFn = (params: UseToPathParams) => string | undefined;

/**
 * Returns a function to get the route for a given action and resource.
 * If resource is not provided, it will use the resource from the route.
 * If the resource is not found, it will return undefined.
 * If the action is not found, it will return undefined.
 * `meta` can be provided to compose the routes with parameters. (Can be used for nested routes.)
 */
export const useGetToPath = (): GetToPathFn => {
    const routerType = useRouterType();
    const { resource: resourceFromRoute, resources } = useResource();
    const parsed = useParsed();

    const fn = React.useCallback(
        ({ resource, action, meta }: UseToPathParams): string | undefined => {
            const selectedResource = resource || resourceFromRoute;

            if (!selectedResource) {
                return undefined;
            }

            const actionRoutes = getActionRoutesFromResource(
                selectedResource,
                resources,
                routerType === "legacy",
            );

            const actionRoute = actionRoutes.find(
                (item) => item.action === action,
            )?.route;

            if (!actionRoute) {
                return undefined;
            }

            const composed = composeRoute(actionRoute, parsed, meta);

            return composed;
        },
        [resources, resourceFromRoute, parsed],
    );

    return fn;
};
