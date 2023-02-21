import { renderHook, waitFor } from "@testing-library/react";

import { TestWrapper } from "@test";

import { useDataGrid } from "./";
import { CrudFilters } from "@pankod/refine-core";
import { act } from "react-dom/test-utils";

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
            expect(!result.current.tableQueryResult?.isLoading).toBeTruthy();
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
        expect(result.current.current).toEqual(1);
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
                    pageSize: 25,
                    page: 0,
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
                pageSize: 25,
                page: 0,
            }),
        );
        expect(result.current.dataGridProps).toEqual(
            expect.objectContaining({
                paginationMode: "client",
            }),
        );
    });

    it("pagination should be prioritized over hasPagination", async () => {
        const { result } = renderHook(
            () =>
                useDataGrid({
                    pagination: {
                        mode: "off",
                    },
                    hasPagination: true,
                }),
            {
                wrapper: TestWrapper({}),
            },
        );

        expect(result.current.dataGridProps).toEqual(
            expect.objectContaining({
                paginationMode: "client",
            }),
        );
    });

    it("when hasPagination is false and pagination mode is not defined, paginationMode should be 'client'", async () => {
        const { result } = renderHook(
            () =>
                useDataGrid({
                    hasPagination: false,
                }),
            {
                wrapper: TestWrapper({}),
            },
        );

        expect(result.current.dataGridProps).toEqual(
            expect.objectContaining({
                paginationMode: "client",
            }),
        );
    });
});
