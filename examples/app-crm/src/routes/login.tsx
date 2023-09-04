import React from "react";
import { AuthPage } from "@refinedev/antd";
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";

import { demoCredentials } from "../providers/auth";

import { Title } from "../components/title";
import { useSearchParams } from "react-router-dom";

export const LoginPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const emailFromSearchParams = searchParams.get("email");

    const initialValues = emailFromSearchParams
        ? { email: emailFromSearchParams }
        : demoCredentials;

    return (
        <AuthPage
            type="login"
            formProps={{
                initialValues,
            }}
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
