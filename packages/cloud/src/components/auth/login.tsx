import React from "react";
import { AuthPage } from "@pankod/refine-antd";

import { useAuthConfig } from "../../hooks";

export const LoginPage: React.FC = () => {
    const { data: config } = useAuthConfig();

    const databaseConfig = config?.find((item) => item.type === "database");
    const socialConfig = config?.filter((item) => item.type !== "database");

    // registerLink
    let registerLink: React.ReactNode | undefined;
    if (databaseConfig && databaseConfig.disableSignup === true) {
        registerLink = false;
    }

    return (
        <AuthPage
            type="login"
            providers={socialConfig?.map((item) => ({
                name: item.type,
                label: `Login with ${item.name}`,
            }))}
            registerLink={registerLink}
        />
    );
};
