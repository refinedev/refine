import { useCallback, useContext } from "react";

import { ResourceContext } from "@contexts/resource";
import { pickResource } from "@definitions/helpers/pick-resource";

import type { IResourceItem } from "../../../contexts/resource/types";

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
