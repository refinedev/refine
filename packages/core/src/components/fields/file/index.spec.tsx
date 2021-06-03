import React from "react";

import { FileField } from "./";

import { render } from "@test";
describe("FileField", () => {
    it("renders an anchor with file link", () => {
        const value = {
            title: "Test",
            src: "www.google.com",
        };

        const { getByTitle } = render(
            <FileField src={value.src} title={value.title} />,
        );

        expect(getByTitle(value.title)).toHaveAttribute("href", value.src);
    });

    it("renders an anchor with src", () => {
        const value = {
            src: "www.google.com",
        };

        const { getByText } = render(<FileField src={value.src} />);

        expect(getByText(value.src)).toHaveAttribute("href", value.src);
    });
});
