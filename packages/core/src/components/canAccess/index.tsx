import React from "react";

import {
    useCan,
    useParsed,
    useResource,
    useResourceWithRoute,
    useRouterContext,
    useRouterType,
} from "@hooks";
import {
    BaseKey,
    IResourceItem,
    ITreeMenu,
    ResourceRouterParams,
} from "../../interfaces";
import { pickResource } from "@definitions/helpers/pick-resource";

type CanAccessBaseProps = {
    /**
     * Resource name for API data interactions
     */
    resource?: string;
    /**
     * Intended action on resource
     */
    action: string;
    /**
     * Parameters associated with the resource
     * @type { resource?: [IResourceItem](https://refine.dev/docs/api-reference/core/interfaceReferences/#canparams), id?: [BaseKey](https://refine.dev/docs/api-reference/core/interfaceReferences/#basekey), [key: string]: any }
     */
    params?: {
        resource?: IResourceItem & { children?: ITreeMenu[] };
        id?: BaseKey;
        [key: string]: any;
    };
    /**
     * Content to show if access control returns `false`
     */
    fallback?: React.ReactNode;
    children: React.ReactNode;
};

type CanAccessWithoutParamsProps = {
    [key in Exclude<
        keyof CanAccessBaseProps,
        "fallback" | "children"
    >]?: undefined;
} & {
    [key in "fallback" | "children"]?: CanAccessBaseProps[key];
};

export type CanAccessProps = CanAccessBaseProps | CanAccessWithoutParamsProps;

export const CanAccess: React.FC<CanAccessProps> = ({
    resource: resourceFromProp,
    action,
    params,
    fallback,
    children,
    ...rest
}) => {
    const routerType = useRouterType();
    const { resources } = useResource();
    const { useParams } = useRouterContext();
    const {
        resource: resourceFromRouter,
        id: idFromRouter,
        action: actionFromRouter,
    } = useParsed();

    const {
        resource: legacyResourceFromRoute,
        id: legacyIdFromParams,
        action: legacyActionFromParams,
    } = useParams<ResourceRouterParams>();

    const newResourceNameFromRouter = resourceFromRouter?.name;

    /** We only accept `id` from URL params if `resource` is not explicitly passed. */
    /** This is done to avoid sending wrong requests for custom `resource` and an async `id` */
    const defaultId =
        !resourceFromProp ||
        resourceFromProp ===
            (routerType === "legacy"
                ? legacyResourceFromRoute
                : newResourceNameFromRouter)
            ? params?.id ??
              (routerType === "legacy" ? legacyIdFromParams : idFromRouter)
            : params?.id;

    /** `resourceName` fallback value depends on the router type */
    const resourceName =
        resourceFromProp ??
        (routerType === "legacy"
            ? legacyResourceFromRoute
            : newResourceNameFromRouter);

    let resource: IResourceItem | undefined;

    const resourceWithRoute = useResourceWithRoute();

    if (routerType === "legacy") {
        if (resourceName) {
            resource = resourceWithRoute(resourceName);
        }
    } else {
        /** If `resource` is provided by the user, then try to pick the resource of create a dummy one */
        if (resourceFromProp) {
            const picked = pickResource(resourceFromProp, resources);
            if (picked) {
                resource = picked;
            } else {
                resource = {
                    name: resourceFromProp,
                    route: resourceFromProp,
                };
            }
        } else {
            /** If `resource` is not provided, check the resource from the router params */
            if (typeof resourceFromRouter === "string") {
                const picked = pickResource(resourceFromRouter, resources);
                if (picked) {
                    resource = picked;
                } else {
                    resource = {
                        name: resourceFromRouter,
                        route: resourceFromRouter,
                    };
                }
            } else {
                /** If `resource` is passed as an IResourceItem, use it or `resource` is undefined and cannot be inferred. */
                resource = resourceFromRouter;
            }
        }
    }

    const { data } = useCan({
        resource: resourceFromProp ?? resource?.name,
        action:
            action ??
            (routerType === "legacy"
                ? legacyActionFromParams
                : actionFromRouter) ??
            "",
        params: params ?? {
            id: defaultId,
            resource: resource,
        },
    });

    if (data?.can) {
        if (React.isValidElement(children)) {
            const Children = React.cloneElement(children, rest);
            return Children;
        }

        return <>{children}</>;
    }

    if (data?.can === false) {
        return <>{fallback ?? null}</>;
    }

    return null;
};
