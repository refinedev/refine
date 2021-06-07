import { ReactNode } from "react";

export interface IResourceContext {
    resources: IResourceItem[];
}

export interface IResourceComponentsProps {
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    canShow?: boolean;
    name?: string;
}
export interface IResourceComponents {
    list?: React.FunctionComponent<IResourceComponentsProps>;
    create?: React.FunctionComponent<IResourceComponentsProps>;
    edit?: React.FunctionComponent<IResourceComponentsProps>;
    show?: React.FunctionComponent<IResourceComponentsProps>;
}

export interface IResourcePermission {
    allowList?: PermissionItem;
    allowCreate?: PermissionItem;
    allowEdit?: PermissionItem;
    allowShow?: PermissionItem;
    allowDelete?: PermissionItem;
    allowSideBar?: PermissionItem;
}

export interface IResourceItem
    extends IResourceComponents,
        IResourcePermission {
    name: string;
    label?: string;
    route?: string;
    icon?: ReactNode;
    canCreate?: boolean;
    canEdit?: boolean;
    canShow?: boolean;
    canDelete?: boolean;
}

export type IMenuItem = IResourceItem & {
    key: string;
    route: string;
};

export interface PermissionItem {
    list: string[];
    hasPermission: boolean;
}
