import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { MockJSONServer, TestWrapper } from "@test";

import { useDataGrid } from "./";
import type { CrudFilters } from "@refinedev/core";
import { act } from "react-dom/test-utils";
import { posts } from "@test/dataMocks";
import * as core from "@refinedev/core";

describe("useDataGrid Hook", () => {
  it("controlled filtering with 'onSubmit' and 'onSearch'", async () => {
    type SearchVariables = { title: string; status: string };

    const { result } = renderHook(
      () =>
        useDataGrid<any, any, SearchVariables>({
          resource: "posts",
          onSearch: (values) => {
            const filters: CrudFilters = [];

            filters.push(
              {
                field: "title",
                operator: "contains",
                value: values.title,
              },
              {
                field: "status",
                operator: "eq",
                value: values.status,
              },
            );

            return filters;
          },
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await waitFor(() => {
      expect(!result.current.tableQuery?.isLoading).toBeTruthy();
    });

    await act(async () => {
      result.current.search({ title: "test", status: "draft" });
    });

    expect(result.current.filters).toEqual([
      {
        field: "title",
        operator: "contains",
        value: "test",
      },
      {
        field: "status",
        operator: "eq",
        value: "draft",
      },
    ]);
    expect(result.current.currentPage).toEqual(1);
  });

  it.each(["client", "server"] as const)(
    "when pagination mode is %s, should set pagination props in dataGridProps",
    async (mode) => {
      const { result } = renderHook(
        () =>
          useDataGrid({
            pagination: {
              mode,
            },
          }),
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(result.current.dataGridProps).toEqual(
        expect.objectContaining({
          paginationModel: expect.objectContaining({
            pageSize: 25,
            page: 0,
          }),
        }),
      );
    },
  );

  it("when pagination mode is off, should not set pagination props in dataGridProps", async () => {
    const { result } = renderHook(
      () =>
        useDataGrid({
          pagination: {
            mode: "off",
          },
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    expect(result.current.dataGridProps).toEqual(
      expect.not.objectContaining({
        paginationModel: expect.objectContaining({
          pageSize: 25,
          page: 0,
        }),
      }),
    );
    expect(result.current.dataGridProps).toEqual(
      expect.objectContaining({
        paginationMode: "client",
      }),
    );
  });

  it.each(["off", "server"] as const)(
    "when filters.mode is %s, should set filterMode to %s",
    async (mode) => {
      const { result } = renderHook(
        () =>
          useDataGrid({
            filters: {
              mode,
            },
          }),
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(result.current.dataGridProps).toEqual(
        expect.objectContaining({
          filterMode: mode === "off" ? "client" : "server",
        }),
      );
    },
  );

  it.each(["off", "server"] as const)(
    "when sorters.mode is %s, should set sortingMode to %s",
    async (mode) => {
      const { result } = renderHook(
        () =>
          useDataGrid({
            sorters: {
              mode,
            },
          }),
        {
          wrapper: TestWrapper({}),
        },
      );

      expect(result.current.dataGridProps).toEqual(
        expect.objectContaining({
          sortingMode: mode === "off" ? "client" : "server",
        }),
      );
    },
  );

  it("works correctly with `interval` and `onInterval` params", async () => {
    const onInterval = vi.fn();
    const { result } = renderHook(
      () =>
        useDataGrid({
          resource: "posts",
          overtimeOptions: {
            interval: 100,
            onInterval,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            ...MockJSONServer,
            getList: () => {
              return new Promise((res) => {
                setTimeout(() => res({ data: [], total: 2 }), 1000);
              });
            },
          },
          resources: [{ name: "posts" }],
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isLoading).toBeTruthy();
      expect(result.current.overtime.elapsedTime).toBe(900);
      expect(onInterval).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(!result.current.tableQuery.isLoading).toBeTruthy();
      expect(result.current.overtime.elapsedTime).toBeUndefined();
    });
  });

  it("when processRowUpdate is called, update data", async () => {
    let postToUpdate: any = posts[0];

    const { result } = renderHook(
      () =>
        useDataGrid({
          resource: "posts",
          editable: true,
        }),
      {
        wrapper: TestWrapper({
          dataProvider: {
            ...MockJSONServer,
            update: async (data) => {
              const resolvedData = await Promise.resolve({ data });
              postToUpdate = resolvedData.data.variables;
            },
          },
        }),
      },
    );
    const newPost = {
      ...postToUpdate,
      title: "New title",
    };

    await act(async () => {
      if (result.current.dataGridProps.processRowUpdate) {
        await result.current.dataGridProps.processRowUpdate(
          newPost,
          postToUpdate,
          {
            rowId: "test-id",
          },
        );
      }
    });

    expect(newPost).toEqual(postToUpdate);
  });

  it("should work with query and queryResult", async () => {
    const { result } = renderHook(
      () =>
        useDataGrid({
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
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.tableQuery).toEqual(result.current.tableQuery);
  });

  it("should pass meta from updateMutationOptions to mutate function", async () => {
    const mockMeta = { customData: "test" };

    const mockDataProvider = {
      ...MockJSONServer,
      update: vi.fn().mockImplementation((params) => {
        expect(params).toEqual(
          expect.objectContaining({
            meta: mockMeta,
          }),
        );
        return Promise.resolve({ data: params.variables });
      }),
    };

    const { result } = renderHook(
      () =>
        useDataGrid({
          resource: "posts",
          editable: true,
          updateMutationOptions: {
            meta: mockMeta,
          },
        }),
      {
        wrapper: TestWrapper({
          dataProvider: mockDataProvider,
          resources: [{ name: "posts" }],
        }),
      },
    );

    const mockRow = { id: "1", title: "Test" };
    const mockOldRow = { id: "1", title: "Old Test" };

    await act(async () => {
      await result.current.dataGridProps.processRowUpdate!(
        mockRow,
        mockOldRow,
        { rowId: "1" },
      );
    });
  });

  it("should not change sortModel when page changes", async () => {
    const { result } = renderHook(
      () =>
        useDataGrid({
          resource: "posts",
          sorters: {
            initial: [
              {
                field: "title",
                order: "asc",
              },
            ],
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
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    // Capture initial sortModel
    const initialSortModel = result.current.dataGridProps.sortModel;
    expect(initialSortModel).toEqual([
      {
        field: "title",
        sort: "asc",
      },
    ]);

    // Change page using onPaginationModelChange from dataGridPaginationValues
    await act(async () => {
      result.current.dataGridProps.onPaginationModelChange!(
        {
          page: 3,
          pageSize: 25,
        },
        {} as any,
      );
    });

    await waitFor(() => {
      expect(result.current.currentPage).toBe(4);
    });

    // sortModel should remain the same object reference after page change
    const sortModelAfterPageChange = result.current.dataGridProps.sortModel;
    expect(sortModelAfterPageChange).toBe(initialSortModel);
    expect(sortModelAfterPageChange).toEqual([
      {
        field: "title",
        sort: "asc",
      },
    ]);
  });

  it("should debounce server-side filter updates with the default delay", async () => {
    vi.useFakeTimers();

    const setFilters = vi.fn();
    const setCurrentPage = vi.fn();
    const useTableSpy = vi.spyOn(core, "useTable").mockReturnValue({
      tableQuery: {
        data: { data: [], total: 0 },
        isFetched: true,
        isLoading: false,
      },
      currentPage: 1,
      setCurrentPage,
      pageSize: 25,
      setPageSize: vi.fn(),
      filters: [],
      setFilters,
      sorters: [],
      setSorters: vi.fn(),
      pageCount: 0,
      createLinkForSyncWithLocation: vi.fn(),
      overtime: {},
      result: {},
    } as any);

    const { result, unmount } = renderHook(
      () =>
        useDataGrid({
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    act(() => {
      result.current.dataGridProps.onFilterModelChange({
        items: [
          {
            field: "title",
            operator: "contains",
            value: "john",
          },
        ],
      } as any);
    });

    expect(setFilters).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(499);
    });

    expect(setFilters).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(setFilters).toHaveBeenCalledWith([
      {
        field: "title",
        operator: "contains",
        value: "john",
      },
    ]);
    expect(setCurrentPage).toHaveBeenCalledWith(1);
    expect(result.current.dataGridProps.filterDebounceMs).toBe(0);

    unmount();
    useTableSpy.mockRestore();
    vi.useRealTimers();
  });

  it("should respect custom filterDebounceMs for server-side filtering", async () => {
    vi.useFakeTimers();

    const setFilters = vi.fn();
    const useTableSpy = vi.spyOn(core, "useTable").mockReturnValue({
      tableQuery: {
        data: { data: [], total: 0 },
        isFetched: true,
        isLoading: false,
      },
      currentPage: 1,
      setCurrentPage: vi.fn(),
      pageSize: 25,
      setPageSize: vi.fn(),
      filters: [],
      setFilters,
      sorters: [],
      setSorters: vi.fn(),
      pageCount: 0,
      createLinkForSyncWithLocation: vi.fn(),
      overtime: {},
      result: {},
    } as any);

    const { result, unmount } = renderHook(
      () =>
        useDataGrid({
          resource: "posts",
          filterDebounceMs: 1000,
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    act(() => {
      result.current.dataGridProps.onFilterModelChange({
        items: [
          {
            field: "title",
            operator: "contains",
            value: "john",
          },
        ],
      } as any);
    });

    act(() => {
      vi.advanceTimersByTime(999);
    });

    expect(setFilters).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(setFilters).toHaveBeenCalledTimes(1);

    unmount();
    useTableSpy.mockRestore();
    vi.useRealTimers();
  });
});
