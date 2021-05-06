import { renderHook } from "@testing-library/react-hooks";

import { act, TestWrapper } from "@test";

import { useGetIdentity } from "./";

describe("usePermissions Hook", () => {
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

        await act(async () => {
            const permissions = await result.current();
            expect(permissions).toEqual({ id: 1 });
        });
    });

    it("throw error useGetIdentity", async () => {
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

        await act(async () => {
            let permissions;
            try {
                permissions = await result.current();
            } catch (error) {
                expect(error).toEqual(new Error("Not Authenticated"));
            }
        });
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

        await act(async () => {
            let permissions;
            try {
                permissions = await result.current();
            } catch (error) {
                expect(error).toEqual(
                    new Error(
                        "Not implemented 'getUserIdentity' on AuthProvider.",
                    ),
                );
            }
        });
    });
});
