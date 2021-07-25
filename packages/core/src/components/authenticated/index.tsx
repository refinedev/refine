import React from "react";

import { useAuthenticated, useNavigation } from "@hooks";
import { useLocation } from "react-router-dom";

export type AuthenticatedProps = {
    fallback?: React.ReactNode;
    loading?: React.ReactNode;
};

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
