import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { usePermissions } from "./";

describe("usePermissions Hook", () => {
    it("returns authenticated userPermissions", async () => {
        const { result, waitFor } = renderHook(() => usePermissions(), {
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
            return result.current.isSuccess;
        });

        expect(result.current.data).toEqual(["admin"]);
    });

    it("returns error for not authenticated", async () => {
        const { result, waitFor } = renderHook(() => usePermissions(), {
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
            return result.current.isError;
        });

        expect(result.current.error).toEqual("Not Authenticated");
    });
});
