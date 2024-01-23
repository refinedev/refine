import { act, renderHook, waitFor } from "@testing-library/react";

import {
    MockJSONServer,
    mockRouterBindings,
    queryClient,
    TestWrapper,
} from "@test";
import {
    assertList,
    assertMutationSuccess,
    assertOne,
    renderUseList,
    renderUseMany,
    renderUseOne,
} from "@test/mutation-helpers";

import * as UseInvalidate from "../invalidate/index";
import { useUpdateMany } from "./useUpdateMany";
import * as queryKeys from "@definitions/helpers/queryKeys";

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

    it("should work with pessimistic update", async () => {
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

    it("should work with optimistic update", async () => {
        const initialTitle1 =
            "Necessitatibus necessitatibus id et cupiditate provident est qui amet.";
        const initialTitle2 = "Recusandae consectetur aut atque est.";

        const updatedTitle = "optimistic test";

        const { result } = renderHook(() => useUpdateMany(), {
            wrapper: TestWrapper({
                dataProvider: {
                    ...MockJSONServer.default,
                    updateMany: async () => {
                        return new Promise((res, rej) => {
                            setTimeout(() => rej(), 500);
                        });
                    },
                },
                resources: [{ name: "posts" }],
            }),
        });

        const useListResult = renderUseList();

        const useManyResult = renderUseMany();

        await assertList(useListResult, "title", [
            initialTitle1,
            initialTitle2,
        ]);

        await assertList(useManyResult, "title", [
            initialTitle1,
            initialTitle2,
        ]);

        act(() => {
            result.current.mutate({
                resource: "posts",
                mutationMode: "optimistic",
                ids: ["1", "2"],
                values: { title: updatedTitle },
            });
        });

        await assertList(useListResult, "title", [updatedTitle, updatedTitle]);

        await assertList(useManyResult, "title", [updatedTitle, updatedTitle]);

        await waitFor(() => {
            expect(result.current.isError).toBeTruthy();
        });

        await assertList(useListResult, "title", [
            initialTitle1,
            initialTitle2,
        ]);

        await assertList(useManyResult, "title", [
            initialTitle1,
            initialTitle2,
        ]);
    });

    it("should work with undoable update", async () => {
        const initialTitle1 =
            "Necessitatibus necessitatibus id et cupiditate provident est qui amet.";
        const initialTitle2 = "Recusandae consectetur aut atque est.";

        const updatedTitle = "optimistic test";

        const { result } = renderHook(() => useUpdateMany(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        const useListResult = renderUseList();

        const useManyResult = renderUseMany();

        await assertList(useListResult, "title", [
            initialTitle1,
            initialTitle2,
        ]);

        await assertList(useManyResult, "title", [
            initialTitle1,
            initialTitle2,
        ]);

        act(() => {
            result.current.mutate({
                ids: ["1", "2"],
                resource: "posts",
                mutationMode: "undoable",
                undoableTimeout: 1000,
                values: { id: "1", title: updatedTitle },
            });
        });

        await assertList(useListResult, "title", [updatedTitle, updatedTitle]);

        await assertList(useManyResult, "title", [updatedTitle, updatedTitle]);

        await assertMutationSuccess(result);
    });

    it("should exclude gqlQuery and qqlMutation from query keys", async () => {
        const catchFn = jest.fn();

        jest.spyOn(queryKeys, "queryKeysReplacement").mockImplementationOnce(
            () => catchFn,
        );

        const { result } = renderHook(() => useUpdateMany(), {
            wrapper: TestWrapper({}),
        });

        const resource = "posts";

        result.current.mutate({
            resource,
            ids: [1],
            values: {},
            meta: {
                foo: "bar",
                gqlQuery: "gqlQuery" as any,
                gqlMutation: "gqlMutation" as any,
            },
        });

        await waitFor(() => {
            expect(catchFn).toBeCalledWith(resource, "default", { foo: "bar" });
        });
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
            meta: {
                foo: "bar",
                gqlQuery: "gqlQuery" as any,
                gqlMutation: "gqlMutation" as any,
            },
        });

        await waitFor(() => {
            expect(updateManyMock).toBeCalled();
        });

        expect(updateManyMock).toBeCalledWith(
            expect.objectContaining({
                meta: expect.objectContaining({
                    foo: "bar",
                    baz: "qux",
                    gqlQuery: "gqlQuery",
                    gqlMutation: "gqlMutation",
                }),
            }),
        );
    });

    it("works correctly with `interval` and `onInterval` params", async () => {
        const onInterval = jest.fn();
        const { result } = renderHook(
            () =>
                useUpdateMany({
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
                            updateMany: () => {
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
            values: {
                title: "foo",
            },
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
                    dataProviderName,
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
                    meta: {
                        dataProviderName,
                    },
                });
            },
        );
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

        it("should not call `open` from notification provider on return `false`", async () => {
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
                successNotification: () => false,
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(openNotificationMock).toBeCalledTimes(0);
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

    it("should select correct dataProviderName", async () => {
        const updateManyDefaultMock = jest.fn();
        const updateManyFooMock = jest.fn();

        const { result } = renderHook(() => useUpdateMany(), {
            wrapper: TestWrapper({
                dataProvider: {
                    default: {
                        ...MockJSONServer.default,
                        updateMany: updateManyDefaultMock,
                    },
                    foo: {
                        ...MockJSONServer.default,
                        updateMany: updateManyFooMock,
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
            values: {
                foo: "bar",
            },
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(updateManyFooMock).toBeCalledWith(
            expect.objectContaining({
                resource: "posts",
            }),
        );
        expect(updateManyDefaultMock).not.toBeCalled();
    });

    it("should get correct `meta` of related resource", async () => {
        const updateManyMock = jest.fn();

        const { result } = renderHook(() => useUpdateMany(), {
            wrapper: TestWrapper({
                dataProvider: {
                    default: {
                        ...MockJSONServer.default,
                        updateMany: updateManyMock,
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
            values: {
                title: "awesome post",
            },
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(updateManyMock).toBeCalledWith(
            expect.objectContaining({
                meta: expect.objectContaining({
                    foo: "bar",
                }),
            }),
        );
    });

    describe("when passing `identifier` instead of `name`", () => {
        it("should select correct dataProviderName", async () => {
            const updateManyDefaultMock = jest.fn();
            const updateManyFooMock = jest.fn();

            const { result } = renderHook(() => useUpdateMany(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            updateMany: updateManyDefaultMock,
                        },
                        foo: {
                            ...MockJSONServer.default,
                            updateMany: updateManyFooMock,
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
                values: {
                    foo: "bar",
                },
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(updateManyFooMock).toBeCalledWith(
                expect.objectContaining({
                    resource: "posts",
                }),
            );
            expect(updateManyDefaultMock).not.toBeCalled();
        });

        it("should invalidate query store with `identifier`", async () => {
            const invalidateStore = jest.fn();
            jest.spyOn(UseInvalidate, "useInvalidate").mockReturnValue(
                invalidateStore,
            );
            const updateManyMock = jest.fn();

            const { result } = renderHook(() => useUpdateMany(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            updateMany: updateManyMock,
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
            const updateManyMock = jest.fn();

            const { result } = renderHook(() => useUpdateMany(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            updateMany: updateManyMock,
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
                values: {
                    foo: "bar",
                },
            });

            await waitFor(() => {
                expect(result.current.isSuccess).toBeTruthy();
            });

            expect(updateManyMock).toBeCalledWith(
                expect.objectContaining({
                    meta: expect.objectContaining({
                        bar: "baz",
                    }),
                }),
            );
        });
    });

    describe("when passing `optimisticUpdateMap`", () => {
        const initialTitle =
            "Necessitatibus necessitatibus id et cupiditate provident est qui amet.";
        const updatedTitle = "optimistic test";

        it("when pass `false`", async () => {
            const { result } = renderHook(() => useUpdateMany(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        ...MockJSONServer.default,
                        updateMany: async () => {
                            return new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    return reject(new Error("Error"));
                                }, 500);
                            });
                        },
                    },
                }),
            });
            const useOneResult = renderUseOne();
            const useListResult = renderUseList();
            const useManyResult = renderUseMany();

            act(() => {
                result.current.mutate({
                    resource: "posts",
                    mutationMode: "optimistic",
                    ids: [1, 2],
                    values: { title: updatedTitle },
                    optimisticUpdateMap: {
                        list: false,
                        detail: false,
                        many: false,
                    },
                });
            });

            await assertOne(useOneResult, "title", initialTitle);
            await assertList(useListResult, "title", initialTitle);
            await assertList(useManyResult, "title", initialTitle);
        });

        it("when pass `true`", async () => {
            const { result } = renderHook(() => useUpdateMany(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        ...MockJSONServer.default,
                        updateMany: async () => {
                            return new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    return reject(new Error("Error"));
                                }, 500);
                            });
                        },
                    },
                }),
            });
            const useOneResult = renderUseOne();
            const useListResult = renderUseList();
            const useManyResult = renderUseMany();

            act(() => {
                result.current.mutate({
                    resource: "posts",
                    mutationMode: "optimistic",
                    ids: [1, 2],
                    values: { title: updatedTitle },
                    optimisticUpdateMap: {
                        list: true,
                        detail: true,
                        many: true,
                    },
                });
            });

            await assertOne(useOneResult, "title", updatedTitle);
            await assertList(useListResult, "title", updatedTitle);
            await assertList(useManyResult, "title", updatedTitle);
        });

        it("when pass custom mapper function", async () => {
            const { result } = renderHook(() => useUpdateMany(), {
                wrapper: TestWrapper({
                    dataProvider: {
                        ...MockJSONServer.default,
                        updateMany: async () => {
                            return new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    return reject(new Error("Error"));
                                }, 500);
                            });
                        },
                    },
                }),
            });
            const useOneResult = renderUseOne();
            const useListResult = renderUseList();
            const useManyResult = renderUseMany();

            act(() => {
                result.current.mutate({
                    resource: "posts",
                    mutationMode: "optimistic",
                    ids: [1, 2],
                    values: { title: updatedTitle },
                    optimisticUpdateMap: {
                        list: (previous, values, ids) => {
                            if (!previous) {
                                return null;
                            }

                            const data = previous.data.map((record) => {
                                if (
                                    record.id !== undefined &&
                                    ids
                                        .filter((id) => id !== undefined)
                                        .map(String)
                                        .includes(record.id.toString())
                                ) {
                                    return {
                                        foo: "bar-list",
                                        ...record,
                                        ...values,
                                    };
                                }

                                return record;
                            });

                            return {
                                ...previous,
                                data,
                            };
                        },
                        many: (previous, values, ids) => {
                            if (!previous) {
                                return null;
                            }

                            const data = previous.data.map((record) => {
                                if (
                                    record.id !== undefined &&
                                    ids
                                        .filter((id) => id !== undefined)
                                        .map(String)
                                        .includes(record.id.toString())
                                ) {
                                    return {
                                        foo: "bar-many",
                                        ...record,
                                        ...values,
                                    };
                                }
                                return record;
                            });

                            return {
                                ...previous,
                                data,
                            };
                        },
                        detail: (previous, values, id) => {
                            if (!previous) {
                                return null;
                            }

                            const data = {
                                id,
                                ...previous.data,
                                ...values,
                                foo: `bar-one`,
                            };

                            return {
                                ...previous,
                                data,
                            };
                        },
                    },
                });
            });

            await assertOne(useOneResult, "foo", "bar-one");
            await assertList(useListResult, "foo", "bar-list");
            await assertList(useManyResult, "foo", "bar-many");

            await assertOne(useOneResult, "foo", undefined);
            await assertList(useListResult, "foo", undefined);
            await assertList(useManyResult, "foo", undefined);
        });
    });

    it("should override `mutationFn` with mutationOptions.mutationFn", async () => {
        const updateManyMock = jest.fn().mockResolvedValue({ data: {} });
        const mutationFnMock = jest.fn().mockResolvedValue({ data: {} });

        const { result } = renderHook(
            () =>
                useUpdateMany({
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
                            updateMany: updateManyMock,
                        },
                    },
                    resources: [{ name: "posts" }],
                }),
            },
        );

        result.current.mutate({
            resource: "posts",
            ids: ["1", "2"],
            values: {},
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBeTruthy();
        });

        expect(updateManyMock).not.toBeCalled();
        expect(mutationFnMock).toBeCalled();
    });

    it("should override `mutationKey` with `mutationOptions.mutationKey`", async () => {
        const { result } = renderHook(
            () =>
                useUpdateMany({
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
            ids: ["1", "2"],
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
