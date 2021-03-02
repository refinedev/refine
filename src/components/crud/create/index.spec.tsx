import React from "react";
import { Button } from "antd";

import { render, TestWrapper, MockJSONServer } from "@test";
import { Create } from "./";

describe("Create", () => {
    it("should render page successfuly", async () => {
        const { container } = render(<Create resourceName="posts" />, {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        expect(container).toBeTruthy();
    });

    it("should render default save button successfuly", async () => {
        const { container, getByText } = render(
            <Create resourceName="posts" />,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        expect(container.querySelector("button")).toBeTruthy();
        getByText("Save");
    });

    it("should render optional button with actionButtons prop", async () => {
        const optionalButton = () => {
            return <span>Optional Button</span>;
        };

        const { container, getByText } = render(
            <Create resourceName="posts" actionButtons={optionalButton} />,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        expect(container.querySelector("button")).toBeTruthy();
        getByText("Optional Button");
    });

    it("should render default title successfuly", async () => {
        const { getByText } = render(<Create resourceName="posts" />, {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        getByText("Create post");
    });

    it("should render optional title with title prop", async () => {
        const { getByText } = render(
            <Create resourceName="posts" title="New Title" />,
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
