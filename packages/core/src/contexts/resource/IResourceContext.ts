import { ReactNode, ComponentType } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { ILogData } from "../../interfaces";
import { IResourceItem } from "../../interfaces/bindings/resource";
const auditLogPermissions = ["create", "update", "delete"] as const;

type AuditLogPermissions = typeof auditLogPermissions;

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

type OptionsProps<TExtends = { [key: string]: any }> = TExtends & {
    label?: string;
    route?: string;
    hide?: boolean;
    dataProviderName?: string;
    auditLog?: {
        permissions?: AuditLogPermissions[number][] | string[];
    };
    [key: string]: any;
};

export interface ResourceProps extends IResourceComponents {
    name: string;
    canDelete?: boolean;
    icon?: ReactNode;
    options?: OptionsProps;
    parentName?: string;
    key?: string;
}

export interface RouteableProperties {
    canCreate?: boolean;
    canEdit?: boolean;
    canShow?: boolean;
    canDelete?: boolean;
    canList?: boolean;
}

export interface IResourceComponentsProps<
    TCrudData = any,
    TOptionsPropsExtends = { [key: string]: any },
    TLogQueryResult = ILogData,
> {
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    canShow?: boolean;
    name?: string;
    initialData?: TCrudData;
    options?: OptionsProps<TOptionsPropsExtends>;
    logQueryResult?: UseQueryResult<TLogQueryResult>;
}

export { IResourceItem };

export interface IResourceContext {
    resources: IResourceItem[];
}
