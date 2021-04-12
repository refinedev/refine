import React, { useState } from "react";

import { IAuthContext } from "../../interfaces";

const defaultProvider: IAuthContext = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () =>
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
    getUserIdentity,
    children,
}) => {
    // console.log("checkAuth", checkAuth);

    const [isAuthenticated, setAuthenticated] = useState(false);

    const loginFunc = async (params: any) => {
        try {
            await login(params);
            setAuthenticated(true);
        } catch (error) {
            setAuthenticated(false);
            throw error;
        }
    };

    const logoutFunc = async (params: any) => {
        try {
            await logout(params);
            setAuthenticated(false);
        } catch (error) {
            setAuthenticated(true);
            throw error;
        }
    };

    const checkAuthFunc = async (params: any) => {
        try {
            console.log("context set before", isAuthenticated);
            await checkAuth(params);
            setAuthenticated(true);
            console.log("context set after", isAuthenticated);
        } catch (error) {
            setAuthenticated(false);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                login: loginFunc,
                logout: logoutFunc,
                checkAuth: checkAuthFunc,
                checkError,
                getPermissions,
                getUserIdentity,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
