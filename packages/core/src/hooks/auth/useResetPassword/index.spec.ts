import { renderHook, waitFor } from "@testing-library/react";
import ReactRouterDom from "react-router-dom";

import { TestWrapper, act } from "@test";

import { useResetPassword } from "./";

const mHistory = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useNavigate: () => mHistory,
}));

describe("useResetPassword Hook", () => {
    beforeEach(() => {
        mHistory.mockReset();
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message?.message === "Missing email") return;
            if (typeof message === "undefined") return;
            console.warn(message);
        });
    });

    it("succeed reset password", async () => {
        const { result } = renderHook(() => useResetPassword(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve(),
                    resetPassword: ({ email }) => {
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
        });

        const { mutate: resetPassword } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            resetPassword({ email: "test@test.com" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(mHistory).not.toBeCalledWith();
    });

    it("fail reset password", async () => {
        const { result } = renderHook(() => useResetPassword(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve(),
                    resetPassword: () =>
                        Promise.reject(new Error("Missing email")),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                    getUserIdentity: () => Promise.resolve({ id: 1 }),
                },
            }),
        });

        const { mutate: resetPassword } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            resetPassword({});
        });

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });

        const { error } = result.current ?? { error: undefined };

        expect(error).toEqual(new Error("Missing email"));
    });
});
