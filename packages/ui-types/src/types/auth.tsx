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
> = (
    | PropsWithChildren<{
          /**
           * @default "login"
           * @description The type of the auth page.
           * @optional
           */
          type?: "login";
          /**
           * @description Providers array for login with third party auth services.
           * @optional
           */
          providers?: IProvider[];
          /**
           * @description Render a redirect to register page button node. If set to false, register button will not be rendered.
           * @optional
           */
          registerLink?: React.ReactNode;
          /**
           * @description Render a redirect to reset password page button node. If set to false, reset password button will not be rendered.
           * @optional
           */
          resetPasswordLink?: React.ReactNode;
          /**
           * @description Render a remember me button node. If set to false, remember me button will not be rendered.
           * @optional
           */
          rememberMe?: React.ReactNode;
      }>
    | PropsWithChildren<{
          /**
           * @description The type of the auth page.
           * @optional
           */
          type: "register";
          /**
           * @description Render a redirect to login page button node. If set to false, login button will not be rendered.
           * @optional
           */
          loginLink?: React.ReactNode;
          /**
           * @description render a redirect to update password page button node. If set to false, update password button will not be rendered.
           * @optional
           */
          updatePasswordLink?: React.ReactNode;
      }>
    | PropsWithChildren<{
          /**
           * @description The type of the auth page.
           * @optional
           */
          type: "resetPassword";
          /**
           * @description render a redirect to login page button node. If set to false, login button will not be rendered.
           * @optional
           */
          loginLink?: React.ReactNode;
      }>
    | PropsWithChildren<{
          /**
           * @description The type of the auth page.
           * @optional
           */
          type: "updatePassword";
      }>
) & {
    /**
     * @description Render a submit button node. If set to false, submit button will not be rendered.
     * @optional
     */
    submitButton?: React.ReactNode;
    /**
     * @description The props that will be passed to the wrapper component.
     * @optional
     */
    wrapperProps?: TWrapperProps;
    /**
     * @description The props that will be passed to the content component.
     * @optional
     */
    contentProps?: TContentProps;
    /**
     * @description This method gives you the ability to render a custom content node.
     * @optional
     */
    renderContent?: (content: React.ReactNode) => React.ReactNode;
};

/**
 * This should be the base type for `AuthPage` `Login` component implementations in UI integrations.
 */
export type RefineLoginPageProps<
    TWrapperProps extends {} = Record<keyof any, unknown>,
    TContentProps extends {} = Record<keyof any, unknown>,
> = PropsWithChildren<{
    providers?: IProvider[];
    submitButton?: React.ReactNode;
    registerLink?: React.ReactNode;
    resetPasswordLink?: React.ReactNode;
    rememberMe?: React.ReactNode;
    wrapperProps?: TWrapperProps;
    renderContent?: (content: React.ReactNode) => React.ReactNode;
    contentProps?: TContentProps;
}>;

/**
 * This should be the base type for `AuthPage` `Register` component implementations in UI integrations.
 */
export type RefineRegisterPageProps<
    TWrapperProps extends {} = Record<keyof any, unknown>,
    TContentProps extends {} = Record<keyof any, unknown>,
> = PropsWithChildren<{
    submitButton?: React.ReactNode;
    loginLink?: React.ReactNode;
    wrapperProps?: TWrapperProps;
    renderContent?: (content: React.ReactNode) => React.ReactNode;
    contentProps?: TContentProps;
}>;

/**
 * This should be the base type for `AuthPage` `Reset Password` component implementations in UI integrations.
 */
export type RefineResetPasswordPageProps<
    TWrapperProps extends {} = Record<keyof any, unknown>,
    TContentProps extends {} = Record<keyof any, unknown>,
> = PropsWithChildren<{
    submitButton?: React.ReactNode;
    loginLink?: React.ReactNode;
    wrapperProps?: TWrapperProps;
    renderContent?: (content: React.ReactNode) => React.ReactNode;
    contentProps?: TContentProps;
}>;

/**
 * This should be the base type for `AuthPage` `Update Password` component implementations in UI integrations.
 */
export type RefineUpdatePasswordPageProps<
    TWrapperProps extends {} = Record<keyof any, unknown>,
    TContentProps extends {} = Record<keyof any, unknown>,
> = PropsWithChildren<{
    submitButton?: React.ReactNode;
    wrapperProps?: TWrapperProps;
    renderContent?: (content: React.ReactNode) => React.ReactNode;
    contentProps?: TContentProps;
}>;
