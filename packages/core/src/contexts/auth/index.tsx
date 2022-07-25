import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";

import { useNavigation } from "@hooks";
import { IAuthContext } from "../../interfaces";

export const AuthContext = React.createContext<IAuthContext>({});

export const AuthContextProvider: React.FC<IAuthContext> = ({
    children,
    isProvided,
    ...authOperations
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
            const result = await authOperations.login?.(params);
            setAuthenticated(true);
            return Promise.resolve(result);
        } catch (error) {
            setAuthenticated(false);
            throw error;
        }
    };

    const logoutFunc = async (params: any) => {
        try {
            const redirectPath = await authOperations.logout?.(params);
            setAuthenticated(false);

            return Promise.resolve(redirectPath);
        } catch (error) {
            setAuthenticated(true);
            throw error;
        }
    };

    const checkAuthFunc = async (params: any) => {
        try {
            await authOperations.checkAuth?.(params);
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
                ...authOperations,
                login: loginFunc,
                logout: logoutFunc,
                checkAuth: checkAuthFunc,
                isProvided,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
