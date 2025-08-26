import React, { type PropsWithChildren } from "react";

import type { IAuthContext } from "./types";

export const AuthProviderContext = React.createContext<Partial<IAuthContext>>(
  {},
);

export const AuthProviderContextProvider: React.FC<
  PropsWithChildren<IAuthContext>
> = ({ children, isProvided, ...authProvider }) => {
  const handleLogin = async (params: unknown) => {
    try {
      const result = await authProvider.login?.(params);

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
      const result = await authProvider.register?.(params);

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
      const result = await authProvider.logout?.(params);

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
      const result = await authProvider.check?.(params);

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
      const result = await authProvider.forgotPassword?.(params);

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
      const result = await authProvider.updatePassword?.(params);
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
    <AuthProviderContext.Provider
      value={{
        ...authProvider,
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
    </AuthProviderContext.Provider>
  );
};

export const useAuthProviderContext = () => {
  const context = React.useContext(AuthProviderContext);

  return context;
};
