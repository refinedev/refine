import { act, renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockRouterBindings } from "@test";

import { useCreateMany } from "./useCreateMany";

describe("useCreateMany Hook", () => {
    it("should work with rest json server", async () => {
        const { result } = renderHook(() => useCreateMany(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        await act(async () => {
            result.current.mutate({ resource: "posts", values: [{ id: 1 }] });
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        const { status, data } = result.current;

        expect(status).toBe("success");
        expect(data?.data[0].slug).toBe("ut-ad-et");
        expect(data?.data[1].slug).toBe("consequatur-molestiae-rerum");
    });

    it("should only pass meta from the hook parameter and query parameters to the dataProvider", async () => {
        const createManyMock = jest.fn();

        const { result } = renderHook(() => useCreateMany(), {
            wrapper: TestWrapper({
                dataProvider: {
                    default: {
                        ...MockJSONServer.default,
                        createMany: createManyMock,
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
            values: [],
            meta: { foo: "bar" },
        });

        await waitFor(() => {
            expect(createManyMock).toBeCalled();
        });

        expect(createManyMock).toBeCalledWith(
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

            const { result } = renderHook(() => useCreateMany(), {
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

            await act(async () => {
                result.current.mutate({
                    resource: "posts",
                    values: [{ id: 1 }, { id: 2 }],
                });
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(onPublishMock).toBeCalled();
            expect(onPublishMock).toHaveBeenCalledWith({
                channel: "resources/posts",
                date: expect.any(Date),
                type: "created",
                payload: {
                    ids: ["1", "2"],
                },
            });
        });
    });

    describe("useLog", () => {
        it("publish log on success", async () => {
            const createMock = jest.fn();

            const { result } = renderHook(() => useCreateMany(), {
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
                values: [
                    {
                        title: "title1",
                    },
                    {
                        title: "title2",
                    },
                ],
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(createMock).toBeCalled();
            expect(createMock).toHaveBeenCalledWith({
                action: "createMany",
                author: {},
                data: [
                    {
                        title: "title1",
                    },
                    {
                        title: "title2",
                    },
                ],
                meta: {
                    dataProviderName: "default",
                    ids: ["1", "2"],
                },
                resource: "posts",
            });
        });
    });

    it("should use `create` method if does not exist `createMany` method in dataProvider", async () => {
        const createMock = jest.fn();

        const { result } = renderHook(() => useCreateMany(), {
            wrapper: TestWrapper({
                dataProvider: {
                    default: {
                        ...MockJSONServer.default,
                        create: createMock,
                        createMany: undefined,
                    },
                },
                resources: [{ name: "posts" }],
            }),
        });

        result.current.mutate({
            resource: "posts",
            values: [{ title: "foo" }, { title: "bar" }],
        });

        await waitFor(() => {
            expect(createMock).toBeCalled();
        });

        expect(createMock).toBeCalledTimes(2);
        expect(createMock).toHaveBeenNthCalledWith(
            1,
            expect.objectContaining({
                resource: "posts",
                variables: { title: "foo" },
            }),
        );
        expect(createMock).toHaveBeenNthCalledWith(
            2,
            expect.objectContaining({
                resource: "posts",
                variables: { title: "bar" },
            }),
        );
    });

    describe("useNotification", () => {
        it("should call `open` from the notification provider on success", async () => {
            const openNotificationMock = jest.fn();

            const { result } = renderHook(() => useCreateMany(), {
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
                values: [{ title: "foo" }, { title: "bar" }],
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(openNotificationMock).toBeCalledWith({
                description: "Success",
                key: "createMany-posts-notification",
                message: "Successfully created posts",
                type: "success",
            });
        });

        it("should call `open` from the notification provider on error", async () => {
            const createManyMock = jest
                .fn()
                .mockRejectedValue(new Error("Error"));
            const openNotificationMock = jest.fn();

            const { result } = renderHook(() => useCreateMany(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            createMany: createManyMock,
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
                values: [{ title: "foo" }, { title: "bar" }],
            });

            await waitFor(() => {
                expect(result.current.isError).toBeTruthy();
            });

            expect(openNotificationMock).toBeCalledWith({
                description: "Error",
                key: "createMany-posts-notification",
                message:
                    "There was an error creating posts (status code: undefined",
                type: "error",
            });
        });

        it("should call `open` from notification provider on success with custom notification params", async () => {
            const openNotificationMock = jest.fn();

            const { result } = renderHook(() => useCreateMany(), {
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
                values: [{ title: "bar" }],
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
            const createManyMock = jest
                .fn()
                .mockRejectedValue(new Error("Error"));
            const openNotificationMock = jest.fn();

            const { result } = renderHook(() => useCreateMany(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            createMany: createManyMock,
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
                values: [{ title: "foo" }, { title: "bar" }],
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
});
