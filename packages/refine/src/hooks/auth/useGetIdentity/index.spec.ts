import { renderHook } from "@testing-library/react-hooks";

import { TestWrapper } from "@test";

import { useGetIdentity } from "./";

describe("useGetIdentity Hook", () => {
    it("returns object useGetIdentity", async () => {
        const { result, waitFor } = renderHook(() => useGetIdentity(), {
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
            return result.current?.isSuccess;
        });

        expect(result.current?.data).toEqual({ id: 1 });
    });

    it("throw error useGetIdentity", async () => {
        const { result, waitFor } = renderHook(() => useGetIdentity(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                    getUserIdentity: () =>
                        Promise.reject(new Error("Not Authenticated")),
                },
            }),
        });

        await waitFor(() => {
            return result.current.isError;
        });

        expect(result.current?.error).toEqual(new Error("Not Authenticated"));
    });

    it("throw error useGetIdentity undefined", async () => {
        const { result, waitFor } = renderHook(() => useGetIdentity(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                },
            }),
        });

        await waitFor(() => {
            return !result.current.isLoading;
        });

        expect(result.current.status).toEqual("success");
        expect(result.current.data).not.toBeDefined();
    });
});
