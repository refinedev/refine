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
                params: {
                    filters: undefined,
                    hasPagination: undefined,
                    meta: undefined,
                    metaData: undefined,
                    pagination: undefined,
                    resource: "posts",
                    sort: undefined,
                    subscriptionType: "useList",
                },
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
    });
});
