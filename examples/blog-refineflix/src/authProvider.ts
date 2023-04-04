import { AuthBindings } from "@refinedev/core";

import { supabaseClient } from "utility";

const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
        try {
            const { data, error } =
                await supabaseClient.auth.signInWithPassword({
                    email,
                    password,
                });

            if (error) {
                return {
                    success: false,
                    error: error || {
                        message: "Login failed",
                        name: "Invalid email or password",
                    },
                };
            }

            if (data?.user) {
                return {
                    success: true,
                    redirectTo: "/",
                };
            }
        } catch (error: any) {
            return {
                success: false,
                error: error || {
                    message: "Login failed",
                    name: "Invalid email or password",
                },
            };
        }

        return {
            success: false,
        };
    },
    logout: async () => {
        try {
            const { error } = await supabaseClient.auth.signOut();

            if (error) {
                return {
                    success: false,
                    error: error || new Error("Logout failed"),
                };
            }
        } catch (error: any) {
            return {
                success: false,
                error: error || new Error("Logout failed"),
            };
        }

        return {
            success: true,
            redirectTo: "/",
        };
    },
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    check: async () => {
        try {
            const { data, error } = await supabaseClient.auth.getSession();
            const { session } = data;

            if (!session) {
                return {
                    authenticated: false,
                    redirectTo: "/login",
                    error: error || {
                        message: "Check failed",
                        name: "Session not found",
                    },
                };
            }
        } catch (error: any) {
            return {
                authenticated: false,
                redirectTo: "/login",
                error: error || {
                    message: "Check failed",
                    name: "Session not found",
                },
            };
        }

        return {
            authenticated: true,
        };
    },
    getPermissions: async () => {
        const { data } = await supabaseClient.auth.getUser();
        const { user } = data;

        if (user) {
            return user.role;
        }

        return null;
    },
    getIdentity: async () => {
        const { data } = await supabaseClient.auth.getUser();
        const { user } = data;

        if (user) {
            return {
                ...user,
                name: user.email,
            };
        }

        return null;
    },
};

export default authProvider;
