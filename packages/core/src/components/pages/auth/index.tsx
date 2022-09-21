import React from "react";

import { Login, Register, ForgotPassword, UpdatePassword } from "./components";

export interface ILoginForm {
    username?: string;
    email?: string;
    password?: string;
    providerName?: string;
}
export interface IRegisterForm {
    username?: string;
    email?: string;
    password: string;
}
export interface IForgotPasswordForm {
    email: string;
}
export interface IUpdatePasswordForm {
    newPassword: string;
    confirmPassword?: string;
}

export interface IProvider {
    name: string;
    icon?: React.ReactNode;
    label?: string;
}

export interface IAuthCommonProps {
    submitButton?: React.ReactNode;
    registerLink?: React.ReactNode;
    loginLink?: React.ReactNode;
    forgotPasswordLink?: React.ReactNode;
    updatePasswordLink?: React.ReactNode;
    backLink?: React.ReactNode;
    providers?: IProvider[];
}

export interface IAuthPageProps extends IAuthCommonProps {
    type?: "login" | "register" | "forgotPassword" | "updatePassword";
}

/**
 * **refine** has a default auth page form which is served on `/login` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/api-references/components/refine-config#authpage} for more details.
 */
export const AuthPage: React.FC<IAuthPageProps> = ({
    type,
    providers,
    loginLink,
    registerLink,
    forgotPasswordLink,
    submitButton,
    backLink,
}) => {
    const renderView = () => {
        switch (type) {
            case "login":
                return (
                    <Login
                        providers={providers}
                        submitButton={submitButton}
                        registerLink={registerLink}
                        forgotPasswordLink={forgotPasswordLink}
                        backLink={backLink}
                    />
                );
            case "register":
                return (
                    <Register
                        submitButton={submitButton}
                        loginLink={loginLink}
                        backLink={backLink}
                    />
                );
            case "forgotPassword":
                return (
                    <ForgotPassword
                        submitButton={submitButton}
                        backLink={backLink}
                    />
                );
            case "updatePassword":
                return (
                    <UpdatePassword
                        backLink={backLink}
                        submitButton={submitButton}
                    />
                );

            default:
                return (
                    <Login
                        providers={providers}
                        submitButton={submitButton}
                        registerLink={registerLink}
                        forgotPasswordLink={forgotPasswordLink}
                        backLink={backLink}
                    />
                );
        }
    };

    return <>{renderView()}</>;
};
