import React, { PropsWithChildren } from "react";

export type IProvider = {
    name: string;
    icon?: React.ReactNode;
    label?: string;
};

export interface RefineLoginFormTypes {
    email?: string;
    password?: string;
    remember?: boolean;
    providerName?: string;
}

export interface RefineRegisterFormTypes {
    email?: string;
    password?: string;
}

export interface RefineResetPasswordFormTypes {
    email: string;
}

export interface RefineUpdatePasswordFormTypes {
    password?: string;
    confirmPassword?: string;
}

/**
 * This should be the base type for `AuthPage` component implementations in UI integrations.
 */
export type RefineAuthPageProps<
    TWrapperProps extends {} = Record<keyof any, unknown>,
    TContentProps extends {} = Record<keyof any, unknown>,
    TFormProps extends {} = Record<keyof any, unknown>,
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
          /**
           * @description Custom submit function for the form. Trigger after submitting the form.
           * @optional
           */
          onSubmit?: (formValues: RefineLoginFormTypes) => void;
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
          onSubmit?: (formValues: RefineRegisterFormTypes) => void;
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
          /**
           * @description Custom submit function for the form. Trigger after submitting the form.
           * @optional
           */
          onSubmit?: (formValues: RefineResetPasswordFormTypes) => void;
      }>
    | PropsWithChildren<{
          /**
           * @description The type of the auth page.
           * @optional
           */
          type: "updatePassword";
          /**
           * @description Custom submit function for the form. Trigger after submitting the form.
           * @optional
           */
          onSubmit?: (formValues: RefineUpdatePasswordFormTypes) => void;
      }>
) & {
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
    /**
     * @description Can be used to pass additional properties for the `Form`
     * @optional
     */
    formProps?: TFormProps;
};

/**
 * This should be the base type for `AuthPage` `Login` component implementations in UI integrations.
 */
export type RefineLoginPageProps<
    TWrapperProps extends {} = Record<keyof any, unknown>,
    TContentProps extends {} = Record<keyof any, unknown>,
    TFormProps extends {} = Record<keyof any, unknown>,
> = PropsWithChildren<{
    providers?: IProvider[];
    onSubmit?: (formValues: RefineLoginFormTypes) => void;
    registerLink?: React.ReactNode;
    resetPasswordLink?: React.ReactNode;
    rememberMe?: React.ReactNode;
    wrapperProps?: TWrapperProps;
    renderContent?: (content: React.ReactNode) => React.ReactNode;
    contentProps?: TContentProps;
    formProps?: TFormProps;
}>;

/**
 * This should be the base type for `AuthPage` `Register` component implementations in UI integrations.
 */
export type RefineRegisterPageProps<
    TWrapperProps extends {} = Record<keyof any, unknown>,
    TContentProps extends {} = Record<keyof any, unknown>,
    TFormProps extends {} = Record<keyof any, unknown>,
> = PropsWithChildren<{
    onSubmit?: (formValues: RefineRegisterFormTypes) => void;
    loginLink?: React.ReactNode;
    wrapperProps?: TWrapperProps;
    renderContent?: (content: React.ReactNode) => React.ReactNode;
    contentProps?: TContentProps;
    formProps?: TFormProps;
}>;

/**
 * This should be the base type for `AuthPage` `Reset Password` component implementations in UI integrations.
 */
export type RefineResetPasswordPageProps<
    TWrapperProps extends {} = Record<keyof any, unknown>,
    TContentProps extends {} = Record<keyof any, unknown>,
    TFormProps extends {} = Record<keyof any, unknown>,
> = PropsWithChildren<{
    onSubmit?: (formValues: RefineResetPasswordFormTypes) => void;
    loginLink?: React.ReactNode;
    wrapperProps?: TWrapperProps;
    renderContent?: (content: React.ReactNode) => React.ReactNode;
    contentProps?: TContentProps;
    formProps?: TFormProps;
}>;

/**
 * This should be the base type for `AuthPage` `Update Password` component implementations in UI integrations.
 */
export type RefineUpdatePasswordPageProps<
    TWrapperProps extends {} = Record<keyof any, unknown>,
    TContentProps extends {} = Record<keyof any, unknown>,
    TFormProps extends {} = Record<keyof any, unknown>,
> = PropsWithChildren<{
    onSubmit?: (formValues: RefineUpdatePasswordFormTypes) => void;
    wrapperProps?: TWrapperProps;
    renderContent?: (content: React.ReactNode) => React.ReactNode;
    contentProps?: TContentProps;
    formProps?: TFormProps;
}>;
