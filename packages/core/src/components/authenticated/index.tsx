import React from "react";

import { useAuthenticated } from "@hooks";

export type AuthenticatedProps = { fallback?: any };

export const Authenticated: React.FC<AuthenticatedProps> = ({
    children,
    fallback,
}) => {
    const { isSuccess, isLoading, isError } = useAuthenticated();

    if (isLoading || isError) {
        return fallback || null;
    }
    if (isSuccess) {
        return <>{children}</>;
    }

    return null;
};
