import { useRouter } from "next/router";
import { handleUseParams, IRouterProvider } from "@refinedev/core";

import { handleRefineParams } from "./../legacy-common/handle-refine-params";

export const useParams: IRouterProvider["useParams"] = <Params>() => {
    const router = useRouter();

    const { query } = router;
    const { refine } = query;
    return {
        ...handleRefineParams(refine),
        ...handleUseParams(query),
    } as Params;
};
