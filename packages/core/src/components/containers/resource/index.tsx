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
}

export const Resource: React.FC<ResourceProps> = () => null;
