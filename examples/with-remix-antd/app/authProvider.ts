import { AuthBindings } from "@refinedev/core";
import Cookies from "js-cookie";
import * as cookie from "cookie";

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

const COOKIE_NAME = "user";

export const authProvider: AuthBindings = {
    login: ({ email }) => {
        // Suppose we actually send a request to the back end here.
        const user = mockUsers.find((item) => item.email === email);

        if (user) {
            Cookies.set(COOKIE_NAME, JSON.stringify(user));
            return {
                success: true,
            };
        }

        return {
            success: false,
        };
    },
    logout: () => {
        Cookies.remove(COOKIE_NAME);

        return {
            success: true,
            redirectTo: "/login",
        };
    },
    onError: (error) => {
        if (error && error.statusCode === 401) {
            return {
                error: new Error("Unauthorized"),
                logout: true,
                redirectTo: "/login",
            };
        }

        return {};
    },
    check: async (context) => {
        let user = undefined;
        if (context) {
            const { request } = context;
            const parsedCookie = cookie.parse(request.headers.get("Cookie"));
            user = parsedCookie[COOKIE_NAME];
        } else {
            const parsedCookie = Cookies.get(COOKIE_NAME);
            user = parsedCookie ? JSON.parse(parsedCookie) : undefined;
        }

        if (!user) {
            return {
                authenticated: false,
                error: new Error("Unauthorized"),
                logout: true,
                redirectTo: "/login",
            };
        }

        return {
            authenticated: true,
        };
    },
    getPermissions: async () => {
        return null;
    },
    getIdentity: async () => {
        return null;
    },
};
