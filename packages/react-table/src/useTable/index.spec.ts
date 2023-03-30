import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { ColumnDef } from "@tanstack/react-table";

import { TestWrapper } from "../../test";
import { useTable } from "./index";

type Post = {
    id: number;
    title: string;
};

const columns: ColumnDef<Post>[] = [
    {
        id: "id",
        header: "ID",
        accessorKey: "id",
    },
    {
        id: "title",
        header: "Title",
        accessorKey: "title",
        meta: {
            filterOperator: "contains",
        },
    },
];

describe("useTable Hook", () => {
    it("It should work successfully with no properties", async () => {
        const { result } = renderHook(
            () => useTable({ columns, refineCoreProps: { resource: "posts" } }),
            {
                wrapper: TestWrapper({
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        await waitFor(
            () => {
                expect(
                    !result.current.refineCore.tableQueryResult.isLoading,
                ).toBeTruthy();
            },
            { timeout: 10000 },
        );

        const {
            options: { state, pageCount },
            refineCore: { tableQueryResult },
        } = result.current;

        expect(pageCount).toBe(1);
        expect(state.pagination?.pageIndex).toBe(0);
        expect(state.pagination?.pageSize).toBe(10);
        expect(state.columnFilters).toEqual([]);
        expect(state.sorting).toEqual([]);
        expect(tableQueryResult.data?.data).toHaveLength(3);
        expect(tableQueryResult.data?.total).toBe(3);
    });

    it("It should work successfully with initialCurrent and initialPageSize", async () => {
        const { result } = renderHook(
            () =>
                useTable({
                    columns,
                    refineCoreProps: {
                        resource: "posts",
                        pagination: {
                            current: 2,
                            pageSize: 1,
                        },
                    },
                }),
            {
                wrapper: TestWrapper({
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        await waitFor(() => {
            expect(
                !result.current.refineCore.tableQueryResult.isLoading,
            ).toBeTruthy();
        });

        const {
            options: { state, pageCount },
            refineCore: { pageSize: corePageSize, current },
        } = result.current;

        expect(corePageSize).toBe(1);
        expect(current).toBe(2);
        expect(state.pagination?.pageIndex).toBe(1);
        expect(state.pagination?.pageSize).toBe(1);
        expect(pageCount).toBe(3);
    });

    it("It should work successfully with initialFilter", async () => {
        const { result } = renderHook(
            () =>
                useTable({
                    columns,
                    refineCoreProps: {
                        resource: "posts",
                        filters: {
                            initial: [
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
                }),
            {
                wrapper: TestWrapper({
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        await waitFor(() => {
            expect(
                !result.current.refineCore.tableQueryResult.isLoading,
            ).toBeTruthy();
        });

        const {
            options: { state },
            getColumn,
            refineCore: { filters: filtersCore },
        } = result.current;

        expect(filtersCore).toEqual([
            { field: "title", value: "Hello2", operator: "contains" },
            { field: "active", value: true, operator: "eq" },
        ]);
        expect(state.columnFilters).toEqual([
            { id: "title", value: "Hello2", operator: "contains" },
            { id: "active", value: true, operator: "eq" },
        ]);

        act(() => {
            const titleColumn = getColumn("title");
            titleColumn?.setFilterValue("Hello");
        });

        await waitFor(() => {
            expect(
                !result.current.refineCore.tableQueryResult.isFetching,
            ).toBeTruthy();
        });

        expect(result.current.refineCore.filters).toEqual([
            { field: "title", value: "Hello", operator: "contains" },
            { field: "active", value: true, operator: "eq" },
        ]);
        expect(result.current.options.state.columnFilters).toEqual([
            { id: "title", value: "Hello" },
            { id: "active", operator: "eq", value: true },
        ]);

        act(() => {
            const titleColumn = getColumn("title");
            titleColumn?.setFilterValue(undefined);
        });

        await waitFor(() => {
            expect(
                !result.current.refineCore.tableQueryResult.isFetching,
            ).toBeTruthy();
        });

        expect(result.current.refineCore.filters).toEqual([
            { field: "active", value: true, operator: "eq" },
        ]);
        expect(result.current.options.state.columnFilters).toEqual([
            { id: "active", operator: "eq", value: true },
        ]);
    });

    it("It should work successfully with initialSorter", async () => {
        const { result } = renderHook(
            () =>
                useTable({
                    columns,
                    refineCoreProps: {
                        sorters: {
                            initial: [
                                { field: "id", order: "asc" },
                                { field: "title", order: "desc" },
                            ],
                        },
                    },
                }),
            {
                wrapper: TestWrapper({
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        await waitFor(() => {
            expect(
                !result.current.refineCore.tableQueryResult.isFetching,
            ).toBeTruthy();
        });

        const {
            options: { state },
            setSorting,
            refineCore: { sorter },
        } = result.current;

        expect(sorter).toEqual([
            { field: "id", order: "asc" },
            { field: "title", order: "desc" },
        ]);
        expect(state.sorting).toEqual([
            { id: "id", desc: false },
            { id: "title", desc: true },
        ]);

        act(() => {
            setSorting([
                { id: "title", desc: false },
                { id: "id", desc: true },
            ]);
        });

        await waitFor(() => {
            expect(
                !result.current.refineCore.tableQueryResult.isFetching,
            ).toBeTruthy();
        });

        expect(result.current.refineCore.sorter).toEqual([
            { field: "title", order: "asc" },
            { field: "id", order: "desc" },
        ]);
        expect(result.current.options.state.sorting).toEqual([
            { id: "title", desc: false },
            { id: "id", desc: true },
        ]);
    });

    it("It should work successfully with initialFilter and permanentFilter", async () => {
        const { result } = renderHook(
            () =>
                useTable({
                    columns,
                    refineCoreProps: {
                        filters: {
                            initial: [
                                {
                                    field: "title",
                                    operator: "contains",
                                    value: "Hello",
                                },
                            ],
                            permanent: [
                                {
                                    field: "category.id",
                                    operator: "eq",
                                    value: 1,
                                },
                            ],
                        },
                    },
                }),
            {
                wrapper: TestWrapper({
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        await waitFor(() => {
            expect(
                !result.current.refineCore.tableQueryResult.isFetching,
            ).toBeTruthy();
        });

        const {
            refineCore: { filters: filtersCore },
            options: { state },
            getColumn,
        } = result.current;

        expect(filtersCore).toEqual([
            { field: "category.id", operator: "eq", value: 1 },
            { field: "title", value: "Hello", operator: "contains" },
        ]);
        expect(state.columnFilters).toEqual([
            { id: "title", operator: "contains", value: "Hello" },
            { id: "category.id", operator: "eq", value: 1 },
        ]);

        act(() => {
            const titleColumn = getColumn("title");
            titleColumn?.setFilterValue("Test");
        });

        await waitFor(() => {
            expect(
                !result.current.refineCore.tableQueryResult.isFetching,
            ).toBeTruthy();
        });

        expect(result.current.refineCore.filters).toEqual([
            { field: "category.id", value: 1, operator: "eq" },
            { field: "title", value: "Test", operator: "contains" },
        ]);
        expect(result.current.options.state.columnFilters).toEqual([
            { id: "title", value: "Test" },
            { id: "category.id", operator: "eq", value: 1 },
        ]);

        act(() => {
            const titleColumn = getColumn("title");
            titleColumn?.setFilterValue(undefined);
        });

        await waitFor(() => {
            expect(
                !result.current.refineCore.tableQueryResult.isFetching,
            ).toBeTruthy();
        });

        expect(result.current.refineCore.filters).toEqual([
            { field: "category.id", value: 1, operator: "eq" },
        ]);
        expect(result.current.options.state.columnFilters).toEqual([
            { id: "category.id", operator: "eq", value: 1 },
        ]);
    });

    it("It should work successfully with initialSorter and permanentSorter", async () => {
        const { result } = renderHook(
            () =>
                useTable({
                    columns,
                    refineCoreProps: {
                        sorters: {
                            initial: [
                                {
                                    field: "title",
                                    order: "asc",
                                },
                            ],
                            permanent: [
                                {
                                    field: "category.id",
                                    order: "desc",
                                },
                            ],
                        },
                    },
                }),
            {
                wrapper: TestWrapper({
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        await waitFor(() => {
            expect(
                !result.current.refineCore.tableQueryResult.isFetching,
            ).toBeTruthy();
        });

        const {
            getColumn,
            refineCore: { sorter },
            options: { state },
        } = result.current;

        expect(sorter).toEqual([
            { field: "category.id", order: "desc" },
            { field: "title", order: "asc" },
        ]);
        expect(state.sorting).toEqual([
            { id: "title", desc: false },
            { id: "category.id", desc: true },
        ]);

        act(() => {
            const titleColumn = getColumn("title");
            titleColumn?.toggleSorting(true, true);
        });

        await waitFor(() => {
            expect(
                !result.current.refineCore.tableQueryResult.isFetching,
            ).toBeTruthy();
        });

        expect(result.current.refineCore.sorter).toEqual([
            { field: "category.id", order: "desc" },
            { field: "title", order: "desc" },
        ]);

        expect(result.current.options.state.sorting).toEqual([
            { id: "title", desc: true },
            { id: "category.id", desc: true },
        ]);
    });
});
