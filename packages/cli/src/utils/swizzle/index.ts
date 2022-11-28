import path from "path";
import { RefineConfig } from "@definitions";
import { provideCliHelpers } from "./provideCliHelpers";

export const getRefineConfig = async (
    packagePath: string,
    isAbsolute?: boolean,
) => {
    try {
        provideCliHelpers(packagePath, isAbsolute);

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const config = require(path.join(
            isAbsolute ? packagePath : path.join(process.cwd(), packagePath),
            "refine.config.js",
        )) as RefineConfig;

        return config;
    } catch (error) {
        return undefined;
    }
};
