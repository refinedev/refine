import { AuthBindings } from "@refinedev/core";
import nookies from "nookies";
import { API_URL, dataProvider } from "./data";
import { User } from "@/interfaces";

export const authProvider: AuthBindings = {
    login: async ({ email, accessToken, refreshToken }) => {
        if (accessToken && refreshToken) {
            nookies.set(null, "access_token", accessToken, {
                maxAge: 3 * 24 * 60 * 60, // 3 days
                path: "/",
            });
            nookies.set(null, "refresh_token", refreshToken, {
                maxAge: 7 * 24 * 60 * 60, // 7 days
                path: "/",
            });

            return {
                success: true,
                redirectTo: "/",
            };
        }

        try {
            const { data } = await dataProvider.custom({
                url: API_URL,
                method: "post",
                headers: {},
                meta: {
                    variables: { email },
                    rawQuery: `
                mutation Login($email: String!) {
                    login(loginInput: {
                      email: $email
                    }) {
                      accessToken,
                      refreshToken
                    }
                  }
                `,
                },
            });

            localStorage.setItem("access_token", data.login.accessToken);
            localStorage.setItem("refresh_token", data.login.refreshToken);

            return {
                success: true,
                redirectTo: "/",
            };
        } catch (error: any) {
            return {
                success: false,
                error: {
                    message:
                        "message" in error ? error.message : "Login failed",
                    name:
                        "name" in error
                            ? error.name
                            : "Invalid email or password",
                },
            };
        }
    },
    register: async ({ email, password }) => {
        try {
            await dataProvider.custom({
                url: API_URL,
                method: "post",
                headers: {},
                meta: {
                    variables: { email, password },
                    rawQuery: `
                mutation register($email: String!, $password: String!) {
                    register(registerInput: {
                      email: $email
                        password: $password
                    }) {
                        id
                        email
                    }
                  }
                `,
                },
            });
            return {
                success: true,
                redirectTo: `/login?email=${email}`,
            };
        } catch (error: any) {
            return {
                success: false,
                error: {
                    message:
                        "message" in error ? error.message : "Register failed",
                    name:
                        "name" in error
                            ? error.name
                            : "Invalid email or password",
                },
            };
        }
    },
    logout: async () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        return {
            success: true,
            redirectTo: "/login",
        };
    },
    onError: async (error) => {
        if (error.statusCode === "UNAUTHENTICATED") {
            return {
                logout: true,
                ...error,
            };
        }

        return { error };
    },
    check: async (accessToken?: string) => {
        try {
            await dataProvider.custom({
                url: API_URL,
                method: "post",
                headers: accessToken
                    ? {
                          Authorization: `Bearer ${accessToken}`,
                      }
                    : {},
                meta: {
                    rawQuery: `
                    query Me {
                        me {
                          name
                        }
                      }
                `,
                },
            });

            return {
                authenticated: true,
                redirectTo: "/",
            };
        } catch (error) {
            return {
                authenticated: false,
                redirectTo: "/login",
            };
        }
    },
    forgotPassword: async () => {
        return {
            success: true,
            redirectTo: "/update-password",
        };
    },
    updatePassword: async () => {
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    getIdentity: async () => {
        const accessToken = localStorage.getItem("access_token");

        try {
            const { data } = await dataProvider.custom<{ me: User }>({
                url: API_URL,
                method: "post",
                headers: accessToken
                    ? {
                          Authorization: `Bearer ${accessToken}`,
                      }
                    : {},
                meta: {
                    rawQuery: `
                    query Me {
                        me {
                            id,
                            name,
                            email,
                            phone,
                            jobTitle,
                            timezone
                            avatarUrl
                        }
                      }
                `,
                },
            });

            return data.me;
        } catch (error) {
            return undefined;
        }
    },
};
