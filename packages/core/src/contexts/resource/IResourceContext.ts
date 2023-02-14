import { ReactNode, ComponentType } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { ILogData } from "src/interfaces";

const auditLogPermissions = ["create", "update", "delete"] as const;
type AuditLogPermissions = typeof auditLogPermissions;

export interface IResourceContext {
    resources: IResourceItem[];
}

type MetaProps<TExtends = { [key: string]: any }> = TExtends & {
    label?: string;
    route?: string;
    dataProviderName?: string;
    auditLog?: {
        permissions?: AuditLogPermissions[number][] | string[];
    };
    [key: string]: any;
    hide?: boolean;
};

export interface ResourceProps extends IResourceComponents {
    name: string;
    canDelete?: boolean;
    icon?: ReactNode;
    /**
     * @deprecated `options` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `options` for backward compatibility.
     */
    options?: MetaProps;
    meta?: MetaProps;
    parentName?: string;
    key?: string;
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
export interface IResourceComponents {
    list?: ComponentType<IResourceComponentsProps<any, any>>;
    create?: ComponentType<IResourceComponentsProps<any, any>>;
    edit?: ComponentType<IResourceComponentsProps<any, any>>;
    show?: ComponentType<IResourceComponentsProps<any, any>>;
}

export interface IResourceItem extends IResourceComponents {
    name: string;
    label?: string;
    route?: string;
    icon?: ReactNode;
    canCreate?: boolean;
    canEdit?: boolean;
    canShow?: boolean;
    canDelete?: boolean;
    /**
     * @deprecated `options` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `options` for backward compatibility.
     */
    options?: MetaProps;
    meta?: MetaProps;
    parentName?: string;
    key?: string;
}
