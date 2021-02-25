import React from "react";

import { render } from "@test";
import { MarkdownInput } from "./";

describe("MarkdownInput", () => {
    it("renders given value correctly", () => {
        const { getByText } = render(
            <MarkdownInput
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
