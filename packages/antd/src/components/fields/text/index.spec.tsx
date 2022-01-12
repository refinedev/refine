import React from "react";

import { TextField } from "./";

import { render } from "@test";

describe("TextField", () => {
    it("renders text correctly", () => {
        const { getByText } = render(<TextField value="test" />);

        getByText("test");
    });
});
