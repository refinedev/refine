export const REFINE_PACKAGE_FILEPATH_REGEXP =
    process.env.NODE_ENV === "development"
        ? /\/refine\/packages\/(?<name>.*?)\//
        : /node_modules\/refinedev\/(?<name>.*?)\//;
