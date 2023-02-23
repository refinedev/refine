import { renderHook, waitFor } from "@testing-library/react";
import ReactRouterDom from "react-router-dom";

import { act, TestWrapper } from "@test";

import { useLogout } from "./";
import { useCheckError, useOnError } from "../useOnError";

const mHistory = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useNavigate: () => mHistory,
}));

// NOTE : Will be removed in v5
describe("v3LegacyAuthProviderCompatible useLogout Hook", () => {
    beforeEach(() => {
        mHistory.mockReset();
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
        const { result } = renderHook(
            () => useLogout({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
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
                }),
            },
        );

        const { mutateAsync: logout } = result.current!;

        await act(async () => {
            await logout();
        });

        await waitFor(() => {
            return !result.current?.isLoading;
        });

        await act(async () => {
            expect(mHistory).toBeCalledWith("/login");
        });
    });

    it("logout and not redirect", async () => {
        const { result } = renderHook(
            () => useLogout({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
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
                }),
            },
        );

        const { mutateAsync: logout } = result.current!;

        await act(async () => {
            await logout();
        });

        await waitFor(() => {
            return !result.current?.isLoading;
        });

        await act(async () => {
            expect(mHistory).not.toBeCalled();
        });
    });

    it("logout and redirect to custom path", async () => {
        const { result } = renderHook(
            () =>
                useLogout<{ redirectPath: string }>({
                    v3LegacyAuthProviderCompatible: true,
                }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
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
            expect(mHistory).toBeCalledWith("/custom-path");
        });
    });

    it("logout rejected", async () => {
        const { result } = renderHook(
            () => useLogout({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        isProvided: true,
                        login: () => Promise.resolve(),
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.resolve(),
                        getPermissions: () => Promise.resolve(),
                        logout: () =>
                            Promise.reject(new Error("Logout rejected")),
                        getUserIdentity: () => Promise.resolve(),
                    },
                }),
            },
        );

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
        const { result } = renderHook(
            () => useLogout({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        isProvided: true,
                        login: () => Promise.resolve(),
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.resolve(),
                        getPermissions: () => Promise.resolve(),
                        logout: () => Promise.reject(),
                        getUserIdentity: () => Promise.resolve(),
                    },
                }),
            },
        );

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
        const logoutMock = jest.fn();

        const { result } = renderHook(() => useCheckError(), {
            wrapper: TestWrapper({
                legacyAuthProvider: {
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
            expect(mHistory).toBeCalledTimes(0);
        });
    });

    it("logout and not redirect if logout resolved false", async () => {
        const { result } = renderHook(() => useCheckError(), {
            wrapper: TestWrapper({
                legacyAuthProvider: {
                    isProvided: true,
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.reject(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.resolve(false),
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
            expect(mHistory).toBeCalledTimes(0);
        });
    });

    it("logout and redirect to resolved custom path", async () => {
        const { result } = renderHook(
            () => useLogout({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        isProvided: true,
                        login: () => Promise.resolve(),
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.reject(),
                        getPermissions: () => Promise.resolve(),
                        logout: () => Promise.resolve("/custom-path"),
                        getUserIdentity: () => Promise.resolve(),
                    },
                }),
            },
        );

        const { mutate: logout } = result.current!;

        await act(async () => {
            await logout();
        });

        await waitFor(() => {
            return result.current?.status === "success";
        });

        await act(async () => {
            expect(mHistory).toBeCalledWith("/custom-path");
        });
    });
});

describe("useLogout Hook", () => {
    beforeEach(() => {
        mHistory.mockReset();
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
                    login: () => Promise.resolve({ success: false }),
                    check: () => Promise.resolve({ authenticated: false }),
                    onError: () => Promise.resolve({}),
                    getPermissions: () => Promise.resolve(),
                    logout: () => {
                        return Promise.resolve({
                            success: true,
                            redirectTo: "/login",
                        });
                    },
                },
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
            expect(mHistory).toBeCalledWith("/login");
        });
    });

    it("logout and not redirect", async () => {
        const { result } = renderHook(() => useLogout(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve({ success: false }),
                    check: () => Promise.resolve({ authenticated: false }),
                    onError: () => Promise.resolve({}),
                    getPermissions: () => Promise.resolve(),
                    logout: () => {
                        return Promise.resolve({
                            success: true,
                        });
                    },
                },
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
            expect(mHistory).not.toBeCalled();
        });
    });

    it("logout and redirect to custom path, pass redirect with hook's param", async () => {
        const { result } = renderHook(
            () => useLogout<{ redirectPath: string }>(),
            {
                wrapper: TestWrapper({
                    authProvider: {
                        login: () => Promise.resolve({ success: true }),
                        check: () => Promise.resolve({ authenticated: true }),
                        onError: () => Promise.resolve({}),
                        getPermissions: () => Promise.resolve(),
                        logout: () => {
                            return Promise.resolve({
                                success: true,
                            });
                        },
                    },
                }),
            },
        );

        const { mutateAsync: logout } = result.current!;

        await act(async () => {
            await logout({ redirectPath: "/custom-path" });
        });

        await act(async () => {
            expect(mHistory).toBeCalledWith("/custom-path");
        });
    });

    it("logout and redirect to custom path, pass redirect with authProvider return value", async () => {
        const { result } = renderHook(
            () => useLogout<{ redirectPath: string }>(),
            {
                wrapper: TestWrapper({
                    authProvider: {
                        login: () => Promise.resolve({ success: true }),
                        check: () => Promise.resolve({ authenticated: true }),
                        onError: () => Promise.resolve({}),
                        getPermissions: () => Promise.resolve(),
                        logout: () => {
                            return Promise.resolve({
                                success: true,
                                redirectTo: "/custom-path",
                            });
                        },
                    },
                }),
            },
        );

        const { mutateAsync: logout } = result.current!;

        await act(async () => {
            await logout();
        });

        await act(async () => {
            expect(mHistory).toBeCalledWith("/custom-path");
        });
    });

    it("logout rejected", async () => {
        const { result } = renderHook(() => useLogout(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    getPermissions: () => Promise.resolve(),
                    logout: () => {
                        return Promise.resolve({
                            success: false,
                            error: new Error("Logout rejected"),
                        });
                    },
                },
            }),
        });

        const { mutateAsync: logout } = result.current!;

        await act(async () => {
            await logout();
        });

        await waitFor(() => {
            expect(result.current.data).toEqual({
                success: false,
                error: new Error("Logout rejected"),
            });
        });
    });

    it("logout rejected with undefined error", async () => {
        const { result } = renderHook(() => useLogout(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    getPermissions: () => Promise.resolve(),
                    logout: () => {
                        return Promise.resolve({
                            success: false,
                        });
                    },
                },
            }),
        });

        const { mutateAsync: logout } = result.current!;
        await act(async () => {
            await logout();
        });

        await waitFor(() => {
            expect(result.current.data).toEqual({
                success: false,
            });
        });

        expect(result.current.data?.error).toBeUndefined();
    });

    it("logout and not redirect if check error rejected with false", async () => {
        const { result } = renderHook(() => useOnError(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    getPermissions: () => Promise.resolve(),
                    logout: () => {
                        return Promise.resolve({
                            success: false,
                        });
                    },
                },
            }),
        });

        const { mutate: onError } = result.current!;

        await act(async () => {
            await onError({});
        });

        await waitFor(() => {
            expect(!result.current.isLoading).toBeTruthy();
        });

        await act(async () => {
            expect(mHistory).toBeCalledTimes(0);
        });
    });
});

// NOTE : Will be removed in v5
describe("useLogout Hook authProvider selection", () => {
    it("selects new authProvider", async () => {
        const legacyLogoutMock = jest.fn(() => Promise.resolve());
        const logoutMock = jest.fn(() =>
            Promise.resolve({
                success: true,
            }),
        );

        const { result } = renderHook(() => useLogout(), {
            wrapper: TestWrapper({
                legacyAuthProvider: {
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    logout: () => legacyLogoutMock(),
                },
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    logout: () => logoutMock(),
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

        expect(legacyLogoutMock).not.toHaveBeenCalled();
        expect(logoutMock).toHaveBeenCalled();
    });

    it("selects v3LegacyAuthProviderCompatible authProvider", async () => {
        const legacyLogoutMock = jest.fn(() => Promise.resolve());
        const logoutMock = jest.fn(() => Promise.resolve({ success: true }));

        const { result } = renderHook(
            () => useLogout({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.resolve(),
                        logout: () => legacyLogoutMock(),
                    },
                    authProvider: {
                        login: () => Promise.resolve({ success: true }),
                        check: () => Promise.resolve({ authenticated: true }),
                        onError: () => Promise.resolve({}),
                        logout: () => logoutMock(),
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

        expect(legacyLogoutMock).toHaveBeenCalled();
        expect(logoutMock).not.toHaveBeenCalled();
    });
});
