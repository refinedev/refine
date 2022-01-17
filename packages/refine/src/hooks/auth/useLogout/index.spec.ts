import { renderHook } from "@testing-library/react-hooks";
import ReactRouterDom from "react-router-dom";

import { act, TestWrapper } from "@test";

import { useLogout } from "./";

const mHistory = {
    push: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
};

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useHistory: jest.fn(() => mHistory),
}));

describe("useLogout Hook", () => {
    it("logout and redirect to login", async () => {
        const logoutMock = jest.fn();

        const { result, waitFor } = renderHook(() => useLogout(), {
            wrapper: TestWrapper({
                authProvider: {
                    isProvided: true,
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(),
                    logout: logoutMock,
                    getUserIdentity: () => Promise.resolve(),
                },
            }),
        });

        const { mutate: logout } = result.current!;

        await logout();

        await waitFor(() => {
            return !result.current?.isLoading;
        });

        await act(async () => {
            expect(logoutMock).toBeCalledTimes(1);
        });
    });

    it("logout and redirect to custom path", async () => {
        const logoutMock = jest.fn();

        const { result, waitFor } = renderHook(() => useLogout(), {
            wrapper: TestWrapper({
                authProvider: {
                    isProvided: true,
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(),
                    logout: logoutMock,
                    getUserIdentity: () => Promise.resolve(),
                },
            }),
        });

        const { mutate: logout } = result.current!;

        await logout({ redirectPath: "/custom-path" });

        await waitFor(() => {
            return !result.current?.isLoading;
        });

        await act(async () => {
            expect(logoutMock).toBeCalledTimes(1);
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
});
