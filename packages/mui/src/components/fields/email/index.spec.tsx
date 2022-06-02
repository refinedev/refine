import React from "react";

import { render } from "@test";

import { EmailField } from "./";

describe("EmailField", () => {
    it("renders email with mailto href", () => {
        const { getByText } = render(<EmailField value="test@test.com" />);

        expect(getByText("test@test.com")).toHaveProperty(
            "href",
            "mailto:test@test.com",
        );
    });
});
