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

  it("keeps sortModel reference stable across re-renders when sorters are unchanged", async () => {
    const { result, rerender } = renderHook(
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

    const firstSortModel = result.current.dataGridProps.sortModel;

    rerender();

    expect(result.current.dataGridProps.sortModel).toBe(firstSortModel);
  });

  it("returns a new sortModel reference when sorters change", async () => {
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

    const initialSortModel = result.current.dataGridProps.sortModel;

    await act(async () => {
      result.current.dataGridProps.onSortModelChange!(
        [{ field: "title", sort: "desc" }],
        {} as any,
      );
    });

    await waitFor(() => {
      expect(result.current.dataGridProps.sortModel).not.toBe(initialSortModel);
    });
    expect(result.current.dataGridProps.sortModel).toEqual([
      { field: "title", sort: "desc" },
    ]);
  });

  it("keeps filterModel reference stable across re-renders when filters are unchanged", async () => {
    const { result, rerender } = renderHook(
      () =>
        useDataGrid({
          resource: "posts",
          filters: {
            initial: [
              {
                field: "title",
                operator: "contains",
                value: "hello",
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

    const firstFilterModel = result.current.dataGridProps.filterModel;

    rerender();

    expect(result.current.dataGridProps.filterModel).toBe(firstFilterModel);
  });

  it("returns a new filterModel reference when filters change", async () => {
    const { result } = renderHook(
      () =>
        useDataGrid({
          resource: "posts",
          filters: {
            initial: [
              {
                field: "title",
                operator: "contains",
                value: "hello",
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

    const initialFilterModel = result.current.dataGridProps.filterModel;

    await act(async () => {
      result.current.dataGridProps.onFilterModelChange({
        items: [
          {
            field: "title",
            operator: "contains",
            value: "world",
            id: "titlecontains",
          },
        ],
      });
    });

    await waitFor(() => {
      expect(result.current.dataGridProps.filterModel).not.toBe(
        initialFilterModel,
      );
    });
  });

  it("refreshes filterModel when column types change via onStateChange", async () => {
    const { result, rerender } = renderHook(
      () =>
        useDataGrid({
          resource: "posts",
          filters: {
            initial: [
              {
                field: "age",
                operator: "eq",
                value: 25,
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

    // Before onStateChange fires, column types are unknown so the "eq"
    // operator falls back to the string default ("equals").
    expect(result.current.dataGridProps.filterModel?.items[0]).toEqual(
      expect.objectContaining({ field: "age", operator: "equals" }),
    );

    // Simulate the DataGrid reporting its column metadata.
    act(() => {
      result.current.dataGridProps.onStateChange!({
        columns: { lookup: { age: { type: "number" } } },
      } as any);
    });

    // onStateChange mutates a ref and does not schedule a re-render on
    // its own — matching real usage, the next render (here forced via
    // rerender) picks up the new column-type map and the memoized
    // filterModel reflects it: "eq" on a number column maps to "=".
    rerender();
    expect(result.current.dataGridProps.filterModel?.items[0]).toEqual(
      expect.objectContaining({ field: "age", operator: "=" }),
    );
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
});
