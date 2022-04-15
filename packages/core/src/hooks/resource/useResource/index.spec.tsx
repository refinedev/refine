import React from "react";

import { Route, Routes } from "react-router-dom";

import { renderHook } from "@testing-library/react-hooks";

import { MockJSONServer, TestWrapper } from "@test";

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

    it("should successfully return options value", async () => {
        const { result } = renderHook(() => useResource(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [
                    {
                        name: "posts",
                        options: {
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
                    options: {
                        isThatReallyWork: true,
                    },
                }),
            ]),
        );
    });
});

describe("useResource Hook without prop", () => {
    const Wrapper = TestWrapper({
        routerInitialEntries: ["/posts/edit/1"],
    });

    const WrapperWith: React.FC = ({ children }) => (
        <Wrapper>
            <Routes>
                <Route path="/:resource/:action/:id" element={children} />
            </Routes>
        </Wrapper>
    );

    it("should return posts as resourceName cause of inital resource", async () => {
        const { result } = renderHook(() => useResource(), {
            wrapper: WrapperWith,
        });

        expect(result.current.resourceName).toBe("posts");
    });

    it("should return resource which route is custom route", async () => {
        const Wrapper = TestWrapper({
            resources: [
                {
                    name: "posts",
                    options: { route: "custom-route-posts" },
                },
            ],
            routerInitialEntries: ["/posts"],
        });

        const WrapperWith: React.FC = ({ children }) => (
            <Wrapper>
                <Routes>
                    <Route path="/:resource" element={children} />
                </Routes>
            </Wrapper>
        );
        const { result } = renderHook(() => useResource(), {
            wrapper: WrapperWith,
        });

        expect(result.current.resource.options?.route).toBe(
            "custom-route-posts",
        );
    });
});

describe("useResource Hook with resourceName:propResourceName prop", () => {
    it("should return propResourceName as resourceName", async () => {
        const Wrapper = TestWrapper({
            routerInitialEntries: ["/posts"],
        });

        const WrapperWith: React.FC = ({ children }) => (
            <Wrapper>
                <Routes>
                    <Route path="/:resource" element={children} />
                </Routes>
            </Wrapper>
        );
        const { result } = renderHook(
            () => useResource({ resourceName: "categories" }),
            {
                wrapper: WrapperWith,
            },
        );

        expect(result.current.resourceName).toBe("categories");
    });
});

describe("useResource Hook with resourceNameOrRouteName prop", () => {
    it("should return propResourceName as resourceName", async () => {
        const Wrapper = TestWrapper({
            resources: [{ name: "refine-makes" }],
            routerInitialEntries: ["/posts"],
        });

        const WrapperWith: React.FC = ({ children }) => (
            <Wrapper>
                <Routes>
                    <Route path="/:resource" element={children} />
                </Routes>
            </Wrapper>
        );
        const { result } = renderHook(
            () => useResource({ resourceNameOrRouteName: "refine-makes" }),
            {
                wrapper: WrapperWith,
            },
        );

        expect(result.current.resourceName).toBe("refine-makes");
    });
});

describe("useResource Hook with recordItemId prop", () => {
    it("should return true id ", async () => {
        const Wrapper = TestWrapper({
            routerInitialEntries: ["/posts"],
        });

        const WrappeWith: React.FC = ({ children }) => (
            <Wrapper>
                <Routes>
                    <Route path="/:resource" element={children} />
                </Routes>
            </Wrapper>
        );
        const { result } = renderHook(
            () => useResource({ recordItemId: "1" }),
            {
                wrapper: WrappeWith,
            },
        );

        expect(result.current.id).toBe("1");
    });
});
