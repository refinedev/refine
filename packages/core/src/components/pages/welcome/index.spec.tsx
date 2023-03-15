import React from "react";

import { render } from "@test";

import { WelcomePage } from "./index";

describe("WelcomePage", () => {
    it("should render page successfuly", async () => {
        const { getByText } = render(<WelcomePage />);

        getByText("Welcome on board");
        getByText("Your configuration is completed.");
    });

    it("should render 3 buttons", async () => {
        const { getByText } = render(<WelcomePage />);

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
