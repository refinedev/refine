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
    {
        email: "demo@refine.dev",
        roles: ["admin"],
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
                redirectTo: "/",
            };
        }

        return {
            success: false,
            error: {
                message: "Login failed",
                name: "Invalid email or password",
            },
        };
    },
    register: async (params) => {
        // Suppose we actually send a request to the back end here.
        const user = mockUsers.find((item) => item.email === params.email);

        if (user) {
            nookies.set(null, "auth", JSON.stringify(user), {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
            });
            return {
                success: true,
                redirectTo: "/",
            };
        }
        return {
            success: false,
            error: {
                message: "Register failed",
                name: "Invalid email or password",
            },
        };
    },
    forgotPassword: async (params) => {
        // Suppose we actually send a request to the back end here.
        const user = mockUsers.find((item) => item.email === params.email);

        if (user) {
            //we can send email with reset password link here
            return {
                success: true,
            };
        }
        return {
            success: false,
            error: {
                message: "Forgot password failed",
                name: "Invalid email",
            },
        };
    },
    updatePassword: async (params) => {
        // Suppose we actually send a request to the back end here.
        const isPasswordInvalid =
            params.password === "123456" || !params.password;

        if (isPasswordInvalid) {
            return {
                success: false,
                error: {
                    message: "Update password failed",
                    name: "Invalid password",
                },
            };
        }

        return {
            success: true,
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
        const cookies = nookies.get(ctx);
        return cookies["auth"]
            ? {
                  authenticated: true,
              }
            : {
                  authenticated: false,
                  error: {
                      message: "Check failed",
                      name: "Unauthorized",
                  },
                  logout: true,
                  redirectTo: "/login",
              };
    },
    getPermissions: () => {
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
            return {
                id: 1,
                name: "Jane Doe",
                avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
            };
        }
        return null;
    },
};
