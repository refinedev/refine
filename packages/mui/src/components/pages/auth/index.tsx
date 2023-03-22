import React from "react";
import { BoxProps, CardProps } from "@mui/material";
import { AuthPageProps, RegisterFormTypes } from "@refinedev/core";
import { UseFormProps } from "@refinedev/react-hook-form";

import {
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    UpdatePasswordPage,
} from "./components";

export interface FormPropsType extends UseFormProps {
    onSubmit?: (values: RegisterFormTypes) => void;
}

export type AuthProps = AuthPageProps<BoxProps, CardProps, FormPropsType>;

/**
 * **refine** has a default auth page form served on the `/login` route when the `authProvider` configuration is provided.
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/mui-auth-page/} for more details.
 */
export const AuthPage: React.FC<AuthProps> = (props) => {
    const { type } = props;
    const renderView = () => {
        switch (type) {
            case "register":
                return <RegisterPage {...props} />;
            case "forgotPassword":
                return <ForgotPasswordPage {...props} />;
            case "updatePassword":
                return <UpdatePasswordPage {...props} />;
            default:
                return <LoginPage {...props} />;
        }
    };

    return <>{renderView()}</>;
};
