import React from "react";

import {
    useGo,
    useNavigation,
    useParsed,
    useRouterContext,
    useRouterType,
    useIsAuthenticated,
} from "@hooks";
import { useActiveAuthProvider } from "@definitions/index";

export type AuthenticatedCommonProps = {
    /**
     * Whether to redirect user if not logged in or not.
     * If not set, user will be redirected to `/login`.
     * If set to a string, user will be redirected to that string.
     *
     * This property only works if `fallback` is **not set**.
     */
    redirectOnFail?: string;
    /**
     * Whether to append current path to search params of the redirect url at `to` property.
     *
     * By default, `to` parameter is used by successful invocations of the `useLogin` hook.
     * If `to` present, it will be used as the redirect url after successful login.
     */
    appendCurrentPathToQuery?: boolean;
    /**
     * Content to show if user is not logged in.
     */
    fallback?: React.ReactNode;
    /**
     * Content to show while checking whether user is logged in or not.
     */
    loading?: React.ReactNode;
    /**
     * Content to show if user is logged in
     */
    children: React.ReactNode;
};

export type LegacyAuthenticatedProps = {
    v3LegacyAuthProviderCompatible: true;
} & AuthenticatedCommonProps;

export type AuthenticatedProps = {
    v3LegacyAuthProviderCompatible?: false;
} & AuthenticatedCommonProps;

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
    redirectOnFail = "/login",
    appendCurrentPathToQuery = true,
    children,
    fallback: fallbackContent,
    loading: loadingContent,
}: AuthenticatedProps | LegacyAuthenticatedProps): JSX.Element | null {
    const activeAuthProvider = useActiveAuthProvider();

    const isLegacy = Boolean(activeAuthProvider?.isLegacy);

    const isAuthenticatedProps = useIsAuthenticated({
        v3LegacyAuthProviderCompatible: Boolean(activeAuthProvider?.isLegacy),
    });

    const routerType = useRouterType();
    const parsed = useParsed();
    const go = useGo();
    const { replace } = useNavigation();
    const { useLocation } = useRouterContext();
    const { pathname, search } = useLocation();

    const loading = isAuthenticatedProps.isLoading;

    const isAuthenticated = isLegacy
        ? isAuthenticatedProps.isSuccess
        : isAuthenticatedProps.data?.authenticated;

    if (loading) {
        return loadingContent ? <>{loadingContent}</> : null;
    }

    if (isAuthenticated) {
        return <>{children}</>;
    } else {
        if (typeof fallbackContent === "undefined") {
            if (routerType === "legacy") {
                const suffix = appendCurrentPathToQuery
                    ? pathname
                        ? `?to=${encodeURIComponent(
                              `${pathname}${search ?? ""}`,
                          )}`
                        : ""
                    : "";

                /**
                 * Legacy provider handles `/login` path rendering.
                 * So, we need to check if pathname is `/login` or not.
                 * To avoid infinite loop.
                 */
                const cleanPathname = pathname?.split(/[?#]/)[0];
                if (
                    !cleanPathname?.includes("/login") &&
                    cleanPathname !== redirectOnFail
                ) {
                    replace(`/${redirectOnFail.replace(/^\//, "")}${suffix}`);
                }
            } else {
                const suffix = go({
                    to: parsed.params?.pathname || "/",
                    options: { keepQuery: true },
                    type: "path",
                });

                go({
                    // needs to be adjusted by the return value of `checkAuth`
                    to: `/${redirectOnFail.replace(/^\//, "")}`,
                    query: suffix
                        ? {
                              to: suffix,
                          }
                        : {},
                });
            }

            return null;
        }

        return <>{fallbackContent}</>;
    }
}
