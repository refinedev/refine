import { gql, request } from "@refinedev/nestjs-query";

import { AxiosResponse } from "axios";

const mutationRefrehToken = gql`
    mutation refreshToken($refreshToken: String!) {
        refreshToken(refreshToken: $refreshToken) {
            accessToken
            refreshToken
        }
    }
`;

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
        const response = await request<{
            refreshToken: {
                accessToken: string;
                refreshToken: string;
            };
        }>("https://api.crm.refine.dev/graphql", mutationRefrehToken, {
            refreshToken: currentRefreshToken,
        });

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
