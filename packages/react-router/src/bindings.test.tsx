import React from "react";
import { act, renderHook } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";

import { routerProvider } from "./bindings";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter initialEntries={["/posts"]}>
    <Routes>
      <Route path="*" element={children} />
    </Routes>
  </MemoryRouter>
);

const renderBindings = () =>
  renderHook(
    () => ({
      go: routerProvider.go!(),
      parse: routerProvider.parse!(),
    }),
    { wrapper },
  );

describe("routerProvider query sync", () => {
  it.each([
    ["a plus sign", "alice+amazon@gmail.com"],
    ["an ampersand", "Tom & Jerry"],
    ["a hash", "issue #42"],
    ["a percent sign", "50% off"],
  ])(
    "keeps a filter value with %s after go and parse",
    async (_label, value) => {
      const { result } = renderBindings();

      await act(async () => {
        result.current.go({
          to: "/posts",
          type: "push",
          query: {
            filters: [{ field: "title", operator: "contains", value }],
          },
        });
      });

      const { params } = result.current.parse();

      expect(params?.filters).toEqual([
        { field: "title", operator: "contains", value },
      ]);
    },
  );

  it("keeps the `to` query param round trip", async () => {
    const { result } = renderBindings();

    await act(async () => {
      result.current.go({
        to: "/login",
        type: "push",
        query: { to: "/posts?currentPage=2" },
      });
    });

    expect(result.current.parse().params?.to).toBe("/posts?currentPage=2");
  });

  it("builds the same readable path for keys and the `to` param", () => {
    const { result } = renderBindings();

    expect(
      result.current.go({
        to: "/posts",
        type: "path",
        query: {
          to: "/posts?currentPage=2",
          filters: [{ field: "title", operator: "eq", value: "a+b" }],
        },
      }),
    ).toBe(
      "/posts?to=%2Fposts%3FcurrentPage%3D2&filters[0][field]=title&filters[0][operator]=eq&filters[0][value]=a%2Bb",
    );
  });
});
