import { useContext } from "react";

import { ResourceContext, IResourceContext } from "@contexts/resource";
import { BaseKey, IResourceItem, ResourceRouterParams } from "src/interfaces";
import { useRouterContext, useResourceWithRoute } from "@hooks";

export type UseResourcePropsType = {
    /**
     * @deprecated resourceName deprecated. Use resourceNameOrRouteName instead # https://github.com/pankod/refine/issues/1618
     */
    resourceName?: string;
    resourceNameOrRouteName?: string;
    recordItemId?: BaseKey;
};

type UseResourceReturnType = {
    resources: IResourceContext["resources"];
    resource: IResourceItem;
    resourceName: string;
    id?: BaseKey;
};

/**
 * `useResource` is used to get `resources` that are defined as property of the `<Refine>` component.
 *
 * @see {@link https://refine.dev/docs/core/hooks/resource/useResource} for more details.
 */
export const useResource = ({
    resourceName: propResourceName,
    resourceNameOrRouteName,
    recordItemId,
}: UseResourcePropsType = {}): UseResourceReturnType => {
    const { resources } = useContext(ResourceContext);

    const resourceWithRoute = useResourceWithRoute();

    const { useParams } = useRouterContext();

    const params = useParams<ResourceRouterParams>();

    const resource = resourceWithRoute(
        resourceNameOrRouteName ?? params.resource,
    );

    const resourceName = propResourceName ?? resource.name;

    const id = recordItemId ?? params.id;

    return { resources, resource, resourceName, id };
};
