import qs from "qs";
import { useRouter } from "next/router";

import type { IRouterProvider } from "@refinedev/core";

export const useLocation: IRouterProvider["useLocation"] = () => {
    const router = useRouter();
    const { query, asPath } = router;

    const queryParams = qs.stringify(query);

    const sliceLength = Math.min(
        ...[
            asPath.indexOf("?") > 0 ? asPath.indexOf("?") : asPath.length,
            asPath.indexOf("#") > 0 ? asPath.indexOf("#") : asPath.length,
        ],
    );

    return {
        pathname: asPath.slice(0, sliceLength),
        search: queryParams && `?${queryParams}`,
    };
};
