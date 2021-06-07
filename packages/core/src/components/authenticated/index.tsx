import React from "react";

import { useAuthenticated } from "@hooks";

export type AuthenticatedProps = {};

export const Authenticated: React.FC<AuthenticatedProps> = ({ children }) => {
    const { isSuccess, isLoading, isError } = useAuthenticated();

    if (isLoading || isError) {
        return null;
    }
    if (isSuccess) {
        return <>{children}</>;
    }

    return null;
};
