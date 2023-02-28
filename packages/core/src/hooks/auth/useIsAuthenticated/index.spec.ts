import { renderHook, waitFor } from "@testing-library/react";

import { TestWrapper, mockLegacyRouterProvider } from "@test";

import { useIsAuthenticated } from ".";
import { act } from "react-dom/test-utils";

const mockFn = jest.fn();

const mockRouterProvider = {
    ...mockLegacyRouterProvider(),
    useHistory: () => ({
        push: mockFn,
        replace: mockFn,
    }),
};

// NOTE : Will be removed in v5
describe("v3LegacyAuthProviderCompatible useIsAuthenticated Hook", () => {
    it("returns authenticated true", async () => {
        const { result } = renderHook(
            () => useIsAuthenticated({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.resolve(),
                        getPermissions: () => Promise.resolve(),
                        logout: () => Promise.resolve(),
                        getUserIdentity: () => Promise.resolve({ id: 1 }),
                    },
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });
    });

    it("returns authenticated false and called checkError", async () => {
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message?.message === "Not Authenticated") return;
            console.warn(message);
        });

        const checkErrorMock = jest.fn();
        const { result } = renderHook(
            () => useIsAuthenticated({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        checkAuth: () =>
                            Promise.reject(new Error("Not Authenticated")),
                        checkError: checkErrorMock,
                        getPermissions: () => Promise.resolve(),
                        logout: () => Promise.resolve(),
                        getUserIdentity: () => Promise.resolve({ id: 1 }),
                    },
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });
    });

    it("returns authenticated false and called checkError with custom redirect path", async () => {
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message?.redirectPath === "/custom-url") return;
            console.warn(message);
        });

        const checkErrorMock = jest.fn();
        const { result } = renderHook(
            () => useIsAuthenticated({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        checkAuth: () =>
                            Promise.reject({ redirectPath: "/custom-url" }),
                        checkError: checkErrorMock,
                        getPermissions: () => Promise.resolve(),
                        logout: () => Promise.resolve(),
                        getUserIdentity: () => Promise.resolve({ id: 1 }),
                    },
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });
    });
});

describe("useIsAuthenticated Hook", () => {
    it("returns authenticated true", async () => {
        const { result } = renderHook(() => useIsAuthenticated(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve({ success: false }),
                    check: () =>
                        Promise.resolve({
                            authenticated: true,
                        }),
                    onError: () => Promise.resolve({}),
                    logout: () => Promise.resolve({ success: false }),
                },
            }),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        await waitFor(() => {
            expect(result.current.data?.authenticated).toBeTruthy();
        });
    });

    it("returns authenticated false and called checkError", async () => {
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message?.message === "Not Authenticated") return;
            console.warn(message);
        });

        const { result } = renderHook(() => useIsAuthenticated(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve({ success: false }),
                    check: () =>
                        Promise.resolve({
                            authenticated: false,
                            error: new Error("Not Authenticated"),
                        }),
                    onError: () => Promise.resolve({}),
                    logout: () => Promise.resolve({ success: false }),
                },
            }),
        });

        await waitFor(() => {
            expect(result.current.data?.error).toBeTruthy();
        });
    });

    it("returns authenticated false and called checkError with custom redirect path", async () => {
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message?.redirectPath === "/custom-url") return;
            console.warn(message);
        });

        const checkErrorMock = jest.fn();
        const { result } = renderHook(() => useIsAuthenticated(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve({ success: false }),
                    check: () =>
                        Promise.resolve({
                            authenticated: false,
                            redirectTo: "/custom-url",
                            error: new Error("Not Authenticated"),
                        }),
                    onError: checkErrorMock,
                    logout: () => Promise.resolve({ success: false }),
                },
                legacyRouterProvider: mockRouterProvider,
            }),
        });

        await waitFor(() => {
            expect(result.current.data?.error).toBeTruthy();
        });
    });
});

// NOTE : Will be removed in v5
describe("useIsAuthenticated Hook authProvider selection", () => {
    it("selects new authProvider", async () => {
        const legacyCheckAuthMock = jest.fn(() => Promise.resolve());
        const checkMock = jest.fn(() =>
            Promise.resolve({
                authenticated: true,
            }),
        );

        const { result } = renderHook(() => useIsAuthenticated(), {
            wrapper: TestWrapper({
                legacyAuthProvider: {
                    login: () => Promise.resolve(),
                    checkAuth: () => legacyCheckAuthMock(),
                    checkError: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                },
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    check: () => checkMock(),
                    onError: () => Promise.resolve({}),
                    logout: () => Promise.resolve({ success: true }),
                },
            }),
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBeFalsy();
        });

        expect(legacyCheckAuthMock).not.toHaveBeenCalled();
        expect(checkMock).toHaveBeenCalled();
    });

    it("selects v3LegacyAuthProviderCompatible authProvider", async () => {
        const legacyCheckAuthMock = jest.fn(() => Promise.resolve());
        const checkMock = jest.fn(() =>
            Promise.resolve({ authenticated: true }),
        );

        const { result } = renderHook(
            () => useIsAuthenticated({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        checkAuth: () => legacyCheckAuthMock(),
                        checkError: () => Promise.resolve(),
                        logout: () => Promise.resolve(),
                    },
                    authProvider: {
                        login: () => Promise.resolve({ success: true }),
                        check: () => checkMock(),
                        onError: () => Promise.resolve({}),
                        logout: () => Promise.resolve({ success: true }),
                    },
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.isLoading).toBeFalsy();
        });

        expect(legacyCheckAuthMock).toHaveBeenCalled();
        expect(checkMock).not.toHaveBeenCalled();
    });
});
