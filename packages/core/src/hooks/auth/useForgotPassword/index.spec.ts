import { renderHook, waitFor } from "@testing-library/react";
import ReactRouterDom from "react-router-dom";

import { TestWrapper, act } from "@test";

import { useForgotPassword } from ".";

const mHistory = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useNavigate: () => mHistory,
}));

// NOTE : Will be removed in v5
describe("legacy useForgotPassword Hook", () => {
    beforeEach(() => {
        mHistory.mockReset();
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message?.message === "Missing email") return;
            if (typeof message === "undefined") return;
            console.warn(message);
        });
    });

    it("succeed forgot password", async () => {
        const { result } = renderHook(
            () => useForgotPassword({ legacy: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        forgotPassword: ({ email }) => {
                            if (email) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error("Missing email"));
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

        const { mutate: forgotPassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            forgotPassword({ email: "test@test.com" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(mHistory).not.toBeCalledWith();
    });

    it("fail forgot password", async () => {
        const { result } = renderHook(
            () => useForgotPassword({ legacy: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        forgotPassword: () =>
                            Promise.reject(new Error("Missing email")),
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.resolve(),
                        getPermissions: () => Promise.resolve(),
                        logout: () => Promise.resolve(),
                        getUserIdentity: () => Promise.resolve({ id: 1 }),
                    },
                }),
            },
        );

        const { mutate: forgotPassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            forgotPassword({});
        });

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });

        const { error } = result.current ?? { error: undefined };

        expect(error).toEqual(new Error("Missing email"));
    });
});

describe("useForgotPassword Hook", () => {
    beforeEach(() => {
        mHistory.mockReset();
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message?.message === "Missing email") return;
            if (typeof message === "undefined") return;
            console.warn(message);
        });
    });

    it("succeed forgot password", async () => {
        const { result } = renderHook(() => useForgotPassword(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () =>
                        Promise.resolve({
                            success: true,
                        }),
                    forgotPassword: (params: any) => {
                        if (!params?.["email"]) {
                            return Promise.resolve({ success: false });
                        }
                        return Promise.resolve({ success: true });
                    },
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    logout: () => Promise.resolve({ success: true }),
                },
            }),
        });

        const { mutate: forgotPassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            forgotPassword({ email: "test@test.com" });
        });

        await waitFor(() => {
            expect(result.current.data?.success).toBeTruthy();
        });

        expect(mHistory).not.toBeCalledWith();
    });

    it("fail forgot password", async () => {
        const { result } = renderHook(() => useForgotPassword(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    forgotPassword: () =>
                        Promise.resolve({
                            success: false,
                            error: new Error("Missing email"),
                        }),
                    check: () => Promise.resolve({ authenticated: false }),
                    onError: () => Promise.resolve({}),
                    logout: () => Promise.resolve({ success: true }),
                },
            }),
        });

        const { mutate: forgotPassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            forgotPassword({});
        });

        await waitFor(() => {
            expect(result.current.data).toEqual({
                success: false,
                error: new Error("Missing email"),
            });
        });
    });
});

// NOTE : Will be removed in v5
describe("useForgotPassword Hook authProvider selection", () => {
    it("selects new authProvider", async () => {
        const legacyForgotPasswordMock = jest.fn(() => Promise.resolve());
        const forgotPasswordMock = jest.fn(() =>
            Promise.resolve({
                success: true,
            }),
        );

        const { result } = renderHook(() => useForgotPassword(), {
            wrapper: TestWrapper({
                legacyAuthProvider: {
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    forgotPassword: () => legacyForgotPasswordMock(),
                },
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    logout: () => Promise.resolve({ success: true }),
                    forgotPassword: () => forgotPasswordMock(),
                },
            }),
        });

        const { mutate: forgotPassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            forgotPassword({});
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBeFalsy();
        });

        expect(legacyForgotPasswordMock).not.toHaveBeenCalled();
        expect(forgotPasswordMock).toHaveBeenCalled();
    });

    it("selects legacy authProvider", async () => {
        const legacyForgotPasswordMock = jest.fn(() => Promise.resolve());
        const forgotPasswordMock = jest.fn(() =>
            Promise.resolve({ success: true }),
        );

        const { result } = renderHook(
            () => useForgotPassword({ legacy: true }),
            {
                wrapper: TestWrapper({
                    legacyAuthProvider: {
                        login: () => Promise.resolve(),
                        checkAuth: () => Promise.resolve(),
                        checkError: () => Promise.resolve(),
                        forgotPassword: () => legacyForgotPasswordMock(),
                    },
                    authProvider: {
                        login: () => Promise.resolve({ success: true }),
                        check: () => Promise.resolve({ authenticated: true }),
                        onError: () => Promise.resolve({}),
                        logout: () => Promise.resolve({ success: true }),
                        forgotPassword: () => forgotPasswordMock(),
                    },
                }),
            },
        );

        const { mutate: forgotPassword } = result.current ?? {
            mutate: () => 0,
        };

        await act(async () => {
            forgotPassword({});
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBeFalsy();
        });

        expect(legacyForgotPasswordMock).toHaveBeenCalled();
        expect(forgotPasswordMock).not.toHaveBeenCalled();
    });
});
