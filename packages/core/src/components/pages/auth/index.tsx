import React from "react";

import { Login, Register, ResetPassword, UpdatePassword } from "./components";

export interface ILoginForm {
    username?: string;
    email?: string;
    providerName?: string;
    password: string;
}
export interface IRegisterForm {
    username?: string;
    email?: string;
    password: string;
}
export interface IResetPasswordForm {
    email: string;
}

export interface IProvider {
    name: string;
    icon?: React.ReactNode;
    label?: string;
}

export interface IAuthCommonProps {
    registerLink?: React.ReactNode;
    loginLink?: React.ReactNode;
    forgotLink?: React.ReactNode;
    backLink?: React.ReactNode;
    providers?: IProvider[];
}

export interface IAuthPageProps extends IAuthCommonProps {
    type?: "login" | "register" | "resetPassword" | "updatePassword";
}

/**
 * **refine** has a default auth page form which is served on `/login` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/api-references/components/refine-config#authpage} for more details.
 */
export const AuthPage: React.FC<IAuthPageProps> = ({
    type = "login",
    providers = [],
    loginLink,
    registerLink,
    forgotLink,
    backLink,
}) => {
    const renderView = () => {
        switch (type) {
            case "login":
                return (
                    <Login
                        providers={providers}
                        loginLink={loginLink}
                        registerLink={registerLink}
                        forgotLink={forgotLink}
                        backLink={backLink}
                    />
                );
            case "register":
                return (
                    <Register
                        registerLink={registerLink}
                        loginLink={loginLink}
                        forgotLink={registerLink}
                        backLink={backLink}
                    />
                );
            case "resetPassword":
                return (
                    <ResetPassword
                        forgotLink={registerLink}
                        backLink={backLink}
                    />
                );
            case "updatePassword":
                return <UpdatePassword backLink={backLink} />;

            default:
                return (
                    <Login
                        providers={providers}
                        loginLink={loginLink}
                        registerLink={registerLink}
                        forgotLink={forgotLink}
                        backLink={backLink}
                    />
                );
        }
    };

    return <>{renderView()}</>;
};
