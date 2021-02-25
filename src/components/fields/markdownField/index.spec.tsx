import React from "react";

import { render } from "@test";
import { MarkdownField } from "./";

describe("MarkdownField", () => {
    it("renders markDown text with correct value", () => {
        const { getByText, container } = render(
            <div data-testid="custom-field">
                <MarkdownField value={`**MarkdownField Test**`} />
            </div>,
        );

        expect(container.querySelector("strong")).toBeTruthy();
        getByText("MarkdownField Test");
    });
});
