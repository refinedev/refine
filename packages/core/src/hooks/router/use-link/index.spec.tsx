import React from "react";

import { render, renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockRouterProvider } from "@test";

import { useLink } from "./";

describe("useLink Hook", () => {
  it("should return routerProvider Link compotent", () => {
    const mockLink = jest.fn();

    const { result } = renderHook(() => useLink(), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
        dataProvider: MockJSONServer,
        routerProvider: mockRouterProvider({
          fns: {
            Link: mockLink,
          },
        }),
      }),
    });

    expect(result.current).toEqual(mockLink);
  });

  it("if routerProvider go function is not defined, should return undefined", () => {
    const { result } = renderHook(() => useLink(), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
        dataProvider: MockJSONServer,
        routerProvider: mockRouterProvider({
          fns: {
            Link: undefined,
          },
        }),
      }),
    });

    const Link = result.current;

    const { container } = render(<Link to="/posts" />);

    expect(container.querySelector("a")?.getAttribute("href")).toEqual(
      "/posts",
    );
  });

  it("if it is used outside of router provider, should return undefined", () => {
    jest.spyOn(React, "useContext").mockReturnValue(undefined);

    const { result } = renderHook(() => useLink());

    const Link = result.current;

    const { container } = render(<Link to="/posts" />);

    expect(container.querySelector("a")?.getAttribute("href")).toEqual(
      "/posts",
    );
  });
});
