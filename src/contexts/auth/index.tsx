import React from "react";

import { IAuthContext } from "./IAuthContext";

export { IAuthContext };

const defaultProvider: IAuthContext = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getIdentity: () =>
        Promise.resolve({
            id: 1,
        }),
};

export const AuthContext = React.createContext<IAuthContext>(defaultProvider);

export const AuthContextProvider: React.FC<IAuthContext> = ({
    login,
    logout,
    checkAuth,
    checkError,
    getPermissions,
    getIdentity,
    children,
}) => {
    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                checkAuth,
                checkError,
                getPermissions,
                getIdentity,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
