import React from "react";

import { useAuthenticated, useNavigation, useRouterContext } from "@hooks";

export type AuthenticatedProps = {
    fallback?: React.ReactNode;
    loading?: React.ReactNode;
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

    const { replace } = useNavigation();
    const { useLocation } = useRouterContext();
    const { pathname, search } = useLocation();

    if (isLoading) {
        return <>{loading}</> || null;
    }
    if (isError) {
        if (!fallback) {
            const toURL = `${pathname}${search}`;
            if (!pathname.includes("/login")) {
                replace(`/login?to=${encodeURIComponent(toURL)}`);
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
