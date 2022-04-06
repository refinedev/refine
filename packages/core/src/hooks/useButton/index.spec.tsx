import { Route } from "react-router-dom";

import { renderHook } from "@testing-library/react-hooks";

import { TestWrapper } from "@test";

import { useButton } from "../useButton";
import React from "react";

describe("useButton Hook without prop", () => {
    const Wrapper = TestWrapper({
        routerInitialEntries: ["/posts/edit/1"],
    });

    const WrapperWith: React.FC = ({ children }) => (
        <Wrapper>
            <Route path="/:resource/:action/:id">{children}</Route>
        </Wrapper>
    );

    it("should return posts as resourceName cause of inital resource", async () => {
        const { result } = renderHook(() => useButton(), {
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
                <Route path="/:resource">{children}</Route>
            </Wrapper>
        );
        const { result } = renderHook(() => useButton(), {
            wrapper: WrapperWith,
        });

        expect(result.current.resource.route).toBe("custom-route-posts");
    });
});

describe("useButton Hook with resourceName:propResourceName prop", () => {
    it("should return propResourceName as resourceName", async () => {
        const Wrapper = TestWrapper({
            routerInitialEntries: ["/posts"],
        });

        const WrapperWith: React.FC = ({ children }) => (
            <Wrapper>
                <Route path="/:resource">{children}</Route>
            </Wrapper>
        );
        const { result } = renderHook(
            () => useButton({ propResourceName: "categories" }),
            {
                wrapper: WrapperWith,
            },
        );

        expect(result.current.resourceName).toBe("categories");
    });
});

describe("useButton Hook with resourceNameOrRouteName prop", () => {
    it("should return propResourceName as resourceName", async () => {
        const Wrapper = TestWrapper({
            resources: [{ name: "refine-makes" }],
            routerInitialEntries: ["/posts"],
        });

        const WrapperWith: React.FC = ({ children }) => (
            <Wrapper>
                <Route path="/:resource">{children}</Route>
            </Wrapper>
        );
        const { result } = renderHook(
            () => useButton({ resourceNameOrRouteName: "refine-makes" }),
            {
                wrapper: WrapperWith,
            },
        );

        expect(result.current.resourceName).toBe("refine-makes");
    });
});

describe("useButton Hook with recordItemId prop", () => {
    it("should return true id ", async () => {
        const Wrapper = TestWrapper({
            routerInitialEntries: ["/posts"],
        });

        const WrappeWith: React.FC = ({ children }) => (
            <Wrapper>
                <Route path="/:resource">{children}</Route>
            </Wrapper>
        );
        const { result } = renderHook(() => useButton({ recordItemId: "1" }), {
            wrapper: WrappeWith,
        });

        expect(result.current.id).toBe("1");
    });
});
