import { ReactNode } from "react";

export interface IResourceContext {
    resources: IResourceItem[];
}

export interface IResourceItem {
    name: string;
    label?: string;
    icon?: ReactNode;
}
