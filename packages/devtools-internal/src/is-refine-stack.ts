import { REFINE_PACKAGE_FILEPATH_REGEXP } from "./constants";

export const isRefineStack = (filename: string) => {
    const match = filename.match(REFINE_PACKAGE_FILEPATH_REGEXP);

    return !!match;
};
