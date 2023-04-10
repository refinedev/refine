import React from "react";
import { renderHook } from "@testing-library/react";

import { TestWrapper, mockRouterBindings } from "@test";
import { useMeta } from "./";

describe("useMeta Hook", () => {
    it("should return the resource meta", () => {
        const { result } = renderHook(
            () =>
                useMeta({
                    resource: "posts",
                }),
            {
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
            },
        );

        expect(result.current).toEqual({
            foo: "bar",
            lorem: "ipsum",
        });
    });

    it("should return the params from the router in the meta", () => {
        const { result } = renderHook(
            () =>
                useMeta({
                    resource: "posts",
                }),
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                    routerProvider: mockRouterBindings({
                        params: { id: "123", authorId: "456" },
                    }),
                }),
            },
        );

        expect(result.current).toEqual({
            id: "123",
            authorId: "456",
        });
    });

    it("should return the meta from the props", () => {
        const { result } = renderHook(
            () =>
                useMeta({
                    resource: "posts",
                    meta: {
                        foo: "bar",
                        lorem: "ipsum",
                    },
                }),
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );

        expect(result.current).toEqual({
            foo: "bar",
            lorem: "ipsum",
        });
    });

    it("should return the combined meta from the resource, router and props", () => {
        const { result } = renderHook(
            () =>
                useMeta({
                    resource: "posts",
                    meta: {
                        lorem: "ipsum",
                    },
                }),
            {
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
            },
        );

        expect(result.current).toEqual({
            foo: "bar",
            lorem: "ipsum",
            authorId: "123",
        });
    });

    it("should be prioritized in the order: props, router, resource", () => {
        const { result } = renderHook(
            () =>
                useMeta({
                    resource: "posts",
                }),
            {
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
            },
        );

        expect(result.current).toEqual({
            foo: "qux",
        });

        const { result: result2 } = renderHook(
            () =>
                useMeta({
                    resource: "posts",
                    meta: {
                        foo: "bar",
                    },
                }),
            {
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
            },
        );

        expect(result2.current).toEqual({
            foo: "bar",
        });
    });

    it("should not return the icon prop of resource meta", () => {
        const { result } = renderHook(
            () =>
                useMeta({
                    resource: "posts",
                }),
            {
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
            },
        );

        expect(result.current).toEqual({});
    });
});
