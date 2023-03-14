import { ComponentType } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { ILogData } from "../../interfaces";
import {
    IResourceItem,
    ResourceMeta,
    ResourceProps,
} from "../../interfaces/bindings/resource";
const auditLogPermissions = ["create", "update", "delete"] as const;

export type ResourceRouteComponent = ComponentType<
    IResourceComponentsProps<any, any>
>;

export type ResourceRoutePath = string;

export type ResourceRouteDefinition = {
    path: ResourceRoutePath;
    component: ResourceRouteComponent;
};

export type ResourceRouteComposition =
    | ResourceRouteDefinition
    | ResourceRoutePath
    | ResourceRouteComponent;

export interface IResourceComponents {
    list?: ResourceRouteComposition;
    create?: ResourceRouteComposition;
    clone?: ResourceRouteComposition;
    edit?: ResourceRouteComposition;
    show?: ResourceRouteComposition;
}

type MetaProps<TExtends = { [key: string]: any }> = ResourceMeta & TExtends;

export interface RouteableProperties {
    canCreate?: boolean;
    canEdit?: boolean;
    canShow?: boolean;
    canDelete?: boolean;
    canList?: boolean;
}

export interface IResourceComponentsProps<
    TCrudData = any,
    TMetaPropsExtends = { [key: string]: any },
    TLogQueryResult = ILogData,
> {
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    canShow?: boolean;
    name?: string;
    initialData?: TCrudData;
    /**
     * @deprecated `options` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `options` for backward compatibility.
     */
    options?: MetaProps<TMetaPropsExtends>;
    meta?: MetaProps<TMetaPropsExtends>;
    logQueryResult?: UseQueryResult<TLogQueryResult>;
}

export { IResourceItem, ResourceProps };

export interface IResourceContext {
    resources: IResourceItem[];
}
