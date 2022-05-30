import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";

import { useNavigation } from "@hooks";
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
    checkError = defaultProvider.checkError,
    getPermissions = defaultProvider.getPermissions,
    getUserIdentity = defaultProvider.getUserIdentity,
    isProvided,
    children,
}) => {
    const { replace } = useNavigation();
    const [isAuthenticated, setAuthenticated] = useState(false);
    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.invalidateQueries(["useAuthenticated"]);
        queryClient.invalidateQueries(["getUserIdentity"]);
        queryClient.invalidateQueries(["usePermissions"]);
    }, [isAuthenticated]);

    const loginFunc = async (params: any) => {
        try {
            const result = await login(params);
            setAuthenticated(true);
            return Promise.resolve(result);
        } catch (error) {
            setAuthenticated(false);
            throw error;
        }
    };

    const logoutFunc = async (params: any) => {
        try {
            const redirectPath = await logout(params);
            setAuthenticated(false);

            return Promise.resolve(redirectPath);
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
            if ((error as { redirectPath?: string })?.redirectPath) {
                replace((error as { redirectPath: string }).redirectPath);
            }
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
