import { renderHook, waitFor } from "@testing-library/react";
import ReactRouterDom from "react-router-dom";

import { act, TestWrapper } from "@test";

import { useLogout } from "./";

const mHistory = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useNavigate: () => mHistory,
}));

describe("useLogout Hook", () => {
    beforeEach(() => {
        mHistory.mockReset();
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (
                message?.message === "Logout rejected" ||
                typeof message === "undefined"
            )
                return;

            console.warn(message);
        });
    });

    it("logout and redirect to login", async () => {
        const { result } = renderHook(() => useLogout(), {
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

        await act(async () => {
            await logout();
        });

        await waitFor(() => {
            return !result.current?.isLoading;
        });

        await act(async () => {
            expect(mHistory).toBeCalledWith("/login");
        });
    });

    it("logout and not redirect", async () => {
        const { result } = renderHook(() => useLogout(), {
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

        await act(async () => {
            await logout();
        });

        await waitFor(() => {
            return !result.current?.isLoading;
        });

        await act(async () => {
            expect(mHistory).not.toBeCalled();
        });
    });

    it("logout and redirect to custom path", async () => {
        const { result } = renderHook(
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

        const { mutateAsync: logout } = result.current!;

        await act(async () => {
            await logout({ redirectPath: "/custom-path" });
        });

        await waitFor(() => {
            return result.current?.status === "success";
        });

        await act(async () => {
            expect(mHistory).toBeCalledWith("/custom-path");
        });
    });

    it("logout rejected", async () => {
        const { result } = renderHook(() => useLogout(), {
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

        const { mutateAsync: logout } = result.current!;

        await act(async () => {
            try {
                await logout();
            } catch (error) {
                expect(error).toEqual(new Error("Logout rejected"));
            }
        });
    });

    it("logout rejected with undefined error", async () => {
        const { result } = renderHook(() => useLogout(), {
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

        const { mutateAsync: logout } = result.current!;

        await act(async () => {
            try {
                await logout();
            } catch (error) {
                expect(error).not.toBeDefined();
            }
        });
    });
});
