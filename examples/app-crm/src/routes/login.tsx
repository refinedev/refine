import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { AuthPage } from "@refinedev/antd";
import { useLogin } from "@refinedev/core";

import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";

import { Title } from "@/components";
import { demoCredentials } from "@/providers";

export const LoginPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const { mutate } = useLogin();

    const emailFromSearchParams = searchParams.get("email");
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    const initialValues = emailFromSearchParams
        ? { email: emailFromSearchParams }
        : demoCredentials;

    useEffect(() => {
        if (accessToken && refreshToken) {
            mutate({
                accessToken,
                refreshToken,
            });
        }
    }, [accessToken, refreshToken]);

    return (
        <AuthPage
            type="login"
            formProps={{
                initialValues,
            }}
            contentProps={{
                className: "auth-page",
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
