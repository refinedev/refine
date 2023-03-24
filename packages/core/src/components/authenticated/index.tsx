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
    const routerType = useRouterType();

    const hasAuthProvider = Boolean(activeAuthProvider?.isProvided);
    const isLegacyAuth = Boolean(activeAuthProvider?.isLegacy);
    const isLegacyRouter = routerType === "legacy";

    const parsed = useParsed();
    const go = useGo();
    const deferredGo = useDeferredGo();
    const { replace } = useNavigation();
    const { useLocation } = useRouterContext();
    const legacyLocation = useLocation();

    const {
        isLoading,
        isFetching,
        // isRefetching,
        isSuccess,
        data: {
            authenticated: isAuthenticatedStatus,
            redirectTo: authenticatedRedirect,
        } = {},
        refetch,
    } = useIsAuthenticated({
        v3LegacyAuthProviderCompatible: isLegacyAuth,
    });

    React.useEffect(() => {
        /**
         * Refetch the authentication status if the content is changed (e.g. redirected or updated)
         *
         * This is done to avoid re-rendering the wrappers with the same content.
         */

        refetch();
    }, [children, fallbackContent]);

    const state = React.useRef<{
        status: "initial" | "pending" | "settled";
        content: React.ReactNode;
    }>({
        status: isLoading ? "initial" : "pending",
        content: loadingContent ?? null,
    });

    /**
     * Update state when fetching the authentication response.
     */
    if (isFetching) {
        state.current.status = "pending";
    } else if (!isFetching) {
        state.current.status = "settled";
    }

    /**
     * Authentication status
     */
    const isAuthenticated = hasAuthProvider
        ? isLegacyAuth
            ? isSuccess
            : isAuthenticatedStatus
        : true;

    if (state.current.status === "settled") {
        /**
         * If the state is settled, and query is resolved.
         */
        if (isAuthenticated) {
            /**
             * If user is authenticated, show the children.
             */
            state.current.content = <>{children ?? null}</>;
        } else if (typeof fallbackContent !== "undefined") {
            /**
             * If user is not authenticated, and `fallback` is present, show the fallback content.
             */
            state.current.content = <>{fallbackContent}</>;
        } else {
            /**
             * If there's no `fallback` content, redirect will be applied.
             */

            /**
             * Current pathname to append to the redirect url.
             */
            const pathname = `${
                isLegacyRouter ? legacyLocation?.pathname : parsed.pathname
            }`.replace(/(\?.*|#.*)$/, "");

            /**
             * Redirect url to use, if `redirectOnFail` is set to a string,
             * it will be used instead of `redirectTo` property of the `check` function's response.
             */
            const appliedRedirect = isLegacyAuth
                ? typeof redirectOnFail === "string"
                    ? redirectOnFail
                    : "/login"
                : typeof redirectOnFail === "string"
                ? redirectOnFail
                : (authenticatedRedirect as string | undefined);

            /**
             * Redirect if `appliedRedirect` is set.
             */
            if (appliedRedirect) {
                if (isLegacyRouter) {
                    const toQuery = appendCurrentPathToQuery
                        ? `?to=${encodeURIComponent(pathname)}`
                        : "";
                    replace(`${appliedRedirect}${toQuery}`);
                } else {
                    deferredGo({
                        to: appliedRedirect,
                        query: appendCurrentPathToQuery
                            ? {
                                  to: parsed.params?.to
                                      ? parsed.params.to
                                      : go({
                                            to: pathname,
                                            options: { keepQuery: true },
                                            type: "path",
                                        }),
                              }
                            : undefined,
                        type: "replace",
                    });
                }
            }
        }
    }

    /**
     * If there's no `authProvider` set, we don't need to check whether user is logged in or not.
     */
    if (!hasAuthProvider) {
        return <>{children ?? null}</>;
    }

    /**
     * Returning the content based on the state, `fallback` or `children`.
     */
    return <>{state.current.content}</>;
}
