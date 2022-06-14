import { AuthProvider } from "@pankod/refine-core";

import { useSdk } from "../useSdk";

type UseAuthProviderWithCloudConfigReturn = {
    generateCloudAuthProvider: () => AuthProvider;
};

// TODO: Add hook docs
export const useAuthProviderWithCloudConfig =
    (): UseAuthProviderWithCloudConfigReturn => {
        const { sdk } = useSdk();

        const generateCloudAuthProvider = (): AuthProvider => {
            return {
                login: async ({ email, password }) => {
                    return sdk.auth
                        .login({
                            email,
                            password,
                        })
                        .then(() => Promise.resolve())
                        .catch(() => Promise.reject());
                },
                logout: () => sdk.auth.logout(),
                checkError: () => {
                    return Promise.resolve();
                },
                checkAuth: () => {
                    sdk.auth.getSessionFromUrl();
                    return sdk.auth
                        .session()
                        .then(() => Promise.resolve())
                        .catch(() => Promise.reject());
                },
                // TODO: Add roles on refine cloud
                getPermissions: () =>
                    sdk.auth
                        .session()
                        .then(() => Promise.resolve())
                        .catch(() => Promise.reject()),

                getUserIdentity: () =>
                    sdk.auth
                        .session()
                        .then((user: any) => {
                            return Promise.resolve(user);
                        })
                        .catch(() => Promise.reject()),
            };
        };

        return {
            generateCloudAuthProvider,
        };
    };
