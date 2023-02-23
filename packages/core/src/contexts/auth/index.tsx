import React, { PropsWithChildren } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useNavigation } from "@hooks";
import { ILegacyAuthContext, IAuthBindingsContext } from "../../interfaces";

/**
 * @deprecated `LegacyAuthContext` is deprecated with refine@4, use `AuthBindingsContext` instead, however, we still support `LegacyAuthContext` for backward compatibility.
 */
export const LegacyAuthContext = React.createContext<ILegacyAuthContext>({});

/**
 * @deprecated `LegacyAuthContextProvider` is deprecated with refine@4, use `AuthBindingsContextProvider` instead, however, we still support `LegacyAuthContextProvider` for backward compatibility.
 */
export const LegacyAuthContextProvider: React.FC<
    ILegacyAuthContext & {
        children?: React.ReactNode;
    }
> = ({ children, isProvided, ...authOperations }) => {
    const { replace } = useNavigation();
    const queryClient = useQueryClient();

    const invalidateAuthStore = () => {
        queryClient.invalidateQueries(["useAuthenticated"]);
        queryClient.invalidateQueries(["getIdentity"]);
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

    const registerFunc = async (params: any) => {
        try {
            const result = await authOperations.register?.(params);

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
        <LegacyAuthContext.Provider
            value={{
                ...authOperations,
                login: loginFunc,
                logout: logoutFunc,
                checkAuth: checkAuthFunc,
                register: registerFunc,
                isProvided,
            }}
        >
            {children}
        </LegacyAuthContext.Provider>
    );
};

export const AuthBindingsContext = React.createContext<
    Partial<IAuthBindingsContext>
>({});

export const AuthBindingsContextProvider: React.FC<
    PropsWithChildren<IAuthBindingsContext>
> = ({ children, isProvided, ...authBindings }) => {
    const queryClient = useQueryClient();

    const invalidateAuthStore = () => {
        queryClient.invalidateQueries(["useAuthenticated"]);
        queryClient.invalidateQueries(["getIdentity"]);
        queryClient.invalidateQueries(["usePermissions"]);
    };

    const handleLogin = async (params: unknown) => {
        try {
            const result = await authBindings.login?.(params);

            invalidateAuthStore();

            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const handleRegister = async (params: unknown) => {
        try {
            const result = await authBindings.register?.(params);

            invalidateAuthStore();

            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const handleLogout = async (params: unknown) => {
        try {
            const result = await authBindings.logout?.(params);

            invalidateAuthStore();

            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const handleCheck = async (params: unknown) => {
        try {
            const result = await authBindings.check?.(params);

            return Promise.resolve(result);
        } catch (error) {
            return Promise.reject(error);
        }
    };

    return (
        <AuthBindingsContext.Provider
            value={{
                ...authBindings,
                login: handleLogin as IAuthBindingsContext["login"],
                logout: handleLogout as IAuthBindingsContext["logout"],
                check: handleCheck as IAuthBindingsContext["check"],
                register: handleRegister as IAuthBindingsContext["register"],
                isProvided,
            }}
        >
            {children}
        </AuthBindingsContext.Provider>
    );
};

/**
 * @deprecated `useLegacyAuthContext` is deprecated with refine@4, use `useAuthBindingsContext` instead, however, we still support `useLegacyAuthContext` for backward compatibility.
 */
export const useLegacyAuthContext = () => {
    const context = React.useContext(LegacyAuthContext);

    return context;
};

export const useAuthBindingsContext = () => {
    const context = React.useContext(AuthBindingsContext);

    return context;
};
