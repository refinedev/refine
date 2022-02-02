import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { Column, useFilters, useSortBy } from "react-table";

import { TestWrapper } from "../../test";
import { useTable } from "./index";

const columns: Array<Column> = [
    {
        id: "id",
        Header: "ID",
        accessor: "id",
    },
    {
        id: "title",
        Header: "Title",
        accessor: "title",
        filter: "contains",
    },
];

describe("useTable Hook", () => {
    it("It should work successfully with no properties", async () => {
        const { result, waitFor } = renderHook(() => useTable({ columns }), {
            wrapper: TestWrapper({}),
        });

        await waitFor(() => {
            return !result.current.refineCore.tableQueryResult.isLoading;
        });

        const {
            pageCount,
            state: { pageIndex, pageSize, filters, sortBy },
            refineCore: { tableQueryResult },
        } = result.current;

        expect(pageIndex).toBe(0);
        expect(pageSize).toBe(10);
        expect(pageCount).toBe(1);
        expect(filters).toEqual([]);
        expect(sortBy).toEqual([]);
        expect(tableQueryResult.data?.data).toHaveLength(3);
        expect(tableQueryResult.data?.total).toBe(3);
    });

    it("It should work successfully with initialCurrent and initialPageSize", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useTable({
                    columns,
                    refineCoreProps: {
                        initialCurrent: 2,
                        initialPageSize: 1,
                    },
                }),
            {
                wrapper: TestWrapper({}),
            },
        );

        await waitFor(() => {
            return !result.current.refineCore.tableQueryResult.isLoading;
        });

        const {
            refineCore: { pageSize: corePageSize, current },
            state: { pageIndex, pageSize },
            pageCount,
        } = result.current;

        expect(corePageSize).toBe(1);
        expect(current).toBe(2);
        expect(pageIndex).toBe(1);
        expect(pageSize).toBe(1);
        expect(pageCount).toBe(3);
    });

    it("It should work successfully with initialFilter", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useTable(
                    {
                        columns,
                        refineCoreProps: {
                            initialFilter: [
                                {
                                    field: "title",
                                    operator: "contains",
                                    value: "Hello2",
                                },
                                {
                                    field: "active",
                                    operator: "eq",
                                    value: true,
                                },
                            ],
                        },
                    },
                    useFilters,
                ),
            {
                wrapper: TestWrapper({}),
            },
        );

        await waitFor(() => {
            return !result.current.refineCore.tableQueryResult.isLoading;
        });

        const {
            setFilter,
            refineCore: { filters: filtersCore },
            state: { filters },
        } = result.current;

        expect(filtersCore).toEqual([
            { field: "active", value: true, operator: "eq" },
            { field: "title", value: "Hello2", operator: "contains" },
        ]);
        expect(filters).toEqual([
            { id: "title", value: "Hello2" },
            { id: "active", value: true },
        ]);

        act(() => {
            setFilter("title", "Hello");
        });

        expect(result.current.refineCore.filters).toEqual([
            { field: "active", value: true, operator: "eq" },
            { field: "title", value: "Hello", operator: "contains" },
        ]);
        expect(result.current.state.filters).toEqual([
            { id: "title", value: "Hello" },
            { id: "active", value: true },
        ]);

        // reset filters case
        act(() => {
            setFilter("title", undefined);
        });

        expect(result.current.refineCore.filters).toEqual([
            { field: "active", value: true, operator: "eq" },
        ]);
        expect(result.current.state.filters).toEqual([
            { id: "active", value: true },
        ]);
    });

    it("It should work successfully with initialSorter", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useTable(
                    {
                        columns,
                        refineCoreProps: {
                            initialSorter: [
                                { field: "title", order: "desc" },
                                { field: "id", order: "asc" },
                            ],
                        },
                    },
                    useSortBy,
                ),
            {
                wrapper: TestWrapper({}),
            },
        );

        await waitFor(() => {
            return !result.current.refineCore.tableQueryResult.isLoading;
        });

        const {
            setSortBy,
            refineCore: { sorter },
            state: { sortBy },
        } = result.current;

        expect(sorter).toEqual([
            { field: "id", order: "asc" },
            { field: "title", order: "desc" },
        ]);
        expect(sortBy).toEqual([
            { id: "title", desc: true },
            { id: "id", desc: false },
        ]);

        act(() => {
            setSortBy([
                { id: "title", desc: false },
                { id: "id", desc: true },
            ]);
        });

        expect(result.current.refineCore.sorter).toEqual([
            { field: "id", order: "desc" },
            { field: "title", order: "asc" },
        ]);
        expect(result.current.state.sortBy).toEqual([
            { id: "title", desc: false },
            { id: "id", desc: true },
        ]);
    });

    it("It should work successfully with initialFilter and permanentFilter", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useTable(
                    {
                        columns,
                        refineCoreProps: {
                            initialFilter: [
                                {
                                    field: "title",
                                    operator: "contains",
                                    value: "Hello",
                                },
                            ],
                            permanentFilter: [
                                {
                                    field: "category.id",
                                    operator: "eq",
                                    value: 1,
                                },
                            ],
                        },
                    },
                    useFilters,
                ),
            {
                wrapper: TestWrapper({}),
            },
        );

        await waitFor(() => {
            return !result.current.refineCore.tableQueryResult.isLoading;
        });

        const {
            setFilter,
            refineCore: { filters: filtersCore },
            state: { filters },
        } = result.current;

        expect(filtersCore).toEqual([
            { field: "title", value: "Hello", operator: "contains" },
            { field: "category.id", operator: "eq", value: 1 },
        ]);
        expect(filters).toEqual([
            { id: "title", value: "Hello" },
            { id: "category.id", value: 1 },
        ]);

        act(() => {
            setFilter("title", "Test");
        });

        expect(result.current.refineCore.filters).toEqual([
            { field: "title", value: "Test", operator: "contains" },
            { field: "category.id", value: 1, operator: "eq" },
        ]);
        expect(result.current.state.filters).toEqual([
            { id: "title", value: "Test" },
            { id: "category.id", value: 1 },
        ]);

        act(() => {
            setFilter("title", undefined);
        });

        expect(result.current.refineCore.filters).toEqual([
            { field: "category.id", value: 1, operator: "eq" },
        ]);
        expect(result.current.state.filters).toEqual([
            { id: "category.id", value: 1 },
        ]);
    });

    it("It should work successfully with initialSorter and permanentSorter", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useTable(
                    {
                        columns,
                        refineCoreProps: {
                            initialSorter: [
                                {
                                    field: "title",
                                    order: "asc",
                                },
                            ],
                            permanentSorter: [
                                {
                                    field: "category.id",
                                    order: "desc",
                                },
                            ],
                        },
                    },
                    useSortBy,
                ),
            {
                wrapper: TestWrapper({}),
            },
        );

        await waitFor(() => {
            return !result.current.refineCore.tableQueryResult.isLoading;
        });

        const {
            toggleSortBy,
            refineCore: { sorter },
            state: { sortBy },
        } = result.current;

        expect(sorter).toEqual([
            { field: "title", order: "asc" },
            { field: "category.id", order: "desc" },
        ]);
        expect(sortBy).toEqual([
            { id: "title", desc: false },
            { id: "category.id", desc: true },
        ]);

        act(() => {
            toggleSortBy("title", true, true);
        });

        expect(result.current.refineCore.sorter).toEqual([
            { field: "title", order: "desc" },
            { field: "category.id", order: "desc" },
        ]);

        expect(result.current.state.sortBy).toEqual([
            { id: "title", desc: true },
            { id: "category.id", desc: true },
        ]);
    });
});
