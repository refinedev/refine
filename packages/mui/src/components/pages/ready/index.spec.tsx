import React from "react";
import { pageReadyTests } from "@refinedev/ui-tests";

import Button from "@mui/material/Button";

import { render } from "@test";

import { ReadyPage } from "./index";

describe("ReadyPage", () => {
    pageReadyTests.bind(this)(ReadyPage);

    it("should render 3 texts", async () => {
        const { getByText } = render(<ReadyPage />);

        getByText("Welcome on board");
        getByText("Your configuration is completed.");
    });

    it("should render 3 buttons", async () => {
        const { getByText } = render(<ReadyPage />);

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
