import { renderHook, waitFor } from "@testing-library/react";

import {
  TestWrapper,
  act,
  mockLegacyRouterProvider,
  mockRouterProvider,
} from "@test";

import { useOnError } from ".";
import type { LegacyRouterProvider } from "../../../contexts/router/legacy/types";

const mockReplace = jest.fn();
const mockPush = jest.fn();

const legacyRouterProvider: LegacyRouterProvider = {
  ...mockLegacyRouterProvider(),
  useHistory: () => ({
    goBack: jest.fn(),
    replace: mockReplace,
    push: mockPush,
  }),
};
// NOTE : Will be removed in v5
describe("v3LegacyAuthProviderCompatible useOnError Hook", () => {
  beforeEach(() => {
    mockReplace.mockReset();
    mockPush.mockReset();

    jest.spyOn(console, "error").mockImplementation((message) => {
      if (message === "rejected" || message === "/customPath") return;
      console.warn(message);
    });
  });

  it("logout and redirect to login if check error rejected", async () => {
    const onErrorMock = jest.fn();

    const { result } = renderHook(
      () => useOnError({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            isProvided: true,
            login: () => Promise.resolve(),
            checkAuth: () => Promise.resolve(),
            checkError: () => Promise.reject(),
            getPermissions: () => Promise.resolve(),
            logout: onErrorMock,
            getUserIdentity: () => Promise.resolve(),
          },
          legacyRouterProvider,
        }),
      },
    );

    const { mutate: checkError } = result.current;

    await act(async () => {
      await checkError({});
    });

    await waitFor(() => {
      expect(!result.current.isLoading).toBeTruthy();
    });

    expect(onErrorMock).toBeCalledTimes(1);
    expect(mockPush).toBeCalledWith("/login");
  });

  it("logout and redirect to custom path if check error rejected", async () => {
    const { result } = renderHook(
      () => useOnError({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            isProvided: true,
            login: () => Promise.resolve(),
            checkAuth: () => Promise.resolve(),
            checkError: () => Promise.reject("/customPath"),
            getPermissions: () => Promise.resolve(),
            logout: ({ redirectPath }) => {
              return Promise.resolve(redirectPath);
            },
            getUserIdentity: () => Promise.resolve(),
          },
          legacyRouterProvider,
        }),
      },
    );

    const { mutate: checkError } = result.current;

    await act(async () => {
      await checkError({});
    });

    await waitFor(() => {
      expect(!result.current.isLoading).toBeTruthy();
    });

    await act(async () => {
      expect(mockPush).toBeCalledWith("/customPath");
    });
  });
});

describe("useOnError Hook", () => {
  beforeEach(() => {
    mockReplace.mockReset();
    mockPush.mockReset();

    jest.spyOn(console, "error").mockImplementation((message) => {
      if (message === "rejected" || message === "/customPath") return;
      console.warn(message);
    });
  });

  it("logout and redirect to given path if check error rejected", async () => {
    const { result } = renderHook(() => useOnError(), {
      wrapper: TestWrapper({
        authProvider: {
          login: () => Promise.resolve({ success: true }),
          check: () => Promise.resolve({ authenticated: true }),
          onError: () =>
            Promise.resolve({
              error: new Error("rejected"),
              redirectTo: "/login",
              logout: true,
            }),
          getPermissions: () => Promise.resolve(),
          logout: () => Promise.resolve({ success: true }),
        },
        legacyRouterProvider,
      }),
    });

    const { mutate: checkError } = result.current;

    await act(async () => {
      await checkError({});
    });

    await waitFor(() => {
      expect(!result.current.isLoading).toBeTruthy();
    });

    await act(async () => {
      expect(mockPush).toBeCalledWith("/login");
    });
  });

  it("not logout and redirect to given path if check error rejected with legacyRouterProvider", async () => {
    const { result } = renderHook(() => useOnError(), {
      wrapper: TestWrapper({
        authProvider: {
          login: () => Promise.resolve({ success: true }),
          check: () => Promise.resolve({ authenticated: true }),
          onError: () =>
            Promise.resolve({
              error: new Error("rejected"),
              redirectTo: "/login",
              logout: false,
            }),
          getPermissions: () => Promise.resolve(),
          logout: () => Promise.resolve({ success: true }),
        },
        legacyRouterProvider,
      }),
    });

    const { mutate: checkError } = result.current;

    await act(async () => {
      await checkError({});
    });

    await waitFor(() => {
      expect(!result.current.isLoading).toBeTruthy();
    });

    await act(async () => {
      expect(mockReplace).toBeCalledWith("/login");
    });
  });

  it("not logout and redirect to given path if check error rejected", async () => {
    const mockGo = jest.fn();
    const { result } = renderHook(() => useOnError(), {
      wrapper: TestWrapper({
        authProvider: {
          login: () => Promise.resolve({ success: true }),
          check: () => Promise.resolve({ authenticated: true }),
          onError: () =>
            Promise.resolve({
              error: new Error("rejected"),
              redirectTo: "/login",
              logout: false,
            }),
          getPermissions: () => Promise.resolve(),
          logout: () => Promise.resolve({ success: true }),
        },
        routerProvider: mockRouterProvider({
          fns: {
            go: () => mockGo,
          },
        }),
      }),
    });

    const { mutate: checkError } = result.current;

    await act(async () => {
      await checkError({});
    });

    await waitFor(() => {
      expect(!result.current.isLoading).toBeTruthy();
    });

    await act(async () => {
      expect(mockGo).toBeCalledWith({
        to: "/login",
        type: "replace",
      });
    });
  });
});

// NOTE : Will be removed in v5
describe("useOnError Hook authProvider selection", () => {
  it("selects new authProvider", async () => {
    const legacyCheckErrorMock = jest.fn(() => Promise.resolve());
    const onErrorMock = jest.fn(() => Promise.resolve({}));

    const { result } = renderHook(() => useOnError(), {
      wrapper: TestWrapper({
        legacyAuthProvider: {
          login: () => Promise.resolve(),
          checkAuth: () => Promise.resolve(),
          checkError: () => legacyCheckErrorMock(),
          logout: () => Promise.resolve(),
        },
        authProvider: {
          login: () => Promise.resolve({ success: true }),
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => onErrorMock(),
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

    expect(legacyCheckErrorMock).not.toHaveBeenCalled();
    expect(onErrorMock).toHaveBeenCalled();
  });

  it("selects v3LegacyAuthProviderCompatible authProvider", async () => {
    const legacyCheckErrorMock = jest.fn(() => Promise.resolve());
    const onErrorMock = jest.fn(() => Promise.resolve({}));

    const { result } = renderHook(
      () => useOnError({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            login: () => Promise.resolve(),
            checkAuth: () => Promise.resolve(),
            checkError: () => legacyCheckErrorMock(),
            logout: () => Promise.resolve(),
          },
          authProvider: {
            login: () => Promise.resolve({ success: true }),
            check: () => Promise.resolve({ authenticated: true }),
            onError: () => onErrorMock(),
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

    expect(legacyCheckErrorMock).toHaveBeenCalled();
    expect(onErrorMock).not.toHaveBeenCalled();
  });
});
