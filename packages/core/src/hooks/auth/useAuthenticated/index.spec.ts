import { renderHook } from "@testing-library/react-hooks";

import { TestWrapper } from "@test";

import { useAuthenticated } from "./";

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
});
