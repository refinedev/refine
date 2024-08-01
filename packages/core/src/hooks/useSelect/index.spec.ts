import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper, act, mockRouterProvider } from "@test";
import { posts } from "@test/dataMocks";

import type {
  CrudFilter,
  DataProviders,
  IDataContext,
} from "../../contexts/data/types";
import * as pickResource from "../../definitions/helpers/pick-resource";
import { useSelect } from "./";

describe("useSelect Hook", () => {
  it("default", async () => {
    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });

    const { options } = result.current;

    await waitFor(() => expect(options).toHaveLength(2), { timeout: 2000 });

    expect(options).toEqual([
      {
        label:
          "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
        value: "1",
      },
      { label: "Recusandae consectetur aut atque est.", value: "2" },
    ]);
  });

  it("with nested optionLabel", async () => {
    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          optionLabel: "nested.title",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });

    const { options } = result.current;

    expect(options).toHaveLength(2);
    expect(options).toEqual([
      {
        label:
          "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
        value: "1",
      },
      { label: "Recusandae consectetur aut atque est.", value: "2" },
    ]);
  });

  it("defaultValue", async () => {
    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          defaultValue: ["1", "2", "3", "4"],
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer.default,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });

    const { options } = result.current;

    expect(options).toHaveLength(2);
    expect(options).toEqual([
      {
        label:
          "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
        value: "1",
      },
      { label: "Recusandae consectetur aut atque est.", value: "2" },
    ]);
  });

  it("defaultValue is not an array", async () => {
    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          defaultValue: "1",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });

    const { options } = result.current;

    expect(options).toHaveLength(2);
    expect(options).toEqual([
      {
        label:
          "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
        value: "1",
      },
      { label: "Recusandae consectetur aut atque est.", value: "2" },
    ]);
  });

  it("should success data with resource with optionLabel and optionValue", async () => {
    const { result } = renderHook(
      () =>
        useSelect<{ id: string; slug: string }>({
          resource: "posts",
          optionLabel: "slug",
          optionValue: "id",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });

    const { options } = result.current;

    expect(options).toHaveLength(2);
    expect(options).toEqual([
      { label: "ut-ad-et", value: "1" },
      { label: "consequatur-molestiae-rerum", value: "2" },
    ]);
  });

  it("should success data with resource with filters", async () => {
    const { result } = renderHook(
      () =>
        useSelect<{ id: string; slug: string }>({
          resource: "posts",
          filters: [
            {
              field: "slug",
              operator: "ncontains",
              value: "test",
            },
          ],
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });

    const { options } = result.current;

    expect(options).toHaveLength(2);
    expect(options).toEqual([
      {
        label:
          "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
        value: "1",
      },
      { label: "Recusandae consectetur aut atque est.", value: "2" },
    ]);
  });

  it("onSearch debounce with default value (300ms)", async () => {
    const getListMock = jest.fn(() => Promise.resolve({ data: [], total: 0 }));
    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          debounce: 300,
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default!,
              getList: getListMock,
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });

    expect(getListMock).toBeCalledTimes(1);

    const { onSearch } = result.current;

    onSearch("1");

    onSearch("1");

    onSearch("1");

    await waitFor(() => {
      expect(getListMock).toBeCalledTimes(2);
    });

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });
  });

  it("onSearch disabled debounce (0ms)", async () => {
    const getListMock = jest.fn(() => {
      return Promise.resolve({ data: [], total: 0 });
    });
    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          debounce: 0,
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              getList: getListMock,
            },
          } as any,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });

    expect(getListMock).toBeCalledTimes(1);

    const { onSearch } = result.current;

    onSearch("1");
    await waitFor(() => {
      expect(getListMock).toBeCalledTimes(2);
    });

    onSearch("2");
    await waitFor(() => {
      expect(getListMock).toBeCalledTimes(3);
    });

    onSearch("3");
    await waitFor(() => {
      expect(getListMock).toBeCalledTimes(4);
    });

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });

    onSearch("");
    await waitFor(() => {
      expect(getListMock).toBeCalledTimes(5);
    });

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });
  });

  it("should onSearchFromProp work as expected", async () => {
    const getListMock = jest.fn(() => Promise.resolve({ data: [], total: 0 }));

    const { result, rerender } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          onSearch: (value) => {
            return [
              {
                field: "title",
                operator: "contains",
                value,
              },
            ];
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default!,
              getList: getListMock,
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => expect(getListMock).toHaveBeenCalledTimes(1));

    result.current.onSearch("1");
    // force custom `onSearch` to reinitialize, this should not change `current.onSearch`
    rerender();
    result.current.onSearch("2");
    // force custom `onSearch` to reinitialize, this should not change `current.onSearch`
    rerender();
    result.current.onSearch("3");

    await waitFor(() => expect(getListMock).toHaveBeenCalledTimes(2));

    result.current.onSearch("");

    await waitFor(() => expect(getListMock).toHaveBeenCalledTimes(3));

    await waitFor(() =>
      expect(result.current.queryResult.isSuccess).toBeTruthy(),
    );
  });

  it("should respond to onSearch prop changes without breaking the debounce interval", async () => {
    const getListMock = jest.fn(() => Promise.resolve({ data: [], total: 0 }));
    const initialOnSearch = jest.fn().mockImplementation((v) => [
      {
        field: "title",
        operator: "contains",
        value: v,
      },
    ]);
    const secondOnSearch = jest.fn().mockImplementation((v) => [
      {
        field: "title",
        operator: "contains",
        value: v,
      },
    ]);

    const { result, rerender } = renderHook<
      Parameters<typeof useSelect>[0],
      ReturnType<typeof useSelect>
    >((props) => useSelect(props), {
      initialProps: {
        resource: "posts",
        onSearch: initialOnSearch,
      },
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default!,
            getList: getListMock,
          },
        },
        resources: [{ name: "posts" }],
      }) as any,
    });

    await waitFor(() => expect(getListMock).toHaveBeenCalledTimes(1));

    result.current.onSearch("1");

    rerender({
      resource: "posts",
      onSearch: secondOnSearch,
    });

    result.current.onSearch("2");

    await waitFor(() => expect(getListMock).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(initialOnSearch).toHaveBeenCalledTimes(0));
    await waitFor(() => expect(secondOnSearch).toHaveBeenCalledTimes(1));

    result.current.onSearch("");

    rerender({
      resource: "posts",
      onSearch: initialOnSearch,
    });

    await waitFor(() => expect(getListMock).toHaveBeenCalledTimes(3));
    await waitFor(() => expect(initialOnSearch).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(secondOnSearch).toHaveBeenCalledTimes(1));

    await waitFor(() =>
      expect(result.current.queryResult.isSuccess).toBeTruthy(),
    );
  });

  it("should invoke queryOptions methods successfully", async () => {
    const mockFunc = jest.fn();

    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          queryOptions: {
            onSuccess: () => {
              mockFunc();
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
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });

    const { options } = result.current;

    expect(options).toHaveLength(2);
    expect(options).toEqual([
      {
        label:
          "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
        value: "1",
      },
      { label: "Recusandae consectetur aut atque est.", value: "2" },
    ]);

    expect(mockFunc).toBeCalled();
  });

  it("should invoke queryOptions methods for defaultValue and default query successfully", async () => {
    const mockFunc = jest.fn();

    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          queryOptions: {
            onSuccess: () => {
              mockFunc();
            },
          },
          defaultValue: [1],
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });

    const { options } = result.current;

    expect(options).toHaveLength(2);
    expect(options).toEqual([
      {
        label:
          "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
        value: "1",
      },
      { label: "Recusandae consectetur aut atque est.", value: "2" },
    ]);

    // for init call and defaultValue
    expect(mockFunc).toBeCalledTimes(2);
  });

  it("should sort default data first with selectedOptionsOrder for defaultValue", async () => {
    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          defaultValue: ["2"],
          selectedOptionsOrder: "selected-first",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            default: {
              ...MockJSONServer.default,
              // Default `getMany` mock returns all posts, we need to update it to return appropriate posts
              getMany: ({ ids }) => {
                return Promise.resolve({
                  data: posts.filter((post) => ids.includes(post.id)) as any,
                });
              },
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });

    expect(result.current.options).toHaveLength(2);
    expect(result.current.options).toEqual([
      { label: "Recusandae consectetur aut atque est.", value: "2" },
      {
        label:
          "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
        value: "1",
      },
    ]);
  });

  it("should invoke queryOptions methods for default value successfully", async () => {
    const mockFunc = jest.fn();

    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          defaultValue: ["1", "2", "3", "4"],
          defaultValueQueryOptions: {
            onSuccess: () => {
              mockFunc();
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
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });

    const { options } = result.current;

    expect(options).toHaveLength(2);
    expect(options).toEqual([
      {
        label:
          "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
        value: "1",
      },
      { label: "Recusandae consectetur aut atque est.", value: "2" },
    ]);
    expect(mockFunc).toBeCalled();
  });

  it("should generate options with custom optionLabel and optionValue functions", async () => {
    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          optionLabel: (item) => `${item.title} - ${item.userId}`,
          optionValue: (item) => `${item.id}`,
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });
    const { options } = result.current;
    expect(options).toHaveLength(2);
    expect(options).toEqual([
      {
        label:
          "Necessitatibus necessitatibus id et cupiditate provident est qui amet. - 5",
        value: "1",
      },
      { label: "Recusandae consectetur aut atque est. - 36", value: "2" },
    ]);
  });

  // case: undefined means defaultValueQueryOptions should not provided, queryOptions.enabled should be false
  // case: true, false are inverted in queryOptions.enabled and defaultValueQueryOptions.enabled to test not override each other
  it.each([true, false, undefined])(
    "should use defaultValueQueryOptions as default queryOptions in useMany (case: %p)",
    async (enabled) => {
      const mockDataProvider = {
        default: {
          ...MockJSONServer.default,
          getList: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
          getMany: jest.fn(() => Promise.resolve({ data: [] })),
        },
      } as DataProviders;

      renderHook(
        () =>
          useSelect({
            resource: "posts",
            defaultValue: ["1", "2", "3", "4"],
            ...(typeof enabled === "undefined"
              ? {}
              : {
                  defaultValueQueryOptions: {
                    enabled: !enabled,
                  },
                }),
            queryOptions: {
              enabled: !!enabled,
            },
          }),
        {
          wrapper: TestWrapper({
            dataProvider: mockDataProvider,
            resources: [{ name: "posts" }],
          }),
        },
      );

      await waitFor(() => {
        if (typeof enabled === "undefined") {
          expect(mockDataProvider.default?.getList).toBeCalledTimes(0);
          expect(mockDataProvider.default?.getMany).toBeCalledTimes(0);
          return;
        }

        if (enabled) {
          expect(mockDataProvider.default?.getList).toBeCalledTimes(1);
          expect(mockDataProvider.default?.getMany).toBeCalledTimes(0);

          return;
        }

        if (!enabled && typeof enabled !== "undefined") {
          expect(mockDataProvider.default?.getList).toBeCalledTimes(0);
          expect(mockDataProvider.default?.getMany).toBeCalledTimes(1);
          return;
        }
      });
    },
  );

  it("should use fetchSize option as pageSize when fetching list", async () => {
    const posts = [
      {
        id: "1",
        title: "Post 1",
      },
      {
        id: "2",
        title: "Post 2",
      },
    ];

    const mockDataProvider = {
      default: {
        ...MockJSONServer.default,
        getList: jest.fn(() => Promise.resolve({ data: posts, total: 2 })),
        getMany: jest.fn(() => Promise.resolve({ data: [...posts] })),
      },
    } as DataProviders;

    renderHook(
      () =>
        useSelect({
          resource: "posts",
          defaultValue: ["1", "2"],
          hasPagination: true,
          fetchSize: 20,
        }),
      {
        wrapper: TestWrapper({
          dataProvider: mockDataProvider as unknown as IDataContext,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await act(() => {});

    expect(mockDataProvider.default?.getList).toHaveBeenCalledWith(
      expect.objectContaining({
        filters: [],
        hasPagination: true,
        pagination: { pageSize: 20, current: 1, mode: "server" },
        resource: "posts",
        meta: {
          queryContext: {
            queryKey: [
              "default",
              "posts",
              "list",
              {
                filters: [],
                hasPagination: true,
                pagination: {
                  current: 1,
                  mode: "server",
                  pageSize: 20,
                },
              },
            ],
            signal: new AbortController().signal,
          },
        },
        metaData: {
          queryContext: {
            queryKey: [
              "default",
              "posts",
              "list",
              {
                filters: [],
                hasPagination: true,
                pagination: {
                  current: 1,
                  mode: "server",
                  pageSize: 20,
                },
              },
            ],
            signal: new AbortController().signal,
          },
        },
      }),
    );
  });

  it("should use onSearch option to get filters", async () => {
    const posts = [
      {
        id: "1",
        title: "Post 1",
      },
      {
        id: "2",
        title: "Post 2",
      },
    ];

    const mockDataProvider = {
      default: {
        ...MockJSONServer.default,
        getList: jest.fn(() => Promise.resolve({ data: posts, total: 2 })),
        getMany: jest.fn(() => Promise.resolve({ data: [...posts] })),
      },
    } as DataProviders;

    const filters: CrudFilter[] = [
      {
        field: "field",
        operator: "lt",
        value: "value",
      },
    ];

    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          defaultValue: ["1", "2"],
          onSearch: () => filters,
        }),
      {
        wrapper: TestWrapper({
          dataProvider: mockDataProvider as unknown as DataProviders,
          resources: [{ name: "posts" }],
        }),
      },
    );

    const { onSearch } = result.current;

    expect(mockDataProvider.default?.getList).toHaveBeenCalledWith({
      filters: [],
      hasPagination: false,
      resource: "posts",
      meta: {
        queryContext: {
          queryKey: [
            "default",
            "posts",
            "list",
            {
              hasPagination: false,
              filters: [],
            },
          ],
          signal: new AbortController().signal,
        },
      },
      metaData: {
        queryContext: {
          queryKey: [
            "default",
            "posts",
            "list",
            {
              hasPagination: false,
              filters: [],
            },
          ],
          signal: new AbortController().signal,
        },
      },
      pagination: {
        current: 1,
        mode: "off",
        pageSize: 10,
      },
    });

    await act(async () => {
      onSearch("1");
    });

    await waitFor(() => {
      expect(mockDataProvider.default?.getList).toHaveBeenCalledWith({
        filters,
        hasPagination: false,
        resource: "posts",
        meta: {
          queryContext: {
            queryKey: [
              "default",
              "posts",
              "list",
              {
                hasPagination: false,
                filters,
              },
            ],
            signal: new AbortController().signal,
          },
        },
        metaData: {
          queryContext: {
            queryKey: [
              "default",
              "posts",
              "list",
              {
                hasPagination: false,
                filters,
              },
            ],
            signal: new AbortController().signal,
          },
        },
        pagination: {
          current: 1,
          mode: "off",
          pageSize: 10,
        },
      });
    });
  });

  describe("searchField", () => {
    const cases = [
      {
        name: "when optionLabel is string",
        optionLabel: "name",
        expectedField: "name",
        searchField: undefined,
      },
      {
        name: "when optionLabel is function",
        optionLabel: (_item: any) => "no",
        expectedField: "title",
        searchField: undefined,
      },
      {
        name: "when searchField is provided",
        optionLabel: "no",
        expectedField: "my-field",
        searchField: "my-field",
      },
    ];

    it.each(cases)("$name", async (params: any) => {
      const getListMock = jest.fn(async () => ({ data: [], total: 0 }));

      const { result, waitForNextUpdate } = renderHook(
        () =>
          useSelect({
            resource: "posts",
            optionLabel: params.optionLabel,
            searchField: params.searchField,
          }),
        {
          wrapper: TestWrapper({
            dataProvider: {
              default: {
                ...MockJSONServer.default,
                getList: getListMock,
              },
            },
          }),
        },
      );

      result.current.onSearch("John");

      await waitForNextUpdate();
      await waitForNextUpdate();

      expect(getListMock).toHaveBeenCalledTimes(2);
      expect(getListMock).toHaveBeenCalledWith(
        expect.objectContaining({
          filters: [
            {
              field: params.expectedField,
              operator: "contains",
              value: "John",
            },
          ],
        }),
      );
    });
  });

  it("should use pagination option as infinite loading when fetching list", async () => {
    const posts = [
      {
        id: "1",
        title: "Post 1",
      },
      {
        id: "2",
        title: "Post 2",
      },
      {
        id: "3",
        title: "Post 3",
      },
    ];

    const mockDataProvider = {
      default: {
        ...MockJSONServer.default,
        getList: jest.fn(() => Promise.resolve({ data: posts, total: 3 })),
        getMany: jest.fn(() => Promise.resolve({ data: [...posts] })),
      },
    } as DataProviders;

    renderHook(
      () =>
        useSelect({
          resource: "posts",
          defaultValue: ["1", "2", "3"],
          hasPagination: true,
          pagination: {
            current: 2,
            pageSize: 1,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: mockDataProvider as unknown as IDataContext,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await act(() => {});

    expect(mockDataProvider.default?.getList).toHaveBeenCalledWith({
      filters: [],
      pagination: { current: 2, mode: "server", pageSize: 1 },
      hasPagination: true,
      resource: "posts",
      meta: {
        queryContext: {
          queryKey: [
            "default",
            "posts",
            "list",
            {
              filters: [],
              hasPagination: true,
              pagination: {
                current: 2,
                mode: "server",
                pageSize: 1,
              },
            },
          ],
          signal: new AbortController().signal,
        },
      },
      metaData: {
        queryContext: {
          queryKey: [
            "default",
            "posts",
            "list",
            {
              filters: [],
              hasPagination: true,
              pagination: {
                current: 2,
                mode: "server",
                pageSize: 1,
              },
            },
          ],
          signal: new AbortController().signal,
        },
      },
    });
  });

  it("should pass meta from resource defination, hook parameter and query parameters to dataProvider", async () => {
    const getListMock = jest.fn();

    renderHook(() => useSelect({ resource: "posts", meta: { foo: "bar" } }), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            getList: getListMock,
          },
        },
        routerProvider: mockRouterProvider({
          resource: { name: "posts" },
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
          dip: "dop",
        }),
      }),
    );
  });

  it("two resources with same name, should pass resource meta according to identifier", async () => {
    const getListMock = jest.fn();

    renderHook(() => useSelect({ resource: "recentPosts" }), {
      wrapper: TestWrapper({
        dataProvider: {
          default: {
            ...MockJSONServer.default,
            getList: getListMock,
          },
        },
        routerProvider: mockRouterProvider({
          resource: { name: "posts" },
        }),
        resources: [
          {
            name: "posts",
            identifier: "recentPosts",
            meta: {
              startDate: "2021-01-01",
            },
          },
          {
            name: "posts",
            identifier: "popularPosts",
            meta: {
              likes: 100,
            },
          },
        ],
      }),
    });

    await waitFor(() => {
      expect(getListMock).toBeCalled();
    });

    expect(getListMock).toBeCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          startDate: "2021-01-01",
        }),
      }),
    );

    expect(getListMock).not.toBeCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({
          likes: 100,
        }),
      }),
    );
  });

  it("should use resourceFromProps", async () => {
    jest.spyOn(pickResource, "pickResource").mockReturnValue(undefined);

    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });

    const { options } = result.current;

    await waitFor(() => expect(options).toHaveLength(2));

    expect(options).toEqual([
      {
        label:
          "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
        value: "1",
      },
      { label: "Recusandae consectetur aut atque est.", value: "2" },
    ]);
  });

  it("works correctly with `interval` and `onInterval` params", async () => {
    const onInterval = jest.fn();
    const { result } = renderHook(
      () =>
        useSelect({
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
                        total: 2,
                      } as any),
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
      expect(result.current.queryResult.isLoading).toBeTruthy();
      expect(result.current.overtime.elapsedTime).toBe(900);
      expect(onInterval).toBeCalled();
    });

    await waitFor(() => {
      expect(!result.current.queryResult.isLoading).toBeTruthy();
      expect(result.current.overtime.elapsedTime).toBeUndefined();
    });
  });

  it("should work with queryResult and query", async () => {
    const { result } = renderHook(
      () =>
        useSelect({
          resource: "posts",
          defaultValue: ["1", "2", "3", "4"],
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.queryResult.isSuccess).toBeTruthy();
    });

    expect(result.current.query).toEqual(result.current.queryResult);
  });
});
