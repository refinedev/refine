export const REFINE_PACKAGE_FILEPATH_REGEXP =
    __DEV_CONDITION__ === "development"
        ? /\/refine\/packages\/(?<name>.*?)\//
        : /node_modules\/refinedev\/(?<name>.*?)\//;
