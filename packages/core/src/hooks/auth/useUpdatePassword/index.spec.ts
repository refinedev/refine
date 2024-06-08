import { renderHook, waitFor } from "@testing-library/react";

import {
  TestWrapper,
  act,
  mockLegacyAuthProvider,
  mockLegacyRouterProvider,
  mockRouterProvider,
  queryClient,
} from "@test";

import type { LegacyRouterProvider } from "../../../contexts/router/legacy/types";
import { useUpdatePassword } from "./";

const mockFn = jest.fn();

const legacyRouterProvider: LegacyRouterProvider = {
  ...mockLegacyRouterProvider(),
  useHistory: () => ({
    goBack: jest.fn(),
    push: jest.fn(),
    replace: mockFn,
  }),
};

const mockAuthProvider = {
  login: () => Promise.resolve({ success: true }),
  check: () => Promise.resolve({ authenticated: true }),
  onError: () => Promise.resolve({}),
  logout: () => Promise.resolve({ success: true }),
};

// NOTE : Will be removed in v5
describe("v3LegacyAuthProviderCompatible useUpdatePassword Hook", () => {
  beforeEach(() => {
    mockFn.mockReset();
    jest.spyOn(console, "error").mockImplementation((message) => {
      if (message?.message === "Missing fields") return;
      if (typeof message === "undefined") return;
      console.warn(message);
    });
  });

  it("succeed update password", async () => {
    const { result } = renderHook(
      () => useUpdatePassword({ v3LegacyAuthProviderCompatible: true }),
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
          legacyRouterProvider,
        }),
      },
    );

    const { mutate: updatePassword } = result.current;

    await act(async () => {
      updatePassword({ password: "123", confirmPassword: "321" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(mockFn).not.toBeCalledWith();
  });

  it("fail update password", async () => {
    const { result } = renderHook(
      () => useUpdatePassword({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            login: () => Promise.resolve(),
            updatePassword: () => Promise.reject(new Error("Missing fields")),
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

    const { mutate: updatePassword } = result.current;

    await act(async () => {
      updatePassword({ password: "123" });
    });

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
    });

    const { error } = result.current ?? { error: undefined };

    expect(error).toEqual(new Error("Missing fields"));
  });

  it("should open notification when has success is false, error is undefined", async () => {
    const updatePasswordMock = jest.fn();
    const openNotificationMock = jest.fn();
    const closeNotificationMock = jest.fn();

    const { result } = renderHook(
      () => useUpdatePassword({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          notificationProvider: {
            open: openNotificationMock,
            close: closeNotificationMock,
          },
          legacyAuthProvider: {
            ...mockLegacyAuthProvider,
            updatePassword: updatePasswordMock,
          },
          routerProvider: legacyRouterProvider,
        }),
      },
    );

    const { mutate: updatePassword } = result.current;

    updatePasswordMock.mockRejectedValueOnce({});
    await act(async () => {
      updatePassword({});
    });
    await waitFor(() => {
      expect(openNotificationMock).toBeCalledWith({
        key: "update-password-error",
        type: "error",
        message: "Update Password Error",
        description: "Error while updating password",
      });
    });

    updatePasswordMock.mockResolvedValueOnce(false);
    await act(async () => {
      updatePassword({});
    });
    await waitFor(() => {
      expect(closeNotificationMock).toBeCalledWith("update-password-error");
    });
  });

  it("should open notification when throw error", async () => {
    const openNotificationMock = jest.fn();

    const { result } = renderHook(
      () => useUpdatePassword({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          notificationProvider: {
            open: openNotificationMock,
            close: jest.fn(),
          },
          routerProvider: legacyRouterProvider,
          legacyAuthProvider: {
            ...mockLegacyAuthProvider,
            updatePassword: () => {
              throw new Error("Unhandled error");
            },
          },
        }),
      },
    );

    const { mutate: updatePassword } = result.current;

    await act(async () => {
      updatePassword({});
    });

    await waitFor(() => {
      expect(openNotificationMock).toBeCalledWith({
        key: "update-password-error",
        type: "error",
        message: "Error",
        description: "Unhandled error",
      });
    });
  });
});

describe("useUpdatePassword Hook", () => {
  beforeEach(() => {
    mockFn.mockReset();
    jest.spyOn(console, "error").mockImplementation((message) => {
      if (message?.message === "Missing fields") return;
      if (typeof message === "undefined") return;
      console.warn(message);
    });
  });

  it("succeed update password with legacyRouterProvider", async () => {
    const { result } = renderHook(() => useUpdatePassword(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          updatePassword: ({ password, confirmPassword }: any) => {
            if (password && confirmPassword) {
              return Promise.resolve({ success: true });
            }
            return Promise.resolve({
              success: false,
              error: new Error("Missing fields"),
            });
          },
        },
        legacyRouterProvider,
      }),
    });

    const { mutate: updatePassword } = result.current;

    await act(async () => {
      updatePassword({ password: "123", confirmPassword: "321" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data).toEqual({ success: true });
    expect(mockFn).not.toBeCalledWith();
  });

  it("succeed update password", async () => {
    const mockGo = jest.fn();

    const { result } = renderHook(() => useUpdatePassword(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          updatePassword: ({ password, confirmPassword }: any) => {
            if (password && confirmPassword) {
              return Promise.resolve({
                success: true,
                redirectTo: "redirectTo",
              });
            }
            return Promise.resolve({
              success: false,
              error: new Error("Missing fields"),
            });
          },
        },
        routerProvider: mockRouterProvider({
          fns: {
            go: () => mockGo,
          },
        }),
      }),
    });

    const { mutate: updatePassword } = result.current;

    await act(async () => {
      updatePassword({ password: "123", confirmPassword: "321" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(mockGo).toBeCalledWith({
      to: "redirectTo",
      type: "replace",
    });
  });

  it("fail update password", async () => {
    const { result } = renderHook(() => useUpdatePassword(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          updatePassword: ({ password, confirmPassword }: any) => {
            if (password && confirmPassword) {
              return Promise.resolve({ success: true });
            }
            return Promise.resolve({
              success: false,
              error: new Error("Missing fields"),
            });
          },
        },
        legacyRouterProvider,
      }),
    });

    const { mutate: updatePassword } = result.current;

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
    expect(mockFn).not.toBeCalledWith();
  });

  it("success and redirect", async () => {
    const { result } = renderHook(() => useUpdatePassword(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,

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
        },
        legacyRouterProvider,
      }),
    });

    const { mutate: updatePassword } = result.current;

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
    expect(mockFn).toBeCalledWith("/login");
  });

  it("fail and redirect", async () => {
    mockFn;
    const { result } = renderHook(() => useUpdatePassword(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,

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
        },
        legacyRouterProvider,
      }),
    });

    const { mutate: updatePassword } = result.current;

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
    expect(mockFn).toBeCalledWith("/register");
  });

  it("should open notification when has error is true", async () => {
    const openNotificationMock = jest.fn();

    const { result } = renderHook(() => useUpdatePassword(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: jest.fn(),
        },
        authProvider: {
          ...mockAuthProvider,
          updatePassword: () =>
            Promise.resolve({
              success: false,
              error: new Error("Error"),
            }),
        },
        legacyRouterProvider,
      }),
    });

    const { mutate: updatePassword } = result.current;

    await act(async () => {
      updatePassword({});
    });

    await waitFor(() => {
      expect(openNotificationMock).toBeCalledWith({
        key: "update-password-error",
        type: "error",
        message: "Error",
        description: "Error",
      });
    });
  });

  it("should open notification when has success is false, error is undefined", async () => {
    const updatePasswordMock = jest.fn();
    const openNotificationMock = jest.fn();
    const closeNotificationMock = jest.fn();

    const { result } = renderHook(() => useUpdatePassword(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: closeNotificationMock,
        },
        authProvider: {
          ...mockAuthProvider,
          updatePassword: updatePasswordMock,
        },
        routerProvider: legacyRouterProvider,
      }),
    });

    const { mutate: updatePassword } = result.current;

    updatePasswordMock.mockResolvedValueOnce({
      success: false,
    });
    await act(async () => {
      updatePassword({});
    });

    await waitFor(() => {
      expect(openNotificationMock).toBeCalledWith({
        key: "update-password-error",
        type: "error",
        message: "Update Password Error",
        description: "Error while updating password",
      });
    });

    updatePasswordMock.mockResolvedValueOnce({
      success: true,
    });
    await act(async () => {
      updatePassword({});
    });
    await waitFor(() => {
      expect(closeNotificationMock).toBeCalledWith("update-password-error");
    });
  });

  it("should open notification when throw error", async () => {
    const openNotificationMock = jest.fn();

    const { result } = renderHook(() => useUpdatePassword(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: jest.fn(),
        },
        authProvider: {
          ...mockAuthProvider,
          updatePassword: () => {
            throw new Error("Unhandled error");
          },
        },
      }),
    });

    const { mutate: updatePassword } = result.current;

    await act(async () => {
      updatePassword({});
    });

    await waitFor(() => {
      expect(openNotificationMock).toBeCalledWith({
        key: "update-password-error",
        type: "error",
        message: "Error",
        description: "Unhandled error",
      });
    });
  });

  it("should work notificationProvider", async () => {
    const onErrorMock = jest.fn();
    const onSuccessMock = jest.fn();
    const updatePasswordMock = jest.fn();

    const { result } = renderHook(
      () =>
        useUpdatePassword({
          mutationOptions: {
            onSuccess: onSuccessMock,
            onError: onErrorMock,
          },
        }),
      {
        wrapper: TestWrapper({
          authProvider: {
            ...mockAuthProvider,
            updatePassword: updatePasswordMock,
          },
        }),
      },
    );

    const { mutate: updatePassword } = result.current;

    updatePasswordMock.mockRejectedValueOnce(new Error("Error"));
    await act(async () => {
      updatePassword({});
    });
    await waitFor(() => {
      expect(onErrorMock).toBeCalledTimes(1);
    });

    updatePasswordMock.mockResolvedValueOnce({
      success: false,
    });
    await act(async () => {
      updatePassword({});
    });
    await waitFor(() => {
      expect(onSuccessMock).toBeCalledTimes(1);
    });

    updatePasswordMock.mockResolvedValueOnce({
      success: true,
    });
    await act(async () => {
      updatePassword({});
    });
    await waitFor(() => {
      expect(onSuccessMock).toBeCalledTimes(2);
    });
  });

  it("should override `mutationFn` with mutationOptions.mutationFn", async () => {
    const updatePasswordMock = jest.fn().mockResolvedValue({ data: {} });
    const mutationFnMock = jest.fn().mockResolvedValue({ data: {} });

    const { result } = renderHook(
      () =>
        useUpdatePassword({
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
            updatePassword: updatePasswordMock,
          },
        }),
      },
    );

    result.current.mutate({});

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(updatePasswordMock).not.toBeCalled();
    expect(mutationFnMock).toBeCalled();
  });

  it("should override `mutationKey` with `mutationOptions.mutationKey`", async () => {
    const updatePasswordMock = jest.fn().mockResolvedValue({ data: {} });

    const { result } = renderHook(
      () =>
        useUpdatePassword({
          mutationOptions: {
            mutationKey: ["foo", "bar"],
          },
        }),
      {
        wrapper: TestWrapper({
          authProvider: {
            ...mockAuthProvider,
            updatePassword: updatePasswordMock,
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

    const successNotification = {
      message: "Success!",
      description: "Operation completed successfully",
    };

    const { result } = renderHook(() => useUpdatePassword(), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: jest.fn(),
        },
        authProvider: {
          ...mockAuthProvider,
          updatePassword: () =>
            Promise.resolve({
              success: true,
              successNotification,
            }),
        },
      }),
    });

    await act(async () => {
      result.current.mutate({});
    });

    expect(openNotificationMock).toHaveBeenCalledWith({
      key: "update-password-success",
      type: "success",
      message: "Success!",
      description: "Operation completed successfully",
    });
  });
});

// NOTE : Will be removed in v5
describe("useUpdatePassword Hook authProvider selection", () => {
  it("selects new authProvider", async () => {
    const legacyUpdatePassword = jest.fn(() => Promise.resolve());
    const updatePassword = jest.fn(() => Promise.resolve({ success: true }));

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
        legacyRouterProvider,
      }),
    });

    const { mutate: login } = result.current;

    await act(async () => {
      login({});
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });

    expect(legacyUpdatePassword).not.toHaveBeenCalled();
    expect(updatePassword).toHaveBeenCalled();
  });

  it("selects v3LegacyAuthProviderCompatible authProvider", async () => {
    const legacyUpdatePassword = jest.fn(() => Promise.resolve());
    const updatePassword = jest.fn(() => Promise.resolve({ success: true }));

    const { result } = renderHook(
      () => useUpdatePassword({ v3LegacyAuthProviderCompatible: true }),
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
          legacyRouterProvider,
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

    expect(legacyUpdatePassword).toHaveBeenCalled();
    expect(updatePassword).not.toHaveBeenCalled();
  });
});

describe("useUpdatePassword Hook with v3LegacyAuthProviderCompatible", () => {
  it("should be redirect legacyRouterProvider", async () => {
    const { result } = renderHook(
      () =>
        useUpdatePassword({
          v3LegacyAuthProviderCompatible: true,
        }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            login: () => Promise.resolve(),
            updatePassword: ({ password, confirmPassword }) => {
              if (password && confirmPassword) {
                return Promise.resolve("redirectTo");
              }
              return Promise.reject(new Error("Missing fields"));
            },
            checkAuth: () => Promise.resolve(),
            checkError: () => Promise.resolve(),
            getPermissions: () => Promise.resolve(),
            logout: () => Promise.resolve(),
            getUserIdentity: () => Promise.resolve({ id: 1 }),
          },
          legacyRouterProvider: {
            ...mockLegacyRouterProvider(),
            useHistory: () => ({
              goBack: jest.fn(),
              replace: mockFn,
              push: jest.fn(),
            }),
          },
        }),
      },
    );

    const { mutate: updatePassword } = result.current;

    await act(async () => {
      updatePassword({ password: "123", confirmPassword: "321" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(mockFn).toBeCalledWith("redirectTo");
  });

  it("should be redirect routerProvider", async () => {
    const { result } = renderHook(
      () =>
        useUpdatePassword({
          v3LegacyAuthProviderCompatible: true,
        }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            login: () => Promise.resolve(),
            updatePassword: ({ password, confirmPassword }) => {
              if (password && confirmPassword) {
                return Promise.resolve("redirectTo");
              }
              return Promise.reject(new Error("Missing fields"));
            },
            checkAuth: () => Promise.resolve(),
            checkError: () => Promise.resolve(),
            getPermissions: () => Promise.resolve(),
            logout: () => Promise.resolve(),
            getUserIdentity: () => Promise.resolve({ id: 1 }),
          },
          routerProvider: {
            ...mockRouterProvider({
              fns: {
                go: () => mockFn,
              },
            }),
          },
        }),
      },
    );

    const { mutate: updatePassword } = result.current;

    await act(async () => {
      updatePassword({ password: "123", confirmPassword: "321" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(mockFn).toBeCalledWith("redirectTo");
  });
});
