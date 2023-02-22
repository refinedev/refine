import { renderHook, waitFor } from "@testing-library/react";

import { TestWrapper, act, mockRouterBindings } from "@test";

import { useLogin } from "./";

const mockGo = jest.fn();

const mockRouterProvider = mockRouterBindings({
    fns: {
        go: () => mockGo,
    },
});

describe("useLogin Hook", () => {
    beforeEach(() => {
        mockGo.mockReset();

        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message?.message === "Wrong email") return;
            if (typeof message === "undefined") return;
            console.warn(message);
        });
    });

    it("succeed login", async () => {
        const { result } = renderHook(() => useLogin(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: ({ email }) => {
                        if (email === "test") {
                            return Promise.resolve();
                        }

                        return Promise.reject(new Error("Wrong email"));
                    },
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                    getUserIdentity: () => Promise.resolve({ id: 1 }),
                },
                routerProvider: mockRouterProvider,
            }),
        });

        const { mutate: login } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            login({ email: "test" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(mockGo).toBeCalledWith({ to: "/", type: "replace" });
    });

    it("should successfully login with no redirect", async () => {
        const { result } = renderHook(() => useLogin(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: ({ email }) => {
                        if (email === "test") {
                            return Promise.resolve(false);
                        }

                        return Promise.reject(new Error("Wrong email"));
                    },
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                    getUserIdentity: () => Promise.resolve({ id: 1 }),
                },
                routerProvider: mockRouterProvider,
            }),
        });

        const { mutate: login } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            login({ email: "test" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(mockGo).not.toBeCalled();
    });

    it("login and redirect to custom path", async () => {
        const { result } = renderHook(() => useLogin(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: ({ email, redirectPath }) => {
                        if (email === "test") {
                            return Promise.resolve(redirectPath);
                        }

                        return Promise.reject(new Error("Wrong email"));
                    },
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                    getUserIdentity: () => Promise.resolve({ id: 1 }),
                },
                routerProvider: mockRouterProvider,
            }),
        });

        const { mutate: login } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            login({ email: "test", redirectPath: "/custom-path" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(mockGo).toBeCalledWith({ to: "/custom-path", type: "replace" });
    });

    it("If URL has 'to' params the app will redirect to 'to' values", async () => {
        const { result } = renderHook(() => useLogin(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: ({ email, redirectPath }) => {
                        if (email === "test") {
                            return Promise.resolve(redirectPath);
                        }

                        return Promise.reject(new Error("Wrong email"));
                    },
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                    getUserIdentity: () => Promise.resolve({ id: 1 }),
                },
                routerProvider: mockRouterBindings({
                    fns: {
                        go: () => mockGo,
                    },
                    params: {
                        to: "/show/posts/5",
                    },
                }),
            }),
        });

        const { mutate: login } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            login({ email: "test", redirectPath: "/custom-path" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(mockGo).toBeCalledWith({ type: "replace", to: "/show/posts/5" });
    });

    it("fail login", async () => {
        const { result } = renderHook(() => useLogin(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.reject(new Error("Wrong email")),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                    getUserIdentity: () => Promise.resolve({ id: 1 }),
                },
            }),
        });

        const { mutate: login } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            login({ email: "demo" });
        });

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });

        const { error } = result.current ?? { error: undefined };

        expect(error).toEqual(new Error("Wrong email"));
    });

    it("login rejected with undefined error", async () => {
        const { result } = renderHook(() => useLogin(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.reject(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                    getUserIdentity: () => Promise.resolve({ id: 1 }),
                },
            }),
        });

        const { mutate: login } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            login({ email: "demo" });
        });

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });

        const { error } = result.current ?? { error: undefined };

        expect(error).not.toBeDefined();
    });
});
