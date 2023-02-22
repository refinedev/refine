import { renderHook, waitFor } from "@testing-library/react";

import { TestWrapper, act, mockRouterBindings } from "@test";

import { useRegister } from ".";

const mockGo = jest.fn();

const mockRouterProvider = mockRouterBindings({
    fns: {
        go: () => mockGo,
    },
});

describe("useRegister Hook", () => {
    beforeEach(() => {
        mockGo.mockReset();

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
                routerProvider: mockRouterProvider,
            }),
        });

        const { mutate: register } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            register({ email: "test", password: "test" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(mockGo).toBeCalledWith({ to: "/", type: "replace" });
    });

    it("should successfully register with no redirect", async () => {
        const { result } = renderHook(() => useRegister(), {
            wrapper: TestWrapper({
                authProvider: {
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
                routerProvider: mockRouterProvider,
            }),
        });

        const { mutate: register } = result.current ?? { mutate: () => 0 };

        await act(async () => {
            register({ email: "test", password: "test" });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(mockGo).not.toBeCalled();
    });

    it("fail register", async () => {
        const { result } = renderHook(() => useRegister(), {
            wrapper: TestWrapper({
                authProvider: {
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
        const { result } = renderHook(() => useRegister(), {
            wrapper: TestWrapper({
                authProvider: {
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
