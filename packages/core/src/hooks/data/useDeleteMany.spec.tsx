import { act, renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockRouterBindings } from "@test";

import { useDeleteMany } from "./useDeleteMany";
import * as UseInvalidate from "../invalidate/index";
import { useList } from "./useList";

describe("useDeleteMany Hook", () => {
    it("should works with pessimistic update", async () => {
        const { result } = renderHook(() => useDeleteMany(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        result.current.mutate({
            resource: "posts",
            ids: ["1"],
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        const { isSuccess } = result.current;

        expect(isSuccess).toBeTruthy();
    });

    it("should works with optimistic update", async () => {
        const { result } = renderHook(() => useDeleteMany(), {
            wrapper: TestWrapper({
                dataProvider: {
                    ...MockJSONServer.default,
                    deleteMany: () => {
                        return new Promise((res, rej) => {
                            setTimeout(() => rej(), 1000);
                        });
                    },
                },
                resources: [{ name: "posts" }],
            }),
        });

        const { result: useListResult } = renderHook(
            () =>
                useList({
                    resource: "posts",
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                }),
            },
        );

        await waitFor(() => {
            expect(useListResult.current.data?.data).toHaveLength(2);
        });

        act(() => {
            result.current.mutate({
                resource: "posts",
                mutationMode: "optimistic",
                ids: ["1", "2"],
            });
        });

        await waitFor(() => {
            expect(useListResult.current.data?.data).toHaveLength(0);
        });

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });

        await waitFor(() => {
            expect(useListResult.current.data?.data).toHaveLength(2);
        });
    });

    it("should works with undoable update", async () => {
        const { result } = renderHook(() => useDeleteMany(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        result.current.mutate({
            resource: "posts",
            mutationMode: "undoable",
            undoableTimeout: 0,
            ids: ["1"],
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        const { isSuccess } = result.current;

        expect(isSuccess).toBeTruthy();
    });

    it("should only pass meta from the hook parameter and query parameters to the dataProvider", async () => {
        const deleteManyMock = jest.fn();

        const { result } = renderHook(() => useDeleteMany(), {
            wrapper: TestWrapper({
                dataProvider: {
                    default: {
                        ...MockJSONServer.default,
                        deleteMany: deleteManyMock,
                    },
                },
                routerProvider: mockRouterBindings({
                    params: { baz: "qux" },
                }),
                resources: [{ name: "posts", meta: { dip: "dop" } }],
            }),
        });

        result.current.mutate({
            resource: "posts",
            ids: ["1"],
            meta: { foo: "bar" },
        });

        await waitFor(() => {
            expect(deleteManyMock).toBeCalled();
        });

        expect(deleteManyMock).toBeCalledWith(
            expect.objectContaining({
                meta: expect.objectContaining({
                    foo: "bar",
                    baz: "qux",
                }),
            }),
        );
    });

    it("works correctly with `interval` and `onInterval` params", async () => {
        const onInterval = jest.fn();
        const { result } = renderHook(
            () =>
                useDeleteMany({
                    overtimeOptions: {
                        interval: 100,
                        onInterval,
                    },
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            deleteMany: () => {
                                return new Promise((res) => {
                                    setTimeout(() => res({} as any), 1000);
                                });
                            },
                        },
                    },
                    resources: [{ name: "posts" }],
                }),
            },
        );

        result.current.mutate({
            resource: "posts",
            ids: [1, 2],
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBeTruthy();
            expect(result.current.overtime.elapsedTime).toBe(900);
            expect(onInterval).toBeCalled();
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBeFalsy();
            expect(result.current.overtime.elapsedTime).toBeUndefined();
        });
    });

    describe("usePublish", () => {
        it("publish live event on success", async () => {
            const onPublishMock = jest.fn();

            const { result } = renderHook(() => useDeleteMany(), {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                    liveProvider: {
                        unsubscribe: jest.fn(),
                        subscribe: jest.fn(),
                        publish: onPublishMock,
                    },
                }),
            });

            result.current.mutate({
                resource: "posts",
                ids: ["1", "2"],
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(onPublishMock).toBeCalled();
            expect(onPublishMock).toHaveBeenCalledWith({
                channel: "resources/posts",
                date: expect.any(Date),
                type: "deleted",
                payload: {
                    ids: ["1", "2"],
                },
            });
        });
    });

    describe("useLog", () => {
        it("publish log on success", async () => {
            const createMock = jest.fn();

            const { result } = renderHook(() => useDeleteMany(), {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                    auditLogProvider: {
                        create: createMock,
                        get: jest.fn(),
                        update: jest.fn(),
                    },
                }),
            });

            result.current.mutate({
                resource: "posts",
                ids: ["1", "2"],
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(createMock).toBeCalled();
            expect(createMock).toHaveBeenCalledWith({
                action: "deleteMany",
                author: {},
                meta: {
                    dataProviderName: "default",
                    ids: ["1", "2"],
                },
                resource: "posts",
            });
        });
    });

    it("should use `deleteOne` method if does not exist `deleteMany` method in dataProvider", async () => {
        const deleteOneMock = jest.fn();

        const { result } = renderHook(() => useDeleteMany(), {
            wrapper: TestWrapper({
                dataProvider: {
                    default: {
                        ...MockJSONServer.default,
                        deleteOne: deleteOneMock,
                        deleteMany: undefined,
                    },
                },
                resources: [{ name: "posts" }],
            }),
        });

        result.current.mutate({
            resource: "posts",
            ids: ["1", "2"],
        });

        await waitFor(() => {
            expect(deleteOneMock).toBeCalled();
        });

        expect(deleteOneMock).toBeCalledTimes(2);
        expect(deleteOneMock).toHaveBeenNthCalledWith(
            1,
            expect.objectContaining({
                resource: "posts",
                id: "1",
            }),
        );
        expect(deleteOneMock).toHaveBeenNthCalledWith(
            2,
            expect.objectContaining({
                resource: "posts",
                id: "2",
            }),
        );
    });

    describe("useNotification", () => {
        it("should call `open` from the notification provider on success", async () => {
            const openNotificationMock = jest.fn();

            const { result } = renderHook(() => useDeleteMany(), {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    notificationProvider: {
                        open: openNotificationMock,
                    },
                    resources: [{ name: "posts" }],
                }),
            });

            result.current.mutate({
                resource: "posts",
                ids: ["1", "2"],
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(openNotificationMock).toBeCalledWith({
                description: "Success",
                key: "1,2-posts-notification",
                message: "Successfully deleted posts",
                type: "success",
            });
        });

        it("should call `open` from the notification provider on error", async () => {
            const deleteManyMock = jest
                .fn()
                .mockRejectedValue(new Error("Error"));
            const notificationMock = jest.fn();

            const { result } = renderHook(() => useDeleteMany(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            deleteMany: deleteManyMock,
                        },
                    },
                    notificationProvider: {
                        open: notificationMock,
                    },
                    resources: [{ name: "posts" }],
                }),
            });

            result.current.mutate({
                resource: "posts",
                ids: ["1", "2"],
            });

            await waitFor(() => {
                expect(result.current.isError).toBeTruthy();
            });

            expect(notificationMock).toBeCalledWith({
                description: "Error",
                key: "1,2-posts-notification",
                message: "Error (status code: undefined)",
                type: "error",
            });
        });

        it("should call `open` from notification provider on success with custom notification params", async () => {
            const openNotificationMock = jest.fn();

            const { result } = renderHook(() => useDeleteMany(), {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    notificationProvider: {
                        open: openNotificationMock,
                    },
                    resources: [{ name: "posts" }],
                }),
            });

            result.current.mutate({
                resource: "posts",
                ids: ["1", "2"],
                successNotification: () => ({
                    message: "Success",
                    description: "Successfully created post",
                    type: "success",
                }),
            });

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
            const deleteManyMock = jest
                .fn()
                .mockRejectedValue(new Error("Error"));
            const openNotificationMock = jest.fn();

            const { result } = renderHook(() => useDeleteMany(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            deleteMany: deleteManyMock,
                        },
                    },
                    notificationProvider: {
                        open: openNotificationMock,
                    },
                    resources: [{ name: "posts" }],
                }),
            });

            result.current.mutate({
                resource: "posts",
                ids: ["1", "2"],
                errorNotification: () => ({
                    message: "Error",
                    description: "There was an error creating post",
                    type: "error",
                }),
            });

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
            const deleteManyMock = jest
                .fn()
                .mockRejectedValue(new Error("Error"));
            const onErrorMock = jest.fn();

            const { result } = renderHook(() => useDeleteMany(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            deleteMany: deleteManyMock,
                        },
                    },
                    authProvider: {
                        onError: onErrorMock,
                    } as any,
                    resources: [{ name: "posts" }],
                }),
            });

            result.current.mutate({
                resource: "posts",
                ids: ["1"],
            });

            await waitFor(() => {
                expect(result.current.isError).toBeTruthy();
            });

            expect(onErrorMock).toBeCalledWith(new Error("Error"));
        });

        it("should call `checkError` from the legacy auth provider on error", async () => {
            const deleteManyMock = jest
                .fn()
                .mockRejectedValue(new Error("Error"));
            const onErrorMock = jest.fn();

            const { result } = renderHook(() => useDeleteMany(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            deleteMany: deleteManyMock,
                        },
                    },
                    legacyAuthProvider: {
                        checkError: onErrorMock,
                    },
                    resources: [{ name: "posts" }],
                }),
            });

            result.current.mutate({
                resource: "posts",
                ids: ["1"],
            });

            await waitFor(() => {
                expect(result.current.isError).toBeTruthy();
            });

            expect(onErrorMock).toBeCalledWith(new Error("Error"));
        });
    });

    it("should select correct dataProviderName", async () => {
        const deleteManyDefaultMock = jest.fn();
        const deleteManyFooMock = jest.fn();

        const { result } = renderHook(() => useDeleteMany(), {
            wrapper: TestWrapper({
                dataProvider: {
                    default: {
                        ...MockJSONServer.default,
                        deleteMany: deleteManyDefaultMock,
                    },
                    foo: {
                        ...MockJSONServer.default,
                        deleteMany: deleteManyFooMock,
                    },
                },
                resources: [
                    {
                        name: "categories",
                    },
                    {
                        name: "posts",
                        meta: {
                            dataProviderName: "foo",
                        },
                    },
                ],
            }),
        });

        result.current.mutate({
            resource: "posts",
            ids: ["1", "2"],
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(deleteManyFooMock).toBeCalledWith(
            expect.objectContaining({
                resource: "posts",
            }),
        );
        expect(deleteManyDefaultMock).not.toBeCalled();
    });

    it("should get correct `meta` of related resource", async () => {
        const deleteManyMock = jest.fn();

        const { result } = renderHook(() => useDeleteMany(), {
            wrapper: TestWrapper({
                dataProvider: {
                    default: {
                        ...MockJSONServer.default,
                        deleteMany: deleteManyMock,
                    },
                },
                resources: [
                    {
                        name: "posts",
                        meta: {
                            foo: "bar",
                        },
                    },
                ],
            }),
        });

        result.current.mutate({
            resource: "posts",
            ids: ["1", "2"],
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(deleteManyMock).toBeCalledWith(
            expect.objectContaining({
                meta: expect.objectContaining({
                    foo: "bar",
                }),
            }),
        );
    });

    describe("when passing `identifier` instead of `name`", () => {
        it("should select correct dataProviderName", async () => {
            const deleteManyDefaultMock = jest.fn();
            const deleteManyFooMock = jest.fn();

            const { result } = renderHook(() => useDeleteMany(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            deleteMany: deleteManyDefaultMock,
                        },
                        foo: {
                            ...MockJSONServer.default,
                            deleteMany: deleteManyFooMock,
                        },
                    },
                    resources: [
                        {
                            name: "posts",
                        },
                        {
                            name: "posts",
                            identifier: "featured-posts",
                            meta: {
                                dataProviderName: "foo",
                            },
                        },
                    ],
                }),
            });

            result.current.mutate({
                resource: "featured-posts",
                ids: ["1", "2"],
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(deleteManyFooMock).toBeCalledWith(
                expect.objectContaining({
                    resource: "posts",
                }),
            );
            expect(deleteManyDefaultMock).not.toBeCalled();
        });

        it("should invalidate query store with `identifier`", async () => {
            const invalidateStore = jest.fn();
            jest.spyOn(UseInvalidate, "useInvalidate").mockReturnValue(
                invalidateStore,
            );
            const deleteManyMock = jest.fn();

            const { result } = renderHook(() => useDeleteMany(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            deleteMany: deleteManyMock,
                        },
                    },
                    resources: [
                        {
                            name: "posts",
                            identifier: "featured-posts",
                        },
                    ],
                }),
            });

            result.current.mutate({
                resource: "featured-posts",
                ids: ["1", "2"],
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(invalidateStore).toBeCalledWith(
                expect.objectContaining({
                    resource: "featured-posts",
                }),
            );
        });

        it("should get correct `meta` of related resource", async () => {
            const deleteManyMock = jest.fn();

            const { result } = renderHook(() => useDeleteMany(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            deleteMany: deleteManyMock,
                        },
                    },
                    resources: [
                        {
                            name: "posts",
                            identifier: "all-posts",
                            meta: {
                                foo: "bar",
                            },
                        },
                        {
                            name: "posts",
                            identifier: "featured-posts",
                            meta: {
                                bar: "baz",
                            },
                        },
                    ],
                }),
            });

            result.current.mutate({
                resource: "featured-posts",
                ids: ["1", "2"],
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(deleteManyMock).toBeCalledWith(
                expect.objectContaining({
                    meta: expect.objectContaining({
                        bar: "baz",
                    }),
                }),
            );
        });
    });
});
