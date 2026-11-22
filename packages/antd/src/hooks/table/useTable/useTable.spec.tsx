import React from "react";
import type { CrudFilters } from "@refinedev/core";
import dayjs from "dayjs";
import isEqual from "lodash/isEqual";
import { renderHook, waitFor, fireEvent } from "@testing-library/react";
import { Form, Input } from "antd";
import { act, TestWrapper, render, MockJSONServer } from "@test";

import { useTable } from "./useTable";

const defaultPagination = {
  pageSize: 10,
  current: 1,
  total: 2,
  simple: true,
  position: ["bottomCenter"],
};

const customPagination = {
  current: 2,
  pageSize: 1,
  total: 2,
  simple: true,
  position: ["bottomCenter"],
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

describe("useTable Hook", () => {
  it("default", async () => {
    const { result } = renderHook(() => useTable(), {
      wrapper: TestWrapper({
        routerProvider,
      }),
    });

    await waitFor(() => {
      expect(!result.current.tableProps.loading).toBeTruthy();
    });

    const {
      tableProps: { pagination, dataSource },
    } = result.current;

    expect(dataSource).toHaveLength(2);
    expect(pagination).toEqual(expect.objectContaining(defaultPagination));
  });

  it("with initial pagination parameters", async () => {
    const { result } = renderHook(
      () =>
        useTable({
          pagination: {
            currentPage: customPagination.current,
            pageSize: customPagination.pageSize,
          },
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
        }),
      },
    );

    await waitFor(() => {
      expect(!result.current.tableProps.loading).toBeTruthy();
    });

    const {
      tableProps: { pagination },
    } = result.current;

    expect(pagination).toEqual(expect.objectContaining(customPagination));
  });

  it("with custom resource", async () => {
    const { result } = renderHook(
      () =>
        useTable({
          resource: "categories",
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
        }),
      },
    );

    await waitFor(() => {
      expect(!result.current.tableProps.loading).toBeTruthy();
    });

    const {
      tableProps: { dataSource },
    } = result.current;

    expect(dataSource).toHaveLength(2);
  });

  it("with syncWithLocation", async () => {
    const { result } = renderHook(
      () =>
        useTable({
          resource: "categories",
          syncWithLocation: true,
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
        }),
      },
    );

    await waitFor(() => {
      expect(!result.current.tableProps.loading).toBeTruthy();
    });

    const {
      tableProps: { dataSource },
    } = result.current;

    expect(dataSource).toHaveLength(2);
  });

  it("should success data with resource", async () => {
    const { result } = renderHook(
      () =>
        useTable({
          resource: "categories",
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
        }),
      },
    );

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });
  });

  it("should set filters manually with `setFilters`", async () => {
    const initialFilter: CrudFilters = [
      {
        field: "name",
        operator: "contains",
        value: "test",
      },
    ];

    const { result } = renderHook(
      () =>
        useTable({
          resource: "categories",
          filters: {
            initial: initialFilter,
          },
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
        }),
      },
    );

    const nextFilters: CrudFilters = [
      {
        field: "name",
        operator: "contains",
        value: "x",
      },
      {
        field: "id",
        operator: "gte",
        value: 1,
      },
    ];

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    await act(async () => {
      result.current.setFilters(nextFilters);
    });

    // TODO: update tests
    await waitFor(() => {
      return isEqual(result.current.filters, [...nextFilters]);
    });
  });

  it('should change behavior to `replace` when `defaultSetFilterBehavior="replace"`', async () => {
    const { result } = renderHook(
      () =>
        useTable({
          resource: "categories",
          filters: {
            initial: [
              {
                field: "name",
                operator: "eq",
                value: "test",
              },
              {
                field: "id",
                operator: "gte",
                value: 1,
              },
            ],
            defaultBehavior: "replace",
          },
        }),
      {
        wrapper: TestWrapper({
          routerProvider,
        }),
      },
    );

    const newFilters: CrudFilters = [
      {
        field: "name",
        operator: "eq",
        value: "next-test",
      },
      {
        field: "other-field",
        operator: "contains",
        value: "other",
      },
    ];

    await act(async () => {
      result.current.setFilters(newFilters);
    });

    await waitFor(() => {
      return isEqual(result.current.filters, newFilters);
    });
  });

  it.each(["client", "server"] as const)(
    "when pagination mode is %s, should set pagination props",
    async (mode) => {
      const { result } = renderHook(
        () =>
          useTable({
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

      expect(result.current.tableProps.pagination).toEqual(
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
        useTable({
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

    expect(result.current.tableProps.pagination).toBeFalsy();
  });

  it("should pass form values to search form from params (syncWithLocation)", async () => {
    const Component = () => {
      const { searchFormProps } = useTable({
        resource: "categories",
        syncWithLocation: true,
      });

      return (
        <Form {...searchFormProps}>
          <Form.Item name="name" noStyle>
            <Input
              data-test-id="search-name"
              size="large"
              placeholder="Search by name"
            />
          </Form.Item>
        </Form>
      );
    };

    const { getByDisplayValue } = render(<Component />, {
      wrapper: TestWrapper({
        routerProvider: {
          parse: () => {
            return () => ({
              resource: {
                name: "posts",
              },
              params: {
                filters: [
                  {
                    field: "name",
                    operator: "contains",
                    value: "Some Name To Look For",
                  },
                ],
              },
            });
          },
        },
      }),
    });

    await waitFor(() => {
      expect(getByDisplayValue("Some Name To Look For")).toBeInTheDocument();
    });
  });

  it("should resync search form fields when `filters` change after mount, without `onParse`", async () => {
    // Regression test: the sync effect used to depend only on
    // `shouldSyncWithLocation`, so it ran once on mount and never again -
    // a later `setFilters` call never reached the search form.
    let formInstance: any;
    let applyFilters: ((filters: CrudFilters) => void) | undefined;

    const Component = () => {
      const { searchFormProps, setFilters } = useTable({
        resource: "posts",
        syncWithLocation: true,
      });

      formInstance = searchFormProps.form;
      applyFilters = setFilters;

      return (
        <Form {...searchFormProps}>
          <Form.Item name="name" noStyle>
            <Input />
          </Form.Item>
        </Form>
      );
    };

    render(<Component />, {
      wrapper: TestWrapper({ routerProvider }),
    });

    await waitFor(() => {
      expect(formInstance).toBeDefined();
    });

    act(() => {
      applyFilters?.([
        { field: "name", operator: "contains", value: "Updated Name" },
      ]);
    });

    await waitFor(() => {
      expect(formInstance.getFieldValue("name")).toBe("Updated Name");
    });
  });

  it("should use `onParse` to reconstruct complex form values from filters, including on later filter changes", async () => {
    let formInstance: any;
    let applyFilters: ((filters: CrudFilters) => void) | undefined;

    const Component = () => {
      const { searchFormProps, setFilters } = useTable({
        resource: "posts",
        syncWithLocation: true,
        onParse: (filters: CrudFilters) => {
          const category = filters.find(
            (filter) => "field" in filter && filter.field === "category.id",
          ) as { value: unknown } | undefined;
          const gte = filters.find(
            (filter) =>
              "field" in filter &&
              filter.field === "createdAt" &&
              filter.operator === "gte",
          ) as { value: unknown } | undefined;
          const lte = filters.find(
            (filter) =>
              "field" in filter &&
              filter.field === "createdAt" &&
              filter.operator === "lte",
          ) as { value: unknown } | undefined;

          return {
            // string -> number coercion (URL params always arrive as strings)
            category: category ? Number(category.value) : undefined,
            // reconstructing a date-range-picker-style tuple from two
            // separate `gte`/`lte` filters
            createdAt:
              gte && lte
                ? [
                    dayjs(gte.value as string).toISOString(),
                    dayjs(lte.value as string).toISOString(),
                  ]
                : undefined,
          };
        },
      });

      formInstance = searchFormProps.form;
      applyFilters = setFilters;

      return (
        <Form {...searchFormProps}>
          <Form.Item name="category" noStyle>
            <Input />
          </Form.Item>
          <Form.Item name="createdAt" noStyle>
            <Input />
          </Form.Item>
        </Form>
      );
    };

    render(<Component />, {
      wrapper: TestWrapper({
        routerProvider: {
          parse: () => {
            return () => ({
              resource: { name: "posts" },
              params: {
                filters: [
                  { field: "category.id", operator: "eq", value: "1" },
                  {
                    field: "createdAt",
                    operator: "gte",
                    value: "2026-01-01T00:00:00.000Z",
                  },
                  {
                    field: "createdAt",
                    operator: "lte",
                    value: "2026-01-31T00:00:00.000Z",
                  },
                ],
              },
            });
          },
        },
      }),
    });

    await waitFor(() => {
      expect(formInstance?.getFieldValue("category")).toBe(1);
      expect(formInstance?.getFieldValue("createdAt")).toEqual([
        dayjs("2026-01-01T00:00:00.000Z").toISOString(),
        dayjs("2026-01-31T00:00:00.000Z").toISOString(),
      ]);
    });

    // `filters` change again after mount (e.g. the user applies a new
    // search) - the `onParse` path must resync too, not just run once.
    act(() => {
      applyFilters?.([
        { field: "category.id", operator: "eq", value: "2" },
        {
          field: "createdAt",
          operator: "gte",
          value: "2026-03-01T00:00:00.000Z",
        },
        {
          field: "createdAt",
          operator: "lte",
          value: "2026-03-31T00:00:00.000Z",
        },
      ]);
    });

    await waitFor(() => {
      expect(formInstance.getFieldValue("category")).toBe(2);
      expect(formInstance.getFieldValue("createdAt")).toEqual([
        dayjs("2026-03-01T00:00:00.000Z").toISOString(),
        dayjs("2026-03-31T00:00:00.000Z").toISOString(),
      ]);
    });
  });

  it("should not clobber the search form on unrelated re-renders when `filters` have not changed (inline `onParse`)", async () => {
    // Regression test for a flaw in a previously proposed (unmerged) fix:
    // if the effect depended on `onParse` itself, a consumer passing an
    // inline `onParse` (a new function identity on every render) would
    // resync - and overwrite the user's in-progress input - on every
    // unrelated re-render, not just when `filters` actually change.
    let formInstance: any;

    const Component = () => {
      const { searchFormProps } = useTable({
        resource: "posts",
        syncWithLocation: true,
        onParse: (filters: CrudFilters) => ({
          name: (
            filters.find(
              (filter) => "field" in filter && filter.field === "name",
            ) as { value: unknown } | undefined
          )?.value,
        }),
      });

      formInstance = searchFormProps.form;

      return (
        <Form {...searchFormProps}>
          <Form.Item name="name" noStyle>
            <Input />
          </Form.Item>
        </Form>
      );
    };

    const { rerender } = render(<Component />, {
      wrapper: TestWrapper({ routerProvider }),
    });

    await waitFor(() => {
      expect(formInstance).toBeDefined();
    });

    act(() => {
      formInstance.setFieldValue("name", "typed by user");
    });

    rerender(<Component />);
    rerender(<Component />);

    await waitFor(() => {
      expect(formInstance.getFieldValue("name")).toBe("typed by user");
    });
  });

  it("should work with query and queryResult", async () => {
    const { result } = renderHook(() => useTable(), {
      wrapper: TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
        routerProvider,
      }),
    });

    await waitFor(() => {
      expect(result.current.tableQuery.isSuccess).toBeTruthy();
    });

    expect(result.current.tableQuery).toEqual(result.current.tableQuery);
  });
});
