import { TestWrapper } from "@test";
import { renderHook } from "@testing-library/react-hooks";
import { useInvalidate } from ".";

import * as ReactQuery from "react-query";

describe("useInvalidate", () => {
    it("with empty invalidations array", async () => {
        const dispatch = jest.fn();
        const useReducerSpy = jest.spyOn(ReactQuery, "useQueryClient");

        useReducerSpy.mockImplementation(
            () =>
                ({
                    invalidateQueries: dispatch,
                } as any),
        );

        const { result } = renderHook(() => useInvalidate(), {
            wrapper: TestWrapper({}),
        });

        result.current({
            resource: "posts",
            invalidates: [],
            dataProviderName: "rest",
            id: "1",
        });

        expect(dispatch).not.toBeCalled();
    });

    it("with false invalidation", async () => {
        const dispatch = jest.fn();
        const useReducerSpy = jest.spyOn(ReactQuery, "useQueryClient");

        useReducerSpy.mockImplementation(
            () =>
                ({
                    invalidateQueries: dispatch,
                } as any),
        );

        const { result } = renderHook(() => useInvalidate(), {
            wrapper: TestWrapper({}),
        });

        result.current({
            resource: "posts",
            invalidates: false,
            dataProviderName: "rest",
            id: "1",
        });

        expect(dispatch).not.toBeCalled();
    });

    it("with list invalidation", async () => {
        const dispatch = jest.fn();
        const useReducerSpy = jest.spyOn(ReactQuery, "useQueryClient");

        useReducerSpy.mockImplementation(
            () =>
                ({
                    invalidateQueries: dispatch,
                } as any),
        );

        const { result } = renderHook(() => useInvalidate(), {
            wrapper: TestWrapper({}),
        });

        result.current({
            resource: "posts",
            invalidates: ["list"],
            dataProviderName: "rest",
        });

        expect(dispatch).toBeCalledWith(["rest", "posts", "list", {}]);
    });

    it("with detail invalidation", async () => {
        const dispatch = jest.fn();
        const useReducerSpy = jest.spyOn(ReactQuery, "useQueryClient");

        useReducerSpy.mockImplementation(
            () =>
                ({
                    invalidateQueries: dispatch,
                } as any),
        );

        const { result } = renderHook(() => useInvalidate(), {
            wrapper: TestWrapper({}),
        });

        result.current({
            resource: "posts",
            invalidates: ["list", "detail"],
            dataProviderName: "rest",
            id: "1",
        });

        expect(dispatch).toBeCalledWith(["rest", "posts", "list", {}]);

        expect(dispatch).toBeCalledWith(["rest", "posts", "detail", "1", {}]);
    });

    it("with 'all' invalidation", async () => {
        const dispatch = jest.fn();
        const useReducerSpy = jest.spyOn(ReactQuery, "useQueryClient");

        useReducerSpy.mockImplementation(
            () =>
                ({
                    invalidateQueries: dispatch,
                } as any),
        );

        const { result } = renderHook(() => useInvalidate(), {
            wrapper: TestWrapper({}),
        });

        result.current({
            resource: "posts",
            invalidates: ["detail", "all", "list", "many", "resourceAll"],
            dataProviderName: "rest",
            id: "1",
        });

        expect(dispatch).toBeCalledWith(["rest"]);
        expect(dispatch).toBeCalledWith(["rest", "posts"]);
        expect(dispatch).toBeCalledWith(["rest", "posts", "list", {}]);
        expect(dispatch).toBeCalledWith(["rest", "posts", "getMany", {}]);
        expect(dispatch).toBeCalledWith(["rest", "posts", "detail", "1", {}]);
    });
});
