import React, { ReactNode } from "react";

export interface OptionsProps {
    label: string;
}
export interface ResourceProps {
    name: string;
    list?: any;
    create?: any;
    edit?: any;
    show?: any;
    canDelete?: boolean;
    icon?: ReactNode;
    options?: OptionsProps;
}

export const Resource: React.FC<ResourceProps> = () => null;
