import React from "react";

import { useAuthenticated } from "@hooks";

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

    if (isLoading) {
        return <>{loading}</> || null;
    }
    if (isError) {
        return <>{fallback}</> || null;
    }
    if (isSuccess) {
        return <>{children}</>;
    }

    return null;
};
