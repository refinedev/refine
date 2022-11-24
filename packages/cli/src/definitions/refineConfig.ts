export type SwizzleFile = {
    group: string;
    label: string;
    files: { src: string; dest: string }[];
};

export type SwizzleConfig = {
    items: Array<SwizzleFile>;
    transform?: (content: string, src: string, dest: string) => string;
};

export type RefineConfig = {
    swizzle: SwizzleConfig;
};
