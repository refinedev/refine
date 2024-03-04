import { renderHook, waitFor } from "@testing-library/react";

import { TestWrapper, act } from "@test";

import { useId } from ".";

import { mockRouterBindings } from "@test";

describe("useId Hook", () => {
  it("returns id from props", () => {
    const { result } = renderHook(() => useId({ id: "123" }), {
      wrapper: TestWrapper({}),
    });

    const [id, _setId] = result.current;

    expect(id).toBe("123");
  });

  it("id from props precedes id from route", () => {
    const { result } = renderHook(() => useId({ id: "123" }), {
      wrapper: TestWrapper({
        routerProvider: mockRouterBindings({
          resource: {
            name: "posts",
          },
          id: "456",
        }),
      }),
    });

    const [id, _setId] = result.current;

    expect(id).toBe("123");
  });

  it("returns id from route", () => {
    const { result } = renderHook(() => useId(), {
      wrapper: TestWrapper({
        routerProvider: mockRouterBindings({
          resource: {
            name: "posts",
          },
          id: "123",
        }),
      }),
    });

    const [id, _setId] = result.current;

    expect(id).toBe("123");
  });

  it("returns id from props when a different resource is passed", () => {
    const { result } = renderHook(
      () => useId({ id: "3", resource: "categories" }),
      {
        wrapper: TestWrapper({
          routerProvider: mockRouterBindings({
            resource: {
              name: "posts",
            },
            id: "123",
          }),
        }),
      },
    );

    const [id, _setId] = result.current;

    expect(id).toBe("3");
  });

  it("returns id from route when same resource is passed", () => {
    const { result } = renderHook(() => useId({ resource: "posts" }), {
      wrapper: TestWrapper({
        routerProvider: mockRouterBindings({
          resource: {
            name: "posts",
          },
          id: "123",
        }),
      }),
    });

    const [id, _setId] = result.current;

    expect(id).toBe("123");
  });

  it("returns new id when set with setId", async () => {
    const { result } = renderHook(() => useId({ id: "123" }), {
      wrapper: TestWrapper({}),
    });

    const [id, setId] = result.current;

    expect(id).toBe("123");

    act(() => {
      setId("456");
    });

    await waitFor(() => expect(result.current[0]).toBe("456"));
  });

  it("returns undefined when custom resource is passed without id", () => {
    const { result } = renderHook(() => useId({ resource: "categories" }), {
      wrapper: TestWrapper({
        routerProvider: mockRouterBindings({
          resource: {
            name: "posts",
          },
          id: "123",
        }),
      }),
    });

    const [id, _setId] = result.current;

    expect(id).toBeUndefined();
  });
});
