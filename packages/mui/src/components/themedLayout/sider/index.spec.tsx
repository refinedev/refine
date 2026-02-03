import React from "react";

import { layoutSiderTests } from "@refinedev/ui-tests";
import { render, TestWrapper, waitFor } from "@test";

import { ThemedSider } from "./index";

describe("Sider", () => {
  layoutSiderTests.bind(this)(ThemedSider);

  it("renders custom Title when provided", async () => {
    const { getAllByText } = render(
      <ThemedSider
        Title={({ collapsed }) => (
          <span>{collapsed ? "Collapsed" : "My Project"}</span>
        )}
      />,
      {
        wrapper: TestWrapper({}),
      },
    );

    await waitFor(() => {
      expect(getAllByText("My Project").length).toBeGreaterThanOrEqual(1);
    });
  });
});
