import React from "react";

import { FileField } from "./";

import { render } from "@test";
describe("FileField", () => {
    it("renders an anchor with file link", () => {
        const testUrl = "www.google.com";
        const { getByTitle } = render(
            <FileField value={testUrl} title="Test" />,
        );

        expect(getByTitle("Test")).toHaveAttribute("href", testUrl);
    });

    it("handles multiple links", () => {
        const text = { url: "test.txt", title: "Text" };
        const cat = { url: "cat.png", title: "Cat" };
        const files = [text, cat];
        const { getByTitle, debug } = render(
            <FileField
                record={{ id: 1, files }}
                value={files}
                src="url"
                title="title"
            />,
        );

        [text, cat].forEach((item) => {
            expect(getByTitle(item.title)).toHaveAttribute("href", item.url);
        });
    });
});
