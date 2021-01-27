import React from "react";
export interface ResourceProps {
    name: string;
    list?: boolean;
    create?: boolean;
    edit?: boolean;
    show?: boolean;
}

export const Resource: React.FC<ResourceProps> = () => {
    return null;
};
