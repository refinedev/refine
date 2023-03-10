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
import { GoConfig } from "src/interfaces";

/**
 * This hook is used to avoid React's invalid setState call warning.
 * When `go` is called during the render phase, it's updating the internal router state before the render phase is finished.
 * This causes React to throw an error. This hook is used to defer the `go` call to the effect calls.
 */
const useDeferredGo = () => {
    const go = useGo();

    const [config, setConfig] = React.useState<GoConfig | undefined>(undefined);

    React.useEffect(() => {
        if (config) {
            go(config);
        }
    }, [config]);

    const cb = React.useCallback(
        (props: GoConfig) => {
            if (!config) {
                setConfig(props);
            }
        },
        [config],
    );

    return cb;
};

export type AuthenticatedCommonProps = {
    /**
     * Whether to redirect user if not logged in or not.
     * If not set, user will be redirected to `redirectTo` property of the `check` function's response.
     * This behavior is only available for new auth providers.
     * Legacy auth providers will redirect to `/login` by default if this property is not set.
     * If set to a string, user will be redirected to that string.
     *
     * This property only works if `fallback` is **not set**.
     */
    redirectOnFail?: string | true;
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
    children?: React.ReactNode;
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
    redirectOnFail = true,
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
    const deferredGo = useDeferredGo();
    const { replace } = useNavigation();
    const { useLocation } = useRouterContext();
    const { pathname, search } = useLocation();

    const loading = isAuthenticatedProps.isLoading;

    const isAuthenticated = activeAuthProvider?.isProvided
        ? isLegacy
            ? isAuthenticatedProps.isSuccess
            : isAuthenticatedProps.data?.authenticated
        : true;

    const appliedRedirect = isLegacy
        ? typeof redirectOnFail === "string"
            ? redirectOnFail
            : "/login"
        : typeof redirectOnFail === "string"
        ? redirectOnFail
        : (isAuthenticatedProps.data?.redirectTo as string | undefined);

    if (loading) {
        return loadingContent ? <>{loadingContent}</> : null;
    }

    if (isAuthenticated) {
        return <>{children ?? null}</>;
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
                    replace(
                        `/${(appliedRedirect ?? "/login").replace(
                            /^\//,
                            "",
                        )}${suffix}`,
                    );
                }
            } else {
                const cleanPathname = parsed.pathname?.split(/[?#]/)[0];

                /** If the route is same, do not redirect */
                if (cleanPathname === appliedRedirect) return null;

                /** If `to` is already present, do not append the new one. */
                const suffix = parsed.params?.to
                    ? parsed.params?.to
                    : go({
                          to: parsed.pathname || "/",
                          options: { keepQuery: true },
                          type: "path",
                      });

                if (appliedRedirect) {
                    deferredGo({
                        // needs to be adjusted by the return value of `checkAuth`
                        to: `/${appliedRedirect.replace(/^\//, "")}`,
                        query:
                            suffix &&
                            typeof suffix === "string" &&
                            suffix.length > 1
                                ? {
                                      to: suffix,
                                  }
                                : {},
                    });
                }
            }

            return null;
        }

        return <>{fallbackContent}</>;
    }
}
