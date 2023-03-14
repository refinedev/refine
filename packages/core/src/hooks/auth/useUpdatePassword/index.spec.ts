import { renderHook, waitFor } from "@testing-library/react";

import { TestWrapper, act, mockLegacyRouterProvider } from "@test";

import { useUpdatePassword } from "./";

const mockFn = jest.fn();

const mockRouterProvider = {
    ...mockLegacyRouterProvider(),
    useHistory: () => ({
        push: mockFn,
        replace: mockFn,
    }),
    useLocation: () => ({}),
};

// NOTE : Will be removed in v5
describe("v3LegacyAuthProviderCompatible useUpdatePassword Hook", () => {
    beforeEach(() => {
        mockFn.mockReset();
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message?.message === "Missing fields") return;
            if (typeof message === "undefined") return;
            console.warn(message);
        });
    });

    it("succeed update password", async () => {
        const { result } = renderHook(
            () => useUpdatePassword({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        updatePassword: ({ password, confirmPassword }) => {
                            if (password && confirmPassword) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error("Missing fields"));
                        },
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.resolve(),
                        getPermissions: () => Promise.resolve(),
                        logout: () => Promise.resolve(),
                        getUserIdentity: () => Promise.resolve({ id: 1 }),
                    },
                    legacyRouterProvider: mockRouterProvider,
                }),
            },
        );

        const { mutate: updatePassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            updatePassword({ password: "123", confirmPassword: "321" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(mockFn).not.toBeCalledWith();
    });

    it("fail update password", async () => {
        const { result } = renderHook(
            () => useUpdatePassword({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        updatePassword: () =>
                            Promise.reject(new Error("Missing fields")),
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.resolve(),
                        getPermissions: () => Promise.resolve(),
                        logout: () => Promise.resolve(),
                        getUserIdentity: () => Promise.resolve({ id: 1 }),
                    },
                    legacyRouterProvider: mockRouterProvider,
                }),
            },
        );

        const { mutate: updatePassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            updatePassword({ password: "123" });
        });

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });

        const { error } = result.current ?? { error: undefined };

        expect(error).toEqual(new Error("Missing fields"));
    });
});

describe("useUpdatePassword Hook", () => {
    const mockAuthProvider = {
        login: () => Promise.resolve({ success: true }),
        check: () => Promise.resolve({ authenticated: true }),
        onError: () => Promise.resolve({}),
        logout: () => Promise.resolve({ success: true }),
    };

    beforeEach(() => {
        mockFn.mockReset();
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message?.message === "Missing fields") return;
            if (typeof message === "undefined") return;
            console.warn(message);
        });
    });

    it("succeed update password", async () => {
        const { result } = renderHook(() => useUpdatePassword(), {
            wrapper: TestWrapper({
                authProvider: {
                    ...mockAuthProvider,
                    updatePassword: ({ password, confirmPassword }: any) => {
                        if (password && confirmPassword) {
                            return Promise.resolve({ success: true });
                        }
                        return Promise.resolve({
                            success: false,
                            error: new Error("Missing fields"),
                        });
                    },
                },
                legacyRouterProvider: mockRouterProvider,
            }),
        });

        const { mutate: updatePassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            updatePassword({ password: "123", confirmPassword: "321" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(result.current.data).toEqual({ success: true });
        expect(mockFn).not.toBeCalledWith();
    });

    it("fail update password", async () => {
        const { result } = renderHook(() => useUpdatePassword(), {
            wrapper: TestWrapper({
                authProvider: {
                    ...mockAuthProvider,
                    updatePassword: ({ password, confirmPassword }: any) => {
                        if (password && confirmPassword) {
                            return Promise.resolve({ success: true });
                        }
                        return Promise.resolve({
                            success: false,
                            error: new Error("Missing fields"),
                        });
                    },
                },
                legacyRouterProvider: mockRouterProvider,
            }),
        });

        const { mutate: updatePassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            updatePassword({ password: "123" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(result.current.data).toEqual({
            success: false,
            error: new Error("Missing fields"),
        });
        expect(mockFn).not.toBeCalledWith();
    });

    it("success and redirect", async () => {
        const { result } = renderHook(() => useUpdatePassword(), {
            wrapper: TestWrapper({
                authProvider: {
                    ...mockAuthProvider,

                    updatePassword: ({ password, confirmPassword }: any) => {
                        if (password && confirmPassword) {
                            return Promise.resolve({
                                success: true,
                                redirectTo: "/login",
                            });
                        }
                        return Promise.resolve({
                            success: false,
                            error: new Error("Missing fields"),
                        });
                    },
                },
                legacyRouterProvider: mockRouterProvider,
            }),
        });

        const { mutate: updatePassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            updatePassword({ password: "123", confirmPassword: "321" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(result.current.data).toEqual({
            success: true,
            redirectTo: "/login",
        });
        expect(mockFn).toBeCalledWith("/login");
    });

    it("fail and redirect", async () => {
        mockFn;
        const { result } = renderHook(() => useUpdatePassword(), {
            wrapper: TestWrapper({
                authProvider: {
                    ...mockAuthProvider,

                    updatePassword: ({ password, confirmPassword }: any) => {
                        if (password && confirmPassword) {
                            return Promise.resolve({
                                success: true,
                            });
                        }
                        return Promise.resolve({
                            success: false,
                            error: new Error("Missing fields"),
                            redirectTo: "/register",
                        });
                    },
                },
                legacyRouterProvider: mockRouterProvider,
            }),
        });

        const { mutate: updatePassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            updatePassword({ confirmPassword: "321" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(result.current.data).toEqual({
            success: false,
            error: new Error("Missing fields"),
            redirectTo: "/register",
        });
        expect(mockFn).toBeCalledWith("/register");
    });

    it("should open notification when has error is true", async () => {
        const openNotificationMock = jest.fn();

        const { result } = renderHook(() => useUpdatePassword(), {
            wrapper: TestWrapper({
                notificationProvider: {
                    open: openNotificationMock,
                },
                authProvider: {
                    ...mockAuthProvider,
                    updatePassword: () =>
                        Promise.resolve({
                            success: false,
                            error: new Error("Error"),
                        }),
                },
                legacyRouterProvider: mockRouterProvider,
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
                key: "update-password-error",
                type: "error",
                message: "Error",
                description: "Error",
            });
        });
    });

    it("should open notification when has success is false, error is undefined", async () => {
        const openNotificationMock = jest.fn();

        const { result } = renderHook(() => useUpdatePassword(), {
            wrapper: TestWrapper({
                notificationProvider: {
                    open: openNotificationMock,
                },
                authProvider: {
                    ...mockAuthProvider,
                    updatePassword: () => Promise.resolve({ success: false }),
                },
                legacyRouterProvider: mockRouterProvider,
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
                key: "update-password-error",
                type: "error",
                message: "Update Password Error",
                description: "Error while updating password",
            });
        });
    });

    it("should open notification when throw error", async () => {
        const openNotificationMock = jest.fn();

        const { result } = renderHook(() => useUpdatePassword(), {
            wrapper: TestWrapper({
                notificationProvider: {
                    open: openNotificationMock,
                },
                legacyRouterProvider: mockRouterProvider,
                authProvider: {
                    ...mockAuthProvider,
                    updatePassword: () => {
                        throw new Error("Unhandled error");
                        return Promise.resolve({ success: true });
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
                key: "update-password-error",
                type: "error",
                message: "Error",
                description: "Unhandled error",
            });
        });
    });
});

// NOTE : Will be removed in v5
describe("useUpdatePassword Hook authProvider selection", () => {
    it("selects new authProvider", async () => {
        const legacyUpdatePassword = jest.fn(() => Promise.resolve());
        const updatePassword = jest.fn(() =>
            Promise.resolve({ success: true }),
        );

        const { result } = renderHook(() => useUpdatePassword(), {
            wrapper: TestWrapper({
                legacyAuthProvider: {
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                    updatePassword: () => legacyUpdatePassword(),
                },
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    logout: () => Promise.resolve({ success: true }),
                    updatePassword: () => updatePassword(),
                },
                legacyRouterProvider: mockRouterProvider,
            }),
        });

        const { mutate: login } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            login({});
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBeFalsy();
        });

        expect(legacyUpdatePassword).not.toHaveBeenCalled();
        expect(updatePassword).toHaveBeenCalled();
    });

    it("selects v3LegacyAuthProviderCompatible authProvider", async () => {
        const legacyUpdatePassword = jest.fn(() => Promise.resolve());
        const updatePassword = jest.fn(() =>
            Promise.resolve({ success: true }),
        );

        const { result } = renderHook(
            () => useUpdatePassword({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.resolve(),
                        logout: () => Promise.resolve(),
                        updatePassword: () => legacyUpdatePassword(),
                    },
                    authProvider: {
                        login: () => Promise.resolve({ success: true }),
                        check: () => Promise.resolve({ authenticated: true }),
                        onError: () => Promise.resolve({}),
                        logout: () => Promise.resolve({ success: true }),
                        updatePassword: () => updatePassword(),
                    },
                    legacyRouterProvider: mockRouterProvider,
                }),
            },
        );

        const { mutate: login } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            login({});
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBeFalsy();
        });

        expect(legacyUpdatePassword).toHaveBeenCalled();
        expect(updatePassword).not.toHaveBeenCalled();
    });
});
