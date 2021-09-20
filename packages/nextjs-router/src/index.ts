// import {
//     useHistory,
//     useLocation,
//     useParams,
//     BrowserRouter,
//     Switch,
//     Route,
//     Prompt,
//     Link,
//     Redirect,
// } from "react-router-dom";
import { useRouter } from "next/router";
import Link from "next/link";

import qs from "qs";
const RouterProvider = () => ({
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
        // console.log({ "useLocation:: router": router });
        const { pathname, query } = router;

        const queryParams = qs.stringify(
            Object.fromEntries(
                Object.entries(query).filter(
                    ([key]) => !["resource", "action", "id"].includes(key),
                ),
            ),
        );
        console.log({ "useLocation:: queryParams": queryParams });

        return {
            pathname,
            search: `?${queryParams}`,
        };
    },
    useParams: () => {
        const router = useRouter();
        console.log({ "useParams:: router": router });

        const { query } = router;
        return query;
    },
    BrowserRouter: () => null,
    Switch: () => null,
    Route: () => null,
    Prompt: () => null,
    Link,
    Redirect: () => null,
});

export default RouterProvider;
