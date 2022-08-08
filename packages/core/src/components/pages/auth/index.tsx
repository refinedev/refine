import React from "react";

import { Login, Register } from "./components";

export interface ILoginForm {
    username: string;
    password: string;
}

export interface IProvider {
    name: string;
    icon?: React.ComponentType<unknown>;
    label?: string;
}

export interface IAuthCommonProps {
    registerLink?: string;
    loginLink?: string;
    forgotLink?: string;
    providers?: IProvider[];
}

export interface IAuthPageProps extends IAuthCommonProps {
    type?: "login" | "register";
}

/**
 * **refine** has a default auth page form which is served on `/login` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/api-references/components/refine-config#authpage} for more details.
 */
export const AuthPage: React.FC<IAuthPageProps> = ({
    type = "login",
    providers = [
        {
            name: "google",
            icon: function render() {
                return (
                    <img src="https://img.icons8.com/color/48/000000/google-logo.png" />
                );
            },
            label: "Sign in with Google",
        },
    ],
    loginLink,
    registerLink,
    forgotLink,
}) => {
    console.log("type", type);

    const renderView = () => {
        if (type === "login") {
            return (
                <Login
                    loginLink={loginLink}
                    registerLink={registerLink}
                    forgotLink={forgotLink}
                    providers={providers}
                />
            );
        }

        return (
            <Register
                registerLink={registerLink}
                loginLink={loginLink}
                forgotLink={registerLink}
            />
        );
    };

    return <>{renderView()}</>;
};
