import React from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useNavigation } from "@hooks";
import { IAuthContext } from "../../interfaces";

export const AuthContext = React.createContext<IAuthContext>({});

export const AuthContextProvider: React.FC<
    IAuthContext & {
        children?: React.ReactNode;
    }
> = ({ children, isProvided, ...authOperations }) => {
    const { replace } = useNavigation();
    const queryClient = useQueryClient();

    const invalidateAuthStore = () => {
        queryClient.invalidateQueries(["useAuthenticated"]);
        queryClient.invalidateQueries(["getUserIdentity"]);
        queryClient.invalidateQueries(["usePermissions"]);
    };

    const loginFunc = async (params: any) => {
        try {
            const result = await authOperations.login?.(params);

            invalidateAuthStore();
            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const logoutFunc = async (params: any) => {
        try {
            const redirectPath = await authOperations.logout?.(params);

            invalidateAuthStore();

            return Promise.resolve(redirectPath);
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const checkAuthFunc = async (params: any) => {
        try {
            await authOperations.checkAuth?.(params);
            return Promise.resolve();
        } catch (error) {
            if ((error as { redirectPath?: string })?.redirectPath) {
                replace((error as { redirectPath: string }).redirectPath);
            }

            return Promise.reject(error);
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
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
