import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockRouterBindings } from "@test";

import { useOne } from "./useOne";
import { defaultRefineOptions } from "@contexts/refine";
import { IRefineContextProvider } from "../../interfaces";

const mockRefineProvider: IRefineContextProvider = {
    hasDashboard: false,
    ...defaultRefineOptions,
    options: defaultRefineOptions,
};

describe("useOne Hook", () => {
    it("with rest json server", async () => {
        const { result } = renderHook(
            () => useOne({ resource: "posts", id: "1" }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        await waitFor(() => {
            expect(!result.current.isLoading).toBeTruthy();
        });

        const { status, data } = result.current;

        expect(status).toBe("success");
        expect(data?.data.slug).toBe("ut-ad-et");
    });

    it("should only pass meta from the hook parameter and query parameters to the dataProvider", async () => {
        const getOneMock = jest.fn();

        renderHook(
            () => useOne({ resource: "posts", meta: { foo: "bar" }, id: "" }),
            {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            getOne: getOneMock,
                        },
                    },
                    routerProvider: mockRouterBindings({
                        params: { baz: "qux" },
                    }),
                    resources: [{ name: "posts", meta: { dip: "dop" } }],
                }),
            },
        );

        await waitFor(() => {
            expect(getOneMock).toBeCalled();
        });

        expect(getOneMock).toBeCalledWith(
            expect.objectContaining({
                meta: expect.objectContaining({
                    foo: "bar",
                    baz: "qux",
                }),
            }),
        );
    });

    describe("useResourceSubscription", () => {
        it("useSubscription", async () => {
            const onSubscribeMock = jest.fn();

            const { result } = renderHook(
                () => useOne({ resource: "posts", id: "1" }),
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
                expect(!result.current.isLoading).toBeTruthy();
            });

            expect(onSubscribeMock).toBeCalled();
            expect(onSubscribeMock).toHaveBeenCalledWith({
                channel: "resources/posts",
                callback: expect.any(Function),
                params: expect.objectContaining({
                    ids: ["1"],
                    id: "1",
                    resource: "posts",
                    subscriptionType: "useOne",
                }),
                types: ["*"],
            });
        });

        it("liveMode = Off useSubscription", async () => {
            const onSubscribeMock = jest.fn();

            const { result } = renderHook(
                () => useOne({ resource: "posts", id: "1" }),
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
                expect(!result.current.isLoading).toBeTruthy();
            });

            expect(onSubscribeMock).not.toBeCalled();
        });

        it("liveMode = Off and liveMode hook param auto", async () => {
            const onSubscribeMock = jest.fn();

            const { result } = renderHook(
                () => useOne({ resource: "posts", id: "1", liveMode: "auto" }),
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
                expect(!result.current.isLoading).toBeTruthy();
            });

            expect(onSubscribeMock).toBeCalled();
        });

        it("unsubscribe call on unmount", async () => {
            const onSubscribeMock = jest.fn(() => true);
            const onUnsubscribeMock = jest.fn();

            const { result, unmount } = renderHook(
                () => useOne({ resource: "posts", id: "1" }),
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
                expect(!result.current.isLoading).toBeTruthy();
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
                    useOne({
                        resource: "posts",
                        id: "1",
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

        describe("useNotification", () => {
            it("should call `open` from the notification provider on error", async () => {
                const getOneMock = jest
                    .fn()
                    .mockRejectedValue(new Error("Error"));
                const notificationMock = jest.fn();

                const { result } = renderHook(
                    () =>
                        useOne({
                            resource: "posts",
                            id: "1",
                        }),
                    {
                        wrapper: TestWrapper({
                            dataProvider: {
                                default: {
                                    ...MockJSONServer.default,
                                    getOne: getOneMock,
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
                    key: "1-posts-getOne-notification",
                    message: "Error (status code: undefined)",
                    type: "error",
                });
            });

            it("should call `open` from notification provider on success with custom notification params", async () => {
                const openNotificationMock = jest.fn();

                const { result } = renderHook(
                    () =>
                        useOne({
                            resource: "posts",
                            id: "1",
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
                const getOneMock = jest
                    .fn()
                    .mockRejectedValue(new Error("Error"));
                const openNotificationMock = jest.fn();

                const { result } = renderHook(
                    () =>
                        useOne({
                            resource: "posts",
                            id: "1",
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
                                    getOne: getOneMock,
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
                const getOneMock = jest
                    .fn()
                    .mockRejectedValue(new Error("Error"));
                const onErrorMock = jest.fn();

                const { result } = renderHook(
                    () =>
                        useOne({
                            resource: "posts",
                            id: "1",
                        }),
                    {
                        wrapper: TestWrapper({
                            dataProvider: {
                                default: {
                                    ...MockJSONServer.default,
                                    getOne: getOneMock,
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
                const getOneMock = jest
                    .fn()
                    .mockRejectedValue(new Error("Error"));
                const onErrorMock = jest.fn();

                const { result } = renderHook(
                    () =>
                        useOne({
                            resource: "posts",
                            id: "1",
                        }),
                    {
                        wrapper: TestWrapper({
                            dataProvider: {
                                default: {
                                    ...MockJSONServer.default,
                                    getOne: getOneMock,
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
                const getOneMock = jest.fn().mockResolvedValue({
                    data: [{ id: 1, title: "foo" }],
                });

                const { result } = renderHook(
                    () =>
                        useOne({
                            resource: "posts",
                            id: "1",
                            queryOptions: {
                                onSuccess: onSuccessMock,
                            },
                        }),
                    {
                        wrapper: TestWrapper({
                            dataProvider: {
                                default: {
                                    ...MockJSONServer.default,
                                    getOne: getOneMock,
                                },
                            },
                            resources: [{ name: "posts" }],
                        }),
                    },
                );

                await waitFor(() => {
                    expect(result.current.isSuccess).toBeTruthy();
                });

                expect(onSuccessMock).toBeCalledWith({
                    data: [{ id: 1, title: "foo" }],
                });
            });

            it("should run `queryOptions.onError` callback on error", async () => {
                const onErrorMock = jest.fn();
                const getOneMcok = jest
                    .fn()
                    .mockRejectedValue(new Error("Error"));

                const { result } = renderHook(
                    () =>
                        useOne({
                            resource: "posts",
                            id: "1",
                            queryOptions: {
                                onError: onErrorMock,
                            },
                        }),
                    {
                        wrapper: TestWrapper({
                            dataProvider: {
                                default: {
                                    ...MockJSONServer.default,
                                    getOne: getOneMcok,
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
    });
});
