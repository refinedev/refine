import { vi } from "vitest";

// Mock the useQueryClient hook before imports
const mockInvalidateQueries = vi.fn();
vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useQueryClient: () => ({
      invalidateQueries: mockInvalidateQueries,
    }),
  };
});

import { renderHook } from "@testing-library/react";

import { TestWrapper } from "@test";

import { useInvalidate } from ".";
import type { IQueryKeys } from "../../contexts/data/types";

describe("useInvalidate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([undefined, false, true])(
    "passes cancelRefetch %s as options for every invalidation key",
    async (cancelRefetch) => {
      const { result } = renderHook(() => useInvalidate(), {
        wrapper: TestWrapper({}),
      });
      const invalidationOptions =
        cancelRefetch === undefined ? undefined : { cancelRefetch };

      await result.current({
        resource: "posts",
        invalidates: ["all", "list", "many", "resourceAll", "detail"],
        dataProviderName: "rest",
        id: "1",
        invalidationFilters: { type: "active", refetchType: "none" },
        invalidationOptions,
      });

      expect(mockInvalidateQueries).toHaveBeenCalledTimes(5);
      for (const [filters, options] of mockInvalidateQueries.mock.calls) {
        expect(filters).toEqual({
          queryKey: expect.any(Array),
          type: "active",
          refetchType: "none",
        });
        expect(filters).not.toHaveProperty("cancelRefetch");
        expect(options).toEqual({ cancelRefetch: cancelRefetch ?? false });
      }
    },
  );

  it("with empty invalidations array", async () => {
    const { result } = renderHook(() => useInvalidate(), {
      wrapper: TestWrapper({}),
    });

    result.current({
      resource: "posts",
      invalidates: [],
      dataProviderName: "rest",
      id: "1",
    });

    expect(mockInvalidateQueries).not.toHaveBeenCalled();
  });

  it("with false invalidation", async () => {
    const { result } = renderHook(() => useInvalidate(), {
      wrapper: TestWrapper({}),
    });

    result.current({
      resource: "posts",
      invalidates: false,
      dataProviderName: "rest",
      id: "1",
    });

    expect(mockInvalidateQueries).not.toHaveBeenCalled();
  });

  it("with list invalidation", async () => {
    const { result } = renderHook(() => useInvalidate(), {
      wrapper: TestWrapper({}),
    });

    result.current({
      resource: "posts",
      invalidates: ["list"],
      dataProviderName: "rest",
    });

    expect(mockInvalidateQueries).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["data", "rest", "posts", "list"],
      }),
      { cancelRefetch: false },
    );
  });

  it("with detail invalidation", async () => {
    const { result } = renderHook(() => useInvalidate(), {
      wrapper: TestWrapper({}),
    });

    result.current({
      resource: "posts",
      invalidates: ["list", "detail"],
      dataProviderName: "rest",
      id: "1",
    });

    expect(mockInvalidateQueries).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["data", "rest", "posts", "list"],
      }),
      { cancelRefetch: false },
    );

    expect(mockInvalidateQueries).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["data", "rest", "posts", "one", "1"],
      }),
      { cancelRefetch: false },
    );
  });

  it("with 'all' invalidation", async () => {
    const { result } = renderHook(() => useInvalidate(), {
      wrapper: TestWrapper({}),
    });

    await result.current({
      resource: "posts",
      invalidates: ["detail", "all", "list", "many", "resourceAll"],
      dataProviderName: "rest",
      id: "1",
    });

    expect(mockInvalidateQueries).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["data", "rest", "posts", "one", "1"],
      }),
      { cancelRefetch: false },
    );
    expect(mockInvalidateQueries).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["data", "rest"],
      }),
      { cancelRefetch: false },
    );
    expect(mockInvalidateQueries).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["data", "rest", "posts", "list"],
      }),
      { cancelRefetch: false },
    );
    expect(mockInvalidateQueries).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["data", "rest", "posts", "many"],
      }),
      { cancelRefetch: false },
    );
  });

  it("with 'wrong invalidate key' ", async () => {
    const { result } = renderHook(() => useInvalidate(), {
      wrapper: TestWrapper({}),
    });

    result.current({
      resource: "posts",
      invalidates: ["wrong-key"] as unknown as (keyof IQueryKeys)[],
      dataProviderName: "rest",
      id: "1",
    });

    expect(mockInvalidateQueries).not.toHaveBeenCalled();
  });
});
