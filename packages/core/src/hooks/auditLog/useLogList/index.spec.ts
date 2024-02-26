import { renderHook, waitFor } from "@testing-library/react";
import { TestWrapper, queryClient } from "@test";

import { useLogList } from "./";

const auditLogProviderGetMock = jest.fn();

describe("useLogList Hook", () => {
  beforeEach(() => {
    auditLogProviderGetMock.mockReset();
  });

  it("useLogList should call the auditLogProvider's list method with same properties", async () => {
    const { result } = renderHook(
      () =>
        useLogList({
          resource: "posts",
          action: "list",
          meta: { id: 1 },
          metaData: { fields: ["id", "action", "data"] },
        }),
      {
        wrapper: TestWrapper({
          auditLogProvider: {
            get: auditLogProviderGetMock,
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isFetched).toBeTruthy();
    });

    expect(auditLogProviderGetMock).toBeCalledWith({
      resource: "posts",
      action: "list",
      meta: { id: 1 },
      metaData: { fields: ["id", "action", "data"] },
    });
  });

  it("useLogList should return data with 'posts' resource", async () => {
    const { result } = renderHook(() => useLogList({ resource: "posts" }), {
      wrapper: TestWrapper({
        auditLogProvider: {
          get: ({ resource }) => {
            if (resource === "posts") {
              return Promise.resolve([
                {
                  id: 1,
                  action: "create",
                  data: { id: 1, title: "title" },
                },
              ]);
            }
            return Promise.resolve([]);
          },
        },
      }),
    });

    await waitFor(() => {
      expect(result.current.isFetched).toBeTruthy();
    });

    expect(result.current?.data).toStrictEqual([
      {
        id: 1,
        action: "create",
        data: { id: 1, title: "title" },
      },
    ]);
  });

  it("should override `queryKey` with `queryOptions.queryKey`", async () => {
    const getMock = jest.fn().mockResolvedValue([
      {
        id: 1,
        action: "create",
        data: { id: 1, title: "title" },
      },
    ]);

    const { result } = renderHook(
      () =>
        useLogList({
          resource: "posts",
          action: "list",
          meta: { id: 1 },
          metaData: { fields: ["id", "action", "data"] },
          queryOptions: {
            queryKey: ["foo", "bar"],
          },
        }),
      {
        wrapper: TestWrapper({
          auditLogProvider: {
            get: getMock,
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
    const getMock = jest.fn().mockResolvedValue([
      {
        id: 1,
        action: "create",
        data: { id: 1, title: "title" },
      },
    ]);
    const queryFnMock = jest.fn().mockResolvedValue([
      {
        id: 1,
        action: "create",
        data: { id: 1, title: "title" },
      },
    ]);

    const { result } = renderHook(
      () =>
        useLogList({
          resource: "posts",
          action: "list",
          meta: { id: 1 },
          metaData: { fields: ["id", "action", "data"] },
          queryOptions: {
            queryFn: queryFnMock,
          },
        }),
      {
        wrapper: TestWrapper({
          auditLogProvider: {
            get: getMock,
          },
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(getMock).not.toBeCalled();
    expect(queryFnMock).toBeCalled();
  });
});
