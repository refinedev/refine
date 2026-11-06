import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import type { BaseRecord, HttpError } from "@refinedev/core";

import { MockJSONServer, TestWrapper } from "@test";

import { useSimpleList } from "./useSimpleList";

const defaultPagination = {
  pageSize: 10,
  current: 1,
  total: 2,
};

const routerProvider = {
  parse: () => {
    return () => ({
      resource: {
        name: "posts",
      },
    });
  },
};

describe("useSimpleList Hook", () => {
  it("tracks search-result and cleared-search states", async () => {
    const { result } = renderHook(
      () =>
        useSimpleList<BaseRecord, HttpError, { title: string }>({
          resource: "posts",
          onSearch: ({ title }) =>
            title
              ? [{ field: "title", operator: "contains", value: title }]
              : [],
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getList: () => Promise.resolve({ data: [], total: 0 }),
            },
          },
          resources: [{ name: "posts" }],
          routerProvider,
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBe(true);
    });

    await act(async () => {
      await result.current.searchFormProps.onFinish?.({ title: "missing" });
    });

    await waitFor(() => {
      expect(result.current.emptyState?.reason).toBe("no-search-results");
    });

    await act(async () => {
      await result.current.searchFormProps.onFinish?.({ title: "" });
    });

    await waitFor(() => {
      expect(result.current.emptyState?.reason).toBe("no-data");
    });
  });

  it("supports a custom context-aware empty state", async () => {
    let emptyReason: string | undefined;

    const { result } = renderHook(
      () =>
        useSimpleList({
          resource: "posts",
          emptyState: ({ reason }) => {
            emptyReason = reason;
            return "custom empty state";
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getList: () => Promise.resolve({ data: [], total: 0 }),
            },
          },
          resources: [{ name: "posts" }],
          routerProvider,
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBe(true);
    });

    expect(emptyReason).toBe("no-data");
    expect(result.current.listProps.locale?.emptyText).toBe(
      "custom empty state",
    );
  });

  it("default", async () => {
    const { result } = renderHook(() => useSimpleList(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
        routerProvider,
      }),
    });

    await waitFor(() => {
      expect(!result.current.listProps.loading).toBeTruthy();
    });

    const {
      listProps: { pagination, dataSource },
    } = result.current;

    expect(dataSource).toHaveLength(2);
    expect(pagination).toEqual({
      ...defaultPagination,
      onChange: (pagination as any).onChange,
      itemRender: (pagination as any).itemRender,
      simple: true,
    });
  });

  it("with initial pagination parameters", async () => {
    const { result } = renderHook(
      () =>
        useSimpleList({
          pagination: {
            pageSize: 1,
            currentPage: 2,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
          routerProvider,
        }),
      },
    );

    await waitFor(() => {
      expect(!result.current.listProps.loading).toBeTruthy();
    });

    expect(result.current.listProps.pagination).toEqual(
      expect.objectContaining({
        pageSize: 1,
        current: 2,
      }),
    );
  });

  it("with disabled pagination", async () => {
    const { result } = renderHook(
      () =>
        useSimpleList({
          pagination: {
            mode: "off",
          },
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
        }),
      },
    );

    await waitFor(() => {
      expect(!result.current.listProps.loading).toBeTruthy();
    });

    const {
      listProps: { pagination },
    } = result.current;

    expect(pagination).toBe(false);
  });

  it("with custom resource", async () => {
    const { result } = renderHook(
      () =>
        useSimpleList({
          resource: "categories",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }, { name: "categories" }],
          routerProvider,
        }),
      },
    );

    await waitFor(() => {
      expect(!result.current.listProps.loading).toBeTruthy();
    });

    const {
      listProps: { dataSource },
    } = result.current;

    expect(dataSource).toHaveLength(2);
  });

  it.each(["client", "server"] as const)(
    "when pagination mode is %s, should set pagination props",
    async (mode) => {
      const { result } = renderHook(
        () =>
          useSimpleList({
            pagination: {
              mode,
            },
          }),
        {
          wrapper: TestWrapper({
            routerProvider,
          }),
        },
      );

      expect(result.current.listProps.pagination).toEqual(
        expect.objectContaining({
          pageSize: 10,
          current: 1,
        }),
      );
    },
  );

  it("when pagination mode is off, pagination should be false", async () => {
    const { result } = renderHook(
      () =>
        useSimpleList({
          pagination: {
            mode: "off",
          },
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
        }),
      },
    );

    expect(result.current.listProps.pagination).toBeFalsy();
  });

  it("should work with query and queryResult", async () => {
    const { result } = renderHook(() => useSimpleList(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
        routerProvider,
      }),
    });

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    expect(result.current.query).toEqual(result.current.query);
  });
});
