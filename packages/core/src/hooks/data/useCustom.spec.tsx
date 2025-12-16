import { vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockRouterProvider } from "@test";

import { useCustom } from "./useCustom";

describe("useCustom Hook", () => {
  it("works with rest json server", async () => {
    const { result } = renderHook(
      () =>
        useCustom({
          url: "remoteUrl",
          method: "get",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    const { data } = result.current.result;

    expect(data).toHaveLength(2);
  });

  describe("result.data undefined handling (Issue #7088)", () => {
    it("should have undefined result.data during loading state", async () => {
      const { result } = renderHook(
        () =>
          useCustom({
            url: "remoteUrl",
            method: "get",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                custom: () => {
                  return new Promise((resolve) => {
                    setTimeout(() => resolve({ data: [{ id: 1 }] }), 100);
                  });
                },
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      // Initially, result.data should be undefined
      expect(result.current.result.data).toBeUndefined();
      expect(result.current.query.isPending).toBeTruthy();

      await waitFor(() => {
        expect(result.current.query.isSuccess).toBeTruthy();
      });

      // After success, result.data should be defined
      expect(result.current.result.data).toBeDefined();
      expect(result.current.result.data).toHaveLength(1);
    });

    it("should have undefined result.data when query is disabled", async () => {
      const { result } = renderHook(
        () =>
          useCustom({
            url: "remoteUrl",
            method: "get",
            queryOptions: {
              enabled: false,
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
          }),
        },
      );

      // Query is disabled, so data should remain undefined
      expect(result.current.result.data).toBeUndefined();
      expect(result.current.query.isPending).toBeFalsy();
      expect(result.current.query.isSuccess).toBeFalsy();
    });

    it("should have undefined result.data on error", async () => {
      const customMock = vi.fn().mockRejectedValue(new Error("API Error"));

      const { result } = renderHook(
        () =>
          useCustom({
            url: "remoteUrl",
            method: "get",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                custom: customMock,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isError).toBeTruthy();
      });

      // On error, result.data should be undefined
      expect(result.current.result.data).toBeUndefined();
    });

    it("should handle empty data response correctly", async () => {
      const customMock = vi.fn().mockResolvedValue({ data: [] });

      const { result } = renderHook(
        () =>
          useCustom({
            url: "remoteUrl",
            method: "get",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                custom: customMock,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isSuccess).toBeTruthy();
      });

      // Empty array is still defined data
      expect(result.current.result.data).toBeDefined();
      expect(result.current.result.data).toHaveLength(0);
    });

    it("should handle null data in response", async () => {
      const customMock = vi.fn().mockResolvedValue({ data: null });

      const { result } = renderHook(
        () =>
          useCustom({
            url: "remoteUrl",
            method: "get",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                custom: customMock,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isSuccess).toBeTruthy();
      });

      // Null data should be reflected in result.data
      expect(result.current.result.data).toBeNull();
    });

    it("should allow safe optional chaining on result.data", async () => {
      const { result } = renderHook(
        () =>
          useCustom<{ items: string[] }>({
            url: "remoteUrl",
            method: "get",
            queryOptions: {
              enabled: false,
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
          }),
        },
      );

      // This should not throw - optional chaining should work
      const items = result.current.result.data?.items;
      expect(items).toBeUndefined();
    });

    it("should transition from undefined to defined on successful fetch", async () => {
      const customMock = vi.fn().mockResolvedValue({
        data: { id: 1, title: "Test Post" },
      });

      const { result } = renderHook(
        () =>
          useCustom({
            url: "remoteUrl",
            method: "get",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                custom: customMock,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      // Track the transition
      const dataStates: (any | undefined)[] = [];
      
      // Initial state
      dataStates.push(result.current.result.data);

      await waitFor(() => {
        expect(result.current.query.isSuccess).toBeTruthy();
      });

      // Final state
      dataStates.push(result.current.result.data);

      // Verify transition from undefined to defined
      expect(dataStates[0]).toBeUndefined();
      expect(dataStates[1]).toBeDefined();
      expect(dataStates[1]).toEqual({ id: 1, title: "Test Post" });
    });
  });

  describe("without custom query key", () => {
    const config = { sorters: [{ field: "id", order: "desc" }] } as any;
    const meta = { meta: "meta" };

    it("builds query key itself", async () => {
      const { result } = renderHook(
        () =>
          useCustom({
            url: "remoteUrl",
            method: "get",
            config,
            meta,
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isSuccess).toBeTruthy();
      });
    });
  });

  describe("with custom query key", () => {
    it("prioritizes custom query key", async () => {
      const { result } = renderHook(
        () =>
          useCustom({
            url: "remoteUrl",
            method: "get",
            queryOptions: { queryKey: ["MyKey"] },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isSuccess).toBeTruthy();
      });
    });
  });

  it("should pass meta to dataProvider router and hook", async () => {
    const customMock = vi.fn();

    renderHook(
      () =>
        useCustom({
          url: "remoteUrl",
          method: "get",
          meta: { foo: "bar" },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              custom: customMock,
            },
          },
          routerProvider: mockRouterProvider({
            params: { baz: "qux" },
          }),
          resources: [{ name: "posts", meta: { dip: "dop" } }],
        }),
      },
    );

    await waitFor(() => {
      expect(customMock).toHaveBeenCalled();
    });

    expect(customMock).toHaveBeenCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          foo: "bar",
          baz: "qux",
        }),
      }),
    );
  });

  describe("useNotification", () => {
    it("should call `open` from the notification provider on error", async () => {
      const customMock = vi.fn().mockRejectedValue(new Error("Error"));
      const notificationMock = vi.fn();

      const { result } = renderHook(
        () =>
          useCustom({
            url: "remoteUrl",
            method: "get",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                custom: customMock,
              },
            },
            notificationProvider: {
              open: notificationMock,
              close: vi.fn(),
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isError).toBeTruthy();
      });

      expect(notificationMock).toHaveBeenCalledWith({
        description: "Error",
        key: "get-notification",
        message: "Error (status code: undefined)",
        type: "error",
      });
    });

    it("should call `open` from notification provider on success with custom notification params", async () => {
      const openNotificationMock = vi.fn();

      const { result } = renderHook(
        () =>
          useCustom({
            url: "remoteUrl",
            method: "get",
            successNotification: () => ({
              message: "Success",
              description: "Successfully created post",
              type: "success",
            }),
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            notificationProvider: {
              open: openNotificationMock,
              close: vi.fn(),
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toHaveBeenCalledWith({
        description: "Successfully created post",
        message: "Success",
        type: "success",
      });
    });

    it("should not call `open` from notification provider on return `false`", async () => {
      const openNotificationMock = vi.fn();

      const { result } = renderHook(
        () =>
          useCustom({
            url: "remoteUrl",
            method: "get",
            successNotification: () => false,
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            notificationProvider: {
              open: openNotificationMock,
              close: vi.fn(),
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toHaveBeenCalledTimes(0);
    });

    it("should call `open` from notification provider on error with custom notification params", async () => {
      const customMock = vi.fn().mockRejectedValue(new Error("Error"));
      const openNotificationMock = vi.fn();

      const { result } = renderHook(
        () =>
          useCustom({
            url: "remoteUrl",
            method: "get",
            errorNotification: () => ({
              message: "Error",
              description: "There was an error creating post",
              type: "error",
            }),
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                custom: customMock,
              },
            },
            notificationProvider: {
              open: openNotificationMock,
              close: vi.fn(),
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isError).toBeTruthy();
      });

      expect(openNotificationMock).toHaveBeenCalledWith({
        description: "There was an error creating post",
        message: "Error",
        type: "error",
      });
    });
  });

  it("should throw error if no `custom` method is provided", async () => {
    vi.spyOn(console, "error").mockImplementation(() => null);

    expect(() =>
      renderHook(
        () =>
          useCustom({
            url: "remoteUrl",
            method: "get",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                custom: undefined,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      ),
    ).toThrow("Not implemented custom on data provider.");
  });

  describe("useOnError", () => {
    it("should call `onError` from the auth provider on error", async () => {
      const customMock = vi.fn().mockRejectedValue(new Error("Error"));
      const onErrorMock = vi.fn();

      const { result } = renderHook(
        () =>
          useCustom({
            url: "remoteUrl",
            method: "get",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                custom: customMock,
              },
            },
            authProvider: {
              login: () => Promise.resolve({ success: true }),
              logout: () => Promise.resolve({ success: true }),
              check: () => Promise.resolve({ authenticated: true }),
              onError: onErrorMock,
            } as any,
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isError).toBeTruthy();
      });

      expect(onErrorMock).toHaveBeenCalledWith(new Error("Error"));
    });

    it("should call `checkError` from the legacy auth provider on error", async () => {
      const customMock = vi.fn().mockRejectedValue(new Error("Error"));
      const onErrorMock = vi.fn();

      const { result } = renderHook(
        () =>
          useCustom({
            url: "remoteUrl",
            method: "get",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                custom: customMock,
              },
            },
            authProvider: {
              login: () => Promise.resolve({ success: true }),
              logout: () => Promise.resolve({ success: true }),
              check: () => Promise.resolve({ authenticated: true }),
              onError: onErrorMock,
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.query.isError).toBeTruthy();
      });

      expect(onErrorMock).toHaveBeenCalledWith(new Error("Error"));
    });
  });

  it("works correctly with `interval` and `onInterval` params", async () => {
    const onInterval = vi.fn();
    const { result } = renderHook(
      () =>
        useCustom({
          url: "remoteUrl",
          method: "get",
          overtimeOptions: {
            interval: 100,
            onInterval,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              custom: () => {
                return new Promise((res) => {
                  setTimeout(() => res({} as any), 1000);
                });
              },
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isPending).toBeTruthy();
      expect(result.current.overtime.elapsedTime).toBe(900);
      expect(onInterval).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(result.current.query.isPending).toBeFalsy();
      expect(result.current.overtime.elapsedTime).toBeUndefined();
    });
  });
});
