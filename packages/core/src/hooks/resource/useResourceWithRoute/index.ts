import { useContext, useCallback } from "react";
import { ResourceContext } from "@contexts/resource";
import { IResourceItem } from "../../../interfaces";
import { pickResource } from "@definitions/helpers/pick-resource";

export type UseResourceWithRouteReturnType = (route: string) => IResourceItem;

/**
 * @deprecated Use `useResource` hook instead.
 * @internal This hook is for internal use only. And is kept for backward compatibility.
 */
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
