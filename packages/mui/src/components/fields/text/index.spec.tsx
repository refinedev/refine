import React from "react";

import { render } from "@test";

import { TextFieldComponent } from "./";

describe("TextField", () => {
    it("renders text correctly", () => {
        const { getByText } = render(<TextFieldComponent value="test" />);

        getByText("test");
    });
});
