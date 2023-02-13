import { useContext, useCallback } from "react";
import { ResourceContext } from "@contexts/resource";
import { IResourceItem } from "../../../interfaces";
import { pickResource } from "@definitions/helpers/pick-resource";

export type UseResourceWithRouteReturnType = (route: string) => IResourceItem;

export const useResourceWithRoute = (): UseResourceWithRouteReturnType => {
    const { resources } = useContext(ResourceContext);

    const resourceWithRoute = useCallback(
        (route: string) => {
            const picked = pickResource(route, resources, true);
            if (picked) {
                return picked;
            }
            return { name: route, route: route } as IResourceItem;
        },
        [resources],
    );

    return resourceWithRoute;
};
