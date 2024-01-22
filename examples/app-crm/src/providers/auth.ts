import { AuthProvider } from "@refinedev/core";

import type { User } from "@/graphql/schema.types";
import { disableAutoLogin, enableAutoLogin } from "@/hooks";

import { API_BASE_URL, API_URL, client, dataProvider } from "./data";

export const emails = [
    "michael.scott@dundermifflin.com",
    "jim.halpert@dundermifflin.com",
    "pam.beesly@dundermifflin.com",
    "dwight.schrute@dundermifflin.com",
    "angela.martin@dundermifflin.com",
    "stanley.hudson@dundermifflin.com",
    "phyllis.smith@dundermifflin.com",
    "kevin.malone@dundermifflin.com",
    "oscar.martinez@dundermifflin.com",
    "creed.bratton@dundermifflin.com",
    "meredith.palmer@dundermifflin.com",
    "ryan.howard@dundermifflin.com",
    "kelly.kapoor@dundermifflin.com",
    "andy.bernard@dundermifflin.com",
    "toby.flenderson@dundermifflin.com",
];

const randomEmail = emails[Math.floor(Math.random() * emails.length)];

export const demoCredentials = {
    email: randomEmail,
    password: "demodemo",
};

export const authProvider: AuthProvider = {
    login: async ({ email, providerName, accessToken, refreshToken }) => {
        if (accessToken && refreshToken) {
            client.setHeaders({
                Authorization: `Bearer ${accessToken}`,
            });

            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);

            return {
                success: true,
                redirectTo: "/",
            };
        }

        if (providerName) {
            window.location.href = `${API_BASE_URL}/auth/${providerName}`;

            return {
                success: true,
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

            client.setHeaders({
                Authorization: `Bearer ${data.login.accessToken}`,
            });

            enableAutoLogin(email);
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

            enableAutoLogin(email);

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
        client.setHeaders({
            Authorization: "",
        });

        disableAutoLogin();
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        return {
            success: true,
            redirectTo: "/login",
        };
    },
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    check: async () => {
        try {
            await dataProvider.custom({
                url: API_URL,
                method: "post",
                headers: {},
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
            };
        } catch (error) {
            return {
                authenticated: false,
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
        try {
            const { data } = await dataProvider.custom<{ me: User }>({
                url: API_URL,
                method: "post",
                headers: {},
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
