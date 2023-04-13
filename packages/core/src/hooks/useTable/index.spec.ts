import { act } from "react-dom/test-utils";
import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockRouterBindings } from "@test";

import { useTable } from ".";
import { CrudFilters, CrudSorting } from "src/interfaces";

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

const routerProvider = mockRouterBindings({
    resource: {
        name: "posts",
    },
});

describe("useTable Hook", () => {
    it("default", async () => {
        const { result } = renderHook(() => useTable(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
                routerProvider,
            }),
        });

        await waitFor(() => {
            expect(!result.current.tableQueryResult.isLoading).toBeTruthy();
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
        const { result } = renderHook(
            () =>
                useTable({
                    pagination: {
                        current: customPagination.defaultCurrent,
                        pageSize: customPagination.defaultPageSize,
                    },
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                    routerProvider,
                }),
            },
        );

        await waitFor(() => {
            expect(!result.current.tableQueryResult.isLoading).toBeTruthy();
        });

        const { pageSize, current, pageCount } = result.current;

        expect(pageSize).toEqual(customPagination.pageSize);
        expect(current).toEqual(customPagination.current);
        expect(pageCount).toEqual(2);
    });

    it("with custom resource", async () => {
        const { result } = renderHook(
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
                    routerProvider,
                }),
            },
        );

        await waitFor(() => {
            expect(!result.current.tableQueryResult.isLoading).toBeTruthy();
        });

        const {
            tableQueryResult: { data },
        } = result.current;

        expect(data?.data).toHaveLength(2);
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
                    dataProvider: MockJSONServer,
                    resources: [
                        { name: "posts", route: "posts" },
                        { name: "categories", route: "categories" },
                    ],
                    routerProvider,
                }),
            },
        );

        await waitFor(() => {
            expect(!result.current.tableQueryResult.isLoading).toBeTruthy();
        });

        const {
            tableQueryResult: { data },
        } = result.current;

        expect(data?.data).toHaveLength(2);
    });

    it("should success data with resource", async () => {
        const { result } = renderHook(
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
                    routerProvider,
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });
    });

    it("pagination should be prioritized over initialCurrent and initialPageSize", async () => {
        const { result } = renderHook(
            () =>
                useTable({
                    initialCurrent: 10,
                    initialPageSize: 20,
                    pagination: {
                        current: 1,
                        pageSize: 10,
                    },
                }),
            {
                wrapper: TestWrapper({
                    routerProvider,
                }),
            },
        );

        expect(result.current.pageSize).toBe(10);
        expect(result.current.current).toBe(1);
    });

    it("when deprecated setSorter is called, it should update sorter and sorters", async () => {
        const { result } = renderHook(() => useTable({}), {
            wrapper: TestWrapper({
                routerProvider,
            }),
        });

        const sorters: CrudSorting = [{ field: "id", order: "asc" }];

        await act(async () => {
            result.current.setSorter(sorters);
        });

        expect(result.current.sorter).toStrictEqual(sorters);
        expect(result.current.sorters).toStrictEqual(sorters);
    });

    it("when setSorters is called, it should update deprecated sorter and sorters", async () => {
        const { result } = renderHook(() => useTable({}), {
            wrapper: TestWrapper({
                routerProvider,
            }),
        });

        const sorters: CrudSorting = [{ field: "id", order: "asc" }];

        await act(async () => {
            result.current.setSorters(sorters);
        });

        expect(result.current.sorter).toStrictEqual(sorters);
        expect(result.current.sorters).toStrictEqual(sorters);
    });

    it("`filters.initial` should be prioritized over initialFilter", async () => {
        const { result } = renderHook(
            () =>
                useTable({
                    initialFilter: [{ field: "id", operator: "eq", value: 1 }],
                    filters: {
                        initial: [
                            { field: "id", operator: "contains", value: "foo" },
                        ],
                    },
                }),
            {
                wrapper: TestWrapper({
                    routerProvider,
                }),
            },
        );

        expect(result.current.filters).toStrictEqual([
            { field: "id", operator: "contains", value: "foo" },
        ]);
    });

    it("`filters.permanent` should be prioritized over permanentFilter", async () => {
        const { result } = renderHook(
            () =>
                useTable({
                    permanentFilter: [
                        { field: "id", operator: "eq", value: 1 },
                    ],
                    filters: {
                        permanent: [
                            { field: "id", operator: "contains", value: "foo" },
                        ],
                    },
                }),
            {
                wrapper: TestWrapper({
                    routerProvider,
                }),
            },
        );

        expect(result.current.filters).toStrictEqual([
            { field: "id", operator: "contains", value: "foo" },
        ]);
    });

    it("`filters.defaultBehavior` should be prioritized over defaultSetFilterBehavior", async () => {
        const initialFilters = [
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
                    defaultSetFilterBehavior: "merge",
                    filters: {
                        initial: initialFilters,
                        defaultBehavior: "replace",
                    },
                }),
            {
                wrapper: TestWrapper({
                    routerProvider,
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(initialFilters);
        expect(result.current.filters).toHaveLength(1);

        act(() => {
            result.current.setFilters(newFilters);
        });

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(newFilters);
        expect(result.current.filters).toHaveLength(1);
    });

    it("`sorters.initial` should be prioritized over initialSorter", async () => {
        const { result } = renderHook(
            () =>
                useTable({
                    initialSorter: [{ field: "id", order: "asc" }],
                    sorters: {
                        initial: [{ field: "title", order: "desc" }],
                    },
                }),
            {
                wrapper: TestWrapper({
                    routerProvider,
                }),
            },
        );

        expect(result.current.sorters).toStrictEqual([
            { field: "title", order: "desc" },
        ]);
    });

    it("`sorters.permanent` should be prioritized over permanentSorter", async () => {
        const { result } = renderHook(
            () =>
                useTable({
                    permanentSorter: [{ field: "id", order: "asc" }],
                    sorters: {
                        permanent: [{ field: "title", order: "desc" }],
                    },
                }),
            {
                wrapper: TestWrapper({
                    routerProvider,
                }),
            },
        );

        expect(result.current.sorters).toStrictEqual([
            { field: "title", order: "desc" },
        ]);
    });

    it("pagination should be prioritized over initialCurrent and initialPageSize", async () => {
        const { result } = renderHook(
            () =>
                useTable({
                    initialCurrent: 10,
                    initialPageSize: 20,
                    pagination: {
                        current: 1,
                        pageSize: 10,
                    },
                }),
            {
                wrapper: TestWrapper({
                    routerProvider,
                }),
            },
        );

        expect(result.current.pageSize).toBe(10);
        expect(result.current.current).toBe(1);
    });

    it("when deprecated setSorter is called, it should update sorter and sorters", async () => {
        const { result } = renderHook(() => useTable({}), {
            wrapper: TestWrapper({
                routerProvider,
            }),
        });

        const sorters: CrudSorting = [{ field: "id", order: "asc" }];

        await act(async () => {
            result.current.setSorter(sorters);
        });

        expect(result.current.sorter).toStrictEqual(sorters);
        expect(result.current.sorters).toStrictEqual(sorters);
    });

    it("when setSorters is called, it should update deprecated sorter and sorters", async () => {
        const { result } = renderHook(() => useTable({}), {
            wrapper: TestWrapper({
                routerProvider,
            }),
        });

        const sorters: CrudSorting = [{ field: "id", order: "asc" }];

        await act(async () => {
            result.current.setSorters(sorters);
        });

        expect(result.current.sorter).toStrictEqual(sorters);
        expect(result.current.sorters).toStrictEqual(sorters);
    });
});

describe("useTable Filters", () => {
    const wrapper = TestWrapper({
        dataProvider: MockJSONServer,
        resources: [{ name: "posts" }],
        routerProvider,
    });

    it("should be empty initially", async () => {
        const { result } = renderHook(() => useTable(), {
            wrapper,
        });

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toHaveLength(0);
    });

    it("should only present permanentFilters initially", async () => {
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

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(permanentFilter);
        expect(result.current.filters).toHaveLength(1);
    });

    it("should only present initialFilters initially", async () => {
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
                    filters: {
                        initial: initialFilter,
                    },
                }),
            {
                wrapper,
            },
        );

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(initialFilter);
        expect(result.current.filters).toHaveLength(1);
    });

    it("should include both initial and permanent filters initially", async () => {
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
                    filters: {
                        initial: initialFilter,
                        permanent: permanentFilter,
                    },
                }),
            {
                wrapper,
            },
        );

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

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

    it("permanent filter should take precedence over initial filter", async () => {
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
                value: "foo",
            },
        ] as CrudFilters;

        const { result } = renderHook(
            () =>
                useTable({
                    filters: {
                        initial: initialFilter,
                        permanent: permanentFilter,
                    },
                }),
            {
                wrapper,
            },
        );

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(permanentFilter);
        expect(result.current.filters).toHaveLength(1);
    });

    it("[behavior=merge] should merge new filters with existing ones", async () => {
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
                    filters: {
                        initial: initialFilter,
                    },
                }),
            {
                wrapper,
            },
        );

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(initialFilter);
        expect(result.current.filters).toHaveLength(1);

        act(() => {
            result.current.setFilters(newFilters, "merge");
        });

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(
            expect.arrayContaining([...initialFilter, ...newFilters]),
        );
        expect(result.current.filters).toHaveLength(2);
    });

    it("[behavior=merge] permanent filter should not be overwritten", async () => {
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
                    filters: {
                        initial: initialFilter,
                        permanent: permanentFilter,
                    },
                }),
            {
                wrapper,
            },
        );

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(
            expect.arrayContaining([...initialFilter, ...permanentFilter]),
        );
        expect(result.current.filters).toHaveLength(2);

        act(() => {
            result.current.setFilters(newFilters, "merge");
        });

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(
            expect.arrayContaining([...initialFilter, ...permanentFilter]),
        );
        expect(result.current.filters).toHaveLength(2);
        // should not contain newFilters elements
        expect(result.current.filters).toEqual(
            expect.not.arrayContaining(newFilters),
        );
    });

    it("[behavior=merge] should merge new filters and remove duplicates", async () => {
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
                value: "foo",
            },
        ] as CrudFilters;

        const { result } = renderHook(
            () =>
                useTable({
                    filters: {
                        initial: initialFilter,
                        permanent: permanentFilter,
                    },
                }),
            {
                wrapper,
            },
        );

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual([
            ...initialFilter,
            ...permanentFilter,
        ]);
        expect(result.current.filters).toHaveLength(2);

        act(() => {
            result.current.setFilters(newFilters, "merge");
        });

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(
            expect.arrayContaining([...newFilters, ...permanentFilter]),
        );
        expect(result.current.filters).toHaveLength(2);
        // should not contain initialFilter elements
        expect(result.current.filters).toEqual(
            expect.not.arrayContaining(initialFilter),
        );
        // should contain newFilter elements
        expect(result.current.filters).toEqual(
            expect.arrayContaining(newFilters),
        );
    });

    it("[behavior=merge] should remove the filter when value is undefined/null", async () => {
        const initialFilter = [
            {
                field: "name",
                operator: "contains",
                value: "test",
            },
        ] as CrudFilters;

        const newFilters = [
            {
                field: "name",
                operator: "contains",
                value: undefined,
            },
        ] as CrudFilters;

        const { result } = renderHook(
            () =>
                useTable({
                    filters: {
                        initial: initialFilter,
                    },
                }),
            {
                wrapper,
            },
        );

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(initialFilter);
        expect(result.current.filters).toHaveLength(1);

        act(() => {
            result.current.setFilters(newFilters, "merge");
        });

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toHaveLength(0);
        // should not contain initialFilter elements
        expect(result.current.filters).toEqual(
            expect.not.arrayContaining(initialFilter),
        );
        // should contain newFilter elements
        expect(result.current.filters).toEqual(
            expect.not.arrayContaining(newFilters),
        );
    });

    it("[behavior=replace] should replace the existing filters with newFilters", async () => {
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
                    filters: {
                        initial: initialFilter,
                    },
                }),
            {
                wrapper,
            },
        );

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(initialFilter);
        expect(result.current.filters).toHaveLength(1);

        act(() => {
            result.current.setFilters(newFilters, "replace");
        });

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(newFilters);
        expect(result.current.filters).toHaveLength(1);
    });

    it("[behavior=replace] replace behavior should not overwrite permanent filters", async () => {
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
                    filters: {
                        initial: initialFilter,
                        permanent: permanentFilter,
                    },
                }),
            {
                wrapper,
            },
        );

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual([
            ...initialFilter,
            ...permanentFilter,
        ]);
        expect(result.current.filters).toHaveLength(2);

        act(() => {
            result.current.setFilters(newFilters, "replace");
        });

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(permanentFilter);
        // should not contain newFilters elements
        expect(result.current.filters).toEqual(
            expect.not.arrayContaining(newFilters),
        );
        // should not contain initialFilter elements (because of replace behavior)
        expect(result.current.filters).toEqual(
            expect.not.arrayContaining(initialFilter),
        );
    });

    it("[behavior=replace] should remove duplicates in the newFilters array", async () => {
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
                value: "this-should-be-in-it",
            },
            {
                field: "name",
                operator: "contains",
                value: "foo",
            },
        ] as CrudFilters;

        const { result } = renderHook(
            () =>
                useTable({
                    filters: {
                        initial: initialFilter,
                    },
                }),
            {
                wrapper,
            },
        );

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(initialFilter);
        expect(result.current.filters).toHaveLength(1);

        act(() => {
            result.current.setFilters(newFilters, "replace");
        });

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(
            expect.arrayContaining([newFilters[0], newFilters[1]]),
        );
        expect(result.current.filters).toHaveLength(2);

        // should not contain initialFilter elements
        expect(result.current.filters).toEqual(
            expect.not.arrayContaining(initialFilter),
        );

        // item at index = 2 should be ignored because of index = 1
        expect(result.current.filters).toEqual(
            expect.not.arrayContaining([newFilters[2]]),
        );
    });

    it("should use behavior = merge (default) by default", async () => {
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
                    filters: {
                        initial: initialFilter,
                    },
                }),
            {
                wrapper,
            },
        );

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(initialFilter);
        expect(result.current.filters).toHaveLength(1);

        act(() => {
            result.current.setFilters(newFilters);
        });

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(
            expect.arrayContaining([...initialFilter, ...newFilters]),
        );
        expect(result.current.filters).toHaveLength(2);
    });

    it("should use `defaultSetFiltersBehavior` property as default behavior (replace)", async () => {
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
                    filters: {
                        initial: initialFilter,
                        defaultBehavior: "replace",
                    },
                }),
            {
                wrapper,
            },
        );

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(initialFilter);
        expect(result.current.filters).toHaveLength(1);

        act(() => {
            result.current.setFilters(newFilters);
        });

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(newFilters);
        expect(result.current.filters).toHaveLength(1);
    });

    it("[setter function] should set the return value of the setter function as filters", async () => {
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
                    filters: {
                        initial: initialFilter,
                    },
                }),
            {
                wrapper,
            },
        );

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(initialFilter);
        expect(result.current.filters).toHaveLength(1);

        act(() => {
            result.current.setFilters(() => newFilters);
        });

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(newFilters);
        expect(result.current.filters).toHaveLength(1);
    });

    it("[setter function] should pass the existing filters as first argument", async () => {
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
                    filters: {
                        initial: initialFilter,
                    },
                }),
            {
                wrapper,
            },
        );

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(initialFilter);
        expect(result.current.filters).toHaveLength(1);

        const setterFunction = jest.fn(
            (prevFilters) => [...prevFilters, ...newFilters] as CrudFilters,
        );

        act(() => {
            result.current.setFilters(setterFunction);
        });

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(setterFunction).toBeCalledTimes(1);
        expect(setterFunction).toBeCalledWith(initialFilter);

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(
            expect.arrayContaining([...initialFilter, ...newFilters]),
        );
        expect(result.current.filters).toHaveLength(2);
    });

    it("[setter function] should not be able to overwrite permanent filters", async () => {
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
                value: 3,
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
                    filters: {
                        initial: initialFilter,
                        permanent: permanentFilter,
                    },
                }),
            {
                wrapper,
            },
        );

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(
            expect.arrayContaining([...initialFilter, ...permanentFilter]),
        );
        expect(result.current.filters).toHaveLength(2);

        act(() => {
            result.current.setFilters(() => newFilters);
        });

        await waitFor(() => {
            expect(result.current.tableQueryResult.isSuccess).toBeTruthy();
        });

        expect(result.current.filters).toBeInstanceOf(Array);
        expect(result.current.filters).toEqual(
            expect.arrayContaining(permanentFilter),
        );
        expect(result.current.filters).toEqual(
            expect.not.arrayContaining(newFilters),
        );
        expect(result.current.filters).toEqual(
            expect.not.arrayContaining(initialFilter),
        );
        expect(result.current.filters).toHaveLength(1);
    });

    it("should pass meta from resource defination, hook parameter and query parameters to dataProvider", async () => {
        const getListMock = jest.fn();

        renderHook(
            () => useTable({ resource: "posts", meta: { foo: "bar" } }),
            {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            getList: getListMock,
                        },
                    },
                    routerProvider: mockRouterBindings({
                        resource: { name: "posts" },
                        params: { baz: "qux" },
                    }),
                    resources: [{ name: "posts", meta: { dip: "dop" } }],
                }),
            },
        );

        await waitFor(() => {
            expect(getListMock).toBeCalled();
        });

        expect(getListMock).toBeCalledWith(
            expect.objectContaining({
                meta: expect.objectContaining({
                    foo: "bar",
                    baz: "qux",
                    dip: "dop",
                }),
            }),
        );
    });

    it("two resources with same name, should pass resource meta according to identifier", async () => {
        const getListMock = jest.fn();

        renderHook(() => useTable({ resource: "recentPosts" }), {
            wrapper: TestWrapper({
                dataProvider: {
                    default: {
                        ...MockJSONServer.default,
                        getList: getListMock,
                    },
                },
                routerProvider: mockRouterBindings({
                    resource: { name: "posts" },
                }),
                resources: [
                    {
                        name: "posts",
                        identifier: "recentPosts",
                        meta: {
                            startDate: "2021-01-01",
                        },
                    },
                    {
                        name: "posts",
                        identifier: "popularPosts",
                        meta: {
                            likes: 100,
                        },
                    },
                ],
            }),
        });

        await waitFor(() => {
            expect(getListMock).toBeCalled();
        });

        expect(getListMock).toBeCalledWith(
            expect.objectContaining({
                meta: expect.objectContaining({
                    startDate: "2021-01-01",
                }),
            }),
        );

        expect(getListMock).not.toBeCalledWith(
            expect.objectContaining({
                meta: expect.objectContaining({
                    likes: 100,
                }),
            }),
        );
    });
});
