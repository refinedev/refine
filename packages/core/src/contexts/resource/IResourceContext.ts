import { ReactNode } from "react";

export interface IResourceContext {
    resources: IResourceItem[];
}

export interface IResourceComponents {
    list?: React.FunctionComponent<{
        canCreate: boolean;
        canEdit: boolean;
        canDelete?: boolean;
        canShow: boolean;
    }>;
    create?: React.FunctionComponent<{ canEdit: boolean }>;
    edit?: React.FunctionComponent;
    show?: React.FunctionComponent<{
        canCreate: boolean;
        canEdit: boolean;
        canDelete?: boolean;
    }>;
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
