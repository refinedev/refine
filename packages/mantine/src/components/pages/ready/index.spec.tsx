import React from "react";
import { Button } from "@mantine/core";
import { pageReadyTests } from "@refinedev/ui-tests";

import { render, TestWrapper } from "@test";

import { ReadyPage } from "./index";

describe("ReadyPage", () => {
  pageReadyTests.bind(this)(ReadyPage, TestWrapper);

  it("should render 3 texts", async () => {
    const { getByText } = render(<ReadyPage />, { wrapper: TestWrapper({}) });

    getByText("Welcome on board");
    getByText("Your configuration is completed.");
  });

  it("should render 3 buttons", async () => {
    const { getByText } = render(<ReadyPage />, { wrapper: TestWrapper({}) });

    expect(Button).toBeDefined();

    expect(getByText("Documentation").closest("a")).toHaveAttribute(
      "href",
      "https://refine.dev",
    );
    expect(getByText("Examples").closest("a")).toHaveAttribute(
      "href",
      "https://refine.dev/examples",
    );
    expect(getByText("Community").closest("a")).toHaveAttribute(
      "href",
      "https://discord.gg/refine",
    );
  });
});
