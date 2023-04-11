import React from "react";
import { renderHook } from "@testing-library/react";

import { TestWrapper, mockRouterBindings } from "@test";
import { useMeta } from "./";

describe("useMeta Hook", () => {
    it("should return the resource meta", () => {
        const { result } = renderHook(() => useMeta(), {
            wrapper: TestWrapper({
                resources: [
                    {
                        name: "posts",
                        meta: {
                            foo: "bar",
                            lorem: "ipsum",
                        },
                    },
                ],
            }),
        });

        const combinedMeta = result.current({ resource: "posts" });

        expect(combinedMeta).toEqual({
            foo: "bar",
            lorem: "ipsum",
        });
    });

    it("should return the params from the router in the meta", () => {
        const { result } = renderHook(() => useMeta(), {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
                routerProvider: mockRouterBindings({
                    params: { id: "123", authorId: "456" },
                }),
            }),
        });

        const combinedMeta = result.current({ resource: "posts" });

        expect(combinedMeta).toEqual({
            id: "123",
            authorId: "456",
        });
    });

    it("should return the meta from the props", () => {
        const { result } = renderHook(() => useMeta(), {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
            }),
        });

        const combinedMeta = result.current({
            resource: "posts",
            meta: {
                foo: "bar",
                lorem: "ipsum",
            },
        });

        expect(combinedMeta).toEqual({
            foo: "bar",
            lorem: "ipsum",
        });
    });

    it("should return the combined meta from the resource, router and props", () => {
        const { result } = renderHook(() => useMeta(), {
            wrapper: TestWrapper({
                resources: [
                    {
                        name: "posts",
                        meta: {
                            foo: "bar",
                        },
                    },
                ],
                routerProvider: mockRouterBindings({
                    params: { authorId: "123" },
                }),
            }),
        });

        const combinedMeta = result.current({
            resource: "posts",
            meta: {
                lorem: "ipsum",
            },
        });

        expect(combinedMeta).toEqual({
            foo: "bar",
            lorem: "ipsum",
            authorId: "123",
        });
    });

    it("should be prioritized in the order: props, router, resource", () => {
        const { result } = renderHook(() => useMeta(), {
            wrapper: TestWrapper({
                resources: [
                    {
                        name: "posts",
                        meta: {
                            foo: "baz",
                        },
                    },
                ],
                routerProvider: mockRouterBindings({
                    params: { foo: "qux" },
                }),
            }),
        });

        const combinedMeta = result.current({
            resource: "posts",
        });

        expect(combinedMeta).toEqual({
            foo: "qux",
        });

        const { result: result2 } = renderHook(() => useMeta(), {
            wrapper: TestWrapper({
                resources: [
                    {
                        name: "posts",
                        meta: {
                            foo: "baz",
                        },
                    },
                ],
                routerProvider: mockRouterBindings({
                    params: { foo: "qux" },
                }),
            }),
        });
        const combinedMeta2 = result2.current({
            resource: "posts",
            meta: {
                foo: "bar",
            },
        });

        expect(combinedMeta2).toEqual({
            foo: "bar",
        });
    });

    it("should not return the icon prop of resource meta", () => {
        const { result } = renderHook(() => useMeta(), {
            wrapper: TestWrapper({
                resources: [
                    {
                        name: "posts",
                        meta: {
                            icon: <span>🌙</span>,
                        },
                    },
                ],
            }),
        });

        const combinedData = result.current({ resource: "posts" });

        expect(combinedData).toEqual({});
    });

    it("should return the resource meta when defined the `identifier` prop", () => {
        const { result } = renderHook(() => useMeta(), {
            wrapper: TestWrapper({
                resources: [
                    { name: "posts", identifier: "foo", meta: { foo: "baz" } },
                ],
                routerProvider: mockRouterBindings({
                    params: { id: "123", authorId: "456" },
                }),
            }),
        });

        const combinedMeta = result.current({
            resource: "foo",
        });

        expect(combinedMeta).toEqual({
            id: "123",
            authorId: "456",
            foo: "baz",
        });
    });
});
