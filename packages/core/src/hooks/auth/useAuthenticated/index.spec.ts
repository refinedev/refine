import { renderHook } from "@testing-library/react-hooks";

import { act, MockJSONServer, TestWrapper } from "@test";

import { useAuthenticated } from "./";

describe("useAuthenticated Hook", () => {
    it("returns authenticated true", async () => {
        const { result } = renderHook(() => useAuthenticated(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
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
            const isAuthenticated = await result.current();
            expect(isAuthenticated).toBeTruthy();
        });
    });

    it("returns authenticated false and called checkError", async () => {
        const checkErrorMock = jest.fn();
        const { result } = renderHook(() => useAuthenticated(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
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

        await act(async () => {
            const isAuthenticated = await result.current();
            expect(isAuthenticated).not.toBeTruthy();
            expect(checkErrorMock).toBeCalledTimes(1);
            expect(checkErrorMock).toBeCalledWith(
                new Error("Not Authenticated"),
            );
        });
    });
});
