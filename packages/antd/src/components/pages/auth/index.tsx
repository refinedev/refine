import React from "react";
import { CardProps, LayoutProps } from "antd";
import { RefineAuthPageProps } from "@pankod/refine-ui-types";

import {
    LoginPage,
    RegisterPage,
    ResetPasswordPage,
    UpdatePasswordPage,
} from "./components";

export type AuthProps = RefineAuthPageProps<LayoutProps, CardProps>;

/**
 * **refine** has a default auth page form which is served on `/login` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/api-references/components/refine-config#authpage} for more details.
 */
export const AuthPage: React.FC<AuthProps> = ({
    type = "login",
    providers,
    loginLink,
    rememberMe,
    registerLink,
    resetPasswordLink,
    submitButton,
    wrapperProps,
    renderContent,
    contentProps,
}) => {
    const renderView = () => {
        switch (type) {
            case "login":
                return (
                    <LoginPage
                        providers={providers}
                        submitButton={submitButton}
                        registerLink={registerLink}
                        resetPasswordLink={resetPasswordLink}
                        rememberMe={rememberMe}
                        wrapperProps={wrapperProps}
                        contentProps={contentProps}
                        renderContent={renderContent}
                    />
                );
            case "register":
                return (
                    <RegisterPage
                        submitButton={submitButton}
                        wrapperProps={wrapperProps}
                        contentProps={contentProps}
                        renderContent={renderContent}
                        loginLink={loginLink}
                    />
                );
            case "resetPassword":
                return (
                    <ResetPasswordPage
                        submitButton={submitButton}
                        wrapperProps={wrapperProps}
                        contentProps={contentProps}
                        renderContent={renderContent}
                        loginLink={loginLink}
                    />
                );
            case "updatePassword":
                return (
                    <UpdatePasswordPage
                        submitButton={submitButton}
                        wrapperProps={wrapperProps}
                        contentProps={contentProps}
                        renderContent={renderContent}
                    />
                );

            default:
                return (
                    <LoginPage
                        providers={providers}
                        submitButton={submitButton}
                        registerLink={registerLink}
                        resetPasswordLink={resetPasswordLink}
                        rememberMe={rememberMe}
                        wrapperProps={wrapperProps}
                        contentProps={contentProps}
                        renderContent={renderContent}
                    />
                );
        }
    };

    return <>{renderView()}</>;
};
