import React from "react";
import { screen } from "@testing-library/react";
import { vi } from "vitest";

import { CatchAllNavigate } from "./catch-all-navigate";
import { render, TestWrapper } from "./test/index";

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual("@tanstack/react-router");

  return {
    ...actual,
    Navigate: ({
      to,
      search,
    }: {
      to: string;
      search?: Record<string, string>;
    }) => (
      <div
        data-testid="navigate-to"
        data-search={search ? JSON.stringify(search) : ""}
      >
        {to}
      </div>
    ),
  };
});

describe("CatchAllNavigate", () => {
  it("should not append the to query for the root path", () => {
    render(<CatchAllNavigate to="/login" />, {
      wrapper: TestWrapper({
        routerInitialEntries: ["/"],
      }),
    });

    expect(screen.getByTestId("navigate-to")).toHaveTextContent("/login");
    expect(screen.getByTestId("navigate-to")).toHaveAttribute(
      "data-search",
      "",
    );
  });

  it("should append the current path and search for non-root routes", () => {
    render(<CatchAllNavigate to="/login" />, {
      wrapper: TestWrapper({
        routerInitialEntries: ["/posts?currentPage=2"],
      }),
    });

    expect(screen.getByTestId("navigate-to")).toHaveTextContent("/login");
    expect(screen.getByTestId("navigate-to")).toHaveAttribute(
      "data-search",
      JSON.stringify({ to: "/posts?currentPage=2" }),
    );
  });
});
