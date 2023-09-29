import React from "react";
import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockRouterBindings } from "@test";

import { Resource, findToPathFromResource, useGo } from "./";

describe("useGo Hook", () => {
    it("should return routerProvider go function", () => {
        const mockGo = jest.fn();

        const { result } = renderHook(() => useGo(), {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
                dataProvider: MockJSONServer,
                routerProvider: mockRouterBindings({
                    fns: {
                        go: () => mockGo,
                    },
                }),
            }),
        });

        result.current({
            to: "/posts",
            hash: "#test",
            type: "push",
            query: {
                test: "test",
            },
            options: {
                keepHash: true,
                keepQuery: false,
            },
        });

        expect(mockGo).toBeCalledWith({
            hash: "#test",
            options: { keepHash: true, keepQuery: false },
            query: { test: "test" },
            to: "/posts",
            type: "push",
        });
    });

    it("if routerProvider go function is not defined, should return undefined", () => {
        const { result } = renderHook(() => useGo(), {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
                dataProvider: MockJSONServer,
                routerProvider: mockRouterBindings({
                    fns: {
                        go: undefined,
                    },
                }),
            }),
        });

        const go = result.current({ to: "/posts" });

        expect(go).toEqual(undefined);
    });

    it("if it is used outside of router provider, should return undefined", () => {
        jest.spyOn(React, "useContext").mockReturnValueOnce(undefined);

        const { result } = renderHook(() => useGo());

        const go = result.current({ to: "/posts" });

        expect(go).toEqual(undefined);
    });

    it("should return the correct URL for a resource", () => {
        const mockGo = jest.fn();

        const { result } = renderHook(() => useGo(), {
            wrapper: TestWrapper({
                resources: [
                    {
                        name: "posts",
                        list: "/posts",
                        create: "/posts/create",
                        edit: "/posts/:id/edit",
                        show: "/posts/:id",
                        clone: "/posts/:id/clone",
                    },
                ],
                dataProvider: MockJSONServer,
                routerProvider: mockRouterBindings({
                    fns: {
                        go: () => mockGo,
                    },
                }),
            }),
        });

        const go = result.current;

        go({
            to: {
                resource: "posts",
                action: "list",
            },
        });
        expect(mockGo).toBeCalledWith({ to: "/posts" });

        go({
            to: {
                resource: "posts",
                action: "create",
            },
        });
        expect(mockGo).toBeCalledWith({ to: "/posts/create" });

        go({
            to: {
                resource: "posts",
                action: "edit",
                id: 1,
            },
        });
        expect(mockGo).toBeCalledWith({ to: "/posts/1/edit" });

        go({
            to: {
                resource: "posts",
                action: "show",
                id: 1,
            },
        });
        expect(mockGo).toBeCalledWith({ to: "/posts/1" });

        go({
            to: {
                resource: "posts",
                action: "clone",
                id: 1,
            },
        });
        expect(mockGo).toBeCalledWith({ to: "/posts/1/clone" });
    });

    it("should throw an error if the resource is not defined", () => {
        const { result } = renderHook(() => useGo(), {
            wrapper: TestWrapper({
                resources: [{ name: "posts" }],
                dataProvider: MockJSONServer,
                routerProvider: mockRouterBindings({
                    fns: {
                        go: () => () => undefined,
                    },
                }),
            }),
        });

        expect(() =>
            result.current({
                to: {
                    resource: "users",
                    action: "list",
                },
            }),
        ).toThrowError(
            "[useGo]: [action: list] is not defined for [resource: users]",
        );
    });
});

describe("findToPathFromResource", () => {
    const resource = {
        name: "posts",
        list: "/posts",
        create: "/posts/create",
        edit: "/posts/:id/edit",
        show: "/posts/:id",
        clone: "/posts/:id/clone",
    };

    it('should throw an error if "id" is not defined for "edit", "show", or "clone" actions', () => {
        expect(() =>
            findToPathFromResource(
                { resource: "posts", action: "edit" } as unknown as Resource,
                resource,
            ),
        ).toThrowError('[useGo]: [action: edit] requires an "id" for resource');
        expect(() =>
            findToPathFromResource(
                { resource: "posts", action: "show" } as unknown as Resource,
                resource,
            ),
        ).toThrowError('[useGo]: [action: show] requires an "id" for resource');
        expect(() =>
            findToPathFromResource(
                { resource: "posts", action: "clone" } as unknown as Resource,
                resource,
            ),
        ).toThrowError(
            '[useGo]: [action: clone] requires an "id" for resource',
        );
    });

    it("should throw an error if the action URL is not defined for the given action", () => {
        expect(() =>
            findToPathFromResource(
                { resource: "posts", action: "create" },
                { ...resource, create: undefined },
            ),
        ).toThrowError(
            "[useGo]: [action: create] is not defined for [resource: posts]",
        );
    });

    it('should return the correct URL for "edit", "show", and "clone" actions', () => {
        expect(
            findToPathFromResource(
                { resource: "posts", action: "edit", id: 1 },
                resource,
            ),
        ).toEqual("/posts/1/edit");
        expect(
            findToPathFromResource(
                { resource: "posts", action: "show", id: 1 },
                resource,
            ),
        ).toEqual("/posts/1");
        expect(
            findToPathFromResource(
                { resource: "posts", action: "clone", id: 1 },
                resource,
            ),
        ).toEqual("/posts/1/clone");
    });
});
