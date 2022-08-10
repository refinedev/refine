import { AuthProvider } from "@pankod/refine-core";
import { createCookieSessionStorage } from "@remix-run/node";
import { login } from "~/session.server";

const mockUsers = [
    {
        username: "admin",
        roles: ["admin"],
    },
    {
        username: "editor",
        roles: ["editor"],
    },
];

export const authProvider: AuthProvider = {
    login: ({ username, password, remember }) => {
        // Suppose we actually send a request to the back end here.
        const user = mockUsers[0]; // mockUsers.find((item) => item.username === username);

        if (user) {
            return Promise.resolve(user as any);
        }

        return Promise.reject();
    },
    logout: () => {
        return Promise.resolve();
    },
    checkError: (error) => {
        if (error && error.statusCode === 401) {
            return Promise.reject();
        }

        return Promise.resolve();
    },
    checkAuth: async ({ request, storage }) => {
        const session = await storage.getSession(request.headers.get("Cookie"));

        const userId = session.get("userId");
        console.log("userId", { userId });

        if (!userId || typeof userId !== "string") {
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getPermissions: () => {
        return Promise.resolve(["admin"]);
        /* const auth = nookies.get()["auth"];
        if (auth) {
            const parsedUser = JSON.parse(auth);
            return Promise.resolve(parsedUser.roles);
        }
        return Promise.reject(); */
    },
    getUserIdentity: () => {
        return Promise.resolve("admin");
        /*  const auth = nookies.get()["auth"];
        if (auth) {
            const parsedUser = JSON.parse(auth);
            return Promise.resolve(parsedUser.username);
        }
        return Promise.reject(); */
    },
};
