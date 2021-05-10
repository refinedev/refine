import React, { useState } from "react";

import { useAuthenticated } from "@hooks";

export type AuthenticatedProps = {};

export const Authenticated: React.FC<AuthenticatedProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const checkAuth = useAuthenticated();

    React.useEffect(() => {
        checkAuth()
            .then(() => {
                setIsAuthenticated(true);
            })
            .catch(() => {
                setIsAuthenticated(false);
            });
    }, [checkAuth]);

    return isAuthenticated ? <>{children}</> : null;
};
