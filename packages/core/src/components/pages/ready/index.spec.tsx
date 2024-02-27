import React from "react";

import { render } from "@test";

import { ReadyPage } from "./index";

describe("ReadyPage", () => {
  it("should render page successfuly", async () => {
    const { getByText } = render(<ReadyPage />);

    getByText("Welcome on board");
    getByText("Your configuration is completed.");
    expect(
      <p>
        Now you can get started by adding your resources to the{" "}
        <code>`resources`</code> property of <code>{"`<Refine>`"}</code>
      </p>,
    ).toBeDefined();
  });

  it("should render 3 buttons", async () => {
    const { getByText } = render(<ReadyPage />);

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
