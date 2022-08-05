import { renderHook, waitFor } from "@testing-library/react";

import { TestWrapper } from "@test";

import { useGetIdentity } from "./";

describe("useGetIdentity Hook", () => {
    it("returns object useGetIdentity", async () => {
        const { result } = renderHook(() => useGetIdentity(), {
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

        expect(result.current?.data).toEqual({ id: 1 });
    });

    it("throw error useGetIdentity", async () => {
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message?.message === "Not Authenticated") return;
            console.warn(message);
        });

        const { result } = renderHook(() => useGetIdentity(), {
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
            expect(result.current.isError).toBeTruthy();
        });

        expect(result.current?.error).toEqual(new Error("Not Authenticated"));
    });

    it("throw error useGetIdentity undefined", async () => {
        const { result } = renderHook(() => useGetIdentity(), {
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
            expect(!result.current.isFetching).toBeTruthy();
        });

        expect(result.current.status).toEqual("loading");
        expect(result.current.data).not.toBeDefined();
    });
});
