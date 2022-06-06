import { act } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

import { useTable } from ".";
import { CrudFilters } from "src/interfaces";

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
            pageCount,
        } = result.current;

        expect(data?.data).toHaveLength(2);
        expect(pageSize).toEqual(defaultPagination.pageSize);
        expect(current).toEqual(defaultPagination.current);
        expect(pageCount).toEqual(1);
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

        const { pageSize, current, pageCount } = result.current;

        expect(pageSize).toEqual(customPagination.pageSize);
        expect(current).toEqual(customPagination.current);
        expect(pageCount).toEqual(2);
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

describe("useTable Filters", () => {
    const wrapper = TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
    });

    it("should be empty initially", () => {
        const { result } = renderHook(() => useTable(), {
            wrapper,
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toHaveLength(0);
    });

    it("should only present permanentFilters initially", () => {
        const permanentFilter = [
            {
                field: "id",
                operator: "gte",
                value: 5,
            },
        ] as CrudFilters;

        const { result } = renderHook(
            () =>
                useTable({
                    permanentFilter,
                }),
            {
                wrapper,
            },
        );

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(permanentFilter);
        expect(result.current.filters).toHaveLength(1);
    });

    it("should only present initialFilters initially", () => {
        const initialFilter = [
            {
                field: "name",
                operator: "contains",
                value: "test",
            },
        ] as CrudFilters;

        const { result } = renderHook(
            () =>
                useTable({
                    initialFilter,
                }),
            {
                wrapper,
            },
        );

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(initialFilter);
        expect(result.current.filters).toHaveLength(1);
    });

    it("should include both initial and permanent filters initially", () => {
        const initialFilter = [
            {
                field: "name",
                operator: "contains",
                value: "test",
            },
        ] as CrudFilters;
        const permanentFilter = [
            {
                field: "id",
                operator: "gte",
                value: 5,
            },
        ] as CrudFilters;

        const { result } = renderHook(
            () =>
                useTable({
                    initialFilter,
                    permanentFilter,
                }),
            {
                wrapper,
            },
        );

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual([
            ...initialFilter,
            ...permanentFilter,
        ]);
        expect(result.current.filters).toHaveLength(2);
        expect(result.current.filters).toEqual(
            expect.arrayContaining(initialFilter),
        );
        expect(result.current.filters).toEqual(
            expect.arrayContaining(permanentFilter),
        );
    });

    it("permanent filter should take precedence over initial filter", () => {
        const initialFilter = [
            {
                field: "name",
                operator: "contains",
                value: "test",
            },
        ] as CrudFilters;
        const permanentFilter = [
            {
                field: "name",
                operator: "contains",
                value: "ali",
            },
        ] as CrudFilters;

        const { result } = renderHook(
            () =>
                useTable({
                    permanentFilter,
                    initialFilter,
                }),
            {
                wrapper,
            },
        );

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(permanentFilter);
        expect(result.current.filters).toHaveLength(1);
    });

    it("[behavior=merge(default)] should merge new filters with existing ones", () => {
        const initialFilter = [
            {
                field: "name",
                operator: "contains",
                value: "test",
            },
        ] as CrudFilters;

        const newFilters = [
            {
                field: "id",
                operator: "gte",
                value: 5,
            },
        ] as CrudFilters;

        const { result } = renderHook(
            () =>
                useTable({
                    initialFilter,
                }),
            {
                wrapper,
            },
        );

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(initialFilter);
        expect(result.current.filters).toHaveLength(1);

        act(() => {
            result.current.setFilters(newFilters, "merge");
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual([
            ...initialFilter,
            ...newFilters,
        ]);
        expect(result.current.filters).toHaveLength(2);
    });

    it("[behavior=merge(default)] permanent filter should not be overwritten", () => {
        const initialFilter = [
            {
                field: "name",
                operator: "contains",
                value: "test",
            },
        ] as CrudFilters;

        const permanentFilter = [
            {
                field: "id",
                operator: "ne",
                value: 3,
            },
        ] as CrudFilters;

        const newFilters = [
            {
                field: "id",
                operator: "ne",
                value: 5,
            },
        ] as CrudFilters;

        const { result } = renderHook(
            () =>
                useTable({
                    permanentFilter,
                    initialFilter,
                }),
            {
                wrapper,
            },
        );

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual([
            ...initialFilter,
            ...permanentFilter,
        ]);
        expect(result.current.filters).toHaveLength(2);

        act(() => {
            result.current.setFilters(newFilters, "merge");
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual([
            ...initialFilter,
            ...permanentFilter,
        ]);
        // should not contain newFilters elements
        expect(result.current.filters).toEqual(
            expect.not.arrayContaining(newFilters),
        );
    });

    it("[behavior=merge(default)] should merge new filters and remove duplicates", () => {
        const initialFilter = [
            {
                field: "name",
                operator: "contains",
                value: "test",
            },
        ] as CrudFilters;

        const permanentFilter = [
            {
                field: "id",
                operator: "ne",
                value: 3,
            },
        ] as CrudFilters;

        const newFilters = [
            {
                field: "name",
                operator: "contains",
                value: "ali",
            },
        ] as CrudFilters;

        const { result } = renderHook(
            () =>
                useTable({
                    permanentFilter,
                    initialFilter,
                }),
            {
                wrapper,
            },
        );

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual([
            ...initialFilter,
            ...permanentFilter,
        ]);
        expect(result.current.filters).toHaveLength(2);

        act(() => {
            result.current.setFilters(newFilters, "merge");
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual([
            ...newFilters,
            ...permanentFilter,
        ]);
        // should not contain initialFilter elements
        expect(result.current.filters).toEqual(
            expect.not.arrayContaining(initialFilter),
        );
        // should contain newFilter elements
        expect(result.current.filters).toEqual(
            expect.arrayContaining(newFilters),
        );
    });

    it("[behavior=replace] should replace the existing filters with newFilters", () => {
        const initialFilter = [
            {
                field: "name",
                operator: "contains",
                value: "test",
            },
        ] as CrudFilters;

        const newFilters = [
            {
                field: "id",
                operator: "ne",
                value: 5,
            },
        ] as CrudFilters;

        const { result } = renderHook(
            () =>
                useTable({
                    initialFilter,
                }),
            {
                wrapper,
            },
        );

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(initialFilter);
        expect(result.current.filters).toHaveLength(1);

        act(() => {
            result.current.setFilters(newFilters, "replace");
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(newFilters);
        expect(result.current.filters).toHaveLength(1);
    });

    it("[behavior=replace] replace behavior should not overwrite permanent filters", () => {
        const initialFilter = [
            {
                field: "name",
                operator: "contains",
                value: "test",
            },
        ] as CrudFilters;

        const permanentFilter = [
            {
                field: "id",
                operator: "ne",
                value: 3,
            },
        ] as CrudFilters;

        const newFilters = [
            {
                field: "id",
                operator: "ne",
                value: 5,
            },
        ] as CrudFilters;

        const { result } = renderHook(
            () =>
                useTable({
                    permanentFilter,
                    initialFilter,
                }),
            {
                wrapper,
            },
        );

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual([
            ...initialFilter,
            ...permanentFilter,
        ]);
        expect(result.current.filters).toHaveLength(2);

        act(() => {
            result.current.setFilters(newFilters, "replace");
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual([permanentFilter]);
        // should not contain newFilters elements
        expect(result.current.filters).toEqual(
            expect.not.arrayContaining(newFilters),
        );
        // should not contain initialFilter elements (because of replace behavior)
        expect(result.current.filters).toEqual(
            expect.not.arrayContaining(initialFilter),
        );
    });

    it("[behavior=replace] should remove duplicates in the newFilters array", () => {
        const initialFilter = [
            {
                field: "name",
                operator: "contains",
                value: "test",
            },
        ] as CrudFilters;

        const newFilters = [
            {
                field: "id",
                operator: "ne",
                value: 5,
            },
            {
                field: "name",
                operator: "contains",
                value: "ali",
            },
            {
                field: "name",
                operator: "contains",
                value: "this-should-be-in-it",
            },
        ] as CrudFilters;

        const { result } = renderHook(
            () =>
                useTable({
                    initialFilter,
                }),
            {
                wrapper,
            },
        );

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(initialFilter);
        expect(result.current.filters).toHaveLength(1);

        act(() => {
            result.current.setFilters(newFilters, "replace");
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(newFilters);
        expect(result.current.filters).toHaveLength(2);

        // should not contain initialFilter elements
        expect(result.current.filters).toEqual(
            expect.not.arrayContaining(initialFilter),
        );

        // item at index = 1 should be overwritten by the index 2
        expect(result.current.filters).toEqual(
            expect.not.arrayContaining([newFilters[1]]),
        );
    });

    it("should use behavior = merge (default) by default", () => {
        const initialFilter = [
            {
                field: "name",
                operator: "contains",
                value: "test",
            },
        ] as CrudFilters;

        const newFilters = [
            {
                field: "id",
                operator: "gte",
                value: 5,
            },
        ] as CrudFilters;

        const { result } = renderHook(
            () =>
                useTable({
                    initialFilter,
                }),
            {
                wrapper,
            },
        );

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(initialFilter);
        expect(result.current.filters).toHaveLength(1);

        act(() => {
            result.current.setFilters(newFilters);
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual([
            ...initialFilter,
            ...newFilters,
        ]);
        expect(result.current.filters).toHaveLength(2);
    });

    it("should use `defaultSetFiltersBehavior` property as default behavior (replace)", () => {
        const initialFilter = [
            {
                field: "name",
                operator: "contains",
                value: "test",
            },
        ] as CrudFilters;

        const newFilters = [
            {
                field: "id",
                operator: "ne",
                value: 5,
            },
        ] as CrudFilters;

        const { result } = renderHook(
            () =>
                useTable({
                    initialFilter,
                    defaultSetFilterBehavior: "replace",
                }),
            {
                wrapper,
            },
        );

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(initialFilter);
        expect(result.current.filters).toHaveLength(1);

        act(() => {
            result.current.setFilters(newFilters);
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(newFilters);
        expect(result.current.filters).toHaveLength(1);
    });
});
