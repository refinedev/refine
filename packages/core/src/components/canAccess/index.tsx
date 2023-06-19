import React from "react";

import { useCan, useResource } from "@hooks";
import { BaseKey, IResourceItem, ITreeMenu } from "../../interfaces";

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
    action: actionFromProp,
    params,
    fallback,
    children,
    ...rest
}) => {
    const {
        resource,
        id: idFromRoute,
        action: actionFromRoute,
    } = useResource(resourceFromProp);
    const { identifier } = useResource();

    const getDefaultId = () => {
        const idFromPropsOrRoute = params?.id ?? idFromRoute;

        if (resourceFromProp && resourceFromProp !== identifier) {
            return params?.id;
        }

        return idFromPropsOrRoute;
    };
    const defaultId = getDefaultId();

    const { data } = useCan({
        resource: resourceFromProp ?? resource?.name,
        action: actionFromProp ?? actionFromRoute ?? "",
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
