import { renderHook, waitFor } from "@testing-library/react";

import { TestWrapper, act } from "@test";

import { useForgotPassword } from ".";

// NOTE : Will be removed in v5
describe("v3LegacyAuthProviderCompatible useForgotPassword Hook", () => {
    beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message?.message === "Missing email") return;
            if (typeof message === "undefined") return;
            console.warn(message);
        });
    });

    it("succeed forgot password", async () => {
        const { result } = renderHook(
            () => useForgotPassword({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        forgotPassword: ({ email }) => {
                            if (email) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error("Missing email"));
                        },
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.resolve(),
                        getPermissions: () => Promise.resolve(),
                        logout: () => Promise.resolve(),
                        getUserIdentity: () => Promise.resolve({ id: 1 }),
                    },
                }),
            },
        );

        const { mutate: forgotPassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            forgotPassword({ email: "test@test.com" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });
    });

    it("fail forgot password", async () => {
        const { result } = renderHook(
            () => useForgotPassword({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        forgotPassword: () =>
                            Promise.reject(new Error("Missing email")),
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.resolve(),
                        getPermissions: () => Promise.resolve(),
                        logout: () => Promise.resolve(),
                        getUserIdentity: () => Promise.resolve({ id: 1 }),
                    },
                }),
            },
        );

        const { mutate: forgotPassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            forgotPassword({});
        });

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });

        const { error } = result.current ?? { error: undefined };

        expect(error).toEqual(new Error("Missing email"));
    });
});

describe("useForgotPassword Hook", () => {
    const mockAuthProvider = {
        login: () =>
            Promise.resolve({
                success: true,
            }),
        check: () => Promise.resolve({ authenticated: true }),
        onError: () => Promise.resolve({}),
        logout: () => Promise.resolve({ success: true }),
    };

    beforeEach(() => {
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message?.message === "Missing email") return;
            if (typeof message === "undefined") return;
            console.warn(message);
        });
    });

    it("succeed forgot password", async () => {
        const { result } = renderHook(() => useForgotPassword(), {
            wrapper: TestWrapper({
                authProvider: {
                    ...mockAuthProvider,
                    forgotPassword: (params: any) => {
                        if (!params?.["email"]) {
                            return Promise.resolve({ success: false });
                        }
                        return Promise.resolve({ success: true });
                    },
                },
            }),
        });

        const { mutate: forgotPassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            forgotPassword({ email: "test@test.com" });
        });

        await waitFor(() => {
            expect(result.current.data?.success).toBeTruthy();
        });
    });

    it("fail forgot password", async () => {
        const { result } = renderHook(() => useForgotPassword(), {
            wrapper: TestWrapper({
                authProvider: {
                    ...mockAuthProvider,
                    forgotPassword: () =>
                        Promise.resolve({
                            success: false,
                            error: new Error("Missing email"),
                        }),
                },
            }),
        });

        const { mutate: forgotPassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            forgotPassword({});
        });

        await waitFor(() => {
            expect(result.current.data).toEqual({
                success: false,
                error: new Error("Missing email"),
            });
        });
    });

    it("should open notification when has error is true", async () => {
        const openNotificationMock = jest.fn();

        const { result } = renderHook(() => useForgotPassword(), {
            wrapper: TestWrapper({
                notificationProvider: {
                    open: openNotificationMock,
                },
                authProvider: {
                    ...mockAuthProvider,
                    forgotPassword: () =>
                        Promise.resolve({
                            success: false,
                            error: new Error("Missing email"),
                        }),
                },
            }),
        });

        const { mutate: forgotPassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            forgotPassword({});
        });

        await waitFor(() => {
            expect(openNotificationMock).toBeCalledWith({
                key: "forgot-password-error",
                type: "error",
                message: "Error",
                description: "Missing email",
            });
        });
    });

    it("should open notification when has success is false, error is undefined", async () => {
        const openNotificationMock = jest.fn();

        const { result } = renderHook(() => useForgotPassword(), {
            wrapper: TestWrapper({
                notificationProvider: {
                    open: openNotificationMock,
                },
                authProvider: {
                    ...mockAuthProvider,
                    forgotPassword: () =>
                        Promise.resolve({
                            success: false,
                        }),
                },
            }),
        });

        const { mutate: forgotPassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            forgotPassword({});
        });

        await waitFor(() => {
            expect(openNotificationMock).toBeCalledWith({
                key: "forgot-password-error",
                type: "error",
                message: "Forgot Password Error",
                description: "Error while resetting password",
            });
        });
    });

    it("should open notification when throw error", async () => {
        const openNotificationMock = jest.fn();

        const { result } = renderHook(() => useForgotPassword(), {
            wrapper: TestWrapper({
                notificationProvider: {
                    open: openNotificationMock,
                },
                authProvider: {
                    ...mockAuthProvider,
                    forgotPassword: () => {
                        throw new Error("Unhandled error");
                    },
                },
            }),
        });

        const { mutate: forgotPassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            forgotPassword({});
        });

        await waitFor(() => {
            expect(openNotificationMock).toBeCalledWith({
                key: "forgot-password-error",
                type: "error",
                message: "Error",
                description: "Unhandled error",
            });
        });
    });
});

// NOTE : Will be removed in v5
describe("useForgotPassword Hook authProvider selection", () => {
    it("selects new authProvider", async () => {
        const legacyForgotPasswordMock = jest.fn(() => Promise.resolve());
        const forgotPasswordMock = jest.fn(() =>
            Promise.resolve({
                success: true,
            }),
        );

        const { result } = renderHook(() => useForgotPassword(), {
            wrapper: TestWrapper({
                legacyAuthProvider: {
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    forgotPassword: () => legacyForgotPasswordMock(),
                },
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    logout: () => Promise.resolve({ success: true }),
                    forgotPassword: () => forgotPasswordMock(),
                },
            }),
        });

        const { mutate: forgotPassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            forgotPassword({});
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBeFalsy();
        });

        expect(legacyForgotPasswordMock).not.toHaveBeenCalled();
        expect(forgotPasswordMock).toHaveBeenCalled();
    });

    it("selects v3LegacyAuthProviderCompatible authProvider", async () => {
        const legacyForgotPasswordMock = jest.fn(() => Promise.resolve());
        const forgotPasswordMock = jest.fn(() =>
            Promise.resolve({ success: true }),
        );

        const { result } = renderHook(
            () => useForgotPassword({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.resolve(),
                        forgotPassword: () => legacyForgotPasswordMock(),
                    },
                    authProvider: {
                        login: () => Promise.resolve({ success: true }),
                        check: () => Promise.resolve({ authenticated: true }),
                        onError: () => Promise.resolve({}),
                        logout: () => Promise.resolve({ success: true }),
                        forgotPassword: () => forgotPasswordMock(),
                    },
                }),
            },
        );

        const { mutate: forgotPassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            forgotPassword({});
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBeFalsy();
        });

        expect(legacyForgotPasswordMock).toHaveBeenCalled();
        expect(forgotPasswordMock).not.toHaveBeenCalled();
    });
});
