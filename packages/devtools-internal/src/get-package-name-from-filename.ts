import { REFINE_PACKAGE_FILEPATH_REGEXP } from "./constants";

export const getPackageNameFromFilename = (filename: string) => {
    const match = filename.match(REFINE_PACKAGE_FILEPATH_REGEXP);

    const name = match?.groups?.name;

    if (!name) return;

    return `@refinedev/${name}`;
};
