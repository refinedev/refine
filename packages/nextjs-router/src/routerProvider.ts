import { useRouter } from "next/router";
import Link from "next/link";

import qs from "qs";

import { handleUseParams, IRouterProvider } from "@pankod/refine-core";

import { Prompt } from "./prompt";

// @ts-expect-error `next/link` exports in type of function but in runtime it's an object.
const RefineLink = typeof Link === "object" ? { ...Link } : Link.bind({});

RefineLink.defaultProps = {
    legacyBehavior: false,
};

export { RefineLink };

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
    useParams: <Params>() => {
        const router = useRouter();

        const { query } = router;
        return handleUseParams(query);
    },
    Prompt,
    Link: RefineLink,
};
