import React from "react";

import { AuthPage } from "@refinedev/antd";

import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";

import { Title } from "@/components";

export const RegisterPage: React.FC = () => {
    return (
        <AuthPage
            type="register"
            title={<Title collapsed={false} />}
            providers={[
                {
                    name: "google",
                    label: "Sign in with Google",
                    icon: (
                        <GoogleOutlined
                            style={{
                                fontSize: 24,
                                lineHeight: 0,
                            }}
                        />
                    ),
                },
                {
                    name: "github",
                    label: "Sign in with GitHub",
                    icon: (
                        <GithubOutlined
                            style={{
                                fontSize: 24,
                                lineHeight: 0,
                            }}
                        />
                    ),
                },
            ]}
        />
    );
};
