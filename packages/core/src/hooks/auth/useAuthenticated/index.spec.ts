import { renderHook } from "@testing-library/react-hooks";
import ReactRouterDom from "react-router-dom";

import { TestWrapper } from "@test";

import { useAuthenticated } from "./";

const mHistory = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useNavigate: () => mHistory,
}));

describe("useAuthenticated Hook", () => {
    it("returns authenticated true", async () => {
        const { result, waitFor } = renderHook(() => useAuthenticated(), {
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
            return result.current?.isFetched;
        });

        expect(result.current?.isSuccess).toBeTruthy();
    });

    it("returns authenticated false and called checkError", async () => {
        const checkErrorMock = jest.fn();
        const { result, waitFor } = renderHook(() => useAuthenticated(), {
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
            return result.current?.isFetched;
        });

        expect(result.current?.isError).toBeTruthy();
    });

    it("returns authenticated false and called checkError with custom redirect path", async () => {
        const checkErrorMock = jest.fn();
        const { result, waitFor } = renderHook(() => useAuthenticated(), {
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
            return result.current?.isFetched;
        });

        expect(result.current?.isError).toBeTruthy();

        expect(mHistory).toBeCalledWith("/custom-url", { replace: true });
    });
});
