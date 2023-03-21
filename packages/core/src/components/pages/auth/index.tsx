import React, {
    DetailedHTMLProps,
    HTMLAttributes,
    FormHTMLAttributes,
} from "react";

import {
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    UpdatePasswordPage,
} from "./components";

import { AuthPageProps } from "../../../interfaces";

export type DivPropsType = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;
export type FormPropsType = DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
>;

export type AuthProps = AuthPageProps<
    DivPropsType,
    DivPropsType,
    FormPropsType
>;

/**
 * **refine** has a default auth page form which is served on `/login` route when the `authProvider` configuration is provided.
 * @param title is not implemented yet.
 * @see {@link https://refine.dev/docs/api-references/components/refine-config#authpage} for more details.
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
