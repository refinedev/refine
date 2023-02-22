import { renderHook, waitFor } from "@testing-library/react";

import { act, mockRouterBindings, TestWrapper } from "@test";

import { useLogout } from "./";
import { useCheckError } from "../useCheckError";

const mockGo = jest.fn();

const mockRouterProvider = mockRouterBindings({
    fns: {
        go: () => mockGo,
    },
});

describe("useLogout Hook", () => {
    beforeEach(() => {
        mockGo.mockReset();

        jest.spyOn(console, "error").mockImplementation((message) => {
            if (
                message?.message === "Logout rejected" ||
                typeof message === "undefined"
            )
                return;

            console.warn(message);
        });
    });

    it("logout and redirect to login", async () => {
        const { result } = renderHook(() => useLogout(), {
            wrapper: TestWrapper({
                authProvider: {
                    isProvided: true,
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => {
                        return Promise.resolve();
                    },
                    getUserIdentity: () => Promise.resolve(),
                },
                routerProvider: mockRouterProvider,
            }),
        });

        const { mutateAsync: logout } = result.current!;

        await act(async () => {
            await logout();
        });

        await waitFor(() => {
            return !result.current?.isLoading;
        });

        await act(async () => {
            expect(mockGo).toBeCalledWith({ to: "/login" });
        });
    });

    it("logout and not redirect", async () => {
        const { result } = renderHook(() => useLogout(), {
            wrapper: TestWrapper({
                authProvider: {
                    isProvided: true,
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => {
                        return Promise.resolve(false);
                    },
                    getUserIdentity: () => Promise.resolve(),
                },
                routerProvider: mockRouterProvider,
            }),
        });

        const { mutateAsync: logout } = result.current!;

        await act(async () => {
            await logout();
        });

        await waitFor(() => {
            return !result.current?.isLoading;
        });

        await act(async () => {
            expect(mockGo).not.toBeCalled();
        });
    });

    it("logout and redirect to custom path", async () => {
        const { result } = renderHook(
            () => useLogout<{ redirectPath: string }>(),
            {
                wrapper: TestWrapper({
                    authProvider: {
                        isProvided: true,
                        login: () => Promise.resolve(),
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.resolve(),
                        getPermissions: () => Promise.resolve(),
                        logout: ({ redirectPath }) => {
                            return Promise.resolve(redirectPath);
                        },
                        getUserIdentity: () => Promise.resolve(),
                    },
                    routerProvider: mockRouterProvider,
                }),
            },
        );

        const { mutateAsync: logout } = result.current!;

        await act(async () => {
            await logout({ redirectPath: "/custom-path" });
        });

        await waitFor(() => {
            return result.current?.status === "success";
        });

        await act(async () => {
            expect(mockGo).toBeCalledWith({ to: "/custom-path" });
        });
    });

    it("logout rejected", async () => {
        const { result } = renderHook(() => useLogout(), {
            wrapper: TestWrapper({
                authProvider: {
                    isProvided: true,
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.reject(new Error("Logout rejected")),
                    getUserIdentity: () => Promise.resolve(),
                },
            }),
        });

        const { mutateAsync: logout } = result.current!;

        await act(async () => {
            try {
                await logout();
            } catch (error) {
                expect(error).toEqual(new Error("Logout rejected"));
            }
        });
    });

    it("logout rejected with undefined error", async () => {
        const { result } = renderHook(() => useLogout(), {
            wrapper: TestWrapper({
                authProvider: {
                    isProvided: true,
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.reject(),
                    getUserIdentity: () => Promise.resolve(),
                },
            }),
        });

        const { mutateAsync: logout } = result.current!;

        await act(async () => {
            try {
                await logout();
            } catch (error) {
                expect(error).not.toBeDefined();
            }
        });
    });

    it("logout and not redirect if check error rejected with false", async () => {
        const { result } = renderHook(() => useCheckError(), {
            wrapper: TestWrapper({
                authProvider: {
                    isProvided: true,
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.reject(false),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                    getUserIdentity: () => Promise.resolve(),
                },
            }),
        });

        const { mutate: checkError } = result.current!;

        await act(async () => {
            await checkError({});
        });

        await waitFor(() => {
            expect(!result.current.isLoading).toBeTruthy();
        });

        await act(async () => {
            expect(mockGo).toBeCalledTimes(0);
        });
    });

    it("logout and not redirect if logout resolved false", async () => {
        const { result } = renderHook(() => useCheckError(), {
            wrapper: TestWrapper({
                authProvider: {
                    isProvided: true,
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.reject(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.resolve(false),
                    getUserIdentity: () => Promise.resolve(),
                },
                routerProvider: mockRouterProvider,
            }),
        });

        const { mutate: checkError } = result.current!;

        await act(async () => {
            await checkError({});
        });

        await waitFor(() => {
            expect(!result.current.isLoading).toBeTruthy();
        });

        await act(async () => {
            expect(mockGo).toBeCalledTimes(0);
        });
    });

    it("logout and redirect to resolved custom path", async () => {
        const { result } = renderHook(() => useLogout(), {
            wrapper: TestWrapper({
                authProvider: {
                    isProvided: true,
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.reject(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.resolve("/custom-path"),
                    getUserIdentity: () => Promise.resolve(),
                },
                routerProvider: mockRouterProvider,
            }),
        });

        const { mutate: logout } = result.current!;

        await act(async () => {
            await logout();
        });

        await waitFor(() => {
            return result.current?.status === "success";
        });

        await act(async () => {
            expect(mockGo).toBeCalledWith({ to: "/custom-path" });
        });
    });
});
