import { renderHook, waitFor } from "@testing-library/react";

import { TestWrapper, act, mockRouterBindings } from "@test";

import { useRegister } from ".";

const mockGo = jest.fn();

const mockRouterProvider = mockRouterBindings({
    fns: {
        go: () => mockGo,
    },
});

// NOTE : Will be removed in v5
describe("v3LegacyAuthProviderCompatible useRegister Hook", () => {
    beforeEach(() => {
        mockGo.mockReset();
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message?.message === "Missing fields") return;
            if (typeof message === "undefined") return;
            console.warn(message);
        });
    });

    it("succeed register", async () => {
        const { result } = renderHook(
            () => useRegister({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        register: ({ email, password }) => {
                            if (email && password) {
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
                    routerProvider: mockRouterProvider,
                }),
            },
        );

        const { mutate: register } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            register({ email: "test", password: "test" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(mockGo).toBeCalledWith({ to: "/", type: "replace" });
    });

    it("should successfully register with no redirect", async () => {
        const { result } = renderHook(
            () => useRegister({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        register: ({ email, password }) => {
                            if (email && password) {
                                return Promise.resolve(false);
                            }
                            return Promise.reject(new Error("Missing fields"));
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

        const { mutate: register } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            register({ email: "test", password: "test" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(mockGo).not.toBeCalled();
    });

    it("fail register", async () => {
        const { result } = renderHook(
            () => useRegister({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        register: () =>
                            Promise.reject(new Error("Missing fields")),
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.resolve(),
                        getPermissions: () => Promise.resolve(),
                        logout: () => Promise.resolve(),
                        getUserIdentity: () => Promise.resolve({ id: 1 }),
                    },
                }),
            },
        );

        const { mutate: register } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            register({ email: "demo" });
        });

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });

        const { error } = result.current ?? { error: undefined };

        expect(error).toEqual(new Error("Missing fields"));
    });

    it("register rejected with undefined error", async () => {
        const { result } = renderHook(
            () => useRegister({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        register: () => Promise.reject(),
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.resolve(),
                        getPermissions: () => Promise.resolve(),
                        logout: () => Promise.resolve(),
                        getUserIdentity: () => Promise.resolve({ id: 1 }),
                    },
                }),
            },
        );

        const { mutate: register } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            register({ email: "demo" });
        });

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });

        const { error } = result.current ?? { error: undefined };

        expect(error).not.toBeDefined();
    });
});

describe("useRegister Hook", () => {
    const mockAuthProvider = {
        login: () => Promise.resolve({ success: true }),
        check: () => Promise.resolve({ authenticated: true }),
        logout: () => Promise.resolve({ success: true }),
        onError: () => Promise.resolve({}),
    };

    beforeEach(() => {
        mockGo.mockReset();

        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message?.message === "Missing fields") return;
            if (typeof message === "undefined") return;
            console.warn(message);
        });
    });

    it("succeed register", async () => {
        const { result } = renderHook(() => useRegister(), {
            wrapper: TestWrapper({
                authProvider: {
                    ...mockAuthProvider,
                    register: ({ email, password }: any) => {
                        if (email && password) {
                            return Promise.resolve({
                                success: true,
                                redirectTo: "/",
                            });
                        }
                        return Promise.resolve({
                            success: false,
                            error: new Error("Missing fields"),
                        });
                    },
                },
                routerProvider: mockRouterProvider,
            }),
        });

        const { mutate: register } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            register({ email: "test", password: "test" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(result.current.data?.success).toBeTruthy();

        expect(mockGo).toBeCalledWith({ to: "/", type: "replace" });
    });

    it("should successfully register with no redirect", async () => {
        const { result } = renderHook(() => useRegister(), {
            wrapper: TestWrapper({
                authProvider: {
                    ...mockAuthProvider,
                    register: ({ email, password }: any) => {
                        if (email && password) {
                            return Promise.resolve({
                                success: true,
                            });
                        }
                        return Promise.resolve({
                            success: false,
                            error: new Error("Missing fields"),
                        });
                    },
                },
                routerProvider: mockRouterProvider,
            }),
        });

        const { mutate: register } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            register({ email: "test", password: "test" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(mockGo).not.toBeCalled();
    });

    it("fail register", async () => {
        const { result } = renderHook(() => useRegister(), {
            wrapper: TestWrapper({
                authProvider: {
                    ...mockAuthProvider,
                    register: ({ email, password }: any) => {
                        if (email && password) {
                            return Promise.resolve({
                                success: true,
                            });
                        }
                        return Promise.resolve({
                            success: false,
                            error: new Error("Missing fields"),
                        });
                    },
                },
            }),
        });

        const { mutate: register } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            register({ email: "demo" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(result.current.data).toEqual({
            success: false,
            error: new Error("Missing fields"),
        });
    });

    it("register rejected with undefined error", async () => {
        const { result } = renderHook(() => useRegister(), {
            wrapper: TestWrapper({
                authProvider: {
                    ...mockAuthProvider,
                    register: ({ email, password }: any) => {
                        if (email && password) {
                            return Promise.resolve({
                                success: true,
                            });
                        }
                        return Promise.resolve({
                            success: false,
                        });
                    },
                },
            }),
        });

        const { mutate: register } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            register({ email: "demo" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(result.current.data?.error).toBeUndefined();
    });

    it("should open notification when has error is true", async () => {
        const openNotificationMock = jest.fn();

        const { result } = renderHook(() => useRegister(), {
            wrapper: TestWrapper({
                notificationProvider: {
                    open: openNotificationMock,
                },
                authProvider: {
                    ...mockAuthProvider,
                    register: () => {
                        return Promise.resolve({
                            success: false,
                            error: new Error("Error"),
                        });
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
                key: "register-error",
                type: "error",
                message: "Error",
                description: "Error",
            });
        });
    });

    it("should open notification when has success is false, error is undefined", async () => {
        const openNotificationMock = jest.fn();

        const { result } = renderHook(() => useRegister(), {
            wrapper: TestWrapper({
                notificationProvider: {
                    open: openNotificationMock,
                },
                authProvider: {
                    ...mockAuthProvider,
                    register: () => Promise.resolve({ success: false }),
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
                key: "register-error",
                type: "error",
                message: "Register Error",
                description: "Error while registering",
            });
        });
    });

    it("should open notification when throw error", async () => {
        const openNotificationMock = jest.fn();

        const { result } = renderHook(() => useRegister(), {
            wrapper: TestWrapper({
                notificationProvider: {
                    open: openNotificationMock,
                },
                authProvider: {
                    ...mockAuthProvider,
                    register: () => {
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
                key: "register-error",
                type: "error",
                message: "Error",
                description: "Unhandled error",
            });
        });
    });
});

// NOTE : Will be removed in v5
describe("useRegister Hook authProvider selection", () => {
    it("selects new authProvider", async () => {
        const legacyRegisterMock = jest.fn(() => Promise.resolve());
        const registerMock = jest.fn(() => Promise.resolve({ success: true }));

        const { result } = renderHook(() => useRegister(), {
            wrapper: TestWrapper({
                legacyAuthProvider: {
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                    register: () => legacyRegisterMock(),
                },
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    logout: () => Promise.resolve({ success: true }),
                    register: () => registerMock(),
                },
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

        expect(legacyRegisterMock).not.toHaveBeenCalled();
        expect(registerMock).toHaveBeenCalled();
    });

    it("selects v3LegacyAuthProviderCompatible authProvider", async () => {
        const legacyRegisterMock = jest.fn(() => Promise.resolve());
        const registerMock = jest.fn(() => Promise.resolve({ success: true }));

        const { result } = renderHook(
            () => useRegister({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.resolve(),
                        logout: () => Promise.resolve(),
                        register: () => legacyRegisterMock(),
                    },
                    authProvider: {
                        login: () => Promise.resolve({ success: true }),
                        check: () => Promise.resolve({ authenticated: true }),
                        onError: () => Promise.resolve({}),
                        logout: () => Promise.resolve({ success: true }),
                        register: () => registerMock(),
                    },
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

        expect(legacyRegisterMock).toHaveBeenCalled();
        expect(registerMock).not.toHaveBeenCalled();
    });
});
