import { renderHook, waitFor } from "@testing-library/react";
import ReactRouterDom from "react-router-dom";

import { TestWrapper } from "@test";

import { useAuthenticated } from "./";
import { act } from "react-dom/test-utils";

const mHistory = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useNavigate: () => mHistory,
}));

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

    it("returns authenticated false and called checkError with custom redirect path", async () => {
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
            }),
        });

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });

        await act(async () => {
            expect(mHistory).toBeCalledWith("/custom-url", { replace: true });
        });
    });
});
