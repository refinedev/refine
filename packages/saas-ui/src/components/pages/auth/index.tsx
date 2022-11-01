import React from "react";
import { AuthPageProps } from "@pankod/refine-core";
import { BoxProps } from "@chakra-ui/react";
import { CardProps, FormProps } from "@saas-ui/react";

import {
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    UpdatePasswordPage,
} from "./components";

export type FormPropsType = {
    onSubmit: (values: any) => void;
};

export type AuthProps = AuthPageProps<BoxProps, CardProps, FormProps>;

/**
 * **refine** has a default auth page form served on the `/login` route when the `authProvider` configuration is provided.
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/mantine-auth-page/} for more details.
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
