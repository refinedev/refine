import React, { ReactNode } from "react";
import { IResourceComponents, IResourcePermission } from "../../../interfaces";

export interface OptionsProps {
    label?: string;
    route?: string;
}

export interface ResourceProps
    extends IResourceComponents,
    IResourcePermission {
    name: string;
    canDelete?: boolean;
    icon?: ReactNode;
    options?: OptionsProps;
}

export const Resource: React.FC<ResourceProps> = () => null;
