import { LegacyAuthProvider } from "@refinedev/core";
import { IUser } from "@refinedev/sdk";

import { useSdk } from "../useSdk";

type UseAuthProviderWithConnectConfigReturn = {
    generateConnectAuthProvider: () => LegacyAuthProvider;
};

// TODO: Add hook docs
export const useAuthProviderWithConnectConfig =
    (): UseAuthProviderWithConnectConfigReturn => {
        const { sdk } = useSdk();

        const generateConnectAuthProvider = (): LegacyAuthProvider => {
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
            generateConnectAuthProvider,
        };
    };
