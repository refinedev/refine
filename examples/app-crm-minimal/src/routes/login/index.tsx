import React from "react";
import { AuthPage } from "@refinedev/antd";
import { authCredentials } from "@/providers";

export const LoginPage: React.FC = () => {
    return (
        <AuthPage
            type="login"
            registerLink={false}
            forgotPasswordLink={false}
            formProps={{
                initialValues: authCredentials,
            }}
        />
    );
};
