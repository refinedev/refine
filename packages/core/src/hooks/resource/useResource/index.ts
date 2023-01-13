import { useContext } from "react";

import { ResourceContext } from "@contexts/resource";
import {
    BaseKey,
    IResourceItem,
    ResourceRouterParams,
    RouteAction,
} from "../../../interfaces";
import { useRouterContext, useResourceWithRoute } from "@hooks";

export type UseResourcePropsType = {
    /**
     * Determines which resource to use for redirection
     * @deprecated resourceName deprecated. Use resourceNameOrRouteName instead # https://github.com/refinedev/refine/issues/1618
     */
    resourceName?: string;
    /**
     * Determines which resource to use for redirection
     * @default Resource name that it reads from route
     */
    resourceNameOrRouteName?: string;
    /**
     * Adds id to the end of the URL
     * @deprecated resourceName deprecated. Use resourceNameOrRouteName instead # https://github.com/refinedev/refine/issues/1618
     */
    recordItemId?: BaseKey;
};

type UseResourceReturnType = {
    resources: IResourceItem[];
    resource: IResourceItem;
    resourceName: string;
    id?: BaseKey;
    action: RouteAction;
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

    return { resources, resource, resourceName, id, action: params.action };
};
