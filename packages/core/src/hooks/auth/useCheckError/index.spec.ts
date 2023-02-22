import { renderHook, waitFor } from "@testing-library/react";

import { act, mockLegacyRouterProvider, TestWrapper } from "@test";

import { useCheckError } from "./";

const mockFn = jest.fn();

const mockRouterProvider = {
    ...mockLegacyRouterProvider(),
    useHistory: () => ({
        push: mockFn,
        replace: mockFn,
    }),
};
describe("useCheckError Hook", () => {
    beforeEach(() => {
        mockFn.mockReset();

        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message === "rejected" || message === "/customPath") return;
            console.warn(message);
        });
    });

    it("logout and redirect to login if check error rejected", async () => {
        const logoutMock = jest.fn();

        const { result } = renderHook(() => useCheckError(), {
            wrapper: TestWrapper({
                authProvider: {
                    isProvided: true,
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.reject(),
                    getPermissions: () => Promise.resolve(),
                    logout: logoutMock,
                    getUserIdentity: () => Promise.resolve(),
                },
                legacyRouterProvider: mockRouterProvider,
            }),
        });

        const { mutate: checkError } = result.current!;

        await act(async () => {
            await checkError({});
        });

        await waitFor(() => {
            expect(!result.current.isLoading).toBeTruthy();
        });

        expect(logoutMock).toBeCalledTimes(1);
        expect(mockFn).toBeCalledWith("/login");
    });

    it("logout and redirect to custom path if check error rejected", async () => {
        const { result } = renderHook(() => useCheckError(), {
            wrapper: TestWrapper({
                authProvider: {
                    isProvided: true,
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.reject("/customPath"),
                    getPermissions: () => Promise.resolve(),
                    logout: ({ redirectPath }) => {
                        return Promise.resolve(redirectPath);
                    },
                    getUserIdentity: () => Promise.resolve(),
                },
                legacyRouterProvider: mockRouterProvider,
            }),
        });

        const { mutate: checkError } = result.current!;

        await act(async () => {
            await checkError({});
        });

        await waitFor(() => {
            expect(!result.current.isLoading).toBeTruthy();
        });

        await act(async () => {
            expect(mockFn).toBeCalledWith("/customPath");
        });
    });
});
