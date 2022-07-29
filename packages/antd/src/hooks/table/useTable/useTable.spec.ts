import { CrudFilters } from "@pankod/refine-core";
import isEqual from "lodash/isEqual";
import { renderHook, waitFor } from "@testing-library/react";

import { act, TestWrapper } from "@test";

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

describe("useTable Hook", () => {
    it("default", async () => {
        const { result } = renderHook(() => useTable(), {
            wrapper: TestWrapper({}),
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
                    initialCurrent: customPagination.current,
                    initialPageSize: customPagination.pageSize,
                }),
            {
                wrapper: TestWrapper({}),
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

    it("with disabled pagination", async () => {
        const { result } = renderHook(
            () =>
                useTable({
                    hasPagination: false,
                }),
            {
                wrapper: TestWrapper({}),
            },
        );

        await waitFor(() => {
            expect(!result.current.tableProps.loading).toBeTruthy();
        });

        const {
            tableProps: { pagination },
        } = result.current;

        expect(pagination).toBe(false);
    });

    it("with custom resource", async () => {
        const { result } = renderHook(
            () =>
                useTable({
                    resource: "categories",
                }),
            {
                wrapper: TestWrapper({}),
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
                wrapper: TestWrapper({}),
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
                wrapper: TestWrapper({}),
            },
        );

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });
    });

    it("should set filters manually with `setFilters`", async () => {
        jest.useFakeTimers();

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
                    initialFilter,
                }),
            {
                wrapper: TestWrapper({}),
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
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        await act(async () => {
            result.current.setFilters(nextFilters);
        });

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        // TODO: update tests
        await waitFor(() => {
            return isEqual(result.current.filters, [...nextFilters]);
        });
    });

    it('should change behavior to `replace` when `defaultSetFilterBehavior="replace"`', async () => {
        jest.useFakeTimers();

        const { result } = renderHook(
            () =>
                useTable({
                    resource: "categories",
                    defaultSetFilterBehavior: "replace",
                    initialFilter: [
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
                }),
            {
                wrapper: TestWrapper({}),
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

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        await waitFor(() => {
            return isEqual(result.current.filters, newFilters);
        });
    });
});
