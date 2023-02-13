import { useContext } from "react";

import { ResourceContext } from "@contexts/resource";
import {
    Action,
    BaseKey,
    IResourceItem,
    ResourceRouterParams,
} from "../../../interfaces";
import { useRouterContext, useResourceWithRoute } from "@hooks";
import { useRouterType } from "../../../contexts/router-picker";
import { useParsed } from "../../router/use-parsed";
import { pickResource } from "../../../definitions/helpers/pick-resource";

export type UseResourcePropsType = {
    /**
     * Determines which resource to use for redirection
     * @default Resource name that it reads from route
     * @deprecated Use `identifier` property instead. (`identifier` does not check by route name in new router)
     */
    resourceNameOrRouteName?: string;
    /**
     * Matches the resource by identifier.
     * If not provided, the resource from the route will be returned.
     * If your resource does not explicitly define an identifier, the resource name will be used.
     */
    identifier?: string;
};

type UseResourceReturnType = {
    resources: IResourceItem[];
    resource?: IResourceItem;
    /**
     * @deprecated Use `resource.name` instead when you need to get the resource name.
     */
    resourceName?: string;
    id?: BaseKey;
    action?: Action;
};

/**
 * `useResource` is used to get `resources` that are defined as property of the `<Refine>` component.
 *
 * @see {@link https://refine.dev/docs/core/hooks/resource/useResource} for more details.
 */
export const useResource = ({
    resourceNameOrRouteName,
    identifier,
}: UseResourcePropsType = {}): UseResourceReturnType => {
    const { resources } = useContext(ResourceContext);

    const routerType = useRouterType();

    const params = useParsed();

    /**
     * Legacy Router - Start
     *
     * using `useParams` and `route` to match resource and get params.
     */
    const resourceWithRoute = useResourceWithRoute();

    const { useParams } = useRouterContext();

    const legacyParams = useParams<ResourceRouterParams>();

    if (routerType === "legacy") {
        const legacyResource = resourceWithRoute(
            resourceNameOrRouteName ?? identifier ?? legacyParams.resource,
        );
        const legacyId = legacyParams.id;
        const legacyAction = legacyParams.action;
        const legacyResourceName = legacyResource.name;

        return {
            resources,
            resource: legacyResource,
            resourceName: legacyResourceName,
            id: legacyId,
            action: legacyAction,
        };
    }
    /** Legacy Router - End */

    /** New Router */
    let resource: IResourceItem | undefined = undefined;
    // we try to pick the resource from props first
    if (identifier || resourceNameOrRouteName) {
        const pickedFromProps = pickResource(
            identifier ?? resourceNameOrRouteName,
            resources,
        );
        if (pickedFromProps) {
            resource = pickedFromProps;
        } else {
            resource = {
                name: (identifier ?? resourceNameOrRouteName) as string,
            };
        }
    } else {
        if (typeof params?.resource === "string") {
            const pickedFromParams = pickResource(params.resource, resources);
            if (pickedFromParams) {
                resource = pickedFromParams;
            } else {
                resource = { name: params.resource };
            }
        } else {
            if (params.resource) {
                resource = params.resource;
            }
        }
    }

    return {
        resources,
        resource,
        resourceName: resource?.name,
        id: params.id,
        action: params.action,
    };
};
