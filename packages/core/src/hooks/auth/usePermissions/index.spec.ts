import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper } from "@test";

import { usePermissions } from "./";

describe("usePermissions Hook", () => {
  it("returns authenticated userPermissions", async () => {
    const { result } = renderHook(() => usePermissions(), {
      wrapper: TestWrapper({
        authProvider: {
          login: () => Promise.resolve({ success: true }),
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
          getPermissions: () => Promise.resolve(["admin"]),
        },
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data).toEqual(["admin"]);
  });

  it("returns error for not authenticated", async () => {
    jest.spyOn(console, "error").mockImplementation((message) => {
      if (!message.includes("Not Authenticated")) console.warn(message);
    });

    const { result } = renderHook(() => usePermissions(), {
      wrapper: TestWrapper({
        authProvider: {
          login: () => Promise.resolve({ success: false }),
          check: () => Promise.resolve({ authenticated: false }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: false }),
          getPermissions: () => Promise.resolve("Not Authenticated"),
        },
      }),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });

    expect(result.current.data).toEqual("Not Authenticated");
  });

  it("should resolve undefined if no authProvider is provided", async () => {
    const { result } = renderHook(() => usePermissions(), {
      wrapper: TestWrapper({
        legacyAuthProvider: {
          login: () => Promise.resolve(),
          checkAuth: () => Promise.resolve(),
          checkError: () => Promise.resolve(),
          getPermissions: undefined,
        },
      }),
    });

    result.current.refetch();
    expect(result.current.data).toBeUndefined();
  });

  it("should accept params", async () => {
    const mockGetPermissions = jest.fn(() => Promise.resolve(["admin"]));
    const { result } = renderHook((props) => usePermissions({ ...props }), {
      initialProps: {
        params: { currentRole: "admin" },
        v3LegacyAuthProviderCompatible: false,
      },
      wrapper: TestWrapper({
        authProvider: {
          login: () => Promise.resolve({ success: true }),
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
          getPermissions: mockGetPermissions,
        },
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(mockGetPermissions).toHaveBeenCalledWith({ currentRole: "admin" });
    expect(result.current.data).toEqual(["admin"]);
  });
});

// NOTE : Will be removed in v5
describe("v3LegacyAuthProviderCompatible usePermissions Hook", () => {
  it("returns authenticated userPermissions", async () => {
    const getPermissionMock = jest.fn(() => Promise.resolve(["admin"]));

    const { result } = renderHook(
      () => usePermissions({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            login: () => Promise.resolve(),
            checkAuth: () => Promise.resolve(),
            checkError: () => Promise.resolve(),
            getPermissions: getPermissionMock,
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });
    expect(getPermissionMock).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(["admin"]);

    result.current.refetch();

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });
    expect(getPermissionMock).toHaveBeenCalledTimes(2);
    expect(result.current.data).toEqual(["admin"]);
  });
  it("returns error for not authenticated", async () => {
    jest.spyOn(console, "error").mockImplementation((message) => {
      if (!message.includes("Not Authenticated")) console.warn(message);
    });

    const { result } = renderHook(
      () => usePermissions({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            login: () => Promise.resolve(),
            checkAuth: () => Promise.reject("Not Authenticated"),
            checkError: () => Promise.resolve(),
            getPermissions: () => Promise.reject("Not Authenticated"),
            logout: () => Promise.resolve(),
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
    });

    expect(result.current.error).toEqual("Not Authenticated");
  });

  it("should resolve undefined if no authProvider is provided", async () => {
    const { result } = renderHook(
      () => usePermissions({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            login: () => Promise.resolve(),
            checkAuth: () => Promise.resolve(),
            checkError: () => Promise.resolve(),
            getPermissions: undefined,
          },
        }),
      },
    );

    result.current.refetch();
    expect(result.current.data).toBeUndefined();
  });

  it("should accept params with v3LegacyAuthProviderCompatible", async () => {
    const legacyGetPermissionMock = jest.fn(() => Promise.resolve(["admin"]));
    const { result } = renderHook((props) => usePermissions({ ...props }), {
      initialProps: {
        params: { currentRole: "admin" },
        v3LegacyAuthProviderCompatible: true,
      },
      wrapper: TestWrapper({
        legacyAuthProvider: {
          login: () => Promise.resolve(),
          checkAuth: () => Promise.resolve(),
          checkError: () => Promise.resolve(),
          getPermissions: legacyGetPermissionMock,
        },
      }),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });

    expect(legacyGetPermissionMock).toHaveBeenCalledWith({
      currentRole: "admin",
    });
    expect(result.current.data).toEqual(["admin"]);
  });
});

// NOTE : Will be removed in v5
describe("usePermissions Hook authProvider selection", () => {
  it("selects new authProvider", async () => {
    const legacyGetPermissionMock = jest.fn(() => Promise.resolve());
    const getPermissionMock = jest.fn(() => Promise.resolve());

    const { result } = renderHook(() => usePermissions(), {
      wrapper: TestWrapper({
        legacyAuthProvider: {
          login: () => Promise.resolve(),
          checkAuth: () => Promise.resolve(),
          checkError: () => Promise.resolve(),
          getPermissions: () => legacyGetPermissionMock(),
        },
        authProvider: {
          login: () => Promise.resolve({ success: true }),
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
          getPermissions: () => getPermissionMock(),
        },
      }),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });

    expect(legacyGetPermissionMock).not.toHaveBeenCalled();
    expect(getPermissionMock).toHaveBeenCalled();
  });

  it("selects v3LegacyAuthProviderCompatible authProvider", async () => {
    const legacyGetPermissionMock = jest.fn(() => Promise.resolve());
    const getPermissionMock = jest.fn(() => Promise.resolve());

    const { result } = renderHook(
      () => usePermissions({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            login: () => Promise.resolve(),
            checkAuth: () => Promise.resolve(),
            checkError: () => Promise.resolve(),
            getPermissions: () => legacyGetPermissionMock(),
          },
          authProvider: {
            login: () => Promise.resolve({ success: true }),
            check: () => Promise.resolve({ authenticated: true }),
            onError: () => Promise.resolve({}),
            logout: () => Promise.resolve({ success: true }),
            getPermissions: () => getPermissionMock(),
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });

    expect(legacyGetPermissionMock).toHaveBeenCalled();
    expect(getPermissionMock).not.toHaveBeenCalled();
  });
});
