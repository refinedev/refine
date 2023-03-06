import { handleUseParams, IRouterProvider } from "@refinedev/core";

import { handleRefineParams } from "./../legacy-common/handle-refine-params";

export const useParams: IRouterProvider["useParams"] = function <Params>(this: {
    params?: Record<string, string | string[]>;
}) {
    return {
        ...handleRefineParams(this?.params?.refine ?? []),
        ...handleUseParams(this?.params ?? {}),
    } as Params;
};
