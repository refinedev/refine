import React, { PropsWithChildren } from "react";

export type IProvider = {
    name: string;
    icon?: React.ReactNode;
    label?: string;
};

export type ContentProps = {
    Content?: React.FC;
};

/**
 * This should be the base type for `AuthPage` component implementations in UI integrations.
 */
export type RefineAuthPageProps<
    TWrapperProps extends {} = Record<keyof any, unknown>,
    TContentProps extends {} = Record<keyof any, unknown>,
    TExtraProps extends {} = {},
> = PropsWithChildren<{
    // Common Props
    type?: "login" | "register" | "resetPassword" | "updatePassword";
    /**
     * @description when `<AuthPage>` `type` is `login` show the providers on login form
     * @optional
     * */
    providers?: IProvider[];
    submitButton?: React.ReactNode;
    registerLink?: React.ReactNode;
    loginLink?: React.ReactNode;
    resetPasswordLink?: React.ReactNode;
    updatePasswordLink?: React.ReactNode;
    renderContent?: (content: React.ReactNode) => React.ReactNode;
    wrapperProps?: TWrapperProps;
    /**
     * @description when `<AuthPage>` `type` is `login` show the remember me checkbox on login form
     * @optional
     * */
    rememberMe?: React.ReactNode;
    // Card Props
    contentProps?: TContentProps;
}> &
    TExtraProps;

/**
 * This should be the base type for `AuthPage` `Login` component implementations in UI integrations.
 */
export type RefineLoginPageProps<
    TWrapperProps extends {} = Record<keyof any, unknown>,
    TContentProps extends {} = Record<keyof any, unknown>,
    TExtraProps extends {} = {},
> = PropsWithChildren<{
    // Common Props
    providers?: IProvider[];
    submitButton?: React.ReactNode;
    registerLink?: React.ReactNode;
    resetPasswordLink?: React.ReactNode;
    rememberMe?: React.ReactNode;
    wrapperProps?: TWrapperProps;
    renderContent?: (content: React.ReactNode) => React.ReactNode;
    // Card Props
    contentProps?: TContentProps;
}> &
    TExtraProps;

/**
 * This should be the base type for `AuthPage` `Register` component implementations in UI integrations.
 */
export type RefineRegisterPageProps<
    TWrapperProps extends {} = Record<keyof any, unknown>,
    TContentProps extends {} = Record<keyof any, unknown>,
    TExtraProps extends {} = {},
> = PropsWithChildren<{
    // Common Props
    submitButton?: React.ReactNode;
    loginLink?: React.ReactNode;
    wrapperProps?: TWrapperProps;
    renderContent?: (content: React.ReactNode) => React.ReactNode;
    // Card Props
    contentProps?: TContentProps;
}> &
    TExtraProps;

/**
 * This should be the base type for `AuthPage` `Reset Password` component implementations in UI integrations.
 */
export type RefineResetPasswordPageProps<
    TWrapperProps extends {} = Record<keyof any, unknown>,
    TContentProps extends {} = Record<keyof any, unknown>,
    TExtraProps extends {} = {},
> = PropsWithChildren<{
    // Common Props
    submitButton?: React.ReactNode;
    loginLink?: React.ReactNode;
    wrapperProps?: TWrapperProps;
    renderContent?: (content: React.ReactNode) => React.ReactNode;
    // Card Props
    contentProps?: TContentProps;
}> &
    TExtraProps;

/**
 * This should be the base type for `AuthPage` `Update Password` component implementations in UI integrations.
 */
export type RefineUpdatePasswordPageProps<
    TWrapperProps extends {} = Record<keyof any, unknown>,
    TContentProps extends {} = Record<keyof any, unknown>,
    TExtraProps extends {} = {},
> = PropsWithChildren<{
    // Common Props
    submitButton?: React.ReactNode;
    wrapperProps?: TWrapperProps;
    renderContent?: (content: React.ReactNode) => React.ReactNode;
    // Card Props
    contentProps?: TContentProps;
}> &
    TExtraProps;
