import { AuthBindings } from "@refinedev/core";
import { API_URL, client, dataProvider } from "./data";
import type { User } from "../interfaces/graphql";

export const demoCredentials = {
    email: "michael.scott@dundermifflin.com",
    password: "demodemo",
};

export const authProvider: AuthBindings = {
    login: async ({ email }) => {
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
    register: async (params) => {
        throw new Error("Method not implemented.");
    },
    logout: async () => {
        client.setHeaders({
            Authorization: "",
        });

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
            const response = await dataProvider.custom({
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
