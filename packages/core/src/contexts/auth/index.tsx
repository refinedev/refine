import React, { PropsWithChildren } from "react";

import { useNavigation } from "@hooks";

import { IAuthContext, ILegacyAuthContext } from "./types";

/**
 * @deprecated `LegacyAuthContext` is deprecated with refine@4, use `AuthBindingsContext` instead, however, we still support `LegacyAuthContext` for backward compatibility.
 */
export const LegacyAuthContext = React.createContext<ILegacyAuthContext>({});

/**
 * @deprecated `LegacyAuthContextProvider` is deprecated with refine@4, use `AuthBindingsContextProvider` instead, however, we still support `LegacyAuthContextProvider` for backward compatibility.
 */
export const LegacyAuthContextProvider: React.FC<
  PropsWithChildren<ILegacyAuthContext>
> = ({ children, isProvided, ...authOperations }) => {
  const { replace } = useNavigation();

  const loginFunc = async (params: any) => {
    try {
      const result = await authOperations.login?.(params);

      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const registerFunc = async (params: any) => {
    try {
      const result = await authOperations.register?.(params);

      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const logoutFunc = async (params: any) => {
    try {
      const redirectPath = await authOperations.logout?.(params);

      return redirectPath;
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

export const AuthBindingsContext = React.createContext<Partial<IAuthContext>>(
  {},
);

export const AuthBindingsContextProvider: React.FC<
  PropsWithChildren<IAuthContext>
> = ({ children, isProvided, ...authBindings }) => {
  const handleLogin = async (params: unknown) => {
    try {
      const result = await authBindings.login?.(params);

      return result;
    } catch (error) {
      console.warn(
        "Unhandled Error in login: refine always expects a resolved promise.",
        error,
      );
      return Promise.reject(error);
    }
  };

  const handleRegister = async (params: unknown) => {
    try {
      const result = await authBindings.register?.(params);

      return result;
    } catch (error) {
      console.warn(
        "Unhandled Error in register: refine always expects a resolved promise.",
        error,
      );
      return Promise.reject(error);
    }
  };

  const handleLogout = async (params: unknown) => {
    try {
      const result = await authBindings.logout?.(params);

      return result;
    } catch (error) {
      console.warn(
        "Unhandled Error in logout: refine always expects a resolved promise.",
        error,
      );
      return Promise.reject(error);
    }
  };

  const handleCheck = async (params: unknown) => {
    try {
      const result = await authBindings.check?.(params);

      return Promise.resolve(result);
    } catch (error) {
      console.warn(
        "Unhandled Error in check: refine always expects a resolved promise.",
        error,
      );
      return Promise.reject(error);
    }
  };

  const handleForgotPassword = async (params: unknown) => {
    try {
      const result = await authBindings.forgotPassword?.(params);

      return Promise.resolve(result);
    } catch (error) {
      console.warn(
        "Unhandled Error in forgotPassword: refine always expects a resolved promise.",
        error,
      );
      return Promise.reject(error);
    }
  };

  const handleUpdatePassword = async (params: unknown) => {
    try {
      const result = await authBindings.updatePassword?.(params);
      return Promise.resolve(result);
    } catch (error) {
      console.warn(
        "Unhandled Error in updatePassword: refine always expects a resolved promise.",
        error,
      );
      return Promise.reject(error);
    }
  };

  return (
    <AuthBindingsContext.Provider
      value={{
        ...authBindings,
        login: handleLogin as IAuthContext["login"],
        logout: handleLogout as IAuthContext["logout"],
        check: handleCheck as IAuthContext["check"],
        register: handleRegister as IAuthContext["register"],
        forgotPassword: handleForgotPassword as IAuthContext["forgotPassword"],
        updatePassword: handleUpdatePassword as IAuthContext["updatePassword"],
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
