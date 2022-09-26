import React from "react";
import { AuthPage } from "@pankod/refine-antd";

import { useAuthConfig } from "../../hooks";

export const RegisterPage: React.FC = () => {
    const { data: config } = useAuthConfig();

    const socialConfig = config?.filter((item) => item.type !== "database");

    return (
        <AuthPage
            type="register"
            providers={socialConfig?.map((item) => ({
                name: item.type,
                label: `Login with ${item.name}`,
            }))}
        />
    );
};
