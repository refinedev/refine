import React from "react";

import {
    useGo,
    useNavigation,
    useParsed,
    useRouterContext,
    useRouterType,
} from "@hooks";
import { useIsAuthenticated } from "@hooks/auth/useIsAuthenticated";

export type LegacyAuthenticatedProps = {
    /**
     * Content to show if user is not logged in. If undefined, routes to `/`
     */
    fallback?: React.ReactNode;
    /**
     * Content to show while checking whether user is logged in
     */
    loading?: React.ReactNode;
    children: React.ReactNode;
    v3LegacyAuthProviderCompatible: true;
};

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
    v3LegacyAuthProviderCompatible?: false;
};

export function Authenticated(
    props: LegacyAuthenticatedProps,
): JSX.Element | null;

export function Authenticated(props: AuthenticatedProps): JSX.Element | null;

/**
 * `<Authenticated>` is the component form of {@link https://refine.dev/docs/core/hooks/auth/useAuthenticated `useAuthenticated`}. It internally uses `useAuthenticated` to provide it's functionality.
 *
 * @see {@link https://refine.dev/docs/core/components/auth/authenticated `<Authenticated>`} component for more details.
 */
export function Authenticated({
    children,
    fallback,
    loading: loadingFromProps,
}: AuthenticatedProps | LegacyAuthenticatedProps): JSX.Element | null {
    const legacyIsAuthenticatedProps = useIsAuthenticated({
        v3LegacyAuthProviderCompatible: true,
    });

    const isAuthenticatedProps = useIsAuthenticated({
        v3LegacyAuthProviderCompatible: false,
    });

    const routerType = useRouterType();
    const parsed = useParsed();
    const go = useGo();
    const { replace } = useNavigation();
    const { useLocation } = useRouterContext();
    const { pathname, search } = useLocation();

    const loading =
        legacyIsAuthenticatedProps.isLoading ||
        isAuthenticatedProps.isLoading ||
        loadingFromProps;

    const hasError =
        isAuthenticatedProps.data?.error || legacyIsAuthenticatedProps.isError;

    const isAuthenticated =
        legacyIsAuthenticatedProps.isSuccess ||
        isAuthenticatedProps.data?.authenticated;

    if (loading) {
        return <>{loading}</> || null;
    }

    if (hasError) {
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

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return null;
}
