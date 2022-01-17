import { TestWrapper } from "@test";
import { renderHook } from "@testing-library/react-hooks";

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
        const { result, waitFor } = renderHook(() => useTable(), {
            wrapper: TestWrapper({}),
        });

        await waitFor(() => {
            return !result.current.tableProps.loading;
        });

        const {
            tableProps: { pagination, dataSource },
        } = result.current;

        expect(dataSource).toHaveLength(2);
        expect(pagination).toEqual(defaultPagination);
    });

    it("with initial pagination parameters", async () => {
        const { result, waitFor } = renderHook(
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
            return !result.current.tableProps.loading;
        });

        const {
            tableProps: { pagination },
        } = result.current;

        expect(pagination).toEqual(customPagination);
    });

    it("with custom resource", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useTable({
                    resource: "categories",
                }),
            {
                wrapper: TestWrapper({}),
            },
        );

        await waitFor(() => {
            return !result.current.tableProps.loading;
        });

        const {
            tableProps: { dataSource },
        } = result.current;

        expect(dataSource).toHaveLength(2);
    });

    it("with syncWithLocation", async () => {
        const { result, waitFor } = renderHook(
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
            return !result.current.tableProps.loading;
        });

        const {
            tableProps: { dataSource },
        } = result.current;

        expect(dataSource).toHaveLength(2);
    });

    it("should success data with resource", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useTable({
                    resource: "categories",
                }),
            {
                wrapper: TestWrapper({}),
            },
        );

        await waitFor(() => {
            return result.current.tableQueryResult.isSuccess;
        });
    });
});
