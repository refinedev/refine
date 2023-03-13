import { usePathname, useSearchParams } from "next/navigation";

import type { IRouterProvider } from "@refinedev/core";

export const useLocation: IRouterProvider["useLocation"] = () => {
    const pathname = usePathname();
    const query = useSearchParams();

    const sliceLength = Math.min(
        ...[
            (pathname ?? "").indexOf("?") > 0
                ? (pathname ?? "").indexOf("?")
                : (pathname ?? "").length,
            (pathname ?? "").indexOf("#") > 0
                ? (pathname ?? "").indexOf("#")
                : (pathname ?? "").length,
        ],
    );

    return {
        pathname: (pathname ?? "").slice(0, sliceLength),
        search: `?${query.toString()}`,
    };
};
