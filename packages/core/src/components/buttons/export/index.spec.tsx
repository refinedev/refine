import React from "react";

import { screen, render } from "@test";
import { ExportButton } from "./";

describe("<ExportButton/>", () => {
    it("should render", () => {
        const { findByText } = render(<ExportButton />);

        findByText("Export");
    });

    it("should have text 'Export'", async () => {
        window.open = jest.fn();

        render(<ExportButton data-testid="btn" />);

        screen.getByText("Export");
    });
});
