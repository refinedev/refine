import React from "react";
import { RefineAuthPageProps } from "@pankod/refine-ui-types";

import {
    LoginPage,
    RegisterPage,
    ResetPasswordPage,
    UpdatePasswordPage,
} from "./components";

/**
 * **refine** has a default auth page form which is served on `/login` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/api-references/components/refine-config#authpage} for more details.
 */
export const AuthPage: React.FC<RefineAuthPageProps> = ({
    type,
    providers,
    loginLink,
    rememberMe,
    registerLink,
    resetPasswordLink,
    submitButton,
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
                    />
                );
            case "register":
                return (
                    <RegisterPage
                        submitButton={submitButton}
                        loginLink={loginLink}
                    />
                );
            case "resetPassword":
                return (
                    <ResetPasswordPage
                        submitButton={submitButton}
                        loginLink={loginLink}
                    />
                );
            case "updatePassword":
                return <UpdatePasswordPage submitButton={submitButton} />;

            default:
                return (
                    <LoginPage
                        providers={providers}
                        submitButton={submitButton}
                        registerLink={registerLink}
                        resetPasswordLink={resetPasswordLink}
                    />
                );
        }
    };

    return <>{renderView()}</>;
};
