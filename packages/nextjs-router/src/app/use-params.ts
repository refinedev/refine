import { handleUseParams, IRouterProvider } from "@pankod/refine-core";

import { handleRefineParams } from "src/common/handle-refine-params";

export const useParams: IRouterProvider["useParams"] = function <Params>(this: {
    params?: Record<string, string | string[]>;
}) {
    return {
        ...handleRefineParams(this?.params?.refine ?? []),
        ...handleUseParams(this?.params ?? {}),
    } as Params;
};
