import { notification } from "@pankod/refine-antd";
import { AuthProvider } from "@pankod/refine-core";
import { IUser, Client } from "@pankod/refine-sdk";

import { useSdk } from "../useSdk";

type UseAuthProviderWithCloudConfigReturn = {
    generateCloudAuthProvider: () => AuthProvider;
};

const redirectOAuth = (payload: {
    sdk: Client;
    providerName?: string;
}): void | Promise<boolean> => {
    const { sdk, providerName } = payload;
    if (providerName) {
        const baseUrl = sdk.getBaseUrl();
        const applicationClientId = sdk.getClientId();
        const redirectUrl = `${baseUrl}/oauth/${providerName}?applicationClientId=${applicationClientId}`;
        console.log("--redirectUrl", redirectUrl);
        window.location.href = redirectUrl;

        return Promise.resolve(false);
    }
};

// TODO: Add hook docs
export const useAuthProviderWithCloudConfig =
    (): UseAuthProviderWithCloudConfigReturn => {
        const { sdk } = useSdk();

        const generateCloudAuthProvider = (): AuthProvider => {
            return {
                updatePassword: async ({
                    token,
                    password,
                    confirmPassword,
                }) => {
                    return await sdk.auth
                        .resetPassword({
                            token,
                            password,
                            confirmPassword,
                        })
                        .then(() => {
                            notification.open({
                                type: "success",
                                message: "Success",
                                description:
                                    "Your password has been updated. You can now log in with your new password.",
                            });
                            return Promise.resolve("/login");
                        })
                        .catch((err) =>
                            Promise.reject({
                                message: "Error",
                                name: err.message,
                            }),
                        );
                },
                forgotPassword: async ({ email }) => {
                    return await sdk.auth
                        .forgotPassword({ email })
                        .then(() => {
                            notification.open({
                                type: "success",
                                message: "Success",
                                description:
                                    "Please check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.",
                            });
                            return Promise.resolve();
                        })
                        .catch((err) =>
                            Promise.reject({
                                message: "Error",
                                name: err.message,
                            }),
                        );
                },
                register: async ({ email, password, providerName }) => {
                    // handle oauth register
                    redirectOAuth({ sdk, providerName });

                    return sdk.auth
                        .register({
                            // TODO: Add name field
                            name: `${email}`.split("@")[0],
                            email,
                            password,
                        })
                        .then(() => Promise.resolve())
                        .catch((err) =>
                            Promise.reject({
                                message: "Error",
                                name: err.message,
                            }),
                        );
                },
                login: async ({ email, password, providerName }) => {
                    // handle oauth login
                    redirectOAuth({ sdk, providerName });

                    return sdk.auth
                        .login({
                            email,
                            password,
                        })
                        .then(() => Promise.resolve())
                        .catch((err) =>
                            Promise.reject({
                                message: "Error",
                                name: err.message,
                            }),
                        );
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
