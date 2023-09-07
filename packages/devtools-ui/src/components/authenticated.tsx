import React from "react";
import { useAuth } from "./auth-context";

export const Authenticated = ({
    children,
    fallback,
}: {
    children: React.ReactNode;
    fallback: React.ReactNode;
}) => {
    const { accessToken } = useAuth();

    if (accessToken) {
        return <>{children}</>;
    }

    return <>{fallback}</>;
};
