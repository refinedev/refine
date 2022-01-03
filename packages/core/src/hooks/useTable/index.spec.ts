import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useTable } from ".";

const defaultPagination = {
    pageSize: 10,
    current: 1,
};

const customPagination = {
    current: 2,
    defaultCurrent: 2,
    defaultPageSize: 1,
    pageSize: 1,
};

describe("useTable Hook", () => {
    it("default", async () => {
        const { result, waitFor } = renderHook(() => useTable(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        await waitFor(() => {
            return !result.current.tableQueryResult.isLoading;
        });

        const {
            tableQueryResult: { data },
            pageSize,
            current,
        } = result.current;

        expect(data?.data).toHaveLength(2);
        expect(pageSize).toEqual(defaultPagination.pageSize);
        expect(current).toEqual(defaultPagination.current);
    });

    it("with initial pagination parameters", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useTable({
                    initialCurrent: customPagination.defaultCurrent,
                    initialPageSize: customPagination.defaultPageSize,
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            return !result.current.tableQueryResult.isLoading;
        });

        const { pageSize, current } = result.current;

        expect(pageSize).toEqual(customPagination.pageSize);
        expect(current).toEqual(customPagination.current);
    });

    it("with custom resource", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useTable({
                    resource: "categories",
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [
                        { name: "posts", route: "posts" },
                        { name: "categories", route: "categories" },
                    ],
                }),
            },
        );

        await waitFor(() => {
            return !result.current.tableQueryResult.isLoading;
        });

        const {
            tableQueryResult: { data },
        } = result.current;

        expect(data?.data).toHaveLength(2);
    });

    it("with syncWithLocation", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useTable({
                    resource: "categories",
                    syncWithLocation: true,
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [
                        { name: "posts", route: "posts" },
                        { name: "categories", route: "categories" },
                    ],
                }),
            },
        );

        await waitFor(() => {
            return !result.current.tableQueryResult.isLoading;
        });

        const {
            tableQueryResult: { data },
        } = result.current;

        expect(data?.data).toHaveLength(2);
    });

    it("should success data with resource", async () => {
        const { result, waitFor } = renderHook(
            () =>
                useTable({
                    resource: "categories",
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [
                        { name: "posts", route: "posts" },
                        { name: "categories", route: "categories" },
                    ],
                }),
            },
        );

        await waitFor(() => {
            return result.current.tableQueryResult.isSuccess;
        });
    });
});
