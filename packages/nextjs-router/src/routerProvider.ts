import { useRouter } from "next/router";
import Link from "next/link";

import qs from "qs";

import type { IRouterProvider } from "@pankod/refine";

import { Prompt } from "./prompt";

export const RouterProvider: () => IRouterProvider = () => ({
    useHistory: () => {
        const router = useRouter();
        const { push, replace, back } = router as any;
        return {
            push,
            replace,
            goBack: back,
        };
    },
    useLocation: () => {
        const router = useRouter();
        const { pathname, query } = router;

        const queryParams = qs.stringify(
            Object.fromEntries(
                Object.entries(query).filter(
                    ([key]) => !["resource", "action", "id"].includes(key),
                ),
            ),
        );

        return {
            pathname,
            search: `?${queryParams}`,
        };
    },
    useParams: () => {
        const router = useRouter();

        const { query } = router;
        return query;
    },
    BrowserRouter: () => null,
    Switch: () => null,
    Route: () => null,
    Prompt,
    Link,
    Redirect: () => null,
});
