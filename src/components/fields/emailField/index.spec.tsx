import React from "react";

import { EmailField } from "./";

import { render } from "@test";
describe("EmailField", () => {
    it("renders email with mailto href", () => {
        const { getByText } = render(
            <EmailField
                source="email"
                record={{ id: 1, email: "test@test.com" }}
            />,
        );

        expect(getByText("test@test.com")).toHaveProperty("href", "mailto:");
    });
});
