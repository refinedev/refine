import { gql, request } from "@refinedev/nestjs-query";
import nookies from "nookies";

type Error = {
    message: string;
    statusCode: string;
};

const customFetch = async (url: string, options: RequestInit) => {
    const cookies = nookies.get();
    const accessToken = cookies?.["access_token"];
    const headers = options.headers as Record<string, string>;

    console.log("fetch", {
        url: options.body,
        bearer: headers?.Authorization || `Bearer ${accessToken})`,
        headers,
    });

    return await fetch(url, {
        ...options,
        headers: {
            ...headers,
            Authorization: headers?.Authorization || `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "Apollo-Require-Preflight": "true",
        },
    });
};

export const fetchWrapper = async (url: string, options: RequestInit) => {
    const response = await customFetch(url, options);

    const responseClone = response.clone();
    const body = await responseClone.json();
    const error = getGraphQLErrors(body);

    if (error) {
        if (shouldRefreshToken(error)) {
            console.log(
                "fetch shouldRefreshToken",
                shouldRefreshToken(error),
                error,
            );
            const tokens = await refreshTokens();
            if (!tokens) {
                throw error;
            }

            const newResponse = await customFetch(url, options);
            return newResponse;
        }

        throw error;
    }

    return response;
};

const refreshTokens = async () => {
    const cookies = nookies.get();
    const currentRefreshToken = cookies?.["refresh_token"];
    if (!currentRefreshToken) return null;

    try {
        const response = await request<{
            refreshToken: {
                accessToken: string;
                refreshToken: string;
            };
        }>(
            "https://api.crm.refine.dev/graphql",
            gql`
                mutation refreshToken($refreshToken: String!) {
                    refreshToken(refreshToken: $refreshToken) {
                        accessToken
                        refreshToken
                    }
                }
            `,
            {
                refreshToken: currentRefreshToken,
            },
        );

        nookies.set(null, "access_token", response.refreshToken.accessToken, {
            maxAge: 3 * 24 * 60 * 60, // 3 days
            path: "/",
        });
        nookies.set(null, "refresh_token", response.refreshToken.refreshToken, {
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: "/",
        });

        return response.refreshToken;
    } catch (error) {
        nookies.destroy(null, "access_token");
        nookies.destroy(null, "refresh_token");
        return null;
    }
};

const shouldRefreshToken = (error: Error) => {
    const cookies = nookies.get();
    const refreshToken = cookies?.["refresh_token"];
    if (!refreshToken) return false;

    if (error.statusCode === "UNAUTHENTICATED") return true;
    return false;
};

const getGraphQLErrors = (body: any): Error | null => {
    if (!body) {
        return {
            message: "Unknown error",
            statusCode: "INTERNAL_SERVER_ERROR",
        };
    }

    if ("errors" in body) {
        const errors = body?.errors;
        const messages = errors?.map((error: any) => error?.message)?.join("");
        const code = errors?.[0]?.extensions?.code;

        return {
            message: messages || JSON.stringify(errors),
            statusCode: code || 500,
        };
    }

    return null;
};
