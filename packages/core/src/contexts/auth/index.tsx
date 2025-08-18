import React, { type PropsWithChildren } from "react";

import type { IAuthContext } from "./types";

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

export const useAuthBindingsContext = () => {
  const context = React.useContext(AuthBindingsContext);

  return context;
};
