import { ReactNode } from "react";

export interface IResourceContext {
    resources: IResourceItem[];
}
export interface OptionsProps {
    label?: string;
    route?: string;
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
    crudData?: TCrudData;
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
