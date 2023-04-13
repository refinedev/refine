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

    describe("custom query key", () => {
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
    });
});
