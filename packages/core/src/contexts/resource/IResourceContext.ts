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

export interface IResourceItem extends IResourceComponents {
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
