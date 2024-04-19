import { renderHook } from "@testing-library/react";

import { TestWrapper } from "@test";

import { useGetToPath } from "./";

describe("useGetToPath Hook", () => {
  it("should return undefined if not found resource", () => {
    const { result } = renderHook(() => useGetToPath(), {
      wrapper: TestWrapper({}),
    });

    const path = result.current({
      action: "list",
    });

    expect(path).toEqual(undefined);
  });

  it("should return action path if resource has action path", () => {
    const { result } = renderHook(() => useGetToPath(), {
      wrapper: TestWrapper({}),
    });

    const path = result.current({
      action: "list",
      resource: { name: "posts", list: "/posts" },
    });

    expect(path).toEqual("/posts");
  });

  it("should return undefined if resource has not action path", () => {
    const { result } = renderHook(() => useGetToPath(), {
      wrapper: TestWrapper({}),
    });

    const path = result.current({
      action: "list",
      resource: { name: "posts" },
    });

    expect(path).toEqual(undefined);
  });
});
