import { AuthProvider } from "@pankod/refine-core";

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
        const user = mockUsers.find((item) => item.username === username);

        if (user) {
            return Promise.resolve(user);
        }

        return Promise.reject();
    },
    logout: async ({ request, storage }) => {
        await storage.logout({ request });
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

        const user = session.get("user");

        if (!user) {
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getPermissions: async () => {
        return Promise.resolve();
    },
    getUserIdentity: async () => {
        return Promise.resolve();
    },
};
