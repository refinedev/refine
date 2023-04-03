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
    login: async ({ email }) => {
        // Suppose we actually send a request to the back end here.
        const user = mockUsers.find((item) => item.email === email);

        if (user) {
            Cookies.set(COOKIE_NAME, JSON.stringify(user));
            return {
                success: true,
                redirectTo: "/",
            };
        }

        return {
            success: false,
        };
    },
    logout: async () => {
        Cookies.remove(COOKIE_NAME);

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
    check: async (request) => {
        let user = undefined;
        if (request) {
            const hasCookie = request.headers.get("Cookie");
            if (hasCookie) {
                const parsedCookie = cookie.parse(
                    request.headers.get("Cookie"),
                );
                user = parsedCookie[COOKIE_NAME];
            }
        } else {
            const parsedCookie = Cookies.get(COOKIE_NAME);
            user = parsedCookie ? JSON.parse(parsedCookie) : undefined;
        }

        const { pathname } = new URL(request.url);

        const query =
            pathname === "/" ? "" : `?to=${encodeURIComponent(pathname)}`;

        if (!user) {
            return {
                authenticated: false,
                error: {
                    message: "Check failed",
                    name: "Unauthorized",
                },
                logout: true,
                redirectTo: `/login${query}`,
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
