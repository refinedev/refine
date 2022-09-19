import React from "react";
import { RefineAuthPageProps } from "@pankod/refine-ui-types";
import { BoxProps, CardProps } from "@mantine/core";

import {
    LoginPage,
    RegisterPage,
    ResetPasswordPage,
    UpdatePasswordPage,
} from "./components";

export type AuthProps = RefineAuthPageProps<
    BoxProps,
    CardProps,
    React.DetailedHTMLProps<
        React.FormHTMLAttributes<HTMLFormElement>,
        HTMLFormElement
    >
>;

/**
 * **refine** has a default auth page form served on the `/login` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/authpage/} for more details.
 */
export const AuthPage: React.FC<AuthProps> = (props) => {
    const { type } = props;

    const renderView = () => {
        switch (type) {
            case "register":
                return <RegisterPage {...props} />;
            case "resetPassword":
                return <ResetPasswordPage {...props} />;
            case "updatePassword":
                return <UpdatePasswordPage {...props} />;
            default:
                return <LoginPage {...props} />;
        }
    };

    return <>{renderView()}</>;
};
