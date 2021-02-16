import React from "react";

import { useAuthenticated, useLogout } from "@hooks";

export type AuthenticatedProps = {};

export const Authenticated: React.FC<AuthenticatedProps> = ({ children }) => {
    const checkAuth = useAuthenticated();
    const logout = useLogout();

    React.useEffect(() => {
        checkAuth().catch(() => logout());
    }, []);

    return <React.Fragment>{children}</React.Fragment>;
};
