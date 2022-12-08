import { useRouter } from "next/router";
import { handleUseParams, IRouterProvider } from "@pankod/refine-core";

import { handleRefineParams } from "src/common/handle-refine-params";

export const useParams: IRouterProvider["useParams"] = <Params>() => {
    const router = useRouter();

    const { query } = router;
    const { refine } = query;
    return {
        ...handleRefineParams(refine),
        ...handleUseParams(query),
    } as Params;
};
