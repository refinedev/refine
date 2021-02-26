import React from "react";

import { render, TestWrapper, MockJSONServer } from "@test";
import { Edit } from "./";

describe("Edit", () => {
    it("should render page successfuly", () => {
        const { container } = render(<Edit resourceName="posts"></Edit>, {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        expect(container).toBeTruthy();
    });

    it("should render save button successfuly", () => {
        const { container, getByText } = render(<Edit resourceName="posts" />, {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        expect(container.querySelector("button")).toBeTruthy();
        getByText("Save");
    });

    it("should render default title successfuly", () => {
        const { getByText } = render(<Edit resourceName="posts" />, {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        getByText("Edit post");
    });

    it("should render optional title with title prop", () => {
        const { getByText } = render(
            <Edit resourceName="posts" title="New Title" />,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        getByText("New Title");
    });
});
