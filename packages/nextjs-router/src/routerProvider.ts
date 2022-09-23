import { useRouter } from "next/router";
import qs from "qs";

import { IRouterProvider } from "@pankod/refine-core";

import { Prompt } from "./prompt";
import { RefineLink } from "./refineLink";
import { useParams } from "./useParams";

export const RouterProvider: IRouterProvider = {
    useHistory: () => {
        const router = useRouter();
        const { push, replace, back } = router;
        return {
            push,
            replace,
            goBack: back,
        };
    },
    useLocation: () => {
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
    },
    useParams,
    Prompt,
    Link: RefineLink,
};
