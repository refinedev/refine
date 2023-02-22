import { renderHook, waitFor } from "@testing-library/react";

import { TestWrapper, mockLegacyRouterProvider } from "@test";

import { useAuthenticated } from "./";
import { act } from "react-dom/test-utils";

const mockFn = jest.fn();

const mockRouterProvider = {
    ...mockLegacyRouterProvider(),
    useHistory: () => ({
        push: mockFn,
        replace: mockFn,
    }),
};

describe("useAuthenticated Hook", () => {
    it("returns authenticated true", async () => {
        const { result } = renderHook(() => useAuthenticated(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                    getUserIdentity: () => Promise.resolve({ id: 1 }),
                },
            }),
        });

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
        const { result } = renderHook(() => useAuthenticated(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve(),
                    checkAuth: () =>
                        Promise.reject(new Error("Not Authenticated")),
                    checkError: checkErrorMock,
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                    getUserIdentity: () => Promise.resolve({ id: 1 }),
                },
            }),
        });

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });
    });

    xit("returns authenticated false and called checkError with custom redirect path", async () => {
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message?.redirectPath === "/custom-url") return;
            console.warn(message);
        });

        const checkErrorMock = jest.fn();
        const { result } = renderHook(() => useAuthenticated(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve(),
                    checkAuth: () =>
                        Promise.reject({ redirectPath: "/custom-url" }),
                    checkError: checkErrorMock,
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                    getUserIdentity: () => Promise.resolve({ id: 1 }),
                },
                legacyRouterProvider: mockRouterProvider,
            }),
        });

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });

        await act(async () => {
            expect(mockFn).toBeCalledWith("/custom-url", { replace: true });
        });
    });
});
