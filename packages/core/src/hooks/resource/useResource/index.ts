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

export type UseResourceLegacyProps = {
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

/**
 * Matches the resource by identifier.
 * If not provided, the resource from the route will be returned.
 * If your resource does not explicitly define an identifier, the resource name will be used.
 */
export type UseResourceParam = string | undefined;

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

type UseResourceReturnTypeWithResource = UseResourceReturnType & {
    resource: IResourceItem;
};

/**
 * @deprecated Use `useResource` with `identifier` property instead. (`identifier` does not check by route name in new router)
 */
export function useResource(
    props: UseResourceLegacyProps,
): UseResourceReturnType;
export function useResource(): UseResourceReturnType;
export function useResource<TIdentifier = UseResourceParam>(
    identifier: TIdentifier,
): TIdentifier extends NonNullable<UseResourceParam>
    ? UseResourceReturnTypeWithResource
    : UseResourceReturnType;
/**
 * `useResource` is used to get `resources` that are defined as property of the `<Refine>` component.
 *
 * @see {@link https://refine.dev/docs/core/hooks/resource/useResource} for more details.
 */
export function useResource(
    args?: UseResourceLegacyProps | UseResourceParam,
): UseResourceReturnType {
    const { resources } = useContext(ResourceContext);

    const routerType = useRouterType();

    const params = useParsed();

    const oldProps = {
        resourceName:
            args && typeof args !== "string" ? args.resourceName : args,
        resourceNameOrRouteName:
            args && typeof args !== "string"
                ? args.resourceNameOrRouteName
                : args,
        recordItemId:
            args && typeof args !== "string" ? args.recordItemId : undefined,
    };

    /**
     * Legacy Router - Start
     *
     * using `useParams` and `route` to match resource and get params.
     */
    const resourceWithRoute = useResourceWithRoute();

    const { useParams } = useRouterContext();

    const legacyParams = useParams<Partial<ResourceRouterParams>>();

    if (routerType === "legacy") {
        const resourceKeyToCheck = oldProps.resourceNameOrRouteName
            ? oldProps.resourceNameOrRouteName
            : legacyParams.resource;

        const legacyResource = resourceKeyToCheck
            ? resourceWithRoute(resourceKeyToCheck)
            : undefined;
        const legacyId = oldProps?.recordItemId ?? legacyParams.id;
        const legacyAction = legacyParams.action;
        const legacyResourceName =
            oldProps?.resourceName ?? legacyResource?.name;

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
    const identifier =
        typeof args === "string" ? args : oldProps?.resourceNameOrRouteName;
    if (identifier) {
        const pickedFromProps = pickResource(identifier, resources);
        if (pickedFromProps) {
            resource = pickedFromProps;
        } else {
            resource = {
                name: identifier as string,
            };
        }
    } else if (params?.resource) {
        resource = params.resource;
    }

    return {
        resources,
        resource,
        resourceName: resource?.name,
        id: params.id,
        action: params.action,
    };
}
