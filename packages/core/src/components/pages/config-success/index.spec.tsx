import React from "react";

import { render } from "@test";

import { ConfigSuccessPage } from "./index";

describe("ConfigSuccessPage", () => {
    it("should render page successfuly", async () => {
        const { getByText } = render(<ConfigSuccessPage />);

        getByText("Welcome Aboard!");
        getByText("Your configuration is completed.");
    });

    it("should render 4 buttons", async () => {
        const { getByText } = render(<ConfigSuccessPage />);

        expect(getByText("Documentation").closest("a")).toHaveAttribute(
            "href",
            "https://refine.dev/",
        );
        expect(getByText("Tutorial").closest("a")).toHaveAttribute(
            "href",
            "https://refine.dev/docs/tutorial/introduction/index/",
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
