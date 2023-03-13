import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper } from "@test";

import { usePermissions } from "./";

// NOTE : Will be removed in v5
describe("v3LegacyAuthProviderCompatible usePermissions Hook", () => {
    it("returns authenticated userPermissions", async () => {
        const { result } = renderHook(
            () => usePermissions({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.resolve(),
                        getPermissions: () => Promise.resolve(["admin"]),
                        logout: () => Promise.resolve(),
                    },
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(result.current.data).toEqual(["admin"]);
    });

    it("returns error for not authenticated", async () => {
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (!message.includes("Not Authenticated")) console.warn(message);
        });

        const { result } = renderHook(
            () => usePermissions({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        checkAuth: () => Promise.reject("Not Authenticated"),
                        checkError: () => Promise.resolve(),
                        getPermissions: () =>
                            Promise.reject("Not Authenticated"),
                        logout: () => Promise.resolve(),
                    },
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });

        expect(result.current.error).toEqual("Not Authenticated");
    });
});

describe("usePermissions Hook", () => {
    it("returns authenticated userPermissions", async () => {
        const { result } = renderHook(() => usePermissions(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    logout: () => Promise.resolve({ success: true }),
                    getPermissions: () => Promise.resolve(["admin"]),
                },
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(result.current.data).toEqual(["admin"]);
    });

    it("returns error for not authenticated", async () => {
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (!message.includes("Not Authenticated")) console.warn(message);
        });

        const { result } = renderHook(() => usePermissions(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve({ success: false }),
                    check: () => Promise.resolve({ authenticated: false }),
                    onError: () => Promise.resolve({}),
                    logout: () => Promise.resolve({ success: false }),
                    getPermissions: () => Promise.resolve("Not Authenticated"),
                },
            }),
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBeFalsy();
        });

        expect(result.current.data).toEqual("Not Authenticated");
    });
});

// NOTE : Will be removed in v5
describe("usePermissions Hook authProvider selection", () => {
    it("selects new authProvider", async () => {
        const legacyGetPermissionMock = jest.fn(() => Promise.resolve());
        const getPermissionMock = jest.fn(() => Promise.resolve());

        const { result } = renderHook(() => usePermissions(), {
            wrapper: TestWrapper({
                legacyAuthProvider: {
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => legacyGetPermissionMock(),
                },
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    logout: () => Promise.resolve({ success: true }),
                    getPermissions: () => getPermissionMock(),
                },
            }),
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBeFalsy();
        });

        expect(legacyGetPermissionMock).not.toHaveBeenCalled();
        expect(getPermissionMock).toHaveBeenCalled();
    });

    it("selects v3LegacyAuthProviderCompatible authProvider", async () => {
        const legacyGetPermissionMock = jest.fn(() => Promise.resolve());
        const getPermissionMock = jest.fn(() => Promise.resolve());

        const { result } = renderHook(
            () => usePermissions({ v3LegacyAuthProviderCompatible: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.resolve(),
                        getPermissions: () => legacyGetPermissionMock(),
                    },
                    authProvider: {
                        login: () => Promise.resolve({ success: true }),
                        check: () => Promise.resolve({ authenticated: true }),
                        onError: () => Promise.resolve({}),
                        logout: () => Promise.resolve({ success: true }),
                        getPermissions: () => getPermissionMock(),
                    },
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.isLoading).toBeFalsy();
        });

        expect(legacyGetPermissionMock).toHaveBeenCalled();
        expect(getPermissionMock).not.toHaveBeenCalled();
    });
});
