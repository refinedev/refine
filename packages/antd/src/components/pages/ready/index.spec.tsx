import React from "react";
import { Row, Button } from "antd";
import { pageReadyTests } from "@pankod/refine-ui-tests";

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
            "https://refine.dev/docs/examples/tutorial",
        );
        expect(getByText("Community").closest("a")).toHaveAttribute(
            "href",
            "https://discord.gg/refine",
        );
    });
});
