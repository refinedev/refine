import { renderHook, waitFor } from "@testing-library/react";

import { TestWrapper } from "@test";

import { useIsAuthenticated } from ".";
import * as authContext from "../../../contexts/auth";

describe("useIsAuthenticated Hook", () => {
  it("returns authenticated true", async () => {
    const { result } = renderHook(() => useIsAuthenticated(), {
      wrapper: TestWrapper({
        authProvider: {
          login: () => Promise.resolve({ success: false }),
          check: () =>
            Promise.resolve({
              authenticated: true,
            }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: false }),
        },
      }),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    await waitFor(() => {
      expect(result.current.data?.authenticated).toBeTruthy();
    });
  });

  it("returns authenticated false and called checkError", async () => {
    jest.spyOn(console, "error").mockImplementation((message) => {
      if (message?.message === "Not Authenticated") return;
      console.warn(message);
    });

    const { result } = renderHook(() => useIsAuthenticated(), {
      wrapper: TestWrapper({
        authProvider: {
          login: () => Promise.resolve({ success: false }),
          check: () =>
            Promise.resolve({
              authenticated: false,
              error: new Error("Not Authenticated"),
            }),
          onError: () => Promise.resolve({}),
          logout: () => Promise.resolve({ success: false }),
        },
      }),
    });

    await waitFor(() => {
      expect(result.current.data?.error).toBeTruthy();
    });
  });

  it("returns authenticated false and called checkError with custom redirect path", async () => {
    jest.spyOn(console, "error").mockImplementation((message) => {
      if (message?.redirectPath === "/custom-url") return;
      console.warn(message);
    });

    const checkErrorMock = jest.fn();
    const { result } = renderHook(() => useIsAuthenticated(), {
      wrapper: TestWrapper({
        authProvider: {
          login: () => Promise.resolve({ success: false }),
          check: () =>
            Promise.resolve({
              authenticated: false,
              redirectTo: "/custom-url",
              error: new Error("Not Authenticated"),
            }),
          onError: checkErrorMock,
          logout: () => Promise.resolve({ success: false }),
        },
      }),
    });

    await waitFor(() => {
      expect(result.current.data?.error).toBeTruthy();
    });
  });

  it("should resolve {} if no authProvider is provided", async () => {
    jest.spyOn(authContext, "useAuthProviderContext").mockReturnValue({
      ...jest.requireActual("../../../contexts/auth"),
      check: undefined,
    });

    const { result } = renderHook(() => useIsAuthenticated({}), {
      wrapper: TestWrapper({}),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data).toEqual({ authenticated: true });
  });
});
