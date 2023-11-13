import { FullscreenLoading } from "@/components/fullscreen-loading";
import { authCredentials } from "@/providers";
import { useIsAuthenticated, useLogin } from "@refinedev/core";
import { FC, PropsWithChildren } from "react";

/**
 * This component is used to automatically login the user with the credentials
 * We use this feature to skip the login page and demonstrate the application more quickly.
 */
export const AutoLogin: FC<PropsWithChildren> = ({ children }) => {
    // when user is logout, we set this value to false.
    const shouldAutoLogin = localStorage.getItem("auto_login") !== "false";

    const { mutate: login, isLoading: isLoadingLogin } = useLogin();
    const { data: authData, isLoading: authDataIsLoading } =
        useIsAuthenticated();

    const loading = isLoadingLogin || authDataIsLoading;
    const isAuthenticated = authData?.authenticated;

    if (shouldAutoLogin === false) {
        return <>{children}</>;
    }

    if (loading) {
        return <FullscreenLoading />;
    }

    if (!isAuthenticated) {
        login(authCredentials);
        return <FullscreenLoading />;
    }

    return <>{children}</>;
};
