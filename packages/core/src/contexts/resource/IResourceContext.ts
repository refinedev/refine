import { ReactNode } from "react";
import { UseQueryResult } from "react-query";

const auditLogPermissions = [
    "list",
    "create",
    "update",
    "delete",
    "getOne",
    "getMany",
    "createMany",
    "updateMany",
    "deleteMany",
    "*",
] as const;
type AuditLogPermissions = typeof auditLogPermissions;

export interface IResourceContext {
    resources: IResourceItem[];
}
export interface OptionsProps {
    label?: string;
    route?: string;
    auditLogPermissions?: AuditLogPermissions[number][] | string[];
    [key: string]: any;
}

export interface ResourceProps extends IResourceComponents {
    name: string;
    canDelete?: boolean;
    icon?: ReactNode;
    options?: OptionsProps;
}
export interface IResourceComponentsProps<TCrudData = any> {
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    canShow?: boolean;
    name?: string;
    initialData?: TCrudData;
    options?: OptionsProps;
    logQueryResult?: UseQueryResult<any>; //TODO: define type
}
export interface IResourceComponents {
    list?: React.FunctionComponent<IResourceComponentsProps>;
    create?: React.FunctionComponent<IResourceComponentsProps>;
    edit?: React.FunctionComponent<IResourceComponentsProps>;
    show?: React.FunctionComponent<IResourceComponentsProps>;
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
    options?: OptionsProps;
}
