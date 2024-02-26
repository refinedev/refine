import React from "react";
import { renderHook } from "@testing-library/react";

import { TestWrapper } from "@test";

import { useTitle } from ".";
import { defaultRefineOptions } from "@contexts/refine";

describe("useTitle Hook", () => {
  it("returns context correct value", async () => {
    const { result } = renderHook(() => useTitle(), {
      wrapper: TestWrapper({
        refineProvider: {
          hasDashboard: false,
          ...defaultRefineOptions,
          options: defaultRefineOptions,
          Title: () => <div>title</div>,
        },
        resources: [{ name: "posts" }],
      }),
    });

    expect(result.current?.({ collapsed: false })).toEqual(<div>title</div>);
  });
});
