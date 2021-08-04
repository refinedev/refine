import React from "react";

import { useAuthenticated, useNavigation } from "@hooks";
import { useLocation } from "react-router-dom";

export type AuthenticatedProps = {
    fallback?: React.ReactNode;
    loading?: React.ReactNode;
};

/**
 * `<Authenticated>` is the component form of {@link https://refine.dev/docs/api-references/hooks/auth/useAuthenticated `useAuthenticated`}. It internally uses `useAuthenticated` to provide it's functionality.
 *
 * @see {@link https://refine.dev/docs/api-references/components/auth/authenticated `<Authenticated>`} component for more details.
 */
export const Authenticated: React.FC<AuthenticatedProps> = ({
    children,
    fallback,
    loading,
}) => {
    const { isSuccess, isLoading, isError } = useAuthenticated();

    const { replace } = useNavigation();
    const location = useLocation();

    if (isLoading) {
        return <>{loading}</> || null;
    }

    if (isError) {
        if (!fallback) {
            replace("/", { from: location });
            return null;
        }

        return <>{fallback}</>;
    }

    if (isSuccess) {
        return <>{children}</>;
    }

    return null;
};
