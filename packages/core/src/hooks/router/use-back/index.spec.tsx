import React from "react";

import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper, mockRouterProvider } from "@test";

import { useBack } from "./";

describe("useBack Hook", () => {
  it("should return routerProvider back function", () => {
    const mockBack = jest.fn();

    const { result } = renderHook(() => useBack(), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
        dataProvider: MockJSONServer,
        routerProvider: mockRouterProvider({
          fns: {
            back: () => mockBack,
          },
        }),
      }),
    });

    result.current();

    expect(mockBack).toBeCalledTimes(1);
  });

  it("if routerProvider back function is not defined, should return undefined", () => {
    const { result } = renderHook(() => useBack(), {
      wrapper: TestWrapper({
        resources: [{ name: "posts" }],
        dataProvider: MockJSONServer,
        routerProvider: mockRouterProvider({
          fns: {
            back: undefined,
          },
        }),
      }),
    });

    const back = result.current();

    expect(back).toEqual(undefined);
  });

  it("if it is used outside of router provider, should return undefined", () => {
    jest.spyOn(React, "useContext").mockReturnValue(undefined);

    const { result } = renderHook(() => useBack());

    const back = result.current();

    expect(back).toEqual(undefined);
  });
});
