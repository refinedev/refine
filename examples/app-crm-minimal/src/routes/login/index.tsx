import React from "react";
import { AuthPage } from "@refinedev/antd";

export const initialValues = {
    email: "michael.scott@dundermifflin.com",
    password: "demodemo",
};

export const LoginPage: React.FC = () => {
    return (
        <AuthPage
            type="login"
            formProps={{
                initialValues,
            }}
        />
    );
};
