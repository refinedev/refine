import React from "react";

import {
    useAuthenticated,
    useGo,
    useNavigation,
    useParsed,
    useRouterContext,
    useRouterType,
} from "@hooks";

export type AuthenticatedProps = {
    /**
     * Content to show if user is not logged in. If undefined, routes to `/`
     */
    fallback?: React.ReactNode;
    /**
     * Content to show while checking whether user is logged in
     */
    loading?: React.ReactNode;
    children: React.ReactNode;
};

/**
 * `<Authenticated>` is the component form of {@link https://refine.dev/docs/core/hooks/auth/useAuthenticated `useAuthenticated`}. It internally uses `useAuthenticated` to provide it's functionality.
 *
 * @see {@link https://refine.dev/docs/core/components/auth/authenticated `<Authenticated>`} component for more details.
 */
export const Authenticated: React.FC<AuthenticatedProps> = ({
    children,
    fallback,
    loading,
}) => {
    const { isSuccess, isLoading, isError } = useAuthenticated();

    const routerType = useRouterType();
    const parsed = useParsed();
    const go = useGo();
    const { replace } = useNavigation();
    const { useLocation } = useRouterContext();
    const { pathname, search } = useLocation();

    if (isLoading) {
        return <>{loading}</> || null;
    }

    if (isError) {
        if (!fallback) {
            if (routerType === "legacy") {
                const toURL = `${pathname}${search}`;
                if (!pathname?.includes("/login")) {
                    replace(`/login?to=${encodeURIComponent(toURL)}`);
                }
            } else {
                go({
                    // needs to be adjusted by the return value of `checkAuth`
                    to: "/login",
                    query: parsed.params?.pathname
                        ? {
                              to: parsed.params?.pathname,
                          }
                        : {},
                });
            }
            return null;
        }

        return <>{fallback}</>;
    }

    if (isSuccess) {
        return <>{children}</>;
    }

    return null;
};
