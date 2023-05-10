import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper } from "@test";

import { useInfiniteList } from "./useInfiniteList";
import { defaultRefineOptions } from "@contexts/refine";
import {
    IDataMultipleContextProvider,
    IRefineContextProvider,
} from "../../interfaces";

const mockRefineProvider: IRefineContextProvider = {
    hasDashboard: false,
    ...defaultRefineOptions,
    options: defaultRefineOptions,
};

describe("useInfiniteList Hook", () => {
    it("with rest json server", async () => {
        const { result } = renderHook(
            () => useInfiniteList({ resource: "posts" }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        const { data } = result.current;

        expect(data?.pages).toHaveLength(1);
        expect(data?.pages[0].data).toHaveLength(2);
        expect(data?.pages[0].total).toEqual(2);
    });

    it("hasNextPage is truthy", async () => {
        const { result } = renderHook(
            () =>
                useInfiniteList({
                    resource: "posts",
                    pagination: {
                        pageSize: 1,
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
            expect(result.current.isSuccess).toBeTruthy();
        });

        const { hasNextPage } = result.current;
        expect(hasNextPage).toBeTruthy();
    });

    it("cursor has next", async () => {
        const mockDataProvider = {
            default: {
                ...MockJSONServer.default,
                getList: async () => {
                    return {
                        data: [
                            {
                                title: "title1",
                            },
                        ],
                        total: 0,
                        cursor: {
                            next: undefined,
                        },
                    };
                },
            },
        } as IDataMultipleContextProvider;

        const { result } = renderHook(
            () =>
                useInfiniteList({
                    resource: "posts",
                    pagination: {
                        pageSize: 1,
                    },
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: mockDataProvider,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.isSuccess).toBeFalsy();
        });

        const { hasNextPage } = result.current;
        expect(hasNextPage).toBeUndefined();
    });

    describe("useResourceSubscription", () => {
        it("useSubscription", async () => {
            const onSubscribeMock = jest.fn();

            const { result } = renderHook(
                () =>
                    useInfiniteList({
                        resource: "posts",
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [{ name: "posts" }],
                        liveProvider: {
                            unsubscribe: jest.fn(),
                            subscribe: onSubscribeMock,
                        },
                        refineProvider: {
                            ...mockRefineProvider,
                            liveMode: "auto",
                        },
                    }),
                },
            );

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(onSubscribeMock).toBeCalled();
            expect(onSubscribeMock).toHaveBeenCalledWith({
                channel: "resources/posts",
                callback: expect.any(Function),
                params: expect.objectContaining({
                    hasPagination: true,
                    pagination: {
                        current: 1,
                        pageSize: 10,
                        mode: "server",
                    },
                    resource: "posts",
                    subscriptionType: "useList",
                }),
                types: ["*"],
            });
        });

        it("liveMode = Off useSubscription", async () => {
            const onSubscribeMock = jest.fn();

            const { result } = renderHook(
                () =>
                    useInfiniteList({
                        resource: "posts",
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [{ name: "posts" }],
                        liveProvider: {
                            unsubscribe: jest.fn(),
                            subscribe: onSubscribeMock,
                        },
                        refineProvider: {
                            ...mockRefineProvider,
                            liveMode: "off",
                        },
                    }),
                },
            );

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(onSubscribeMock).not.toBeCalled();
        });

        it("liveMode = Off and liveMode hook param auto", async () => {
            const onSubscribeMock = jest.fn();

            const { result } = renderHook(
                () => useInfiniteList({ resource: "posts", liveMode: "auto" }),
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [{ name: "posts" }],
                        liveProvider: {
                            unsubscribe: jest.fn(),
                            subscribe: onSubscribeMock,
                        },
                        refineProvider: {
                            ...mockRefineProvider,
                            liveMode: "off",
                        },
                    }),
                },
            );

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(onSubscribeMock).toBeCalled();
        });

        it("unsubscribe call on unmount", async () => {
            const onSubscribeMock = jest.fn(() => true);
            const onUnsubscribeMock = jest.fn();

            const { result, unmount } = renderHook(
                () =>
                    useInfiniteList({
                        resource: "posts",
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [{ name: "posts" }],
                        liveProvider: {
                            unsubscribe: onUnsubscribeMock,
                            subscribe: onSubscribeMock,
                        },
                        refineProvider: {
                            ...mockRefineProvider,
                            liveMode: "auto",
                        },
                    }),
                },
            );

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(onSubscribeMock).toBeCalled();

            unmount();
            expect(onUnsubscribeMock).toBeCalledWith(true);
            expect(onUnsubscribeMock).toBeCalledTimes(1);
        });

        it("should not subscribe if `queryOptions.enabled` is false", async () => {
            const onSubscribeMock = jest.fn();

            renderHook(
                () =>
                    useInfiniteList({
                        resource: "posts",
                        queryOptions: {
                            enabled: false,
                        },
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [{ name: "posts" }],
                        liveProvider: {
                            unsubscribe: jest.fn(),
                            subscribe: onSubscribeMock,
                        },
                        refineProvider: {
                            ...mockRefineProvider,
                            liveMode: "auto",
                        },
                    }),
                },
            );

            expect(onSubscribeMock).not.toBeCalled();
        });
    });

    describe("useNotification", () => {
        it("should call `open` from the notification provider on error", async () => {
            const getListMock = jest.fn().mockRejectedValue(new Error("Error"));
            const notificationMock = jest.fn();

            const { result } = renderHook(
                () =>
                    useInfiniteList({
                        resource: "posts",
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            default: {
                                ...MockJSONServer.default,
                                getList: getListMock,
                            },
                        },
                        notificationProvider: {
                            open: notificationMock,
                        },
                        resources: [{ name: "posts" }],
                    }),
                },
            );

            await waitFor(() => {
                expect(result.current.isError).toBeTruthy();
            });

            expect(notificationMock).toBeCalledWith({
                description: "Error",
                key: "posts-useInfiniteList-notification",
                message: "Error (status code: undefined)",
                type: "error",
            });
        });

        it("should call `open` from notification provider on success with custom notification params", async () => {
            const openNotificationMock = jest.fn();

            const { result } = renderHook(
                () =>
                    useInfiniteList({
                        resource: "posts",
                        successNotification: () => ({
                            message: "Success",
                            description: "Successfully created post",
                            type: "success",
                        }),
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        notificationProvider: {
                            open: openNotificationMock,
                        },
                        resources: [{ name: "posts" }],
                    }),
                },
            );

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(openNotificationMock).toBeCalledWith({
                description: "Successfully created post",
                message: "Success",
                type: "success",
            });
        });

        it("should call `open` from notification provider on error with custom notification params", async () => {
            const getListMock = jest.fn().mockRejectedValue(new Error("Error"));
            const openNotificationMock = jest.fn();

            const { result } = renderHook(
                () =>
                    useInfiniteList({
                        resource: "posts",
                        errorNotification: () => ({
                            message: "Error",
                            description: "There was an error creating post",
                            type: "error",
                        }),
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            default: {
                                ...MockJSONServer.default,
                                getList: getListMock,
                            },
                        },
                        notificationProvider: {
                            open: openNotificationMock,
                        },
                        resources: [{ name: "posts" }],
                    }),
                },
            );

            await waitFor(() => {
                expect(result.current.isError).toBeTruthy();
            });

            expect(openNotificationMock).toBeCalledWith({
                description: "There was an error creating post",
                message: "Error",
                type: "error",
            });
        });
    });

    describe("useOnError", () => {
        it("should call `onError` from the auth provider on error", async () => {
            const getListMock = jest.fn().mockRejectedValue(new Error("Error"));
            const onErrorMock = jest.fn();

            const { result } = renderHook(
                () =>
                    useInfiniteList({
                        resource: "posts",
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            default: {
                                ...MockJSONServer.default,
                                getList: getListMock,
                            },
                        },
                        authProvider: {
                            onError: onErrorMock,
                        } as any,
                        resources: [{ name: "posts" }],
                    }),
                },
            );

            await waitFor(() => {
                expect(result.current.isError).toBeTruthy();
            });

            expect(onErrorMock).toBeCalledWith(new Error("Error"));
        });

        it("should call `checkError` from the legacy auth provider on error", async () => {
            const getListMock = jest.fn().mockRejectedValue(new Error("Error"));
            const onErrorMock = jest.fn();

            const { result } = renderHook(
                () =>
                    useInfiniteList({
                        resource: "posts",
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            default: {
                                ...MockJSONServer.default,
                                getList: getListMock,
                            },
                        },
                        legacyAuthProvider: {
                            checkError: onErrorMock,
                        },
                        resources: [{ name: "posts" }],
                    }),
                },
            );

            await waitFor(() => {
                expect(result.current.isError).toBeTruthy();
            });

            expect(onErrorMock).toBeCalledWith(new Error("Error"));
        });
    });

    describe("queryOptions", () => {
        it("should run `queryOptions.onSuccess` callback on success", async () => {
            const onSuccessMock = jest.fn();
            const getListMock = jest.fn().mockResolvedValue({
                data: [{ id: 1, title: "foo" }],
            });

            const { result } = renderHook(
                () =>
                    useInfiniteList({
                        resource: "posts",
                        queryOptions: {
                            onSuccess: onSuccessMock,
                        },
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            default: {
                                ...MockJSONServer.default,
                                getList: getListMock,
                            },
                        },
                        resources: [{ name: "posts" }],
                    }),
                },
            );

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(onSuccessMock).toBeCalledWith(
                expect.objectContaining({
                    pages: [
                        {
                            data: [{ id: 1, title: "foo" }],
                            pagination: {
                                mode: "server",
                                pageSize: 10,
                            },
                        },
                    ],
                }),
            );
        });

        it("should run `queryOptions.onError` callback on error", async () => {
            const onErrorMock = jest.fn();
            const getListMcok = jest.fn().mockRejectedValue(new Error("Error"));

            const { result } = renderHook(
                () =>
                    useInfiniteList({
                        resource: "posts",
                        queryOptions: {
                            onError: onErrorMock,
                        },
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            default: {
                                ...MockJSONServer.default,
                                getList: getListMcok,
                            },
                        },
                        resources: [{ name: "posts" }],
                    }),
                },
            );

            await waitFor(() => {
                expect(result.current.isError).toBeTruthy();
            });

            expect(onErrorMock).toBeCalledWith(new Error("Error"));
        });
    });

    it("should support deprecated `config` property", async () => {
        const getListMock = jest.fn().mockResolvedValue({
            data: [{ id: 1, title: "foo" }],
        });

        const { result } = renderHook(
            () =>
                useInfiniteList({
                    resource: "posts",
                    config: {
                        filters: [{ field: "id", operator: "eq", value: 1 }],
                        hasPagination: false,
                        pagination: {
                            mode: "client",
                            current: 10,
                            pageSize: 5,
                        },
                        sort: [{ field: "id", order: "asc" }],
                    },
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            getList: getListMock,
                        },
                    },
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(getListMock).toBeCalledWith(
            expect.objectContaining({
                filters: [{ field: "id", operator: "eq", value: 1 }],
                hasPagination: false,
                pagination: {
                    mode: "off",
                    pageSize: 5,
                },
                sort: [{ field: "id", order: "asc" }],
            }),
        );
    });
});
