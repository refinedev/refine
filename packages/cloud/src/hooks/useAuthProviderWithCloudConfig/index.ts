import { notification } from "@pankod/refine-antd";
import { AuthProvider } from "@pankod/refine-core";
import { Client, RefineCloudException } from "@pankod/refine-sdk";

import { useSdk } from "../useSdk";

type UseAuthProviderWithCloudConfigReturn = {
    generateCloudAuthProvider: () => AuthProvider;
};

const redirectOAuth = (payload: { sdk: Client; providerName: string }) => {
    const { sdk, providerName } = payload;
    const baseUrl = sdk.getBaseUrl();
    const applicationClientId = sdk.getClientId();
    const redirectUrl = `${baseUrl}/oauth/${providerName}?applicationClientId=${applicationClientId}`;
    window.location.href = redirectUrl;
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
                    try {
                        await sdk.auth.resetPassword({
                            token,
                            password,
                            confirmPassword,
                        });
                        notification.open({
                            type: "success",
                            message: "Success",
                            description:
                                "Your password has been updated. You can now log in with your new password.",
                        });
                        return Promise.resolve("/login");
                    } catch (err) {
                        const { message } = err as RefineCloudException;
                        return Promise.reject({
                            message: "Error",
                            name: message,
                        });
                    }
                },
                forgotPassword: async ({ email }) => {
                    try {
                        await sdk.auth.forgotPassword({ email });

                        notification.open({
                            type: "success",
                            message: "Success",
                            description:
                                "Please check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.",
                        });
                        return Promise.resolve();
                    } catch (err) {
                        const { message } = err as RefineCloudException;
                        return Promise.reject({
                            message: "Error",
                            name: message,
                        });
                    }
                },
                register: async ({ email, password, providerName }) => {
                    // handle oauth login
                    if (providerName) {
                        redirectOAuth({ sdk, providerName });
                        return Promise.resolve(false);
                    }

                    try {
                        await sdk.auth.register({
                            // TODO: Add name field
                            name: `${email}`.split("@")[0],
                            email,
                            password,
                        });

                        return Promise.resolve();
                    } catch (err) {
                        const { message } = err as RefineCloudException;
                        return Promise.reject({
                            message: "Error",
                            name: message,
                        });
                    }
                },
                login: async ({ email, password, providerName }) => {
                    // handle oauth login
                    if (providerName) {
                        redirectOAuth({ sdk, providerName });
                        return Promise.resolve(false);
                    }

                    try {
                        await sdk.auth.login({ email, password });
                        return Promise.resolve();
                    } catch (err) {
                        const { message } = err as RefineCloudException;

                        return Promise.reject({
                            message: "Error",
                            name: message,
                        });
                    }
                },

                logout: () => sdk.auth.logout(),
                checkError: () => {
                    return Promise.resolve();
                },
                checkAuth: async () => {
                    await sdk.auth.getSessionFromUrl();

                    const isAuthenticated = await sdk.auth.isAuthenticated();

                    if (!isAuthenticated) {
                        return Promise.reject();
                    }

                    return await sdk.auth.session();
                },
                getPermissions: async () => {
                    try {
                        const user = await sdk.auth.session();
                        return Promise.resolve(
                            user.roles.map((role) => role.name),
                        );
                    } catch {
                        return Promise.reject();
                    }
                },

                getUserIdentity: async () => {
                    try {
                        const user = await sdk.auth.session();
                        return Promise.resolve(user);
                    } catch {
                        return Promise.reject();
                    }
                },
            };
        };

        return {
            generateCloudAuthProvider,
        };
    };
