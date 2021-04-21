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
            <FileField value={value} title="title" src="src" />,
        );

        expect(getByTitle(value.title)).toHaveAttribute("href", value.src);
    });

    it("handles multiple links", () => {
        const text = { url: "test.txt", title: "Text" };
        const cat = { url: "cat.png", title: "Cat" };
        const files = [text, cat];
        const { getByTitle } = render(
            <FileField value={files} src="url" title="title" />,
        );

        [text, cat].forEach((item) => {
            expect(getByTitle(item.title)).toHaveAttribute("href", item.url);
        });
    });
});
