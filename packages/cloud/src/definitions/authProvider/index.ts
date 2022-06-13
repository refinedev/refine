import { AuthProvider } from "@pankod/refine-core";
import { Client } from "@pankod/refine-sdk";

export const authProvider = (sdk: Client): AuthProvider => {
    return {
        login: async ({ username, password }) => {
            return sdk.auth
                .login({
                    email: username,
                    password,
                })
                .then(() => Promise.resolve())
                .catch(() => Promise.reject());
        },
        logout: () => sdk.auth.logout(),
        // TODO: Check error status
        checkError: (error) => {
            // if (error && error.statusCode === 401) {
            //     return Promise.reject();
            // }
            return Promise.resolve();
        },
        checkAuth: () =>
            sdk.auth
                .session()
                .then(() => Promise.resolve())
                .catch(() => Promise.reject()),

        // TODO: Add roles on refine cloud
        getPermissions: () =>
            sdk.auth
                .session()
                .then(() => Promise.resolve())
                .catch(() => Promise.reject()),

        getUserIdentity: () =>
            sdk.auth
                .session()
                .then((user) => {
                    return Promise.resolve(user);
                })
                .catch(() => Promise.reject()),
    };
};
