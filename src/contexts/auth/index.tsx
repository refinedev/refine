import React from "react";

import { IAuthContext } from "@interfaces";

const defaultProvider: IAuthContext = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () =>
        Promise.resolve({
            id: 1
        })
};

export const AuthContext = React.createContext<IAuthContext>(defaultProvider);

export const AuthContextProvider: React.FC<IAuthContext> = ({
    login,
    logout,
    checkAuth,
    checkError,
    getPermissions,
    getUserIdentity,
    children
}) => {
    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                checkAuth,
                checkError,
                getPermissions,
                getUserIdentity
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
