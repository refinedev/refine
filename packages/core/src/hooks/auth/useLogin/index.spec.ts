import { renderHook, waitFor } from "@testing-library/react";

import {
  TestWrapper,
  act,
  mockAuthProvider,
  mockLegacyRouterProvider,
  mockRouterProvider,
  queryClient,
} from "@test";

import { useLogin } from "./";

const mockGo = jest.fn();
const mockReplace = jest.fn();

const routerProvider = mockRouterProvider({
  fns: {
    go: () => mockGo,
  },
});

const legacyRouterProvider = {
  ...mockLegacyRouterProvider(),
  useHistory: () => ({
    goBack: jest.fn(),
    push: jest.fn(),
    replace: mockReplace,
  }),
};

// NOTE : Will be removed in v5
describe("v3LegacyAuthProviderCompatible useLogin Hook", () => {
  beforeEach(() => {
    mockGo.mockReset();
    jest.spyOn(console, "error").mockImplementation((message) => {
      if (message?.message === "Wrong email") return;
      if (typeof message === "undefined") return;
      console.warn(message);
    });
  });

  it("succeed login", async () => {
    const { result } = renderHook(
      () => useLogin({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            login: ({ email }) => {
              if (email === "test") {
                return Promise.resolve();
              }

              return Promise.reject(new Error("Wrong email"));
            },
            checkAuth: () => Promise.resolve(),
            checkError: () => Promise.resolve(),
            getPermissions: () => Promise.resolve(),
            logout: () => Promise.resolve(),
            getUserIdentity: () => Promise.resolve({ id: 1 }),
          },
          routerProvider,
        }),
      },
    );

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "test" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(mockGo).toBeCalledWith({ to: "/", type: "replace" });
  });

  it("should successfully login with no redirect", async () => {
    const { result } = renderHook(
      () => useLogin({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            login: ({ email }) => {
              if (email === "test") {
                return Promise.resolve(false);
              }

              return Promise.reject(new Error("Wrong email"));
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

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "test" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(mockGo).not.toBeCalled();
  });

  it("login and redirect to custom path", async () => {
    const { result } = renderHook(
      () => useLogin({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            login: ({ email, redirectPath }) => {
              if (email === "test") {
                return Promise.resolve(redirectPath);
              }

              return Promise.reject(new Error("Wrong email"));
            },
            checkAuth: () => Promise.resolve(),
            checkError: () => Promise.resolve(),
            getPermissions: () => Promise.resolve(),
            logout: () => Promise.resolve(),
            getUserIdentity: () => Promise.resolve({ id: 1 }),
          },
          routerProvider,
        }),
      },
    );

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "test", redirectPath: "/custom-path" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(mockGo).toBeCalledWith({ to: "/custom-path", type: "replace" });
  });

  it("login and redirect to custom path with legacyRouterProvider", async () => {
    const { result } = renderHook(
      () => useLogin({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            login: ({ email, redirectPath }) => {
              if (email === "test") {
                return Promise.resolve(redirectPath);
              }

              return Promise.reject(new Error("Wrong email"));
            },
            checkAuth: () => Promise.resolve(),
            checkError: () => Promise.resolve(),
            getPermissions: () => Promise.resolve(),
            logout: () => Promise.resolve(),
            getUserIdentity: () => Promise.resolve({ id: 1 }),
          },
          legacyRouterProvider,
        }),
      },
    );

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "test", redirectPath: "/custom-path" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(mockReplace).toBeCalledWith("/custom-path");
  });

  it("login and redirect to `/` with legacyRouterProvider", async () => {
    const { result } = renderHook(
      () => useLogin({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            login: ({ email, redirectPath }) => {
              if (email === "test") {
                return Promise.resolve(redirectPath);
              }

              return Promise.reject(new Error("Wrong email"));
            },
            checkAuth: () => Promise.resolve(),
            checkError: () => Promise.resolve(),
            getPermissions: () => Promise.resolve(),
            logout: () => Promise.resolve(),
            getUserIdentity: () => Promise.resolve({ id: 1 }),
          },
          legacyRouterProvider,
        }),
      },
    );

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "test" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(mockReplace).toBeCalledWith("/");
  });

  it("If URL has 'to' params the app will redirect to 'to' values", async () => {
    const { result } = renderHook(
      () => useLogin({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            login: ({ email, redirectPath }) => {
              if (email === "test") {
                return Promise.resolve(redirectPath);
              }

              return Promise.reject(new Error("Wrong email"));
            },
            checkAuth: () => Promise.resolve(),
            checkError: () => Promise.resolve(),
            getPermissions: () => Promise.resolve(),
            logout: () => Promise.resolve(),
            getUserIdentity: () => Promise.resolve({ id: 1 }),
          },
          routerProvider: mockRouterProvider({
            fns: {
              go: () => mockGo,
            },
            params: {
              to: "/show/posts/5",
            },
          }),
        }),
      },
    );

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "test", redirectPath: "/custom-path" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(mockGo).toBeCalledWith({ to: "/show/posts/5", type: "replace" });
  });

  it("fail login", async () => {
    const { result } = renderHook(
      () => useLogin({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            login: () => Promise.reject(new Error("Wrong email")),
            checkAuth: () => Promise.resolve(),
            checkError: () => Promise.resolve(),
            getPermissions: () => Promise.resolve(),
            logout: () => Promise.resolve(),
            getUserIdentity: () => Promise.resolve({ id: 1 }),
          },
        }),
      },
    );

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "demo" });
    });

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
    });

    const { error } = result.current ?? { error: undefined };

    expect(error).toEqual(new Error("Wrong email"));
  });

  it("login rejected with undefined error", async () => {
    const { result } = renderHook(
      () => useLogin({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            login: () => Promise.reject(),
            checkAuth: () => Promise.resolve(),
            checkError: () => Promise.resolve(),
            getPermissions: () => Promise.resolve(),
            logout: () => Promise.resolve(),
            getUserIdentity: () => Promise.resolve({ id: 1 }),
          },
        }),
      },
    );

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "demo" });
    });

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
    });

    const { error } = result.current ?? { error: undefined };

    expect(error).not.toBeDefined();
  });
});

describe("useLogin Hook", () => {
  beforeEach(() => {
    mockGo.mockReset();

    jest.spyOn(console, "error").mockImplementation((message) => {
      if (message?.message === "Wrong email") return;
      if (typeof message === "undefined") return;
      console.warn(message);
    });
  });

  it("succeed login", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        authProvider: {
          login: ({ email }: any) => {
            if (email === "test") {
              return Promise.resolve({
                success: true,
                redirectTo: "/",
              });
            }

            return Promise.resolve({
              success: false,
              error: new Error("Wrong email"),
            });
          },
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
        routerProvider,
      }),
    });

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "test" });
    });

    await waitFor(() => {
      expect(result.current.data?.success).toBeTruthy();
    });

    expect(mockGo).toBeCalledWith({ to: "/", type: "replace" });
  });

  it("should successfully login with no redirect", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        authProvider: {
          login: ({ email }: any) => {
            if (email === "test") {
              return Promise.resolve({ success: true });
            }

            return Promise.resolve({
              success: false,
              error: new Error("Wrong email"),
            });
          },
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
        routerProvider,
      }),
    });

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "test" });
    });

    await waitFor(() => {
      expect(result.current.data?.success).toBeTruthy();
    });

    expect(mockGo).not.toBeCalled();
  });

  it("login and redirect to custom path", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        authProvider: {
          login: ({ email }: any) => {
            if (email === "test") {
              return Promise.resolve({
                success: true,
                redirectTo: "/custom-path",
              });
            }

            return Promise.resolve({
              success: false,
              error: new Error("Wrong email"),
            });
          },
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
        routerProvider,
      }),
    });

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "test", redirectPath: "/custom-path" });
    });

    await waitFor(() => {
      expect(result.current.data?.success).toBeTruthy();
    });

    expect(mockGo).toBeCalledWith({ to: "/custom-path", type: "replace" });
  });

  it("fail login", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        authProvider: {
          login: () => {
            return Promise.resolve({
              success: false,
              error: new Error("Wrong email"),
            });
          },
          check: () => Promise.resolve({ authenticated: false }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
        routerProvider: mockRouterProvider({
          fns: {
            go: () => mockGo,
          },
          params: {
            to: "/show/posts/5",
          },
        }),
      }),
    });

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "demo" });
    });

    await waitFor(() => {
      expect(result.current.data).toEqual({
        success: false,
        error: new Error("Wrong email"),
      });
    });

    expect(mockGo).not.toBeCalled();
  });

  it("login rejected with undefined error", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        authProvider: {
          login: () => {
            return Promise.resolve({
              success: false,
            });
          },
          check: () => Promise.resolve({ authenticated: false }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
      }),
    });

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "demo" });
    });

    await waitFor(() => {
      expect(result.current.data).toEqual({
        success: false,
      });
    });

    expect(result.current.data?.error).toBeUndefined();
  });

  it("should open notification when has error is true", async () => {
    const openNotificationMock = jest.fn();

    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: jest.fn(),
        },
        authProvider: {
          login: () =>
            Promise.resolve({
              success: true,
              error: new Error("Missing email"),
            }),
          check: () => Promise.resolve({ authenticated: false }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
      }),
    });

    const { mutate: forgotPassword } = result.current;

    await act(async () => {
      forgotPassword({});
    });

    await waitFor(() => {
      expect(openNotificationMock).toBeCalledWith({
        key: "login-error",
        type: "error",
        message: "Error",
        description: "Missing email",
      });
    });
  });

  it("should open notification when has success is false, error is undefined", async () => {
    const openNotificationMock = jest.fn();

    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: jest.fn(),
        },
        authProvider: {
          login: () =>
            Promise.resolve({
              success: false,
            }),
          check: () => Promise.resolve({ authenticated: false }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
      }),
    });

    const { mutate: forgotPassword } = result.current;

    await act(async () => {
      forgotPassword({});
    });

    await waitFor(() => {
      expect(openNotificationMock).toBeCalledWith({
        key: "login-error",
        type: "error",
        message: "Login Error",
        description: "Invalid credentials",
      });
    });
  });

  it("should open notification when throw error", async () => {
    const openNotificationMock = jest.fn();

    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: jest.fn(),
        },
        authProvider: {
          login: () => {
            throw new Error("Unhandled error");
          },
          check: () => Promise.resolve({ authenticated: false }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
      }),
    });

    const { mutate: forgotPassword } = result.current;

    await act(async () => {
      forgotPassword({});
    });

    await waitFor(() => {
      expect(openNotificationMock).toBeCalledWith({
        key: "login-error",
        type: "error",
        message: "Error",
        description: "Unhandled error",
      });
    });
  });

  it("should override `mutationFn` with mutationOptions.mutationFn", async () => {
    const loginMock = jest.fn().mockResolvedValue({ data: {} });
    const mutationFnMock = jest.fn().mockResolvedValue({ data: {} });

    const { result } = renderHook(
      () =>
        useLogin({
          mutationOptions: {
            // mutationFn is omitted in types. So we need to use @ts-ignore test it.
            // @ts-ignore
            mutationFn: mutationFnMock,
          },
        }),
      {
        wrapper: TestWrapper({
          authProvider: {
            ...mockAuthProvider,
            login: loginMock,
          },
        }),
      },
    );

    result.current.mutate({});

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(loginMock).not.toBeCalled();
    expect(mutationFnMock).toBeCalled();
  });

  it("should override `mutationKey` with `mutationOptions.mutationKey`", async () => {
    const loginMock = jest.fn().mockResolvedValue({ data: {} });

    const { result } = renderHook(
      () =>
        useLogin({
          mutationOptions: {
            mutationKey: ["foo", "bar"],
          },
        }),
      {
        wrapper: TestWrapper({
          authProvider: {
            ...mockAuthProvider,
            login: loginMock,
          },
        }),
      },
    );

    result.current.mutate({});

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(
      queryClient.getMutationCache().findAll({
        mutationKey: ["foo", "bar"],
      }),
    ).toHaveLength(1);
  });

  it("should open success notification when successNotification is passed", async () => {
    const openNotificationMock = jest.fn();

    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: jest.fn(),
        },
        authProvider: {
          login: () =>
            Promise.resolve({
              success: true,
              successNotification: {
                message: "Login successful",
                description: "You are now logged in",
              },
            }),
          check: () => Promise.resolve({ authenticated: false }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
      }),
    });

    const { mutate: login } = result.current;

    await act(async () => {
      login({ email: "test" });
    });

    await waitFor(() => {
      expect(openNotificationMock).toBeCalledWith({
        key: "login-success",
        type: "success",
        message: "Login successful",
        description: "You are now logged in",
      });
    });
  });
});

// NOTE : Will be removed in v5
describe("useLogin Hook authProvider selection", () => {
  it("selects new authProvider", async () => {
    const legacyLoginMock = jest.fn(() => Promise.resolve());
    const loginMock = jest.fn(() =>
      Promise.resolve({
        success: true,
      }),
    );

    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        legacyAuthProvider: {
          login: () => legacyLoginMock(),
          checkAuth: () => Promise.resolve(),
          checkError: () => Promise.resolve(),
        },
        authProvider: {
          login: () => loginMock(),
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
      }),
    });

    const { mutate: login } = result.current;

    await act(async () => {
      login({});
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });

    expect(legacyLoginMock).not.toHaveBeenCalled();
    expect(loginMock).toHaveBeenCalled();
  });

  it("selects v3LegacyAuthProviderCompatible authProvider", async () => {
    const legacyLoginMock = jest.fn(() => Promise.resolve());
    const loginMock = jest.fn(() => Promise.resolve({ success: true }));

    const { result } = renderHook(
      () => useLogin({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            login: () => legacyLoginMock(),
            checkAuth: () => Promise.resolve(),
            checkError: () => Promise.resolve(),
            logout: () => Promise.resolve(),
          },
          authProvider: {
            login: () => loginMock(),
            check: () => Promise.resolve({ authenticated: true }),
            onError: () => Promise.resolve({}),
            logout: () => Promise.resolve({ success: true }),
          },
        }),
      },
    );

    const { mutate: login } = result.current;

    await act(async () => {
      login({});
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });

    expect(legacyLoginMock).toHaveBeenCalled();
    expect(loginMock).not.toHaveBeenCalled();
  });
});

describe("useLogin Hook redirect support", () => {
  // This test does nothing. It was only passing because previous mocks wasn't reset
  // ...mockLegacyProvider is a function. It wasn't invoking it.
  // Actually this whole test suite does nothing. Uses the same exact mock.
  // You can play around, change stuff, even remove whole renderHook. It will still pass.
  xit("should be redirect 'to' queryString on legacyRouterProvider ", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        authProvider: {
          login: ({ email }: any) => {
            if (email === "test") {
              return Promise.resolve({
                success: true,
              });
            }

            return Promise.resolve({
              success: false,
              error: new Error("Wrong email"),
            });
          },
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
        legacyRouterProvider: {
          ...mockLegacyRouterProvider(),
          useLocation: () => ({
            pathname: "",
            search: "to=redirectTo",
          }),
        },
      }),
    });

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "test" });
    });

    await waitFor(() => {
      expect(result.current.data?.success).toBeTruthy();
    });

    expect(mockReplace).toBeCalledWith("redirectTo");
  });

  it("should be redirect 'to' queryString on routerProvider ", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        authProvider: {
          login: ({ email }: any) => {
            if (email === "test") {
              return Promise.resolve({
                success: true,
              });
            }

            return Promise.resolve({
              success: false,
              error: new Error("Wrong email"),
            });
          },
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
        routerProvider: mockRouterProvider({
          fns: {
            go: () => mockGo,
            parse: () => () => ({
              params: {
                to: "/redirectTo",
              },
            }),
          },
        }),
      }),
    });

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "test" });
    });

    await waitFor(() => {
      expect(result.current.data?.success).toBeTruthy();
    });

    expect(mockGo).toBeCalledWith({ to: "/redirectTo", type: "replace" });
  });

  it("should be redirect 'redirectTo' param on legacyRouterProvider ", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        authProvider: {
          login: ({ email }: any) => {
            if (email === "test") {
              return Promise.resolve({
                success: true,
                redirectTo: "redirectTo",
              });
            }

            return Promise.resolve({
              success: false,
              error: new Error("Wrong email"),
            });
          },
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
        legacyRouterProvider,
      }),
    });

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "test" });
    });

    await waitFor(() => {
      expect(result.current.data?.success).toBeTruthy();
    });

    expect(mockReplace).toBeCalledWith("redirectTo");
  });

  it("should be redirect `redirectTo` param on routerProvider ", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        authProvider: {
          login: ({ email }: any) => {
            if (email === "test") {
              return Promise.resolve({
                success: true,
                redirectTo: "redirectTo",
              });
            }

            return Promise.resolve({
              success: false,
              error: new Error("Wrong email"),
            });
          },
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
        routerProvider,
      }),
    });

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "test" });
    });

    await waitFor(() => {
      expect(result.current.data?.success).toBeTruthy();
    });

    expect(mockGo).toBeCalledWith({ to: "redirectTo", type: "replace" });
  });

  it("should be redirect `/` on legacyRouterProvider ", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper({
        authProvider: {
          login: ({ email }: any) => {
            if (email === "test") {
              return Promise.resolve({
                success: true,
              });
            }

            return Promise.resolve({
              success: false,
              error: new Error("Wrong email"),
            });
          },
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
        },
        legacyRouterProvider,
      }),
    });

    const { mutate: login } = result.current ?? { mutate: () => 0 };

    await act(async () => {
      login({ email: "test" });
    });

    await waitFor(() => {
      expect(result.current.data?.success).toBeTruthy();
    });

    expect(mockReplace).toBeCalledWith("/");
  });
});
