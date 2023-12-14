import { request } from "@refinedev/nestjs-query";

import { AxiosResponse } from "axios";

import { RefreshTokenMutation } from "@/graphql/types";

import { REFRESH_TOKEN_MUTATION } from "./queries";

export const shouldRefreshToken = (response: AxiosResponse) => {
    const errors = response?.data?.errors;
    if (!errors) return false;

    const currentRefreshToken = localStorage.getItem("refresh_token");
    if (!currentRefreshToken) return false;

    const hasAuthenticationError = errors.some((error: any) => {
        return error.extensions?.code === "UNAUTHENTICATED";
    });
    if (!hasAuthenticationError) return false;

    return true;
};

export const refreshTokens = async () => {
    const currentRefreshToken = localStorage.getItem("refresh_token");
    if (!currentRefreshToken) return null;

    try {
        const response = await request<RefreshTokenMutation>(
            "https://api.crm.refine.dev/graphql",
            REFRESH_TOKEN_MUTATION,
            {
                refreshToken: currentRefreshToken,
            },
        );

        localStorage.setItem("access_token", response.refreshToken.accessToken);
        localStorage.setItem(
            "refresh_token",
            response.refreshToken.refreshToken,
        );

        return response.refreshToken;
    } catch (error) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return null;
    }
};
