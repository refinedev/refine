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
});
