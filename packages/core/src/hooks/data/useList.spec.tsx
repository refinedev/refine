import { renderHook, waitFor } from "@testing-library/react";

import {
  MockJSONServer,
  TestWrapper,
  mockRouterProvider,
  queryClient,
} from "@test";

import { defaultRefineOptions } from "@contexts/refine";

import type { IRefineContextProvider } from "../../contexts/refine/types";
import { useList } from "./useList";

const mockRefineProvider: IRefineContextProvider = {
  hasDashboard: false,
  ...defaultRefineOptions,
  options: defaultRefineOptions,
};

describe("useList Hook", () => {
  it("with rest json server", async () => {
    const { result } = renderHook(() => useList({ resource: "posts" }), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    const { data } = result.current;

    expect(data?.data).toHaveLength(2);
    expect(data?.total).toEqual(2);
  });

  it.each(["server", undefined] as const)(
    "should include pagination in queryKey when mode is %s",
    async (mode) => {
      const getListMock = jest.fn();

      renderHook(
        () =>
          useList({
            resource: "posts",
            pagination: {
              current: 1,
              pageSize: 10,
              mode,
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );
      expect(getListMock).toBeCalledWith(
        expect.objectContaining({
          meta: {
            queryContext: {
              queryKey: [
                "default",
                "posts",
                "list",
                {
                  hasPagination: true,
                  pagination: {
                    current: 1,
                    mode: "server",
                    pageSize: 10,
                  },
                },
              ],
              signal: new AbortController().signal,
            },
          },
        }),
      );
    },
  );

  it.each(["client", "off"] as const)(
    "should not include pagination in queryKey",
    async (mode) => {
      const getListMock = jest.fn();

      renderHook(
        () =>
          useList({
            resource: "posts",
            pagination: {
              current: 1,
              pageSize: 10,
              mode,
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      expect(getListMock).toBeCalledWith(
        expect.objectContaining({
          resource: "posts",
          pagination: {
            current: 1,
            pageSize: 10,
            mode,
          },
          meta: {
            queryContext: {
              queryKey: ["default", "posts", "list", { hasPagination: false }],
              signal: new AbortController().signal,
            },
          },
        }),
      );
    },
  );

  it("data should be sliced when pagination mode is client", async () => {
    const { result } = renderHook(
      () =>
        useList({
          resource: "posts",
          pagination: {
            mode: "client",
            pageSize: 1,
            current: 1,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data?.data).toHaveLength(1);
  });

  it("user should be able to use queryOptions's select to transform data when pagination mode is client", async () => {
    const { result } = renderHook(
      () =>
        useList<{ id: number }>({
          resource: "posts",
          pagination: {
            mode: "client",
          },
          queryOptions: {
            select: (data) => {
              return {
                data: data.data.map((item) => ({
                  id: item.id,
                })),
                total: data.total,
              };
            },
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data?.data).toStrictEqual([{ id: "1" }, { id: "2" }]);
  });

  it("when pagination mode is client and the user use queryOptions's select, useList should return the data from dataProvider", async () => {
    const { result } = renderHook(
      () =>
        useList({
          resource: "posts",
          pagination: {
            mode: "client",
          },
          queryOptions: {
            select: (data) => {
              return data;
            },
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getList: () =>
                Promise.resolve({
                  data: [],
                  total: 0,
                  foo: "bar",
                }),
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data?.foo).toBe("bar");
  });

  it("should only pass meta from the hook parameter and query parameters to the dataProvider", async () => {
    const getListMock = jest.fn();

    renderHook(() => useList({ resource: "posts", meta: { foo: "bar" } }), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            getList: getListMock,
          },
        },
        routerProvider: mockRouterProvider({
          params: { baz: "qux" },
        }),
        resources: [{ name: "posts", meta: { dip: "dop" } }],
      }),
    });

    await waitFor(() => {
      expect(getListMock).toBeCalled();
    });

    expect(getListMock).toBeCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          foo: "bar",
          baz: "qux",
        }),
      }),
    );
  });

  describe("useResourceSubscription", () => {
    it.each(["default", "categories"])(
      "useSubscription [dataProviderName: %s]",
      async (dataProviderName) => {
        const onSubscribeMock = jest.fn();

        const { result } = renderHook(
          () =>
            useList({
              resource: "posts",
              dataProviderName,
            }),
          {
            wrapper: TestWrapper({
              dataProvider: MockJSONServer,
              resources: [{ name: "posts" }],
              liveProvider: {
                unsubscribe: jest.fn(),
                subscribe: onSubscribeMock,
              },
              refineProvider: {
                ...mockRefineProvider,
                liveMode: "auto",
              },
            }),
          },
        );

        await waitFor(() => {
          expect(result.current.isSuccess).toBeTruthy();
        });

        expect(onSubscribeMock).toBeCalled();
        expect(onSubscribeMock).toHaveBeenCalledWith(
          expect.objectContaining({
            channel: "resources/posts",
            callback: expect.any(Function),
            params: expect.objectContaining({
              hasPagination: true,
              pagination: {
                current: 1,
                mode: "server",
                pageSize: 10,
              },
              resource: "posts",
              subscriptionType: "useList",
            }),
            types: ["*"],
            dataProviderName,
            meta: {
              dataProviderName,
            },
          }),
        );
      },
    );

    it("liveMode = Off useSubscription", async () => {
      const onSubscribeMock = jest.fn();

      const { result } = renderHook(
        () =>
          useList({
            resource: "posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
            liveProvider: {
              unsubscribe: jest.fn(),
              subscribe: onSubscribeMock,
            },
            refineProvider: {
              ...mockRefineProvider,
              liveMode: "off",
            },
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(onSubscribeMock).not.toBeCalled();
    });

    it("liveMode = Off and liveMode hook param auto", async () => {
      const onSubscribeMock = jest.fn();

      const { result } = renderHook(
        () => useList({ resource: "posts", liveMode: "auto" }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
            liveProvider: {
              unsubscribe: jest.fn(),
              subscribe: onSubscribeMock,
            },
            refineProvider: {
              ...mockRefineProvider,
              liveMode: "off",
            },
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(onSubscribeMock).toBeCalled();
    });

    it("unsubscribe call on unmount", async () => {
      const onSubscribeMock = jest.fn(() => true);
      const onUnsubscribeMock = jest.fn();

      const { result, unmount } = renderHook(
        () =>
          useList({
            resource: "posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
            liveProvider: {
              unsubscribe: onUnsubscribeMock,
              subscribe: onSubscribeMock,
            },
            refineProvider: {
              ...mockRefineProvider,
              liveMode: "auto",
            },
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(onSubscribeMock).toBeCalled();

      unmount();
      expect(onUnsubscribeMock).toBeCalledWith(true);
      expect(onUnsubscribeMock).toBeCalledTimes(1);
    });

    it("should not subscribe if `queryOptions.enabled` is false", async () => {
      const onSubscribeMock = jest.fn();

      renderHook(
        () =>
          useList({
            resource: "posts",
            queryOptions: {
              enabled: false,
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
            liveProvider: {
              unsubscribe: jest.fn(),
              subscribe: onSubscribeMock,
            },
            refineProvider: {
              ...mockRefineProvider,
              liveMode: "auto",
            },
          }),
        },
      );

      expect(onSubscribeMock).not.toBeCalled();
    });
  });

  describe("useNotification", () => {
    it("should call `open` from the notification provider on error", async () => {
      const getListMock = jest.fn().mockRejectedValue(new Error("Error"));
      const notificationMock = jest.fn();

      const { result } = renderHook(
        () =>
          useList({
            resource: "posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
              },
            },
            notificationProvider: {
              open: notificationMock,
              close: jest.fn(),
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.isError).toBeTruthy();
      });

      expect(notificationMock).toBeCalledWith({
        description: "Error",
        key: "posts-useList-notification",
        message: "Error (status code: undefined)",
        type: "error",
      });
    });

    it("should call `open` from notification provider on success with custom notification params", async () => {
      const openNotificationMock = jest.fn();

      const { result } = renderHook(
        () =>
          useList({
            resource: "posts",
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
              close: jest.fn(),
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toBeCalledWith({
        description: "Successfully created post",
        message: "Success",
        type: "success",
      });
    });

    it("should not call `open` from notification provider on return `false`", async () => {
      const openNotificationMock = jest.fn();

      const { result } = renderHook(
        () =>
          useList({
            resource: "posts",
            successNotification: () => false,
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            notificationProvider: {
              open: openNotificationMock,
              close: jest.fn(),
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toBeCalledTimes(0);
    });

    it("should call `open` from notification provider on error with custom notification params", async () => {
      const getListMock = jest.fn().mockRejectedValue(new Error("Error"));
      const openNotificationMock = jest.fn();

      const { result } = renderHook(
        () =>
          useList({
            resource: "posts",
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
                getList: getListMock,
              },
            },
            notificationProvider: {
              open: openNotificationMock,
              close: jest.fn(),
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.isError).toBeTruthy();
      });

      expect(openNotificationMock).toBeCalledWith({
        description: "There was an error creating post",
        message: "Error",
        type: "error",
      });
    });
  });

  describe("useOnError", () => {
    it("should call `onError` from the auth provider on error", async () => {
      const getListMock = jest.fn().mockRejectedValue(new Error("Error"));
      const onErrorMock = jest.fn();

      const { result } = renderHook(
        () =>
          useList({
            resource: "posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
              },
            },
            authProvider: {
              onError: onErrorMock,
            } as any,
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.isError).toBeTruthy();
      });

      expect(onErrorMock).toBeCalledWith(new Error("Error"));
    });

    it("should call `checkError` from the legacy auth provider on error", async () => {
      const getListMock = jest.fn().mockRejectedValue(new Error("Error"));
      const onErrorMock = jest.fn();

      const { result } = renderHook(
        () =>
          useList({
            resource: "posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
              },
            },
            legacyAuthProvider: {
              checkError: onErrorMock,
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.isError).toBeTruthy();
      });

      expect(onErrorMock).toBeCalledWith(new Error("Error"));
    });
  });

  describe("queryOptions", () => {
    it("should run `queryOptions.onSuccess` callback on success", async () => {
      const onSuccessMock = jest.fn();
      const getListMock = jest.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const { result } = renderHook(
        () =>
          useList({
            resource: "posts",
            queryOptions: {
              onSuccess: onSuccessMock,
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(onSuccessMock).toBeCalledWith({
        data: [{ id: 1, title: "foo" }],
      });
    });

    it("should run `queryOptions.onError` callback on error", async () => {
      const onErrorMock = jest.fn();
      const getListMcok = jest.fn().mockRejectedValue(new Error("Error"));

      const { result } = renderHook(
        () =>
          useList({
            resource: "posts",
            queryOptions: {
              onError: onErrorMock,
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMcok,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.isError).toBeTruthy();
      });

      expect(onErrorMock).toBeCalledWith(new Error("Error"));
    });

    it("should override `queryKey` with `queryOptions.queryKey`", async () => {
      const getListMock = jest.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const { result } = renderHook(
        () =>
          useList({
            resource: "posts",
            queryOptions: {
              queryKey: ["foo", "bar"],
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(getListMock).toBeCalledWith(
        expect.objectContaining({
          meta: expect.objectContaining({
            queryContext: expect.objectContaining({
              queryKey: ["foo", "bar"],
            }),
          }),
        }),
      );

      expect(
        queryClient.getQueryCache().findAll({
          queryKey: ["foo", "bar"],
        }),
      ).toHaveLength(1);
    });

    it("should override `queryFn` with `queryOptions.queryFn`", async () => {
      const getListMock = jest.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const queryFnMock = jest.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const { result } = renderHook(
        () =>
          useList({
            resource: "posts",
            queryOptions: {
              queryFn: queryFnMock,
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
              },
            },
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(getListMock).not.toBeCalled();
      expect(queryFnMock).toBeCalled();
    });
  });

  it("should support deprecated `config` property", async () => {
    const getListMock = jest.fn().mockResolvedValue({
      data: [{ id: 1, title: "foo" }],
    });

    const { result } = renderHook(
      () =>
        useList({
          resource: "posts",
          config: {
            filters: [{ field: "id", operator: "eq", value: 1 }],
            hasPagination: false,
            pagination: {
              mode: "client",
              current: 10,
              pageSize: 5,
            },
            sort: [{ field: "id", order: "asc" }],
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getList: getListMock,
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(getListMock).toBeCalledWith(
      expect.objectContaining({
        filters: [{ field: "id", operator: "eq", value: 1 }],
        hasPagination: false,
        pagination: {
          mode: "off",
          current: 10,
          pageSize: 5,
        },
        sort: [{ field: "id", order: "asc" }],
      }),
    );
  });

  it("should select correct dataProviderName", async () => {
    const getListDefaultMock = jest.fn().mockResolvedValue({
      data: [{ id: 1, title: "foo" }],
    });
    const getListFooMock = jest.fn().mockResolvedValue({
      data: [{ id: 1, title: "foo" }],
    });

    const { result } = renderHook(
      () =>
        useList({
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getList: getListDefaultMock,
            },
            foo: {
              ...MockJSONServer.default,
              getList: getListFooMock,
            },
          },
          resources: [
            {
              name: "categories",
            },
            {
              name: "posts",
              meta: {
                dataProviderName: "foo",
              },
            },
          ],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(getListFooMock).toBeCalledWith(
      expect.objectContaining({
        resource: "posts",
      }),
    );
    expect(getListDefaultMock).not.toBeCalled();
  });

  it("should get correct `meta` of related resource", async () => {
    const getListMock = jest.fn().mockResolvedValue({
      data: [{ id: 1, title: "foo" }],
    });

    const { result } = renderHook(
      () =>
        useList({
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getList: getListMock,
            },
          },
          resources: [
            {
              name: "posts",
              meta: {
                foo: "bar",
              },
            },
          ],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(getListMock).toBeCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          foo: "bar",
        }),
      }),
    );
  });

  describe("when passing `identifier` instead of `name`", () => {
    it("should select correct dataProviderName", async () => {
      const getListDefaultMock = jest.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });
      const getListFooMock = jest.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const { result } = renderHook(
        () =>
          useList({
            resource: "featured-posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListDefaultMock,
              },
              foo: {
                ...MockJSONServer.default,
                getList: getListFooMock,
              },
            },
            resources: [
              {
                name: "posts",
              },
              {
                name: "posts",
                identifier: "featured-posts",
                meta: {
                  dataProviderName: "foo",
                },
              },
            ],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(getListFooMock).toBeCalledWith(
        expect.objectContaining({
          resource: "posts",
        }),
      );
      expect(getListDefaultMock).not.toBeCalled();
    });

    it("should create queryKey with `identifier`", async () => {
      const getListMock = jest.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const { result } = renderHook(
        () =>
          useList({
            resource: "featured-posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
              },
            },
            resources: [
              {
                name: "posts",
                identifier: "featured-posts",
              },
            ],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(getListMock).toBeCalledWith(
        expect.objectContaining({
          meta: expect.objectContaining({
            queryContext: expect.objectContaining({
              queryKey: [
                "default",
                "featured-posts",
                "list",
                expect.any(Object),
              ],
            }),
          }),
        }),
      );
    });

    it("should get correct `meta` of related resource", async () => {
      const getListMock = jest.fn().mockResolvedValue({
        data: [{ id: 1, title: "foo" }],
      });

      const { result } = renderHook(
        () =>
          useList({
            resource: "featured-posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
              },
            },
            resources: [
              {
                name: "posts",
                identifier: "all-posts",
                meta: {
                  foo: "bar",
                },
              },
              {
                name: "posts",
                identifier: "featured-posts",
                meta: {
                  bar: "baz",
                },
              },
            ],
          }),
        },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(getListMock).toBeCalledWith(
        expect.objectContaining({
          meta: expect.objectContaining({
            bar: "baz",
          }),
        }),
      );
    });
  });

  it("works correctly with `interval` and `onInterval` params", async () => {
    const onInterval = jest.fn();
    const { result } = renderHook(
      () =>
        useList({
          resource: "posts",
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
              getList: () => {
                return new Promise((res) => {
                  setTimeout(
                    () =>
                      res({
                        data: [],
                        total: 0,
                      }),
                    1000,
                  );
                });
              },
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBeTruthy();
      expect(result.current.overtime.elapsedTime).toBe(900);
      expect(onInterval).toBeCalled();
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
      expect(result.current.overtime.elapsedTime).toBeUndefined();
    });
  });

  it("should infer resource from the route", async () => {
    const getListMock = jest.fn().mockResolvedValue({
      data: [{ id: 1, title: "foo" }],
    });

    const { result } = renderHook(() => useList(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            getList: getListMock,
          },
        },
        routerProvider: mockRouterProvider({
          action: "list",
          params: {},
          pathname: "/posts",
          resource: {
            name: "posts",
            list: "/posts",
          },
        }),
        resources: [
          {
            name: "posts",
            list: "/posts",
          },
        ],
      }),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(getListMock).toBeCalledWith(
      expect.objectContaining({
        resource: "posts",
      }),
    );
  });
});
