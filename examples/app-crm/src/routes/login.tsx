import React, { useEffect, useState } from "react";
import { AuthPage } from "@refinedev/antd";
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";

import { demoCredentials } from "../providers/auth";

import { Title } from "../components/title";
import { useSearchParams } from "react-router-dom";
import { useLogin } from "@refinedev/core";

export const LoginPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const emailFromSearchParams = searchParams.get("email");

    const toParams = searchParams.get("to");
    const { mutate } = useLogin();
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);

    const initialValues = emailFromSearchParams
        ? { email: emailFromSearchParams }
        : demoCredentials;

    useEffect(() => {
        if (toParams && toParams?.includes("accessToken")) {
            const decoded = new URLSearchParams(
                decodeURIComponent(toParams.split("?")[1]),
            );

            setAccessToken(decoded.get("accessToken"));
            setRefreshToken(decoded.get("refreshToken"));

            setSearchParams({});
        }
    }, [toParams]);

    useEffect(() => {
        if (accessToken && refreshToken) {
            mutate({ accessToken, refreshToken });
        }
    }, [accessToken, refreshToken]);

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
