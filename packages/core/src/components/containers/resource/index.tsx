import React, { ReactNode } from "react";
import { IResourceComponents } from "../../../interfaces";

export interface OptionsProps {
    label?: string;
    route?: string;
}

export interface ResourceProps extends IResourceComponents {
    name: string;
    canDelete?: boolean;
    icon?: ReactNode;
    options?: OptionsProps;
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

export const Resource: React.FC<ResourceProps> = () => null;
