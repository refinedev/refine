import React from "react";

import { render } from "@test";
import { MarkdownField } from "./";

describe("BooleanField", () => {
    it("renders markDown text with correct value", () => {
        const { getByText, container } = render(
            <div data-testid="custom-field">
                <MarkdownField value={`**BooleanField Test**`} />
            </div>,
        );

        expect(container.querySelector("strong")).toBeTruthy();
        getByText("BooleanField Test");
    });
});
