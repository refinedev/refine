import { AuthBindings } from "@pankod/refine-core";
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
    login: ({ email }) => {
        // Suppose we actually send a request to the back end here.
        const user = mockUsers.find((item) => item.email === email);

        if (user) {
            nookies.set(null, "auth", JSON.stringify(user), {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
            });
            return Promise.resolve({
                success: true,
            });
        }

        return Promise.resolve({
            success: false,
        });
    },
    logout: () => {
        nookies.destroy(null, "auth");
        return Promise.resolve({
            success: true,
            redirectTo: "/login",
        });
    },
    onError: (error) => {
        if (error && error.statusCode === 401) {
            return Promise.resolve({
                error: "Unauthorized",
                logout: true,
                redirectTo: "/login",
            });
        }

        return Promise.resolve({});
    },
    check: (ctx) => {
        const cookies = nookies.get(ctx);
        return cookies["auth"]
            ? Promise.resolve({
                  authenticated: true,
              })
            : Promise.resolve({
                  authenticated: false,
                  error: new Error("Unauthorized"),
                  logout: true,
                  redirectTo: "/login",
              });
    },
    getPermissions: () => {
        const auth = nookies.get()["auth"];
        if (auth) {
            const parsedUser = JSON.parse(auth);
            return Promise.resolve(parsedUser.roles);
        }
        return Promise.resolve();
    },
    getIdentity: () => {
        const auth = nookies.get()["auth"];
        if (auth) {
            const parsedUser = JSON.parse(auth);
            return Promise.resolve(parsedUser.username);
        }
        return Promise.resolve();
    },
};
