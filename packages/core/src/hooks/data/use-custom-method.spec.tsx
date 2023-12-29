import { act, renderHook, waitFor } from "@testing-library/react";

import { MockJSONServer, TestWrapper } from "@test";

import { useCustomMethod } from "./";

describe("useCustomMethod Hook", () => {
    describe("as: undefined", () => {
        it("should call `someMethod` as query and return", async () => {
            const someMethod = jest.fn(async () => {
                await new Promise((resolve) => setTimeout(resolve, 300));
                return { data: [] as any };
            });

            const { result } = renderHook(() => useCustomMethod("someMethod"), {
                wrapper: TestWrapper({
                    dataProvider: {
                        ...MockJSONServer.default,
                        customMethods: {
                            someMethod,
                        },
                    },
                }),
            });

            expect(result.current.isLoading).toBe(true);

            await waitFor(() => {
                return expect(result.current.isLoading).toBe(false);
            });

            expect(someMethod).toHaveBeenCalled();

            expect(someMethod).toHaveBeenCalledWith(
                expect.objectContaining({
                    meta: expect.objectContaining({}),
                    params: expect.objectContaining({}),
                }),
            );

            expect(result.current.data).toEqual({ data: [] });
        });

        it("should throw an error if unknown method is called", async () => {
            const { result } = renderHook(
                () => useCustomMethod("unknownMethod"),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            ...MockJSONServer.default,
                        },
                    }),
                },
            );

            await waitFor(() => {
                return expect(result.current.isLoading).toBe(false);
            });

            await waitFor(() => {
                return expect(result.current.isError).toBe(true);
            });

            await waitFor(() => {
                return expect(result.current.error).toEqual(
                    new Error(
                        'Method "unknownMethod" is not found in dataProvider "default"',
                    ),
                );
            });
        });

        it("should call `someMethod` as query and send params + meta + router params as meta", async () => {
            const someMethod = jest.fn(async () => {
                await new Promise((resolve) => setTimeout(resolve, 300));
                return { data: [] as any };
            });

            const { result } = renderHook(
                () =>
                    useCustomMethod("someMethod", {
                        params: {
                            myParam: "myParam",
                        },
                        meta: {
                            myMeta: "myMeta",
                        },
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            ...MockJSONServer.default,
                            customMethods: {
                                someMethod,
                            },
                        },
                        routerProvider: {
                            parse: () => () => ({
                                params: {
                                    routeParam: "routeParam",
                                },
                            }),
                        },
                    }),
                },
            );

            expect(result.current.isLoading).toBe(true);

            await waitFor(() => {
                return expect(result.current.isLoading).toBe(false);
            });

            expect(someMethod).toHaveBeenCalled();

            expect(someMethod).toHaveBeenCalledWith(
                expect.objectContaining({
                    meta: expect.objectContaining({
                        myMeta: "myMeta",
                        routeParam: "routeParam",
                    }),
                    params: expect.objectContaining({
                        myParam: "myParam",
                    }),
                }),
            );

            expect(result.current.data).toEqual({ data: [] });
        });

        it("should call `someMethod` as query with another data provider", async () => {
            const someMethod = jest.fn(async () => {
                await new Promise((resolve) => setTimeout(resolve, 300));
                return { data: [] as any };
            });

            const { result } = renderHook(
                () =>
                    useCustomMethod("someMethod", {
                        dataProviderName: "categories",
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            ...MockJSONServer,
                            categories: {
                                ...MockJSONServer.categories,
                                customMethods: {
                                    someMethod,
                                },
                            },
                        },
                    }),
                },
            );

            expect(result.current.isLoading).toBe(true);

            await waitFor(() => {
                return expect(result.current.isLoading).toBe(false);
            });

            expect(someMethod).toHaveBeenCalled();

            expect(someMethod).toHaveBeenCalledWith(
                expect.objectContaining({
                    meta: expect.objectContaining({}),
                    params: expect.objectContaining({}),
                }),
            );

            expect(result.current.data).toEqual({ data: [] });
        });
    });

    describe("as: query", () => {
        it("should call `someMethod` as query and return", async () => {
            const someMethod = jest.fn(async () => {
                await new Promise((resolve) => setTimeout(resolve, 300));
                return { data: [] as any };
            });

            const { result } = renderHook(
                () => useCustomMethod("someMethod", { as: "query" }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            ...MockJSONServer.default,
                            customMethods: {
                                someMethod,
                            },
                        },
                    }),
                },
            );

            expect(result.current.isLoading).toBe(true);

            await waitFor(() => {
                return expect(result.current.isLoading).toBe(false);
            });

            expect(someMethod).toHaveBeenCalled();

            expect(someMethod).toHaveBeenCalledWith(
                expect.objectContaining({
                    meta: expect.objectContaining({}),
                    params: expect.objectContaining({}),
                }),
            );

            expect(result.current.data).toEqual({ data: [] });
        });

        it("should throw an error if unknown method is called", async () => {
            const { result } = renderHook(
                () => useCustomMethod("unknownMethod", { as: "query" }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            ...MockJSONServer.default,
                        },
                    }),
                },
            );

            await waitFor(() => {
                return expect(result.current.isLoading).toBe(false);
            });

            await waitFor(() => {
                return expect(result.current.isError).toBe(true);
            });

            await waitFor(() => {
                return expect(result.current.error).toEqual(
                    new Error(
                        'Method "unknownMethod" is not found in dataProvider "default"',
                    ),
                );
            });
        });

        it("should call `someMethod` as query and send params + meta + router params as meta", async () => {
            const someMethod = jest.fn(async () => {
                await new Promise((resolve) => setTimeout(resolve, 300));
                return { data: [] as any };
            });

            const { result } = renderHook(
                () =>
                    useCustomMethod("someMethod", {
                        as: "query",
                        params: {
                            myParam: "myParam",
                        },
                        meta: {
                            myMeta: "myMeta",
                        },
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            ...MockJSONServer.default,
                            customMethods: {
                                someMethod,
                            },
                        },
                        routerProvider: {
                            parse: () => () => ({
                                params: {
                                    routeParam: "routeParam",
                                },
                            }),
                        },
                    }),
                },
            );

            expect(result.current.isLoading).toBe(true);

            await waitFor(() => {
                return expect(result.current.isLoading).toBe(false);
            });

            expect(someMethod).toHaveBeenCalled();

            expect(someMethod).toHaveBeenCalledWith(
                expect.objectContaining({
                    meta: expect.objectContaining({
                        myMeta: "myMeta",
                        routeParam: "routeParam",
                    }),
                    params: expect.objectContaining({
                        myParam: "myParam",
                    }),
                }),
            );

            expect(result.current.data).toEqual({ data: [] });
        });

        it("should call `someMethod` as query with another data provider", async () => {
            const someMethod = jest.fn(async () => {
                await new Promise((resolve) => setTimeout(resolve, 300));
                return { data: [] as any };
            });

            const { result } = renderHook(
                () =>
                    useCustomMethod("someMethod", {
                        as: "query",
                        dataProviderName: "categories",
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            ...MockJSONServer,
                            categories: {
                                ...MockJSONServer.categories,
                                customMethods: {
                                    someMethod,
                                },
                            },
                        },
                    }),
                },
            );

            expect(result.current.isLoading).toBe(true);

            await waitFor(() => {
                return expect(result.current.isLoading).toBe(false);
            });

            expect(someMethod).toHaveBeenCalled();

            expect(someMethod).toHaveBeenCalledWith(
                expect.objectContaining({
                    meta: expect.objectContaining({}),
                    params: expect.objectContaining({}),
                }),
            );

            expect(result.current.data).toEqual({ data: [] });
        });
    });

    describe("as: mutation", () => {
        it("should call `someMethod` as mutation and return", async () => {
            const someMethod = jest.fn(async () => {
                await new Promise((resolve) => setTimeout(resolve, 300));
                return { data: [] as any };
            });

            const { result } = renderHook(
                () => useCustomMethod("someMethod", { as: "mutation" }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            ...MockJSONServer.default,
                            customMethods: {
                                someMethod,
                            },
                        },
                    }),
                },
            );

            expect(result.current.isLoading).toBe(false);

            expect(result.current.data).toBeUndefined();

            act(() => {
                result.current.mutate({});
            });

            await waitFor(() => {
                return expect(result.current.isLoading).toBe(true);
            });

            await waitFor(() => {
                return expect(result.current.isLoading).toBe(false);
            });

            expect(someMethod).toHaveBeenCalled();

            expect(someMethod).toHaveBeenCalledWith(
                expect.objectContaining({
                    meta: expect.objectContaining({}),
                    params: expect.objectContaining({}),
                }),
            );

            expect(result.current.data).toEqual({ data: [] });
        });

        it("should not call `someMethod` with query, if as = mutation", async () => {
            const someMethod = jest.fn(async () => {
                await new Promise((resolve) => setTimeout(resolve, 300));
                return { data: [] as any };
            });

            const { result } = renderHook(
                () => useCustomMethod("someMethod", { as: "mutation" }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            ...MockJSONServer.default,
                            customMethods: {
                                someMethod,
                            },
                        },
                    }),
                },
            );

            expect(result.current.isLoading).toBe(false);

            expect(result.current.data).toBeUndefined();

            act(() => {
                result.current.mutate({});
            });

            await waitFor(() => {
                return expect(result.current.isLoading).toBe(true);
            });

            await waitFor(() => {
                return expect(result.current.isLoading).toBe(false);
            });

            expect(someMethod).toHaveBeenCalled();

            expect(someMethod).toHaveBeenCalledWith(
                expect.objectContaining({
                    meta: expect.objectContaining({}),
                    params: expect.objectContaining({}),
                }),
            );

            expect(result.current.data).toEqual({ data: [] });

            expect(someMethod).toHaveBeenCalledTimes(1);
        });

        it("should throw an error if unknown method is called", async () => {
            const { result } = renderHook(
                () => useCustomMethod("unknownMethod", { as: "mutation" }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            ...MockJSONServer.default,
                        },
                    }),
                },
            );

            expect(result.current.isLoading).toBe(false);

            expect(result.current.data).toBeUndefined();

            act(() => {
                result.current.mutate({});
            });

            await waitFor(() => {
                return expect(result.current.isLoading).toBe(false);
            });

            await waitFor(() => {
                return expect(result.current.isError).toBe(true);
            });

            await waitFor(() => {
                return expect(result.current.error).toEqual(
                    new Error(
                        'Method "unknownMethod" is not found in dataProvider "default"',
                    ),
                );
            });
        });

        it("should call `someMethod` as mutation and send params + meta + router params as meta", async () => {
            const someMethod = jest.fn(async () => {
                await new Promise((resolve) => setTimeout(resolve, 300));
                return { data: [] as any };
            });

            const { result } = renderHook(
                () =>
                    useCustomMethod("someMethod", {
                        as: "mutation",
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            ...MockJSONServer.default,
                            customMethods: {
                                someMethod,
                            },
                        },
                        routerProvider: {
                            parse: () => () => ({
                                params: {
                                    routeParam: "routeParam",
                                },
                            }),
                        },
                    }),
                },
            );

            expect(result.current.isLoading).toBe(false);

            expect(result.current.data).toBeUndefined();

            act(() => {
                result.current.mutate({
                    params: {
                        myParam: "myParam",
                    },
                    meta: {
                        myMeta: "myMeta",
                    },
                });
            });

            await waitFor(() => {
                return expect(result.current.isLoading).toBe(true);
            });

            await waitFor(() => {
                return expect(result.current.isLoading).toBe(false);
            });

            expect(someMethod).toHaveBeenCalled();

            expect(someMethod).toHaveBeenCalledWith(
                expect.objectContaining({
                    meta: expect.objectContaining({
                        myMeta: "myMeta",
                        routeParam: "routeParam",
                    }),
                    params: expect.objectContaining({
                        myParam: "myParam",
                    }),
                }),
            );

            expect(result.current.data).toEqual({ data: [] });
        });

        it("should call `someMethod` as mutation with another data provider", async () => {
            const someMethod = jest.fn(async () => {
                await new Promise((resolve) => setTimeout(resolve, 300));
                return { data: [] as any };
            });

            const { result } = renderHook(
                () =>
                    useCustomMethod("someMethod", {
                        as: "mutation",
                        dataProviderName: "categories",
                    }),
                {
                    wrapper: TestWrapper({
                        dataProvider: {
                            ...MockJSONServer,
                            categories: {
                                ...MockJSONServer.categories,
                                customMethods: {
                                    someMethod,
                                },
                            },
                        },
                    }),
                },
            );

            expect(result.current.isLoading).toBe(false);

            expect(result.current.data).toBeUndefined();

            act(() => {
                result.current.mutate({});
            });

            await waitFor(() => {
                return expect(result.current.isLoading).toBe(true);
            });

            await waitFor(() => {
                return expect(result.current.isLoading).toBe(false);
            });

            expect(someMethod).toHaveBeenCalled();

            expect(someMethod).toHaveBeenCalledWith(
                expect.objectContaining({
                    meta: expect.objectContaining({}),
                    params: expect.objectContaining({}),
                }),
            );

            expect(result.current.data).toEqual({ data: [] });
        });
    });
});
