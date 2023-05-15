import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockRouterBindings } from "@test";

import { useCreate } from "./useCreate";

describe("useCreate Hook", () => {
    it("with rest json server", async () => {
        const { result } = renderHook(() => useCreate(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        result.current.mutate({ resource: "posts", values: { id: 1 } });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        const { status, data } = result.current;

        expect(status).toBe("success");
        expect(data?.data.slug).toBe("ut-ad-et");
    });

    it("should only pass meta from the hook parameter and query parameters to the dataProvider", async () => {
        const createMock = jest.fn();

        const { result } = renderHook(() => useCreate(), {
            wrapper: TestWrapper({
                dataProvider: {
                    default: {
                        ...MockJSONServer.default,
                        create: createMock,
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
            values: {},
            meta: { foo: "bar" },
        });

        await waitFor(() => {
            expect(createMock).toBeCalled();
        });

        expect(createMock).toBeCalledWith(
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

            const { result } = renderHook(() => useCreate(), {
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

            result.current.mutate({ resource: "posts", values: { id: 1 } });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(onPublishMock).toBeCalled();
            expect(onPublishMock).toHaveBeenCalledWith({
                channel: "resources/posts",
                date: expect.any(Date),
                type: "created",
                payload: {
                    ids: ["1"],
                },
            });
        });

        it("publish live event without `ids` if no `id` is returned from the dataProvider", async () => {
            const onPublishMock = jest.fn();

            const { result } = renderHook(() => useCreate(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            create: jest.fn(),
                        },
                    },
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
                values: { title: "foo" },
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(onPublishMock).toHaveBeenCalledWith({
                channel: "resources/posts",
                date: expect.any(Date),
                type: "created",
                payload: {},
            });
        });
    });

    describe("useLog", () => {
        it("publish log on success", async () => {
            const createMock = jest.fn();

            const { result } = renderHook(() => useCreate(), {
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

            result.current.mutate({ resource: "posts", values: { id: 1 } });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(createMock).toBeCalled();
            expect(createMock).toHaveBeenCalledWith({
                action: "create",
                author: {},
                data: {
                    id: 1,
                },
                meta: {
                    dataProviderName: "default",
                    id: "1",
                },
                resource: "posts",
            });
        });
    });

    describe("useNotification", () => {
        it("should call `open` from the notification provider on success", async () => {
            const openNotificationMock = jest.fn();

            const { result } = renderHook(() => useCreate(), {
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
                values: {
                    id: 1,
                    foo: "bar",
                },
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(openNotificationMock).toBeCalledWith({
                description: "Success",
                key: "create-posts-notification",
                message: "Successfully created post",
                type: "success",
            });
        });

        it("should call `open` from the notification provider on error", async () => {
            const createMock = jest.fn().mockRejectedValue(new Error("Error"));
            const openNotificationMock = jest.fn();

            const { result } = renderHook(() => useCreate(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            create: createMock,
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
                values: {
                    id: 1,
                    foo: "bar",
                },
            });

            await waitFor(() => {
                expect(result.current.isError).toBeTruthy();
            });

            expect(openNotificationMock).toBeCalledWith({
                description: "Error",
                key: "create-posts-notification",
                message:
                    "There was an error creating post (status code: undefined)",
                type: "error",
            });
        });

        it("should call `open` from notification provider on success with custom notification params", async () => {
            const openNotificationMock = jest.fn();

            const { result } = renderHook(() => useCreate(), {
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
                values: {
                    id: 1,
                    foo: "bar",
                },
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
            const createMock = jest.fn().mockRejectedValue(new Error("Error"));
            const openNotificationMock = jest.fn();

            const { result } = renderHook(() => useCreate(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            create: createMock,
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
                values: {
                    id: 1,
                    foo: "bar",
                },
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
            const createMock = jest.fn().mockRejectedValue(new Error("Error"));
            const onErrorMock = jest.fn();

            const { result } = renderHook(() => useCreate(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            create: createMock,
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
                values: {
                    id: 1,
                    foo: "bar",
                },
            });

            await waitFor(() => {
                expect(result.current.isError).toBeTruthy();
            });

            expect(onErrorMock).toBeCalledWith(new Error("Error"));
        });

        it("should call `checkError` from the legacy auth provider on error", async () => {
            const createMock = jest.fn().mockRejectedValue(new Error("Error"));
            const onErrorMock = jest.fn();

            const { result } = renderHook(() => useCreate(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            create: createMock,
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
                values: {
                    id: 1,
                    foo: "bar",
                },
            });

            await waitFor(() => {
                expect(result.current.isError).toBeTruthy();
            });

            expect(onErrorMock).toBeCalledWith(new Error("Error"));
        });
    });
});
