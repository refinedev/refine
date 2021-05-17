import React, { useState } from "react";

import { IAuthContext } from "../../interfaces";

const defaultProvider: IAuthContext = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(),
    getUserIdentity: () => Promise.resolve(),
};
export const AuthContext = React.createContext<IAuthContext>(defaultProvider);

export const AuthContextProvider: React.FC<Partial<IAuthContext>> = ({
    login = defaultProvider.login,
    logout = defaultProvider.logout,
    checkAuth = defaultProvider.checkAuth,
    checkError = defaultProvider.login,
    getPermissions = defaultProvider.getPermissions,
    getUserIdentity = defaultProvider.getUserIdentity,
    isProvided,
    children,
}) => {
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
            await checkAuth(params);
            setAuthenticated(true);
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
                isProvided,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
