import { AuthPage } from "@refinedev/antd";
import { useLogin } from "@refinedev/core";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { demoCredentials } from "@providers";

export default function Login() {
    const searchParams = useSearchParams();
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
        />
    );
}

Login.noLayout = true;
