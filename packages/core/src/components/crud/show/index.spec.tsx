import React, { ReactNode } from "react";
import { Route } from "react-router-dom";
import { Button } from "antd";

import { render, TestWrapper, MockJSONServer } from "@test";

import { Show } from "./index";

const renderShow = (show: ReactNode) => {
    return render(<Route path="/resources/:resource/show/:id">{show}</Route>, {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts", route: "posts" }],
            routerInitialEntries: ["/resources/posts/show/1"],
        }),
    });
};
describe("Show", () => {
    it("should render page successfuly", () => {
        const { container } = renderShow(<Show></Show>);

        expect(container).toBeTruthy();
    });

    it("should render default list and refresh buttons successfuly", async () => {
        const { container, getByText } = renderShow(<Show />);

        expect(container.querySelector("button")).toBeTruthy();
        getByText("Posts");
        getByText("Refresh");
    });

    it("should render optional edit and delete buttons successfuly", async () => {
        const { container, getByText } = renderShow(<Show canEdit canDelete />);

        expect(container.querySelector("button")).toBeTruthy();
        getByText("Edit");
        getByText("Delete");
    });

    it("should render optional buttons with actionButtons prop", async () => {
        const { findByText } = renderShow(
            <Show
                actionButtons={
                    <>
                        <Button>New Save Button</Button>
                        <Button>New Delete Button</Button>
                    </>
                }
            />,
        );

        await findByText("New Save Button");
        await findByText("New Delete Button");
    });

    it("should render default title successfuly", () => {
        const { getByText } = renderShow(<Show />);

        getByText("Show post");
    });

    it("should render optional title with title prop", () => {
        const { getByText } = renderShow(<Show title="Test Title" />);

        getByText("Test Title");
    });

    it("should render with aside component", () => {
        const { getByText } = renderShow(
            <Show aside={() => <div>Test Aside Component</div>} />,
        );

        getByText("Test Aside Component");
    });
});
