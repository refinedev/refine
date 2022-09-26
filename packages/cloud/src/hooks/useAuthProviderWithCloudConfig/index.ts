import { AuthProvider } from "@pankod/refine-core";
import { IUser } from "@pankod/refine-sdk";

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
                login: async ({ email, password, providerName }) => {
                    if (providerName) {
                        const baseUrl = sdk.getBaseUrl();
                        const applicationClientId = sdk.getClientId();
                        const redirectUrl = `${baseUrl}/oauth/${providerName}?applicationClientId=${applicationClientId}`;
                        console.log("--redirectUrl", redirectUrl);
                        window.location.href = redirectUrl;

                        return Promise.resolve(false);
                    }

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
                checkAuth: async () => {
                    sdk.auth.getSessionFromUrl();

                    const isAuthenticated = await sdk.auth.isAuthenticated();

                    if (!isAuthenticated) {
                        return Promise.reject();
                    }

                    return await sdk.auth.session();
                },
                getPermissions: () =>
                    sdk.auth
                        .session()
                        .then((user: IUser) =>
                            Promise.resolve(
                                user.roles.map((role) => role.name),
                            ),
                        )
                        .catch(() => Promise.reject()),

                getUserIdentity: () =>
                    sdk.auth
                        .session()
                        .then((user: IUser) => {
                            return Promise.resolve(user);
                        })
                        .catch(() => Promise.reject()),
            };
        };

        return {
            generateCloudAuthProvider,
        };
    };
