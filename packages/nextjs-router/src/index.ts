import { useRouter } from "next/router";
import type {} from "next/router";
import Link from "next/link";

import qs from "qs";
import React, { useEffect } from "react";

const RouterProvider: IRouterProvider = () => ({
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
    Prompt: ({ message, when, setWarnWhen }) => {
        const router = useRouter();

        useEffect(() => {
            const routeChangeStart = () => {
                if (when) {
                    const allowTransition = window.confirm(message);
                    if (allowTransition) {
                        setWarnWhen?.(false);
                    } else {
                        router.events.emit("routeChangeError");
                        throw "Abort route change";
                    }
                }
            };
            router.events.on("routeChangeStart", routeChangeStart);

            return () =>
                router.events.off("routeChangeStart", routeChangeStart);
        }, [when]);
        return null;
    },
    Link,
    Redirect: () => null,
});

type IRouterProvider = () => {
    useHistory: any;
    useLocation: any;
    useParams: any;
    BrowserRouter: () => void;
    Switch: () => void;
    Route: () => void;
    Prompt: React.FC<{
        when: boolean;
        message: string;
        setWarnWhen?: (warnWhen: boolean) => void;
    }>;
    Redirect: () => void;
};

export default RouterProvider;
