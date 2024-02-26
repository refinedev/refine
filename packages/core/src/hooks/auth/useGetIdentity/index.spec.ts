import { renderHook, waitFor } from "@testing-library/react";

import { TestWrapper, queryClient } from "@test";

import { useGetIdentity } from "./";

// NOTE : Will be removed in v5
describe("v3LegacyAuthProviderCompatible useGetIdentity Hook", () => {
  it("returns object useGetIdentity", async () => {
    const { result } = renderHook(
      () => useGetIdentity({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            login: () => Promise.resolve(),
            checkAuth: () => Promise.resolve(),
            checkError: () => Promise.resolve(),
            getPermissions: () => Promise.resolve(),
            logout: () => Promise.resolve(),
            getUserIdentity: () => Promise.resolve({ id: 1 }),
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current?.data).toEqual({ id: 1 });
  });

  it("throw error useGetIdentity", async () => {
    jest.spyOn(console, "error").mockImplementation((message) => {
      if (message?.message === "Not Authenticated") return;
      console.warn(message);
    });

    const { result } = renderHook(
      () => useGetIdentity({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            login: () => Promise.resolve(),
            checkAuth: () => Promise.resolve(),
            checkError: () => Promise.resolve(),
            getPermissions: () => Promise.resolve(),
            logout: () => Promise.resolve(),
            getUserIdentity: () =>
              Promise.reject(new Error("Not Authenticated")),
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
    });

    expect(result.current?.error).toEqual(new Error("Not Authenticated"));
  });

  it("throw error useGetIdentity undefined", async () => {
    const { result } = renderHook(
      () => useGetIdentity({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            login: () => Promise.resolve(),
            checkAuth: () => Promise.resolve(),
            checkError: () => Promise.resolve(),
            getPermissions: () => Promise.resolve(),
            logout: () => Promise.resolve(),
          },
        }),
      },
    );

    await waitFor(() => {
      expect(!result.current.isFetching).toBeTruthy();
    });

    expect(result.current.status).toEqual("loading");
    expect(result.current.data).not.toBeDefined();
  });
});

describe("useGetIdentity Hook", () => {
  const mockAuthProvider = {
    login: () => Promise.resolve({ success: true }),
    check: () => Promise.resolve({ authenticated: true }),
    onError: () => Promise.resolve({}),
    logout: () => Promise.resolve({ success: true }),
  };

  it("returns object useGetIdentity", async () => {
    const { result } = renderHook(
      () => useGetIdentity({ v3LegacyAuthProviderCompatible: false }),
      {
        wrapper: TestWrapper({
          authProvider: {
            ...mockAuthProvider,
            getIdentity: () => Promise.resolve({ id: 1 }),
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.data).toBeTruthy();
    });

    expect(result.current?.data).toEqual({ id: 1 });
  });

  it("return error useGetIdentity", async () => {
    jest.spyOn(console, "error").mockImplementation((message) => {
      if (message?.message === "Not Authenticated") return;
      console.warn(message);
    });

    const { result } = renderHook(() => useGetIdentity(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
          getIdentity: () => Promise.resolve(new Error("Not Authenticated")),
        },
      }),
    });

    await waitFor(() => {
      expect(result.current.data).toBeTruthy();
    });

    expect(result.current?.data).toEqual(new Error("Not Authenticated"));
  });

  it("throw error useGetIdentity undefined", async () => {
    const { result } = renderHook(() => useGetIdentity(), {
      wrapper: TestWrapper({
        authProvider: {
          ...mockAuthProvider,
        },
      }),
    });

    await waitFor(() => {
      expect(!result.current.isFetching).toBeTruthy();
    });

    expect(result.current.status).toEqual("loading");
    expect(result.current.data).not.toBeDefined();
  });

  it("should override `queryKey` with `queryOptions.queryKey`", async () => {
    const getIdentityMock = jest.fn().mockResolvedValue({
      data: { id: 1, title: "foo" },
    });

    const { result } = renderHook(
      () =>
        useGetIdentity({
          queryOptions: {
            queryKey: ["foo", "bar"],
          },
        }),
      {
        wrapper: TestWrapper({
          authProvider: {
            ...mockAuthProvider,
            getIdentity: getIdentityMock,
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(
      queryClient.getQueryCache().findAll({
        queryKey: ["foo", "bar"],
      }),
    ).toHaveLength(1);
  });

  it("should override `queryFn` with `queryOptions.queryFn`", async () => {
    const getIdentityMock = jest.fn().mockResolvedValue({
      data: [{ id: 1, title: "foo" }],
    });
    const queryFnMock = jest.fn().mockResolvedValue({
      data: [{ id: 1, title: "foo" }],
    });

    const { result } = renderHook(
      () =>
        useGetIdentity({
          queryOptions: {
            queryFn: queryFnMock,
          },
        }),
      {
        wrapper: TestWrapper({
          authProvider: {
            ...mockAuthProvider,
            getIdentity: getIdentityMock,
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(getIdentityMock).not.toBeCalled();
    expect(queryFnMock).toBeCalled();
  });
});

// NOTE : Will be removed in v5
describe("useGetIdentity Hook authProvider selection", () => {
  it("selects new authProvider", async () => {
    const legacyGetUserIdentityMock = jest.fn(() => Promise.resolve());
    const getIdentitiyMock = jest.fn(() => Promise.resolve());

    const { result } = renderHook(() => useGetIdentity(), {
      wrapper: TestWrapper({
        legacyAuthProvider: {
          login: () => Promise.resolve(),
          checkAuth: () => Promise.resolve(),
          checkError: () => Promise.resolve(),
          getUserIdentity: () => legacyGetUserIdentityMock(),
        },
        authProvider: {
          login: () => Promise.resolve({ success: true }),
          check: () => Promise.resolve({ authenticated: true }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: true }),
          getIdentity: () => getIdentitiyMock(),
        },
      }),
    });

    await waitFor(() => {
      expect(!result.current.isLoading).toBeFalsy();
    });

    expect(legacyGetUserIdentityMock).not.toHaveBeenCalled();
    expect(getIdentitiyMock).toHaveBeenCalled();
  });

  it("selects v3LegacyAuthProviderCompatible authProvider", async () => {
    const legacyGetUserIdentityMock = jest.fn(() => Promise.resolve());
    const getIdentitiyMock = jest.fn(() => Promise.resolve());

    const { result } = renderHook(
      () => useGetIdentity({ v3LegacyAuthProviderCompatible: true }),
      {
        wrapper: TestWrapper({
          legacyAuthProvider: {
            login: () => Promise.resolve(),
            checkAuth: () => Promise.resolve(),
            checkError: () => Promise.resolve(),
            getUserIdentity: () => legacyGetUserIdentityMock(),
          },
          authProvider: {
            login: () => Promise.resolve({ success: true }),
            check: () => Promise.resolve({ authenticated: true }),
            onError: () => Promise.resolve({}),
            logout: () => Promise.resolve({ success: true }),
            getIdentity: () => getIdentitiyMock(),
          },
        }),
      },
    );

    await waitFor(() => {
      expect(!result.current.isLoading).toBeFalsy();
    });

    expect(legacyGetUserIdentityMock).toHaveBeenCalled();
    expect(getIdentitiyMock).not.toHaveBeenCalled();
  });
});
