export type BaseRecord = {
    id?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
};
export interface Option {
    label: string;
    value: string;
}

// field
export * from "./field";
