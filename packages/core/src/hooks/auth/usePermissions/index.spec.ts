import { renderHook, waitFor } from "@testing-library/react";

import {
  MockJSONServer,
  TestWrapper,
  mockAuthProvider,
  mockLegacyAuthProvider,
} from "@test";

import { usePermissions } from "./";

describe("usePermissions Hook", () => {
  it("returns authenticated userPermissions", async () => {
    const { result } = renderHook(() => usePermissions(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          getPermissions: async () => ["admin"],
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
          login: async () => ({ success: false }),
          check: async () => ({ authenticated: false }),
          onError: async () => ({}),
          logout: async () => ({ success: false }),
          getPermissions: async () => "Not Authenticated",
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
        legacyAuthProvider: mockLegacyAuthProvider,
      }),
    });

    result.current.refetch();
    expect(result.current.data).toBeUndefined();
  });

  it("should accept params", async () => {
    const mockGetPermissions = jest.fn().mockResolvedValueOnce(["admin"]);

    const { result } = renderHook((props) => usePermissions({ ...props }), {
      initialProps: {
        params: { currentRole: "admin" },
        v3LegacyAuthProviderCompatible: false,
      },
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
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
    const getPermissionsMock = jest.fn().mockResolvedValueOnce(["admin"]);

    const { result } = renderHook(
      () => usePermissions({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            ...mockLegacyAuthProvider,
            getPermissions: getPermissionsMock,
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });
    expect(getPermissionsMock).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(["admin"]);

    result.current.refetch();

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });
    expect(getPermissionsMock).toHaveBeenCalledTimes(2);
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
            login: async () => {},
            checkAuth: async () => {
              throw new Error("Not Authenticated");
            },
            checkError: async () => {},
            getPermissions: async () => {
              throw new Error("Not Authenticated");
            },
            logout: async () => {},
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
    });

    expect(result.current.error).toEqual(new Error("Not Authenticated"));
  });

  it("should resolve undefined if no authProvider is provided", async () => {
    const { result } = renderHook(
      () => usePermissions({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(result.current.data).toBeUndefined();
  });

  it("should accept params with v3LegacyAuthProviderCompatible", async () => {
    const legacyGetPermissionsMock = jest.fn().mockResolvedValueOnce(["admin"]);

    const { result } = renderHook((props) => usePermissions({ ...props }), {
      initialProps: {
        params: { currentRole: "admin" },
        v3LegacyAuthProviderCompatible: true,
      },
      wrapper: TestWrapper({
        legacyAuthProvider: {
          ...mockLegacyAuthProvider,
          getPermissions: legacyGetPermissionsMock,
        },
      }),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });

    expect(legacyGetPermissionsMock).toHaveBeenCalledWith({
      currentRole: "admin",
    });

    expect(result.current.data).toEqual(["admin"]);
  });
});

// NOTE : Will be removed in v5
describe("usePermissions Hook authProvider selection", () => {
  it("selects new authProvider", async () => {
    const legacyGetPermissionsMock = jest
      .fn()
      .mockRejectedValueOnce(new Error("I shouldn't be called."));
    const getPermissionsMock = jest.fn().mockResolvedValueOnce(["admin"]);

    const { result } = renderHook(() => usePermissions(), {
      wrapper: TestWrapper({
        legacyAuthProvider: {
          ...mockLegacyAuthProvider,
          getPermissions: legacyGetPermissionsMock,
        },
        authProvider: {
          ...mockAuthProvider,
          getPermissions: getPermissionsMock,
        },
      }),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeFalsy();
    });

    expect(legacyGetPermissionsMock).not.toHaveBeenCalled();
    expect(getPermissionsMock).toHaveBeenCalled();
  });

  it("selects v3LegacyAuthProviderCompatible authProvider", async () => {
    const legacyGetPermissionsMock = jest.fn().mockResolvedValueOnce(["admin"]);

    const getPermissionsMock = jest
      .fn()
      .mockRejectedValueOnce(new Error("I shouldn't be called."));

    const { result } = renderHook(
      () => usePermissions({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            ...mockLegacyAuthProvider,
            getPermissions: legacyGetPermissionsMock,
          },
          authProvider: {
            ...mockAuthProvider,
            getPermissions: getPermissionsMock,
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(legacyGetPermissionsMock).toHaveBeenCalled();
    expect(getPermissionsMock).not.toHaveBeenCalled();
  });
});
