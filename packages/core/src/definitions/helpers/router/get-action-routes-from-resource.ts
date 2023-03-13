import { Action, IResourceItem } from "src/interfaces";
import { getDefaultActionPath } from "./get-default-action-path";
import { getParentPrefixForResource } from "./get-parent-prefix-for-resource";

export type ResourceActionRoute = {
    action: Action;
    resource: IResourceItem;
    route: string;
};

/**
 * This function returns all the routes for available actions for a resource.
 * - If the action is a function, it means we're fallbacking to default path for the action
 * - If the action is a string, it means we don't have the component, but we have the route
 * - If the action is an object, it means we have the component and the route
 * - It will return an array of objects with the action, the resource and the route
 */
export const getActionRoutesFromResource = (
    resource: IResourceItem,
    resources: IResourceItem[],
    /**
     * Uses legacy route if true (`options.route`)
     */
    legacy?: boolean,
) => {
    const actions: ResourceActionRoute[] = [];

    const actionList: Action[] = ["list", "show", "edit", "create", "clone"];

    const parentPrefix = getParentPrefixForResource(
        resource,
        resources,
        legacy,
    );

    actionList.forEach((action) => {
        const item =
            legacy && action === "clone" ? resource.create : resource[action];

        let route: string | undefined = undefined;

        if (typeof item === "function" || legacy) {
            // means we're fallbacking to default path for the action
            route = getDefaultActionPath(
                legacy
                    ? resource.meta?.route ??
                          resource.options?.route ??
                          resource.name
                    : resource.name,
                action,
                legacy ? parentPrefix : undefined,
            );
        } else if (typeof item === "string") {
            // means we don't have the component, but we have the route
            route = item;
        } else if (typeof item === "object") {
            // means we have the component and the route
            route = item.path;
        }

        if (route) {
            actions.push({
                action,
                resource,
                route: `/${route.replace(/^\//, "")}`,
            });
        }
    });

    return actions;
};
