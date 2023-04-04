import { AuthBindings } from "@refinedev/core";
import nookies from "nookies";

const mockUsers = [
    {
        email: "admin@refine.dev",
        roles: ["admin"],
    },
    {
        email: "editor@refine.dev",
        roles: ["editor"],
    },
];

export const authProvider: AuthBindings = {
    login: async ({ email }) => {
        // Suppose we actually send a request to the back end here.
        const user = mockUsers.find((item) => item.email === email);

        if (user) {
            nookies.set(null, "auth", JSON.stringify(user), {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
            });
            return {
                success: true,
            };
        }

        return {
            success: false,
        };
    },
    logout: async () => {
        nookies.destroy(null, "auth");
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    onError: async (error) => {
        if (error && error.statusCode === 401) {
            return {
                error: new Error("Unauthorized"),
                logout: true,
                redirectTo: "/login",
            };
        }

        return {};
    },
    check: async (ctx) => {
        if (ctx) {
            if (ctx.cookies?.get?.("auth")) {
                return {
                    authenticated: true,
                };
            } else {
                return {
                    authenticated: false,
                    error: {
                        message: "Check failed",
                        name: "Unauthorized",
                    },
                    logout: true,
                    redirectTo: "/login",
                };
            }
        } else {
            const cookies = nookies.get(null);
            if (cookies.auth) {
                return {
                    authenticated: true,
                };
            } else {
                return {
                    authenticated: false,
                    error: {
                        message: "Check failed",
                        name: "Unauthorized",
                    },
                    logout: true,
                    redirectTo: "/login",
                };
            }
        }
    },
    getPermissions: async () => {
        const auth = nookies.get()["auth"];
        if (auth) {
            const parsedUser = JSON.parse(auth);
            return parsedUser.roles;
        }
        return null;
    },
    getIdentity: async () => {
        const auth = nookies.get()["auth"];
        if (auth) {
            const parsedUser = JSON.parse(auth);
            return parsedUser.username ?? parsedUser.email;
        }
        return null;
    },
};
