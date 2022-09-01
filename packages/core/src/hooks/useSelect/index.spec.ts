import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper, act } from "@test";

import { useSelect } from "./";
import {
    CrudFilters,
    IDataContext,
    IDataMultipleContextProvider,
} from "../../interfaces";

describe("useSelect Hook", () => {
    it("default", async () => {
        const { result } = renderHook(
            () =>
                useSelect({
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
            expect(result.current.queryResult.isSuccess).toBeTruthy();
        });

        const { options } = result.current;

        expect(options).toHaveLength(2);
        expect(options).toEqual([
            {
                label: "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
                value: "1",
            },
            { label: "Recusandae consectetur aut atque est.", value: "2" },
        ]);
    });

    it("with nested optionLabel", async () => {
        const { result } = renderHook(
            () =>
                useSelect({
                    resource: "posts",
                    optionLabel: "nested.title",
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.queryResult.isSuccess).toBeTruthy();
        });

        const { options } = result.current;

        expect(options).toHaveLength(2);
        expect(options).toEqual([
            {
                label: "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
                value: "1",
            },
            { label: "Recusandae consectetur aut atque est.", value: "2" },
        ]);
    });

    it("defaultValue", async () => {
        const { result } = renderHook(
            () =>
                useSelect({
                    resource: "posts",
                    defaultValue: ["1", "2", "3", "4"],
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer.default,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.queryResult.isSuccess).toBeTruthy();
        });

        const { options } = result.current;

        expect(options).toHaveLength(2);
        expect(options).toEqual([
            {
                label: "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
                value: "1",
            },
            { label: "Recusandae consectetur aut atque est.", value: "2" },
        ]);
    });

    it("defaultValue is not an array", async () => {
        const { result } = renderHook(
            () =>
                useSelect({
                    resource: "posts",
                    defaultValue: "1",
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.queryResult.isSuccess).toBeTruthy();
        });

        const { options } = result.current;

        expect(options).toHaveLength(2);
        expect(options).toEqual([
            {
                label: "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
                value: "1",
            },
            { label: "Recusandae consectetur aut atque est.", value: "2" },
        ]);
    });

    it("should success data with resource with optionLabel and optionValue", async () => {
        const { result } = renderHook(
            () =>
                useSelect<{ id: string; slug: string }>({
                    resource: "posts",
                    optionLabel: "slug",
                    optionValue: "id",
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.queryResult.isSuccess).toBeTruthy();
        });

        const { options } = result.current;

        expect(options).toHaveLength(2);
        expect(options).toEqual([
            { label: "ut-ad-et", value: "1" },
            { label: "consequatur-molestiae-rerum", value: "2" },
        ]);
    });

    it("should success data with resource with filters", async () => {
        const { result } = renderHook(
            () =>
                useSelect<{ id: string; slug: string }>({
                    resource: "posts",
                    filters: [
                        {
                            field: "slug",
                            operator: "ncontains",
                            value: "test",
                        },
                    ],
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.queryResult.isSuccess).toBeTruthy();
        });

        const { options } = result.current;

        expect(options).toHaveLength(2);
        expect(options).toEqual([
            {
                label: "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
                value: "1",
            },
            { label: "Recusandae consectetur aut atque est.", value: "2" },
        ]);
    });

    it("onSearch debounce with default value (300ms)", async () => {
        jest.useFakeTimers();
        const getListMock = jest.fn(() =>
            Promise.resolve({ data: [], total: 0 }),
        );
        const { result } = renderHook(
            () =>
                useSelect({
                    resource: "posts",
                    debounce: 300,
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default!,
                            getList: getListMock,
                        },
                    },
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.queryResult.isSuccess).toBeTruthy();
        });

        expect(getListMock).toBeCalledTimes(1);

        const { onSearch } = result.current;

        onSearch("1");
        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        onSearch("1");
        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        onSearch("1");
        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(getListMock).toBeCalledTimes(2);

        await waitFor(() => {
            expect(result.current.queryResult.isSuccess).toBeTruthy();
        });
    });

    it("onSearch disabled debounce (0ms)", async () => {
        jest.useFakeTimers();
        const getListMock = jest.fn(() => {
            return Promise.resolve({ data: [], total: 0 });
        });
        const { result } = renderHook(
            () =>
                useSelect({
                    resource: "posts",
                    debounce: 0,
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            getList: getListMock,
                        },
                    } as any,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.queryResult.isSuccess).toBeTruthy();
        });

        expect(getListMock).toBeCalledTimes(1);

        const { onSearch } = result.current;

        onSearch("1");

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        onSearch("2");
        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        onSearch("3");
        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        expect(getListMock).toBeCalledTimes(4);

        await waitFor(() => {
            expect(result.current.queryResult.isSuccess).toBeTruthy();
        });
    });

    it("should invoke queryOptions methods successfully", async () => {
        const mockFunc = jest.fn();

        const { result } = renderHook(
            () =>
                useSelect({
                    resource: "posts",
                    queryOptions: {
                        onSuccess: () => {
                            mockFunc();
                        },
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
            expect(result.current.queryResult.isSuccess).toBeTruthy();
        });

        const { options } = result.current;

        expect(options).toHaveLength(2);
        expect(options).toEqual([
            {
                label: "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
                value: "1",
            },
            { label: "Recusandae consectetur aut atque est.", value: "2" },
        ]);

        expect(mockFunc).toBeCalled();
    });

    it("should invoke queryOptions methods for defaultValue and default query successfully", async () => {
        const mockFunc = jest.fn();

        const { result } = renderHook(
            () =>
                useSelect({
                    resource: "posts",
                    queryOptions: {
                        onSuccess: () => {
                            mockFunc();
                        },
                    },
                    defaultValue: [1],
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.queryResult.isSuccess).toBeTruthy();
        });

        const { options } = result.current;

        expect(options).toHaveLength(2);
        expect(options).toEqual([
            {
                label: "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
                value: "1",
            },
            { label: "Recusandae consectetur aut atque est.", value: "2" },
        ]);

        // for init call and defaultValue
        expect(mockFunc).toBeCalledTimes(2);
    });

    it("should invoke queryOptions methods for default value successfully", async () => {
        const mockFunc = jest.fn();

        const { result } = renderHook(
            () =>
                useSelect({
                    resource: "posts",
                    defaultValue: ["1", "2", "3", "4"],
                    defaultValueQueryOptions: {
                        onSuccess: () => {
                            mockFunc();
                        },
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
            expect(result.current.queryResult.isSuccess).toBeTruthy();
        });

        const { options } = result.current;

        expect(options).toHaveLength(2);
        expect(options).toEqual([
            {
                label: "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
                value: "1",
            },
            { label: "Recusandae consectetur aut atque est.", value: "2" },
        ]);
        expect(mockFunc).toBeCalled();
    });

    it("should use fetchSize option as pageSize when fetching list", async () => {
        const posts = [
            {
                id: "1",
                title: "Post 1",
            },
            {
                id: "2",
                title: "Post 2",
            },
        ];

        const mockDataProvider = {
            default: {
                ...MockJSONServer.default,
                getList: jest.fn(() =>
                    Promise.resolve({ data: posts, total: 2 }),
                ),
                getMany: jest.fn(() => Promise.resolve({ data: [...posts] })),
            },
        } as IDataMultipleContextProvider;

        renderHook(
            () =>
                useSelect({
                    resource: "posts",
                    defaultValue: ["1", "2"],
                    fetchSize: 20,
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: mockDataProvider as unknown as IDataContext,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        await act(() => {});

        expect(mockDataProvider.default?.getList).toHaveBeenCalledWith({
            filters: [],
            pagination: { pageSize: 20 },
            resource: "posts",
            metaData: {
                queryContext: {
                    queryKey: [
                        "default",
                        "posts",
                        "list",
                        {
                            filters: [],
                            pagination: {
                                pageSize: 20,
                            },
                        },
                    ],
                    signal: new AbortController().signal,
                },
            },
        });
    });

    it("should use onSearch option to get filters", async () => {
        jest.useFakeTimers();
        const posts = [
            {
                id: "1",
                title: "Post 1",
            },
            {
                id: "2",
                title: "Post 2",
            },
        ];

        const mockDataProvider = {
            default: {
                ...MockJSONServer.default,
                getList: jest.fn(() =>
                    Promise.resolve({ data: posts, total: 2 }),
                ),
                getMany: jest.fn(() => Promise.resolve({ data: [...posts] })),
            },
        } as IDataMultipleContextProvider;

        const filters: CrudFilters = [
            {
                field: "field",
                operator: "lt",
                value: "value",
            },
        ];

        const { result } = renderHook(
            () =>
                useSelect({
                    resource: "posts",
                    defaultValue: ["1", "2"],
                    onSearch: () => filters,
                }),
            {
                wrapper: TestWrapper({
                    dataProvider:
                        mockDataProvider as unknown as IDataMultipleContextProvider,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        const { onSearch } = result.current;

        expect(mockDataProvider.default?.getList).toHaveBeenCalledWith({
            filters: [],
            resource: "posts",
            metaData: {
                queryContext: {
                    queryKey: [
                        "default",
                        "posts",
                        "list",
                        {
                            filters: [],
                        },
                    ],
                    signal: new AbortController().signal,
                },
            },
        });

        await act(async () => {
            onSearch("1");
        });

        await act(async () => {
            jest.advanceTimersToNextTimer(1);
        });

        await waitFor(() => {
            expect(mockDataProvider.default?.getList).toHaveBeenCalledWith({
                filters,
                resource: "posts",
                metaData: {
                    queryContext: {
                        queryKey: [
                            "default",
                            "posts",
                            "list",
                            {
                                filters,
                            },
                        ],
                        signal: new AbortController().signal,
                    },
                },
            });
        });
    });
});
