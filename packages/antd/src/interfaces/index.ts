import { IResourceItem } from "@pankod/refine-core";

export type BaseRecord = {
    id?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
};
export interface Option {
    label: string;
    value: string;
}

export type IMenuItem = IResourceItem & {
    key: string;
    route: string;
};

export * from "./field";
export * from "./upload";
