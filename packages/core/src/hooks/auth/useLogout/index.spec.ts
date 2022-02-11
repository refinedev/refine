import { renderHook } from "@testing-library/react-hooks";
import ReactRouterDom from "react-router-dom";

import { act, TestWrapper } from "@test";

import { useLogout } from "./";

const mHistory = {
    push: jest.fn(),
};

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useHistory: jest.fn(() => mHistory),
}));

describe("useLogout Hook", () => {
    beforeEach(() => {
        mHistory.push.mockReset();
    });

    it("logout and redirect to login", async () => {
        const { result, waitFor } = renderHook(() => useLogout(), {
            wrapper: TestWrapper({
                authProvider: {
                    isProvided: true,
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => {
                        return Promise.resolve();
                    },
                    getUserIdentity: () => Promise.resolve(),
                },
            }),
        });

        const { mutateAsync: logout } = result.current!;

        await logout();

        await waitFor(() => {
            return !result.current?.isLoading;
        });

        await act(async () => {
            expect(mHistory.push).toBeCalledWith("/login", undefined);
        });
    });

    it("logout and not redirect", async () => {
        const { result, waitFor } = renderHook(() => useLogout(), {
            wrapper: TestWrapper({
                authProvider: {
                    isProvided: true,
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => {
                        return Promise.resolve(false);
                    },
                    getUserIdentity: () => Promise.resolve(),
                },
            }),
        });

        const { mutateAsync: logout } = result.current!;

        await logout();

        await waitFor(() => {
            return !result.current?.isLoading;
        });

        await act(async () => {
            expect(mHistory.push).not.toBeCalled();
        });
    });

    it("logout and redirect to custom path", async () => {
        const { result, waitFor } = renderHook(
            () => useLogout<{ redirectPath: string }>(),
            {
                wrapper: TestWrapper({
                    authProvider: {
                        isProvided: true,
                        login: () => Promise.resolve(),
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.resolve(),
                        getPermissions: () => Promise.resolve(),
                        logout: ({ redirectPath }) => {
                            return Promise.resolve(redirectPath);
                        },
                        getUserIdentity: () => Promise.resolve(),
                    },
                }),
            },
        );

        const { mutate: logout } = result.current!;

        await logout({ redirectPath: "/custom-path" });

        await waitFor(() => {
            return !result.current?.isLoading;
        });

        await act(async () => {
            expect(mHistory.push).toBeCalledWith("/custom-path", undefined);
        });
    });

    it("logout rejected", async () => {
        const { result, waitFor } = renderHook(() => useLogout(), {
            wrapper: TestWrapper({
                authProvider: {
                    isProvided: true,
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.reject(new Error("Logout rejected")),
                    getUserIdentity: () => Promise.resolve(),
                },
            }),
        });

        const { mutate: logout } = result.current!;

        await logout();

        await waitFor(() => {
            return !result.current?.isLoading;
        });

        const { error } = result.current!;

        expect(error).toEqual(new Error("Logout rejected"));
    });

    it("logout rejected with undefined error", async () => {
        const { result, waitFor } = renderHook(() => useLogout(), {
            wrapper: TestWrapper({
                authProvider: {
                    isProvided: true,
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.reject(),
                    getUserIdentity: () => Promise.resolve(),
                },
            }),
        });

        const { mutate: logout } = result.current!;

        await logout();

        await waitFor(() => {
            return !result.current?.isLoading;
        });

        const { error } = result.current!;

        expect(error).not.toBeDefined();
    });
});
