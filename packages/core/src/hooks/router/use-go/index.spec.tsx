import React from "react";
import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockRouterBindings } from "@test";

import { useGo } from "./";

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
        jest.spyOn(React, "useContext").mockReturnValue(undefined);

        const { result } = renderHook(() => useGo());

        const go = result.current({ to: "/posts" });

        expect(go).toEqual(undefined);
    });
});
