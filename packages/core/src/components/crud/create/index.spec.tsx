import React, { ReactNode } from "react";
import { Button } from "antd";
import { Route } from "react-router-dom";

import { render, TestWrapper, MockJSONServer } from "@test";
import { Create } from "./";

const renderCreate = (create: ReactNode) => {
    return render(<Route path="/resources/:resource/create">{create}</Route>, {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts", route: "posts" }],
            routerInitialEntries: ["/resources/posts/create"],
        }),
    });
};
describe("Create", () => {
    it("should render page successfully", async () => {
        const { container } = renderCreate(<Create />);

        expect(container).toBeTruthy();
    });

    it("should render default save button successfully", async () => {
        const { container, getByText } = renderCreate(<Create></Create>);
        expect(container.querySelector("button")).toBeTruthy();
        getByText("Save");
    });

    it("should render optional button with actionButtons prop", async () => {
        const { container, getByText } = renderCreate(
            <Create actionButtons={<Button>Optional Button</Button>} />,
        );

        expect(container.querySelector("button")).toBeTruthy();
        getByText("Optional Button");
    });

    it("should render default title successfully", async () => {
        const { getByText } = renderCreate(<Create />);

        getByText("Create post");
    });

    it("should render optional title with title prop", async () => {
        const { getByText } = renderCreate(<Create title="New Title" />);

        getByText("New Title");
    });
});
