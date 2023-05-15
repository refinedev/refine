import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockRouterBindings } from "@test";

import { useUpdateMany } from "./useUpdateMany";

describe("useUpdateMany Hook", () => {
    it("with rest json server", async () => {
        const { result } = renderHook(() => useUpdateMany(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        result.current.mutate({
            resource: "posts",
            ids: ["1", "2"],
            values: { id: "1", title: "test" },
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        const { status } = result.current;

        expect(status).toBe("success");
    });

    it("should works with pessimistic update", async () => {
        const { result } = renderHook(() => useUpdateMany(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        result.current.mutate({
            resource: "posts",
            mutationMode: "pessimistic",
            ids: ["1", "2"],
            values: { id: "1", title: "test" },
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        const { isSuccess } = result.current;

        expect(isSuccess).toBeTruthy();
    });

    it("should works with optimistic update", async () => {
        const { result } = renderHook(() => useUpdateMany(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        result.current.mutate({
            resource: "posts",
            mutationMode: "optimistic",
            ids: ["1", "2"],
            values: { id: "1", title: "test" },
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        const { isSuccess } = result.current;

        expect(isSuccess).toBeTruthy();
    });

    it("should works with undoable update", async () => {
        const { result } = renderHook(() => useUpdateMany(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        result.current.mutate({
            ids: ["1", "2"],
            resource: "posts",
            mutationMode: "undoable",
            undoableTimeout: 0,
            values: { id: "1", title: "test" },
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        const { isSuccess } = result.current;

        expect(isSuccess).toBeTruthy();
    });

    it("should only pass meta from the hook parameter and query parameters to the dataProvider", async () => {
        const updateManyMock = jest.fn();

        const { result } = renderHook(() => useUpdateMany(), {
            wrapper: TestWrapper({
                dataProvider: {
                    default: {
                        ...MockJSONServer.default,
                        updateMany: updateManyMock,
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
            ids: [],
            values: {},
            meta: { foo: "bar" },
        });

        await waitFor(() => {
            expect(updateManyMock).toBeCalled();
        });

        expect(updateManyMock).toBeCalledWith(
            expect.objectContaining({
                meta: expect.objectContaining({
                    foo: "bar",
                    baz: "qux",
                }),
            }),
        );
    });

    describe("usePublish", () => {
        it("publish live event on success", async () => {
            const onPublishMock = jest.fn();

            const { result } = renderHook(() => useUpdateMany(), {
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
                mutationMode: "undoable",
                undoableTimeout: 0,
                ids: ["1", "2"],
                values: { id: "1", title: "undoable test" },
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(onPublishMock).toBeCalled();
            expect(onPublishMock).toHaveBeenCalledWith({
                channel: "resources/posts",
                date: expect.any(Date),
                type: "updated",
                payload: {
                    ids: ["1", "2"],
                },
            });
        });
    });

    describe("useLog", () => {
        it("publish log on success", async () => {
            const updateManyMock = jest.fn();

            const { result } = renderHook(() => useUpdateMany(), {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                    auditLogProvider: {
                        create: updateManyMock,
                        get: jest.fn(),
                        update: jest.fn(),
                    },
                }),
            });

            result.current.mutate({
                resource: "posts",
                mutationMode: "undoable",
                undoableTimeout: 0,
                ids: ["1", "2"],
                values: { status: "published" },
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(updateManyMock).toBeCalled();
            expect(updateManyMock).toHaveBeenCalledWith({
                action: "updateMany",
                author: {},
                data: {
                    status: "published",
                },
                meta: {
                    dataProviderName: "default",
                    ids: ["1", "2"],
                },
                previousData: [
                    {
                        status: undefined,
                    },
                    {
                        status: undefined,
                    },
                ],
                resource: "posts",
            });
        });
    });

    it("should use `update` method if does not exist `updateMany` method in dataProvider", async () => {
        const updateManyMock = jest.fn();

        const { result } = renderHook(() => useUpdateMany(), {
            wrapper: TestWrapper({
                dataProvider: {
                    default: {
                        ...MockJSONServer.default,
                        update: updateManyMock,
                        updateMany: undefined,
                    },
                },
                resources: [{ name: "posts" }],
            }),
        });

        result.current.mutate({
            resource: "posts",
            ids: ["1", "2"],
            values: { title: "foo" },
        });

        await waitFor(() => {
            expect(updateManyMock).toBeCalled();
        });

        expect(updateManyMock).toBeCalledTimes(2);
        expect(updateManyMock).toHaveBeenNthCalledWith(
            1,
            expect.objectContaining({
                resource: "posts",
                id: "1",
                variables: { title: "foo" },
            }),
        );
        expect(updateManyMock).toHaveBeenNthCalledWith(
            2,
            expect.objectContaining({
                resource: "posts",
                id: "2",
                variables: { title: "foo" },
            }),
        );
    });

    describe("useNotification", () => {
        it("should call `open` from the notification provider on success", async () => {
            const openNotificationMock = jest.fn();

            const { result } = renderHook(() => useUpdateMany(), {
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
                ids: ["1"],
                values: {},
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(openNotificationMock).toBeCalledWith({
                description: "Successful",
                key: "1-posts-notification",
                message: "Successfully updated post",
                type: "success",
            });
        });

        it("should call `open` from the notification provider on error", async () => {
            const updateManyMock = jest
                .fn()
                .mockRejectedValue(new Error("Error"));
            const notificationMock = jest.fn();

            const { result } = renderHook(() => useUpdateMany(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            updateMany: updateManyMock,
                        },
                    },
                    notificationProvider: {
                        open: notificationMock,
                    },
                    resources: [{ name: "posts" }],
                }),
            });

            result.current.mutate({
                ids: ["1"],
                resource: "posts",
                values: {},
            });

            await waitFor(() => {
                expect(result.current.isError).toBeTruthy();
            });

            expect(notificationMock).toBeCalledWith({
                description: "Error",
                key: "1-posts-updateMany-error-notification",
                message: "Error when updating post (status code: undefined)",
                type: "error",
            });
        });

        it("should call `open` from notification provider on success with custom notification params", async () => {
            const openNotificationMock = jest.fn();

            const { result } = renderHook(() => useUpdateMany(), {
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
                values: {},
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
            const updateManyMock = jest
                .fn()
                .mockRejectedValue(new Error("Error"));
            const openNotificationMock = jest.fn();

            const { result } = renderHook(() => useUpdateMany(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            updateMany: updateManyMock,
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
                values: {},
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
            const updateManyMock = jest
                .fn()
                .mockRejectedValue(new Error("Error"));
            const onErrorMock = jest.fn();

            const { result } = renderHook(() => useUpdateMany(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            updateMany: updateManyMock,
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
                ids: ["1", "2"],
                values: {},
            });

            await waitFor(() => {
                expect(result.current.isError).toBeTruthy();
            });

            expect(onErrorMock).toBeCalledWith(new Error("Error"));
        });

        it("should call `checkError` from the legacy auth provider on error", async () => {
            const updateManyMock = jest
                .fn()
                .mockRejectedValue(new Error("Error"));
            const onErrorMock = jest.fn();

            const { result } = renderHook(() => useUpdateMany(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            updateMany: updateManyMock,
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
                ids: ["1", "2"],
                values: {},
            });

            await waitFor(() => {
                expect(result.current.isError).toBeTruthy();
            });

            expect(onErrorMock).toBeCalledWith(new Error("Error"));
        });
    });
});
