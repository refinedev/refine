import React from "react";

import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockRouterBindings } from "@test";

import { useResource } from "./";

describe("useResource Hook", () => {
    it("returns context value", async () => {
        const { result } = renderHook(() => useResource(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        expect(result.current.resources).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: "posts" }),
            ]),
        );
    });

    it("should successfully return meta value", async () => {
        const { result } = renderHook(() => useResource(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [
                    {
                        name: "posts",
                        meta: {
                            isThatReallyWork: true,
                        },
                    },
                ],
            }),
        });

        expect(result.current.resources).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "posts",
                    meta: {
                        isThatReallyWork: true,
                    },
                }),
            ]),
        );
    });
});

describe("useResource Hook without prop", () => {
    const Wrapper = TestWrapper({
        routerProvider: mockRouterBindings({
            pathname: "/posts/edit/1",
            resource: {
                name: "posts",
            },
            action: "edit",
            id: "1",
        }),
    });

    const WrapperWith: React.FC<{ children: React.ReactNode }> = ({
        children,
    }) => <Wrapper>{children}</Wrapper>;

    it("should return posts as resourceName cause of inital resource", async () => {
        const { result } = renderHook(() => useResource(), {
            wrapper: WrapperWith,
        });

        expect(result.current.resourceName).toBe("posts");
        expect(result.current.action).toBe("edit");
    });

    it("should return resource which route is custom route", async () => {
        const Wrapper = TestWrapper({
            resources: [
                {
                    name: "posts",
                    meta: { route: "custom-route-posts" },
                },
            ],
            routerProvider: mockRouterBindings({
                pathname: "/custom-route-posts",
                resource: {
                    name: "posts",
                    meta: { route: "custom-route-posts" },
                },
                action: "list",
            }),
        });

        const WrapperWith: React.FC<{ children: React.ReactNode }> = ({
            children,
        }) => <Wrapper>{children}</Wrapper>;
        const { result } = renderHook(() => useResource(), {
            wrapper: WrapperWith,
        });

        expect(result.current.resource?.meta?.route).toBe("custom-route-posts");

        expect(result.current.action).toBe("list");
    });
});

describe("useResource Hook with resourceName:propResourceName prop", () => {
    it("should return propResourceName as resourceName", async () => {
        const Wrapper = TestWrapper({
            routerProvider: mockRouterBindings({
                pathname: "/posts",
                resource: {
                    name: "posts",
                },
                action: "list",
            }),
        });

        const WrapperWith: React.FC<{ children: React.ReactNode }> = ({
            children,
        }) => <Wrapper>{children}</Wrapper>;
        const { result } = renderHook(
            () => useResource({ resourceName: "categories" }),
            {
                wrapper: WrapperWith,
            },
        );

        expect(result.current.action).toBe("list");
    });
});

describe("useResource Hook with resourceNameOrRouteName prop", () => {
    it("should return propResourceName as resourceName", async () => {
        const Wrapper = TestWrapper({
            resources: [{ name: "refine-makes" }],
            routerProvider: mockRouterBindings({
                pathname: "/refine-makes",
                resource: {
                    name: "refine-makes",
                },
                action: "list",
            }),
        });

        const WrapperWith: React.FC<{ children: React.ReactNode }> = ({
            children,
        }) => <Wrapper>{children}</Wrapper>;
        const { result } = renderHook(
            () => useResource({ resourceNameOrRouteName: "refine-makes" }),
            {
                wrapper: WrapperWith,
            },
        );

        expect(result.current.resource?.name).toBe("refine-makes");
        expect(result.current.action).toBe("list");
    });
});
