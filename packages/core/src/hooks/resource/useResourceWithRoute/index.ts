import { useContext, useCallback } from "react";
import { ResourceContext } from "@contexts/resource";
import { IResourceItem } from "../../../interfaces";

export type UseResourceWithRouteReturnType = (route: string) => IResourceItem;

export const useResourceWithRoute = (): UseResourceWithRouteReturnType => {
    const { resources } = useContext(ResourceContext);

    const resourceWithRoute = useCallback(
        (route: string) => {
            const resource = resources.find((p) => p.route === route);

            if (!resource) {
                const resourceWithName = resources.find(
                    (p) => p.name === route,
                );
                return (
                    resourceWithName ??
                    ({ name: route, route: route } as IResourceItem)
                );
            }
            return resource;
        },
        [resources],
    );

    return resourceWithRoute;
};
