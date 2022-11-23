export type SwizzleFile = {
    label: string;
    files: { src: string; dest: string }[];
};

export type SwizzleConfig = {
    items: Array<SwizzleFile>;
    transform?: any;
    move?: any;
};

export type RefineConfig = {
    swizzle: SwizzleConfig;
};
