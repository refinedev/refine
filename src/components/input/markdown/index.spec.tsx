import React from "react";

import { render } from "@test";
import { Markdown } from "./";

describe("Markdown", () => {
    it("renders given value correctly", () => {
        const { getByText } = render(
            <Markdown
                value={
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                }
            />,
        );

        getByText(
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        );
    });
});
