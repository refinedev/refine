import { renderHook } from "@testing-library/react-hooks";

import { act, MockJSONServer, TestWrapper } from "@test";

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
            }),
        });

        await act(async () => {
            const permissions = await result.current();
            expect(permissions).toEqual(["admin"]);
        });
    });

    it("returns error for not authenticated", async () => {
        const { result } = renderHook(() => usePermissions(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve(),
                    checkAuth: () =>
                        Promise.reject(new Error("Not Authenticated")),
                    checkError: () => Promise.resolve(),
                    getPermissions: () =>
                        Promise.reject(new Error("Not Authenticated")),
                    logout: () => Promise.resolve(),
                    getUserIdentity: () => Promise.resolve({ id: 1 }),
                },
            }),
        });

        await act(async () => {
            let permissions;
            try {
                permissions = await result.current();
            } catch (error) {
                expect(error).toEqual(new Error("Not Authenticated"));
            }
        });
    });
});
