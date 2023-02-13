import React from "react";
import {
    Action,
    IResourceComponentsProps,
    ResourceProps,
} from "@pankod/refine-core";

import { Route, Navigate } from "react-router-dom";

type ResourceRouteComponent = React.ComponentType<
    IResourceComponentsProps<any, any>
>;

export type ResourceRoutesOptions = {
    /**
     * @default: true
     *
     * If true, an index route will be created and it will redirect to the first resource with list route.
     * If false, no index route will be created.
     * If string, an index route will be created and it will redirect to the given route.
     */
    indexRedirect?: string | boolean;
};

export const createResourcePathWithAction = (
    resource: ResourceProps,
    action: Action,
) => {
    const { name, list, create, show, edit } = resource;

    if (typeof list === "string" && action === "list") {
        return list;
    }
    if (typeof list === "object" && action === "list") {
        return list.path;
    }
    if (typeof create === "string" && action === "create") {
        return create;
    }
    if (typeof create === "object" && action === "create") {
        return create.path;
    }
    if (typeof show === "string" && action === "show") {
        return show;
    }
    if (typeof show === "object" && action === "show") {
        return show.path;
    }
    if (typeof edit === "string" && action === "edit") {
        return edit;
    }
    if (typeof edit === "object" && action === "edit") {
        return edit.path;
    }

    const nameSegment = `/${name}`;
    const actionSegment = `${
        ["edit", "create", "clone"].includes(action) ? action : ""
    }`;
    const idSegment = `${
        ["edit", "show", "clone"].includes(action) ? ":id" : ""
    }`;

    return [nameSegment, actionSegment, idSegment].filter(Boolean).join("/");
};

export const createResourceRoutes = (
    resources: ResourceProps[],
    options?: ResourceRoutesOptions,
) => {
    const { indexRedirect } = options ?? {
        indexRedirect: true,
    };

    const routes = resources.flatMap((resource) => {
        const actions: {
            action: Action;
            element: ResourceRouteComponent;
            path: string;
        }[] = [];

        (["list", "show", "edit", "create"] as const).forEach((action) => {
            const item = resource[action];
            if (typeof item !== "undefined" && typeof item !== "string") {
                const element =
                    typeof item === "function" ? item : item.component;
                const path = createResourcePathWithAction(resource, action);

                actions.push({ action, element: element, path });
                if (action === "create") {
                    actions.push({
                        action: "clone",
                        element: element,
                        path,
                    });
                }
            }
        });

        return actions.map(({ action, element: Component, path }) => {
            const element = <Component />;

            return (
                <Route
                    key={`${action}-${path}`}
                    path={path}
                    element={element}
                />
            );
        });
    });

    if (indexRedirect) {
        const firstListResource = resources.find((r) => !!r.list);
        if (firstListResource) {
            const path =
                typeof indexRedirect === "string"
                    ? indexRedirect
                    : createResourcePathWithAction(firstListResource, "list");

            const element = <Navigate to={path} />;

            routes.unshift(
                <Route key="index-redirect-path" index element={element} />,
            );
        }
    }

    return routes;
};
