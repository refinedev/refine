import { renderHook, waitFor } from "@testing-library/react";
import ReactRouterDom from "react-router-dom";

import { TestWrapper, act } from "@test";

import { useRegister } from ".";

const mHistory = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useNavigate: () => mHistory,
}));

// NOTE : Will be removed in v5
describe("legacy useRegister Hook", () => {
    beforeEach(() => {
        mHistory.mockReset();
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message?.message === "Missing fields") return;
            if (typeof message === "undefined") return;
            console.warn(message);
        });
    });

    it("succeed register", async () => {
        const { result } = renderHook(() => useRegister({ legacy: true }), {
            wrapper: TestWrapper({
                legacyAuthProvider: {
                    login: () => Promise.resolve(),
                    register: ({ email, password }) => {
                        if (email && password) {
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
        });

        const { mutate: register } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            register({ email: "test", password: "test" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(mHistory).toBeCalledWith("/", { replace: true });
    });

    it("should successfully register with no redirect", async () => {
        const { result } = renderHook(() => useRegister({ legacy: true }), {
            wrapper: TestWrapper({
                legacyAuthProvider: {
                    login: () => Promise.resolve(),
                    register: ({ email, password }) => {
                        if (email && password) {
                            return Promise.resolve(false);
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
        });

        const { mutate: register } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            register({ email: "test", password: "test" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(mHistory).not.toBeCalled();
    });

    it("fail register", async () => {
        const { result } = renderHook(() => useRegister({ legacy: true }), {
            wrapper: TestWrapper({
                legacyAuthProvider: {
                    login: () => Promise.resolve(),
                    register: () => Promise.reject(new Error("Missing fields")),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                    getUserIdentity: () => Promise.resolve({ id: 1 }),
                },
            }),
        });

        const { mutate: register } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            register({ email: "demo" });
        });

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });

        const { error } = result.current ?? { error: undefined };

        expect(error).toEqual(new Error("Missing fields"));
    });

    it("register rejected with undefined error", async () => {
        const { result } = renderHook(() => useRegister({ legacy: true }), {
            wrapper: TestWrapper({
                legacyAuthProvider: {
                    login: () => Promise.resolve(),
                    register: () => Promise.reject(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                    getUserIdentity: () => Promise.resolve({ id: 1 }),
                },
            }),
        });

        const { mutate: register } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            register({ email: "demo" });
        });

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });

        const { error } = result.current ?? { error: undefined };

        expect(error).not.toBeDefined();
    });
});

describe("useRegister Hook", () => {
    beforeEach(() => {
        mHistory.mockReset();
        jest.spyOn(console, "error").mockImplementation((message) => {
            if (message?.message === "Missing fields") return;
            if (typeof message === "undefined") return;
            console.warn(message);
        });
    });

    it("succeed register", async () => {
        const { result } = renderHook(() => useRegister(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    register: ({ email, password }: any) => {
                        if (email && password) {
                            return Promise.resolve({
                                success: true,
                                redirectTo: "/",
                            });
                        }
                        return Promise.resolve({
                            success: false,
                            error: new Error("Missing fields"),
                        });
                    },
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.resolve({ success: true }),
                },
            }),
        });

        const { mutate: register } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            register({ email: "test", password: "test" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(result.current.data?.success).toBeTruthy();

        expect(mHistory).toBeCalledWith("/", { replace: true });
    });

    it("should successfully register with no redirect", async () => {
        const { result } = renderHook(() => useRegister(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    register: ({ email, password }: any) => {
                        if (email && password) {
                            return Promise.resolve({
                                success: true,
                            });
                        }
                        return Promise.resolve({
                            success: false,
                            error: new Error("Missing fields"),
                        });
                    },
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.resolve({ success: true }),
                },
            }),
        });

        const { mutate: register } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            register({ email: "test", password: "test" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(mHistory).not.toBeCalled();
    });

    it("fail register", async () => {
        const { result } = renderHook(() => useRegister(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    register: ({ email, password }: any) => {
                        if (email && password) {
                            return Promise.resolve({
                                success: true,
                            });
                        }
                        return Promise.resolve({
                            success: false,
                            error: new Error("Missing fields"),
                        });
                    },
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.resolve({ success: true }),
                },
            }),
        });

        const { mutate: register } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            register({ email: "demo" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(result.current.data).toEqual({
            success: false,
            error: new Error("Missing fields"),
        });
    });

    it("register rejected with undefined error", async () => {
        const { result } = renderHook(() => useRegister(), {
            wrapper: TestWrapper({
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    register: ({ email, password }: any) => {
                        if (email && password) {
                            return Promise.resolve({
                                success: true,
                            });
                        }
                        return Promise.resolve({
                            success: false,
                        });
                    },
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    getPermissions: () => Promise.resolve(),
                    logout: () => Promise.resolve({ success: true }),
                },
            }),
        });

        const { mutate: register } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            register({ email: "demo" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(result.current.data?.error).toBeUndefined();
    });
});

// NOTE : Will be removed in v5
describe("useRegister Hook authProvider selection", () => {
    it("selects new authProvider", async () => {
        const legacyRegisterMock = jest.fn(() => Promise.resolve());
        const registerMock = jest.fn(() => Promise.resolve({ success: true }));

        const { result } = renderHook(() => useRegister(), {
            wrapper: TestWrapper({
                legacyAuthProvider: {
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                    register: () => legacyRegisterMock(),
                },
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    logout: () => Promise.resolve({ success: true }),
                    register: () => registerMock(),
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

        expect(legacyRegisterMock).not.toHaveBeenCalled();
        expect(registerMock).toHaveBeenCalled();
    });

    it("selects legacy authProvider", async () => {
        const legacyRegisterMock = jest.fn(() => Promise.resolve());
        const registerMock = jest.fn(() => Promise.resolve({ success: true }));

        const { result } = renderHook(() => useRegister({ legacy: true }), {
            wrapper: TestWrapper({
                legacyAuthProvider: {
                    login: () => Promise.resolve(),
                    checkAuth: () => Promise.resolve(),
                    checkError: () => Promise.resolve(),
                    logout: () => Promise.resolve(),
                    register: () => legacyRegisterMock(),
                },
                authProvider: {
                    login: () => Promise.resolve({ success: true }),
                    check: () => Promise.resolve({ authenticated: true }),
                    onError: () => Promise.resolve({}),
                    logout: () => Promise.resolve({ success: true }),
                    register: () => registerMock(),
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

        expect(legacyRegisterMock).toHaveBeenCalled();
        expect(registerMock).not.toHaveBeenCalled();
    });
});
