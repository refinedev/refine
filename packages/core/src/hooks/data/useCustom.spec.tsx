import { renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockRouterBindings } from "@test";

import * as ReactQuery from "@tanstack/react-query";

import { useCustom } from "./useCustom";

describe("useCustom Hook", () => {
    it("works with rest json server", async () => {
        const { result } = renderHook(
            () =>
                useCustom({
                    url: "remoteUrl",
                    method: "get",
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

        const { data } = result.current;

        expect(data?.data).toHaveLength(2);
    });

    describe("without custom query key", () => {
        const config = { sorters: [{ field: "id", order: "desc" }] } as any;
        const meta = { meta: "meta" };

        it("builds query key itself", async () => {
            const useQuerySpy = jest.spyOn(ReactQuery, "useQuery");

            renderHook(
                () =>
                    useCustom({
                        url: "remoteUrl",
                        method: "get",
                        config,
                        meta,
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [{ name: "posts" }],
                    }),
                },
            );

            expect(useQuerySpy).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    queryKey: [
                        undefined,
                        "custom",
                        "get",
                        "remoteUrl",
                        { ...config, ...meta },
                    ],
                }),
            );
        });
    });

    describe("with custom query key", () => {
        it("prioritizes custom query key", async () => {
            const useQuerySpy = jest.spyOn(ReactQuery, "useQuery");

            renderHook(
                () =>
                    useCustom({
                        url: "remoteUrl",
                        method: "get",
                        queryOptions: { queryKey: ["MyKey"] },
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [{ name: "posts" }],
                    }),
                },
            );

            expect(useQuerySpy).toHaveBeenLastCalledWith(
                expect.objectContaining({ queryKey: ["MyKey"] }),
            );
        });
    });

    it("should pass meta to dataProvider router and hook", async () => {
        const customMock = jest.fn();

        renderHook(
            () =>
                useCustom({
                    url: "remoteUrl",
                    method: "get",
                    meta: { foo: "bar" },
                }),
            {
                wrapper: TestWrapper({
                    dataProvider: {
                        default: {
                            ...MockJSONServer.default,
                            custom: customMock,
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
            expect(customMock).toBeCalled();
        });

        expect(customMock).toBeCalledWith(
            expect.objectContaining({
                meta: expect.objectContaining({
                    foo: "bar",
                    baz: "qux",
                }),
            }),
        );
    });

    describe("useNotification", () => {
        it("should call `open` from the notification provider on error", async () => {
            const customMock = jest.fn().mockRejectedValue(new Error("Error"));
            const notificationMock = jest.fn();

            const { result } = renderHook(
                () =>
                    useCustom({
                        url: "remoteUrl",
                        method: "get",
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            default: {
                                ...MockJSONServer.default,
                                custom: customMock,
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
                key: "get-notification",
                message: "Error (status code: undefined)",
                type: "error",
            });
        });

        it("should call `open` from notification provider on success with custom notification params", async () => {
            const openNotificationMock = jest.fn();

            const { result } = renderHook(
                () =>
                    useCustom({
                        url: "remoteUrl",
                        method: "get",
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
            const customMock = jest.fn().mockRejectedValue(new Error("Error"));
            const openNotificationMock = jest.fn();

            const { result } = renderHook(
                () =>
                    useCustom({
                        url: "remoteUrl",
                        method: "get",
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
                                custom: customMock,
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

    it("should throw error if no `custom` method is provided", async () => {
        jest.spyOn(console, "error").mockImplementation(() => null);

        expect(() =>
            renderHook(
                () =>
                    useCustom({
                        url: "remoteUrl",
                        method: "get",
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            default: {
                                ...MockJSONServer.default,
                                custom: undefined,
                            },
                        },
                        resources: [{ name: "posts" }],
                    }),
                },
            ),
        ).toThrowError("Not implemented custom on data provider.");
    });

    describe("useOnError", () => {
        it("should call `onError` from the auth provider on error", async () => {
            const customMock = jest.fn().mockRejectedValue(new Error("Error"));
            const onErrorMock = jest.fn();

            const { result } = renderHook(
                () =>
                    useCustom({
                        url: "remoteUrl",
                        method: "get",
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            default: {
                                ...MockJSONServer.default,
                                custom: customMock,
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
            const customMock = jest.fn().mockRejectedValue(new Error("Error"));
            const onErrorMock = jest.fn();

            const { result } = renderHook(
                () =>
                    useCustom({
                        url: "remoteUrl",
                        method: "get",
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            default: {
                                ...MockJSONServer.default,
                                custom: customMock,
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
            const customMock = jest.fn().mockResolvedValue({
                data: [{ id: 1, title: "foo" }],
            });

            const { result } = renderHook(
                () =>
                    useCustom({
                        url: "remoteUrl",
                        method: "get",
                        queryOptions: {
                            onSuccess: onSuccessMock,
                        },
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            default: {
                                ...MockJSONServer.default,
                                custom: customMock,
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
            const customMock = jest.fn().mockRejectedValue(new Error("Error"));

            const { result } = renderHook(
                () =>
                    useCustom({
                        url: "remoteUrl",
                        method: "get",
                        queryOptions: {
                            onError: onErrorMock,
                        },
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            default: {
                                ...MockJSONServer.default,
                                custom: customMock,
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
