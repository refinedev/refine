import { renderHook, waitFor } from "@testing-library/react";
import ReactRouterDom from "react-router-dom";

import { TestWrapper, act } from "@test";

import { useUpdatePassword } from "./";

const mHistory = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useNavigate: () => mHistory,
}));

// NOTE : Will be removed in v5
describe("legacy useUpdatePassword Hook", () => {
    beforeEach(() => {
        mHistory.mockReset();
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message?.message === "Missing fields") return;
            if (typeof message === "undefined") return;
            console.warn(message);
        });
    });

    it("succeed update password", async () => {
        const { result } = renderHook(
            () => useUpdatePassword({ legacy: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        updatePassword: ({ password, confirmPassword }) => {
                            if (password && confirmPassword) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error("Missing fields"));
                        },
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.resolve(),
                        getPermissions: () => Promise.resolve(),
                        logout: () => Promise.resolve(),
                        getUserIdentity: () => Promise.resolve({ id: 1 }),
                    },
                }),
            },
        );

        const { mutate: updatePassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            updatePassword({ password: "123", confirmPassword: "321" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(mHistory).not.toBeCalledWith();
    });

    it("fail update password", async () => {
        const { result } = renderHook(
            () => useUpdatePassword({ legacy: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        updatePassword: () =>
                            Promise.reject(new Error("Missing fields")),
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.resolve(),
                        getPermissions: () => Promise.resolve(),
                        logout: () => Promise.resolve(),
                        getUserIdentity: () => Promise.resolve({ id: 1 }),
                    },
                }),
            },
        );

        const { mutate: updatePassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            updatePassword({ password: "123" });
        });

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });

        const { error } = result.current ?? { error: undefined };

        expect(error).toEqual(new Error("Missing fields"));
    });
});

describe("useUpdatePassword Hook", () => {
    beforeEach(() => {
        mHistory.mockReset();
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message?.message === "Missing fields") return;
            if (typeof message === "undefined") return;
            console.warn(message);
        });
    });

    it("succeed update password", async () => {
        const { result } = renderHook(() => useUpdatePassword(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    updatePassword: ({ password, confirmPassword }: any) => {
                        if (password && confirmPassword) {
                            return Promise.resolve({ success: true });
                        }
                        return Promise.resolve({
                            success: false,
                            error: new Error("Missing fields"),
                        });
                    },
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    logout: () => Promise.resolve({ success: true }),
                },
            }),
        });

        const { mutate: updatePassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            updatePassword({ password: "123", confirmPassword: "321" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(result.current.data).toEqual({ success: true });
        expect(mHistory).not.toBeCalledWith();
    });

    it("fail update password", async () => {
        const { result } = renderHook(() => useUpdatePassword(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    updatePassword: ({ password, confirmPassword }: any) => {
                        if (password && confirmPassword) {
                            return Promise.resolve({ success: true });
                        }
                        return Promise.resolve({
                            success: false,
                            error: new Error("Missing fields"),
                        });
                    },
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    logout: () => Promise.resolve({ success: true }),
                },
            }),
        });

        const { mutate: updatePassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            updatePassword({ password: "123" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(result.current.data).toEqual({
            success: false,
            error: new Error("Missing fields"),
        });
        expect(mHistory).not.toBeCalledWith();
    });

    it("success and redirect", async () => {
        const { result } = renderHook(() => useUpdatePassword(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    updatePassword: ({ password, confirmPassword }: any) => {
                        if (password && confirmPassword) {
                            return Promise.resolve({
                                success: true,
                                redirectTo: "/login",
                            });
                        }
                        return Promise.resolve({
                            success: false,
                            error: new Error("Missing fields"),
                        });
                    },
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    logout: () => Promise.resolve({ success: true }),
                },
            }),
        });

        const { mutate: updatePassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            updatePassword({ password: "123", confirmPassword: "321" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(result.current.data).toEqual({
            success: true,
            redirectTo: "/login",
        });
        expect(mHistory).toBeCalledWith("/login", { replace: true });
    });

    it("fail and redirect", async () => {
        const { result } = renderHook(() => useUpdatePassword(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    updatePassword: ({ password, confirmPassword }: any) => {
                        if (password && confirmPassword) {
                            return Promise.resolve({
                                success: true,
                            });
                        }
                        return Promise.resolve({
                            success: false,
                            error: new Error("Missing fields"),
                            redirectTo: "/register",
                        });
                    },
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    logout: () => Promise.resolve({ success: true }),
                },
            }),
        });

        const { mutate: updatePassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            updatePassword({ confirmPassword: "321" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(result.current.data).toEqual({
            success: false,
            error: new Error("Missing fields"),
            redirectTo: "/register",
        });
        expect(mHistory).toBeCalledWith("/register", { replace: true });
    });
});

// NOTE : Will be removed in v5
describe("useUpdatePassword Hook authProvider selection", () => {
    it("selects new authProvider", async () => {
        const legacyUpdatePassword = jest.fn(() => Promise.resolve());
        const updatePassword = jest.fn(() =>
            Promise.resolve({ success: true }),
        );

        const { result } = renderHook(() => useUpdatePassword(), {
            wrapper: TestWrapper({
                legacyAuthProvider: {
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                    updatePassword: () => legacyUpdatePassword(),
                },
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    logout: () => Promise.resolve({ success: true }),
                    updatePassword: () => updatePassword(),
                },
            }),
        });

        const { mutate: login } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            login({});
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBeFalsy();
        });

        expect(legacyUpdatePassword).not.toHaveBeenCalled();
        expect(updatePassword).toHaveBeenCalled();
    });

    it("selects legacy authProvider", async () => {
        const legacyUpdatePassword = jest.fn(() => Promise.resolve());
        const updatePassword = jest.fn(() =>
            Promise.resolve({ success: true }),
        );

        const { result } = renderHook(
            () => useUpdatePassword({ legacy: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.resolve(),
                        logout: () => Promise.resolve(),
                        updatePassword: () => legacyUpdatePassword(),
                    },
                    authProvider: {
                        login: () => Promise.resolve({ success: true }),
                        check: () => Promise.resolve({ authenticated: true }),
                        onError: () => Promise.resolve({}),
                        logout: () => Promise.resolve({ success: true }),
                        updatePassword: () => updatePassword(),
                    },
                }),
            },
        );

        const { mutate: login } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            login({});
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBeFalsy();
        });

        expect(legacyUpdatePassword).toHaveBeenCalled();
        expect(updatePassword).not.toHaveBeenCalled();
    });
});
