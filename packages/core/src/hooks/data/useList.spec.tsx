import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper } from "@test";

import { useList } from "./useList";
import { defaultRefineOptions } from "@contexts/refine";
import { IRefineContextProvider } from "../../interfaces";

const mockRefineProvider: IRefineContextProvider = {
    hasDashboard: false,
    ...defaultRefineOptions,
    options: defaultRefineOptions,
};

describe("useList Hook", () => {
    it("with rest json server", async () => {
        const { result } = renderHook(() => useList({ resource: "posts" }), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        const { data } = result.current;

        expect(data?.data).toHaveLength(2);
        expect(data?.total).toEqual(2);
    });

    it.each(["server", undefined] as const)(
        "should include pagination in queryKey",
        async (mode) => {
            const getListMock = jest.fn();

            renderHook(
                () =>
                    useList({
                        resource: "posts",
                        pagination: {
                            current: 1,
                            pageSize: 10,
                            mode,
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

            expect(getListMock).toBeCalledWith({
                resource: "posts",
                pagination: {
                    current: 1,
                    pageSize: 10,
                    mode,
                },
                metaData: {
                    queryContext: {
                        queryKey: [
                            "default",
                            "posts",
                            "list",
                            {
                                pagination: {
                                    current: 1,
                                    pageSize: 10,
                                    mode,
                                },
                            },
                        ],
                        signal: new AbortController().signal,
                    },
                },
            });
        },
    );

    it.each(["client", "off"] as const)(
        "should not include pagination in queryKey",
        async (mode) => {
            const getListMock = jest.fn();

            renderHook(
                () =>
                    useList({
                        resource: "posts",
                        pagination: {
                            current: 1,
                            pageSize: 10,
                            mode,
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

            expect(getListMock).toBeCalledWith({
                resource: "posts",
                pagination: {
                    current: 1,
                    pageSize: 10,
                    mode,
                },
                metaData: {
                    queryContext: {
                        queryKey: ["default", "posts", "list", {}],
                        signal: new AbortController().signal,
                    },
                },
            });
        },
    );

    describe("useResourceSubscription", () => {
        it("useSubscription", async () => {
            const onSubscribeMock = jest.fn();

            const { result } = renderHook(
                () =>
                    useList({
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
                    useList({
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
                () => useList({ resource: "posts", liveMode: "auto" }),
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
                    useList({
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
