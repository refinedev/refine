import * as ReactQuery from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";

import { TestWrapper } from "@test";

import { useInvalidate } from ".";
import type { IQueryKeys } from "../../contexts/data/types";

describe("useInvalidate", () => {
  it("with empty invalidations array", async () => {
    const dispatch = jest.fn();
    const useReducerSpy = jest.spyOn(ReactQuery, "useQueryClient");

    useReducerSpy.mockImplementation(
      () =>
        ({
          invalidateQueries: dispatch,
        }) as any,
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
        }) as any,
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
        }) as any,
    );

    const { result } = renderHook(() => useInvalidate(), {
      wrapper: TestWrapper({}),
    });

    result.current({
      resource: "posts",
      invalidates: ["list"],
      dataProviderName: "rest",
    });

    expect(dispatch).toBeCalledWith(
      ["rest", "posts", "list"],
      expect.anything(),
      expect.anything(),
    );
  });

  it("with detail invalidation", async () => {
    const dispatch = jest.fn();
    const useReducerSpy = jest.spyOn(ReactQuery, "useQueryClient");

    useReducerSpy.mockImplementation(
      () =>
        ({
          invalidateQueries: dispatch,
        }) as any,
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

    expect(dispatch).toHaveBeenCalledWith(
      expect.arrayContaining(["rest", "posts", "list"]),
      expect.anything(),
      expect.anything(),
    );

    expect(dispatch).toHaveBeenCalledWith(
      expect.arrayContaining(["rest", "posts", "detail", "1"]),
      expect.anything(),
      expect.anything(),
    );
  });

  it("with 'all' invalidation", async () => {
    const dispatch = jest.fn();
    const useReducerSpy = jest.spyOn(ReactQuery, "useQueryClient");

    useReducerSpy.mockImplementation(
      () =>
        ({
          invalidateQueries: dispatch,
        }) as any,
    );

    const { result } = renderHook(() => useInvalidate(), {
      wrapper: TestWrapper({}),
    });

    await result.current({
      resource: "posts",
      invalidates: ["detail", "all", "list", "many", "resourceAll"],
      dataProviderName: "rest",
      id: "1",
    });

    expect(dispatch).toBeCalledWith(
      expect.arrayContaining(["rest", "posts", "detail", "1"]),
      expect.anything(),
      expect.anything(),
    );
    expect(dispatch).toBeCalledWith(
      expect.arrayContaining(["rest"]),
      expect.anything(),
      expect.anything(),
    );
    expect(dispatch).toBeCalledWith(
      expect.arrayContaining(["rest", "posts"]),
      expect.anything(),
      expect.anything(),
    );
    expect(dispatch).toBeCalledWith(
      expect.arrayContaining(["rest", "posts", "list"]),
      expect.anything(),
      expect.anything(),
    );
    expect(dispatch).toBeCalledWith(
      expect.arrayContaining(["rest", "posts", "getMany"]),
      expect.anything(),
      expect.anything(),
    );
  });

  it("with 'wrong invalidate key' ", async () => {
    const dispatch = jest.fn();
    const useReducerSpy = jest.spyOn(ReactQuery, "useQueryClient");

    useReducerSpy.mockImplementation(
      () =>
        ({
          invalidateQueries: dispatch,
        }) as any,
    );

    const { result } = renderHook(() => useInvalidate(), {
      wrapper: TestWrapper({}),
    });

    result.current({
      resource: "posts",
      invalidates: ["wrong-key"] as unknown as (keyof IQueryKeys)[],
      dataProviderName: "rest",
      id: "1",
    });

    expect(dispatch).not.toBeCalled();
  });
});
