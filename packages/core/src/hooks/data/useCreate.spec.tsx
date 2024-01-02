import { renderHook, waitFor } from "@testing-library/react";

import {
    MockJSONServer,
    mockRouterBindings,
    queryClient,
    TestWrapper,
} from "@test";

import * as UseInvalidate from "../invalidate/index";
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

    it("works correctly with `interval` and `onInterval` params", async () => {
        const onInterval = jest.fn();
        const { result } = renderHook(
            () =>
                useCreate({
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
                            create: () => {
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
            values: {},
            meta: { foo: "bar" },
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
        it.each(["default", "categories"])(
            "publish event on success [dataProviderName: %s]",
            async (dataProviderName) => {
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

                result.current.mutate({
                    resource: "posts",
                    values: { id: 1 },
                    dataProviderName,
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
                        ids: dataProviderName === "default" ? ["1"] : [1],
                    },
                    meta: {
                        dataProviderName,
                    },
                });
            },
        );

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
                meta: {
                    dataProviderName: "default",
                },
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

        it("should not call `open` from notification provider on return `false`", async () => {
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
                successNotification: () => false,
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(openNotificationMock).toBeCalledTimes(0);
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

    it("should select correct dataProviderName", async () => {
        const createDefaultMock = jest.fn();
        const createFooMock = jest.fn();

        const { result } = renderHook(() => useCreate(), {
            wrapper: TestWrapper({
                dataProvider: {
                    default: {
                        ...MockJSONServer.default,
                        create: createDefaultMock,
                    },
                    foo: {
                        ...MockJSONServer.default,
                        create: createFooMock,
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
            values: {
                foo: "bar",
            },
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(createFooMock).toBeCalledWith(
            expect.objectContaining({
                resource: "posts",
            }),
        );
        expect(createDefaultMock).not.toBeCalled();
    });

    it("should get correct `meta` of related resource", async () => {
        const createMock = jest.fn();

        const { result } = renderHook(() => useCreate(), {
            wrapper: TestWrapper({
                dataProvider: {
                    default: {
                        ...MockJSONServer.default,
                        create: createMock,
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
            values: {
                title: "awesome post",
            },
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(createMock).toBeCalledWith(
            expect.objectContaining({
                meta: expect.objectContaining({
                    foo: "bar",
                }),
            }),
        );
    });

    describe("when passing `identifier` instead of `name`", () => {
        it("should select correct dataProviderName", async () => {
            const createDefaultMock = jest.fn();
            const createFooMock = jest.fn();

            const { result } = renderHook(() => useCreate(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            create: createDefaultMock,
                        },
                        foo: {
                            ...MockJSONServer.default,
                            create: createFooMock,
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
                values: {
                    foo: "bar",
                },
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(createFooMock).toBeCalledWith(
                expect.objectContaining({
                    resource: "posts",
                }),
            );
            expect(createDefaultMock).not.toBeCalled();
        });

        it("should invalidate query store with `identifier`", async () => {
            const invalidateStore = jest.fn();
            jest.spyOn(UseInvalidate, "useInvalidate").mockReturnValue(
                invalidateStore,
            );
            const createMock = jest.fn();

            const { result } = renderHook(() => useCreate(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            create: createMock,
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
                values: {
                    foo: "bar",
                },
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
            const createMock = jest.fn();

            const { result } = renderHook(() => useCreate(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            create: createMock,
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
                values: {
                    title: "awesome post",
                },
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(createMock).toBeCalledWith(
                expect.objectContaining({
                    meta: expect.objectContaining({
                        bar: "baz",
                    }),
                }),
            );
        });
    });

    it("should override `mutationFn` with mutationOptions.mutationFn", async () => {
        const createMock = jest.fn().mockResolvedValue({ data: {} });
        const mutationFnMock = jest.fn().mockResolvedValue({ data: {} });

        const { result } = renderHook(
            () =>
                useCreate({
                    mutationOptions: {
                        // mutationFn is omitted in types. So we need to use @ts-ignore test it.
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        mutationFn: mutationFnMock,
                    },
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            create: createMock,
                        },
                    },
                    resources: [{ name: "posts" }],
                }),
            },
        );

        result.current.mutate({
            resource: "posts",
            values: {},
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(createMock).not.toBeCalled();
        expect(mutationFnMock).toBeCalled();
    });

    it("should override `mutationKey` with `mutationOptions.mutationKey`", async () => {
        const { result } = renderHook(
            () =>
                useCreate({
                    mutationOptions: {
                        mutationKey: ["foo", "bar"],
                    },
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        result.current.mutate({
            resource: "posts",
            values: {},
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(
            queryClient.getMutationCache().findAll({
                mutationKey: ["foo", "bar"],
            }),
        ).toHaveLength(1);
    });
});
