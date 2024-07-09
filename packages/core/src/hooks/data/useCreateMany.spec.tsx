import { act, renderHook, waitFor } from "@testing-library/react";

import {
  MockJSONServer,
  TestWrapper,
  mockRouterProvider,
  queryClient,
} from "@test";

import * as UseInvalidate from "../invalidate/index";
import { useCreateMany, type UseCreateManyParams } from "./useCreateMany";

describe("useCreateMany Hook [with params]", () => {
  it("should work with rest json server", async () => {
    const { result } = renderHook(() => useCreateMany(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    await act(async () => {
      result.current.mutate({ resource: "posts", values: [{ id: 1 }] });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    const { status, data } = result.current;

    expect(status).toBe("success");
    expect(data?.data[0].slug).toBe("ut-ad-et");
    expect(data?.data[1].slug).toBe("consequatur-molestiae-rerum");
  });

  it("should only pass meta from the hook parameter and query parameters to the dataProvider", async () => {
    const createManyMock = jest.fn();

    const { result } = renderHook(() => useCreateMany(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            createMany: createManyMock,
          },
        },
        routerProvider: mockRouterProvider({
          params: { baz: "qux" },
        }),
        resources: [{ name: "posts", meta: { dip: "dop" } }],
      }),
    });

    result.current.mutate({
      resource: "posts",
      values: [],
      meta: { foo: "bar" },
    });

    await waitFor(() => {
      expect(createManyMock).toBeCalled();
    });

    expect(createManyMock).toBeCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          foo: "bar",
          baz: "qux",
        }),
      }),
    );
  });

  describe("usePublish", () => {
    it.each(["default", "categories"])(
      "publish event on success [dataProviderName: %s]",
      async (dataProviderName) => {
        const onPublishMock = jest.fn();

        const { result } = renderHook(() => useCreateMany(), {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
            liveProvider: {
              unsubscribe: jest.fn(),
              subscribe: jest.fn(),
              publish: onPublishMock,
            },
          }),
        });

        await act(async () => {
          result.current.mutate({
            resource: "posts",
            values: [{ id: 1 }, { id: 2 }],
            dataProviderName,
          });
        });

        await waitFor(() => {
          expect(result.current.isSuccess).toBeTruthy();
        });

        expect(onPublishMock).toBeCalled();
        expect(onPublishMock).toHaveBeenCalledWith({
          channel: "resources/posts",
          date: expect.any(Date),
          type: "created",
          payload: {
            ids: dataProviderName === "default" ? ["1", "2"] : [1, 2],
          },
          meta: {
            dataProviderName,
          },
        });
      },
    );
  });

  describe("useLog", () => {
    it("publish log on success", async () => {
      const createMock = jest.fn();

      const { result } = renderHook(() => useCreateMany(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
          auditLogProvider: {
            create: createMock,
            get: jest.fn(),
            update: jest.fn(),
          },
        }),
      });

      result.current.mutate({
        resource: "posts",
        values: [
          {
            title: "title1",
          },
          {
            title: "title2",
          },
        ],
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(createMock).toBeCalled();
      expect(createMock).toHaveBeenCalledWith({
        action: "createMany",
        author: {},
        data: [
          {
            title: "title1",
          },
          {
            title: "title2",
          },
        ],
        meta: {
          dataProviderName: "default",
          ids: ["1", "2"],
        },
        resource: "posts",
      });
    });
  });

  it("should use `create` method if does not exist `createMany` method in dataProvider", async () => {
    const createMock = jest.fn();

    const { result } = renderHook(() => useCreateMany(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            create: createMock,
            createMany: undefined,
          },
        },
        resources: [{ name: "posts" }],
      }),
    });

    result.current.mutate({
      resource: "posts",
      values: [{ title: "foo" }, { title: "bar" }],
    });

    await waitFor(() => {
      expect(createMock).toBeCalled();
    });

    expect(createMock).toBeCalledTimes(2);
    expect(createMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        resource: "posts",
        variables: { title: "foo" },
      }),
    );
    expect(createMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        resource: "posts",
        variables: { title: "bar" },
      }),
    );
  });

  describe("useNotification", () => {
    it("should call `open` from the notification provider on success", async () => {
      const openNotificationMock = jest.fn();

      const { result } = renderHook(() => useCreateMany(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          notificationProvider: {
            open: openNotificationMock,
            close: jest.fn(),
          },
          resources: [{ name: "posts" }],
        }),
      });

      result.current.mutate({
        resource: "posts",
        values: [{ title: "foo" }, { title: "bar" }],
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toBeCalledWith({
        description: "Success",
        key: "createMany-posts-notification",
        message: "Successfully created posts",
        type: "success",
      });
    });

    it("should call `open` from the notification provider on error", async () => {
      const createManyMock = jest.fn().mockRejectedValue(new Error("Error"));
      const openNotificationMock = jest.fn();

      const { result } = renderHook(() => useCreateMany(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              createMany: createManyMock,
            },
          },
          notificationProvider: {
            open: openNotificationMock,
            close: jest.fn(),
          },
          resources: [{ name: "posts" }],
        }),
      });

      result.current.mutate({
        resource: "posts",
        values: [{ title: "foo" }, { title: "bar" }],
      });

      await waitFor(() => {
        expect(result.current.isError).toBeTruthy();
      });

      expect(openNotificationMock).toBeCalledWith({
        description: "Error",
        key: "createMany-posts-notification",
        message: "There was an error creating posts (status code: undefined",
        type: "error",
      });
    });

    it("should call `open` from notification provider on success with custom notification params", async () => {
      const openNotificationMock = jest.fn();

      const { result } = renderHook(() => useCreateMany(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          notificationProvider: {
            open: openNotificationMock,
            close: jest.fn(),
          },
          resources: [{ name: "posts" }],
        }),
      });

      result.current.mutate({
        resource: "posts",
        values: [{ title: "bar" }],
        successNotification: () => ({
          message: "Success",
          description: "Successfully created post",
          type: "success",
        }),
      });

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

      const { result } = renderHook(() => useCreateMany(), {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          notificationProvider: {
            open: openNotificationMock,
            close: jest.fn(),
          },
          resources: [{ name: "posts" }],
        }),
      });

      result.current.mutate({
        resource: "posts",
        values: [{ title: "bar" }],
        successNotification: () => false,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toBeCalledTimes(0);
    });

    it("should call `open` from notification provider on error with custom notification params", async () => {
      const createManyMock = jest.fn().mockRejectedValue(new Error("Error"));
      const openNotificationMock = jest.fn();

      const { result } = renderHook(() => useCreateMany(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              createMany: createManyMock,
            },
          },
          notificationProvider: {
            open: openNotificationMock,
            close: jest.fn(),
          },
          resources: [{ name: "posts" }],
        }),
      });

      result.current.mutate({
        resource: "posts",
        values: [{ title: "foo" }, { title: "bar" }],
        errorNotification: () => ({
          message: "Error",
          description: "There was an error creating post",
          type: "error",
        }),
      });

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

  it("should select correct dataProviderName", async () => {
    const createManyDefaultMock = jest.fn();
    const createManyFooMock = jest.fn();

    const { result } = renderHook(() => useCreateMany(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            createMany: createManyDefaultMock,
          },
          foo: {
            ...MockJSONServer.default,
            createMany: createManyFooMock,
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
    });

    result.current.mutate({
      resource: "posts",
      values: [
        {
          foo: "bar",
        },
      ],
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(createManyFooMock).toBeCalledWith(
      expect.objectContaining({
        resource: "posts",
      }),
    );
    expect(createManyDefaultMock).not.toBeCalled();
  });

  it("should get correct `meta` of related resource", async () => {
    const createManyMock = jest.fn();

    const { result } = renderHook(() => useCreateMany(), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            createMany: createManyMock,
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
    });

    result.current.mutate({
      resource: "posts",
      values: [
        {
          title: "awesome post",
        },
      ],
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(createManyMock).toBeCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          foo: "bar",
        }),
      }),
    );
  });

  describe("when passing `identifier` instead of `name`", () => {
    it("should select correct dataProviderName", async () => {
      const createManyDefaultMock = jest.fn();
      const createManyFooMock = jest.fn();

      const { result } = renderHook(() => useCreateMany(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              createMany: createManyDefaultMock,
            },
            foo: {
              ...MockJSONServer.default,
              createMany: createManyFooMock,
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
      });

      result.current.mutate({
        resource: "featured-posts",
        values: [
          {
            foo: "bar",
          },
        ],
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(createManyFooMock).toBeCalledWith(
        expect.objectContaining({
          resource: "posts",
        }),
      );
      expect(createManyDefaultMock).not.toBeCalled();
    });

    it("should invalidate query store with `identifier`", async () => {
      const invalidateStore = jest.fn();
      jest
        .spyOn(UseInvalidate, "useInvalidate")
        .mockReturnValue(invalidateStore);
      const createManyMock = jest.fn();

      const { result } = renderHook(() => useCreateMany(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              createMany: createManyMock,
            },
          },
          resources: [
            {
              name: "posts",
              identifier: "featured-posts",
            },
          ],
        }),
      });

      result.current.mutate({
        resource: "featured-posts",
        values: [
          {
            foo: "bar",
          },
        ],
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(invalidateStore).toBeCalledWith(
        expect.objectContaining({
          resource: "featured-posts",
        }),
      );
    });

    it("should get correct `meta` of related resource", async () => {
      const createManyMock = jest.fn();

      const { result } = renderHook(() => useCreateMany(), {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              createMany: createManyMock,
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
      });

      result.current.mutate({
        resource: "featured-posts",
        values: [
          {
            title: "awesome post",
          },
        ],
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(createManyMock).toBeCalledWith(
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
        useCreateMany({
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
              createMany: () => {
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

    result.current.mutate({
      resource: "posts",
      values: [{ title: "foo" }, { title: "bar" }],
    });

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

  it("should override `mutationFn` with mutationOptions.mutationFn", async () => {
    const createManyMock = jest.fn();
    const mutationFnMock = jest.fn();

    const { result } = renderHook(
      () =>
        useCreateMany({
          mutationOptions: {
            // mutationFn is omitted in types. So we need to use @ts-ignore test it.
            // @ts-ignore
            mutationFn: mutationFnMock,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              createMany: createManyMock,
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    result.current.mutate({
      resource: "posts",
      values: [{}],
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(createManyMock).not.toBeCalled();
    expect(mutationFnMock).toBeCalled();
  });

  it("should override `mutationKey` with `mutationOptions.mutationKey`", async () => {
    const { result } = renderHook(
      () =>
        useCreateMany({
          mutationOptions: {
            mutationKey: ["foo", "bar"],
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    result.current.mutate({
      resource: "posts",
      values: [{}],
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(
      queryClient.getMutationCache().findAll({
        mutationKey: ["foo", "bar"],
      }),
    ).toHaveLength(1);
  });

  it("should throw error without 'resource'", async () => {
    const { result } = renderHook(() => useCreateMany(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    act(() => {
      result.current.mutate({
        values: [],
      });
    });

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
      expect(result.current.error).toEqual(
        new Error(
          "[useCreateMany]: `resource` is not defined or not matched but is required",
        ),
      );
    });
  });

  it("should throw error without 'values'", async () => {
    const { result } = renderHook(() => useCreateMany(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
      }),
    });

    act(() => {
      result.current.mutate({
        resource: "posts",
      });
    });

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
      expect(result.current.error).toEqual(
        new Error("[useCreateMany]: `values` is not provided but is required"),
      );
    });
  });
});

describe("useCreateMany Hook [with props]", () => {
  it("should work with rest json server", async () => {
    const { result } = renderHook(
      () =>
        useCreateMany({
          resource: "posts",
          values: [{ id: 1 }],
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await act(async () => {
      result.current.mutate();
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    const { status, data } = result.current;

    expect(status).toBe("success");
    expect(data?.data[0].slug).toBe("ut-ad-et");
    expect(data?.data[1].slug).toBe("consequatur-molestiae-rerum");
  });

  it("should only pass meta from the hook parameter and query parameters to the dataProvider", async () => {
    const createManyMock = jest.fn();

    const { result } = renderHook(
      () => useCreateMany({ resource: "posts", meta: { foo: "bar" } }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              createMany: createManyMock,
            },
          },
          routerProvider: mockRouterProvider({
            params: { baz: "qux" },
          }),
          resources: [{ name: "posts", meta: { dip: "dop" } }],
        }),
      },
    );

    result.current.mutate({
      values: [],
    });

    await waitFor(() => {
      expect(createManyMock).toBeCalled();
    });

    expect(createManyMock).toBeCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          foo: "bar",
          baz: "qux",
        }),
      }),
    );
  });

  describe("usePublish", () => {
    it.each(["default", "categories"])(
      "publish event on success [dataProviderName: %s]",
      async (dataProviderName) => {
        const onPublishMock = jest.fn();

        const { result } = renderHook(
          () => useCreateMany({ resource: "posts", dataProviderName }),
          {
            wrapper: TestWrapper({
              dataProvider: MockJSONServer,
              resources: [{ name: "posts" }],
              liveProvider: {
                unsubscribe: jest.fn(),
                subscribe: jest.fn(),
                publish: onPublishMock,
              },
            }),
          },
        );

        await act(async () => {
          result.current.mutate({
            values: [{ id: 1 }, { id: 2 }],
          });
        });

        await waitFor(() => {
          expect(result.current.isSuccess).toBeTruthy();
        });

        expect(onPublishMock).toBeCalled();
        expect(onPublishMock).toHaveBeenCalledWith({
          channel: "resources/posts",
          date: expect.any(Date),
          type: "created",
          payload: {
            ids: dataProviderName === "default" ? ["1", "2"] : [1, 2],
          },
          meta: {
            dataProviderName,
          },
        });
      },
    );
  });

  describe("useLog", () => {
    it("publish log on success", async () => {
      const createMock = jest.fn();

      const { result } = renderHook(
        () =>
          useCreateMany({
            resource: "posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
            auditLogProvider: {
              create: createMock,
              get: jest.fn(),
              update: jest.fn(),
            },
          }),
        },
      );

      result.current.mutate({
        values: [
          {
            title: "title1",
          },
          {
            title: "title2",
          },
        ],
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(createMock).toBeCalled();
      expect(createMock).toHaveBeenCalledWith({
        action: "createMany",
        author: {},
        data: [
          {
            title: "title1",
          },
          {
            title: "title2",
          },
        ],
        meta: {
          dataProviderName: "default",
          ids: ["1", "2"],
        },
        resource: "posts",
      });
    });
  });

  it("should use `create` method if does not exist `createMany` method in dataProvider", async () => {
    const createMock = jest.fn();

    const { result } = renderHook(
      () =>
        useCreateMany({
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              create: createMock,
              createMany: undefined,
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    result.current.mutate({
      values: [{ title: "foo" }, { title: "bar" }],
    });

    await waitFor(() => {
      expect(createMock).toBeCalled();
    });

    expect(createMock).toBeCalledTimes(2);
    expect(createMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        resource: "posts",
        variables: { title: "foo" },
      }),
    );
    expect(createMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        resource: "posts",
        variables: { title: "bar" },
      }),
    );
  });

  describe("useNotification", () => {
    it("should call `open` from the notification provider on success", async () => {
      const openNotificationMock = jest.fn();

      const { result } = renderHook(
        () =>
          useCreateMany({
            resource: "posts",
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

      result.current.mutate({
        values: [{ title: "foo" }, { title: "bar" }],
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toBeCalledWith({
        description: "Success",
        key: "createMany-posts-notification",
        message: "Successfully created posts",
        type: "success",
      });
    });

    it("should call `open` from the notification provider on error", async () => {
      const createManyMock = jest.fn().mockRejectedValue(new Error("Error"));
      const openNotificationMock = jest.fn();

      const { result } = renderHook(
        () =>
          useCreateMany({
            resource: "posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                createMany: createManyMock,
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

      result.current.mutate({
        values: [{ title: "foo" }, { title: "bar" }],
      });

      await waitFor(() => {
        expect(result.current.isError).toBeTruthy();
      });

      expect(openNotificationMock).toBeCalledWith({
        description: "Error",
        key: "createMany-posts-notification",
        message: "There was an error creating posts (status code: undefined",
        type: "error",
      });
    });

    it("should call `open` from notification provider on success with custom notification params", async () => {
      const openNotificationMock = jest.fn();

      const { result } = renderHook(
        () =>
          useCreateMany({
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

      result.current.mutate({
        values: [{ title: "bar" }],
      });

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
          useCreateMany({
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

      result.current.mutate({
        values: [{ title: "bar" }],
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(openNotificationMock).toBeCalledTimes(0);
    });

    it("should call `open` from notification provider on error with custom notification params", async () => {
      const createManyMock = jest.fn().mockRejectedValue(new Error("Error"));
      const openNotificationMock = jest.fn();

      const { result } = renderHook(
        () =>
          useCreateMany({
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
                createMany: createManyMock,
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

      result.current.mutate({
        values: [{ title: "foo" }, { title: "bar" }],
      });

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

  it("should select correct dataProviderName", async () => {
    const createManyDefaultMock = jest.fn();
    const createManyFooMock = jest.fn();

    const { result } = renderHook(
      () =>
        useCreateMany({
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              createMany: createManyDefaultMock,
            },
            foo: {
              ...MockJSONServer.default,
              createMany: createManyFooMock,
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

    result.current.mutate({
      values: [
        {
          foo: "bar",
        },
      ],
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(createManyFooMock).toBeCalledWith(
      expect.objectContaining({
        resource: "posts",
      }),
    );
    expect(createManyDefaultMock).not.toBeCalled();
  });

  it("should get correct `meta` of related resource", async () => {
    const createManyMock = jest.fn();

    const { result } = renderHook(
      () =>
        useCreateMany({
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              createMany: createManyMock,
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

    result.current.mutate({
      values: [
        {
          title: "awesome post",
        },
      ],
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(createManyMock).toBeCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          foo: "bar",
        }),
      }),
    );
  });

  describe("when passing `identifier` instead of `name`", () => {
    it("should select correct dataProviderName", async () => {
      const createManyDefaultMock = jest.fn();
      const createManyFooMock = jest.fn();

      const { result } = renderHook(
        () =>
          useCreateMany({
            resource: "featured-posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                createMany: createManyDefaultMock,
              },
              foo: {
                ...MockJSONServer.default,
                createMany: createManyFooMock,
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

      result.current.mutate({
        values: [
          {
            foo: "bar",
          },
        ],
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(createManyFooMock).toBeCalledWith(
        expect.objectContaining({
          resource: "posts",
        }),
      );
      expect(createManyDefaultMock).not.toBeCalled();
    });

    it("should invalidate query store with `identifier`", async () => {
      const invalidateStore = jest.fn();
      jest
        .spyOn(UseInvalidate, "useInvalidate")
        .mockReturnValue(invalidateStore);
      const createManyMock = jest.fn();

      const { result } = renderHook(
        () =>
          useCreateMany({
            resource: "featured-posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                createMany: createManyMock,
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

      result.current.mutate({
        values: [
          {
            foo: "bar",
          },
        ],
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(invalidateStore).toBeCalledWith(
        expect.objectContaining({
          resource: "featured-posts",
        }),
      );
    });

    it("should get correct `meta` of related resource", async () => {
      const createManyMock = jest.fn();

      const { result } = renderHook(
        () =>
          useCreateMany({
            resource: "featured-posts",
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                createMany: createManyMock,
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

      result.current.mutate({
        values: [
          {
            title: "awesome post",
          },
        ],
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });

      expect(createManyMock).toBeCalledWith(
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
        useCreateMany({
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
              createMany: () => {
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

    result.current.mutate({
      values: [{ title: "foo" }, { title: "bar" }],
    });

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

  it("should override `mutationFn` with mutationOptions.mutationFn", async () => {
    const createManyMock = jest.fn();
    const mutationFnMock = jest.fn();

    const { result } = renderHook(
      () =>
        useCreateMany({
          resource: "posts",
          mutationOptions: {
            // mutationFn is omitted in types. So we need to use @ts-ignore test it.
            // @ts-ignore
            mutationFn: mutationFnMock,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              createMany: createManyMock,
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    result.current.mutate({
      values: [{}],
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(createManyMock).not.toBeCalled();
    expect(mutationFnMock).toBeCalled();
  });

  it("should override `mutationKey` with `mutationOptions.mutationKey`", async () => {
    const { result } = renderHook(
      () =>
        useCreateMany({
          resource: "posts",
          mutationOptions: {
            mutationKey: ["foo", "bar"],
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    result.current.mutate({
      values: [{}],
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(
      queryClient.getMutationCache().findAll({
        mutationKey: ["foo", "bar"],
      }),
    ).toHaveLength(1);
  });

  it("should throw error without 'resource'", async () => {
    const { result } = renderHook(
      () =>
        useCreateMany({
          values: [],
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    act(() => {
      result.current.mutate();
    });

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
      expect(result.current.error).toEqual(
        new Error(
          "[useCreateMany]: `resource` is not defined or not matched but is required",
        ),
      );
    });
  });

  it("should throw error without 'values'", async () => {
    const { result } = renderHook(
      () =>
        useCreateMany({
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    act(() => {
      result.current.mutate();
    });

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
      expect(result.current.error).toEqual(
        new Error("[useCreateMany]: `values` is not provided but is required"),
      );
    });
  });
});

describe("useCreateMany Hook should work with params and props", () => {
  it("should params override prop", async () => {
    const options: {
      params: UseCreateManyParams<any, any, any>;
      props: UseCreateManyParams<any, any, any>;
    } = {
      params: {
        resource: "posts-overrided",
        dataProviderName: "overrided",
        values: [{ foo: "bar-overrided" }],
        meta: {
          foo: "bar-overrided",
        },
        successNotification: () => ({
          message: "Success",
          description: "Successfully created post",
          type: "success",
        }),
      },
      props: {
        resource: "posts",
        dataProviderName: "default",
        values: [{ foo: "bar" }],
        meta: {
          foo: "bar",
        },
        successNotification: false,
      },
    };

    const updateMock = jest.fn();
    const openNotificationMock = jest.fn();

    const { result } = renderHook(() => useCreateMany(options.props), {
      wrapper: TestWrapper({
        notificationProvider: {
          open: openNotificationMock,
          close: jest.fn(),
        },
        dataProvider: {
          default: MockJSONServer.default,
          overrided: {
            ...MockJSONServer.default,
            createMany: updateMock,
          },
        },
      }),
    });

    result.current.mutate(options.params);

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(updateMock).toHaveBeenCalledWith({
      resource: options.params.resource,
      variables: options.params.values,
      meta: options.params.meta,
      metaData: options.params.meta,
    });
    expect(openNotificationMock).toHaveBeenCalledWith({
      description: "Successfully created post",
      message: "Success",
      type: "success",
    });
  });

  it("should life-cycle methods works", async () => {
    const onSuccessProp = jest.fn();
    const onSettledProp = jest.fn();
    const onSuccessFn = jest.fn();
    const onSettledFn = jest.fn();

    const { result } = renderHook(
      () =>
        useCreateMany({
          resource: "posts",
          values: [],
          mutationOptions: {
            onSuccess: () => onSuccessProp("onSuccessProp"),
            onSettled: () => onSettledProp("onSettledProp"),
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
        }),
      },
    );

    act(() => {
      result.current.mutate(
        {},
        {
          onSuccess: () => onSuccessFn("onSuccessFn"),
          onSettled: () => onSettledFn("onSettledFn"),
        },
      );
    });

    await waitFor(() => {
      expect(onSuccessProp).toHaveBeenCalledWith("onSuccessProp");
      expect(onSettledProp).toHaveBeenCalledWith("onSettledProp");
      expect(onSuccessFn).toHaveBeenCalledWith("onSuccessFn");
      expect(onSettledFn).toHaveBeenCalledWith("onSettledFn");
    });
  });

  it("should onError methods works", async () => {
    const onErrorProp = jest.fn();
    const onErrorFn = jest.fn();

    const { result } = renderHook(
      () =>
        useCreateMany({
          resource: "posts",
          values: [],
          mutationOptions: {
            onError: () => onErrorProp("onErrorProp"),
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            ...MockJSONServer.default,
            createMany: async () => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  return reject(new Error("Error"));
                }, 0);
              });
            },
          },
        }),
      },
    );

    act(() => {
      result.current.mutate(
        {},
        {
          onError: () => onErrorFn("onErrorProp"),
        },
      );
    });

    await waitFor(() => {
      expect(onErrorProp).toHaveBeenCalledWith("onErrorProp");
      expect(onErrorFn).toHaveBeenCalledWith("onErrorProp");
    });
  });
});
