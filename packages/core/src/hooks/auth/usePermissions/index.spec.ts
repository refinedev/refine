import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper } from "@test";

import { usePermissions } from "./";

describe("usePermissions Hook", () => {
    it("returns authenticated userPermissions", async () => {
        const { result } = renderHook(() => usePermissions(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(["admin"]),
                    logout: () => Promise.resolve(),
                    getUserIdentity: () => Promise.resolve({ id: 1 }),
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
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.reject("Not Authenticated"),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.reject("Not Authenticated"),
                    logout: () => Promise.resolve(),
                    getUserIdentity: () => Promise.resolve({ id: 1 }),
                },
            }),
        });

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });

        expect(result.current.error).toEqual("Not Authenticated");
    });
});
