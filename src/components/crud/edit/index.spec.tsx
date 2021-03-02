import React, { ReactNode } from "react";
import { Route } from "react-router-dom";

import { Button } from "antd";

import { render, TestWrapper, MockJSONServer } from "@test";
import { Edit } from "./";

const renderShow = (edit: ReactNode) => {
    return render(<Route path="/resources/posts/show/:id">{edit}</Route>, {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts" }],
            routerInitialEntries: ["/resources/posts/show/1"],
        }),
    });
};

describe("Edit", () => {
    it("should render page successfuly", () => {
        const { container } = renderShow(<Edit resourceName="posts"></Edit>);

        expect(container).toBeTruthy();
    });

    it("should render default save and delete buttons successfuly", () => {
        const { container, getByText } = renderShow(
            <Edit resourceName="posts" />,
        );

        expect(container.querySelector("button")).toBeTruthy();
        getByText("Save");
        getByText("Delete");
    });

    it("should render optional buttons with actionButtons prop", () => {
        const { getByText } = renderShow(
            <Edit
                resourceName="posts"
                actionButtons={
                    <>
                        <Button>New Save Button</Button>
                        <Button>New Delete Button</Button>
                    </>
                }
            />,
        );

        getByText("New Save Button");
        getByText("New Delete Button");
    });

    it("should render default title successfuly", () => {
        const { getByText } = renderShow(<Edit resourceName="posts" />);

        getByText("Edit post");
    });

    it("should render optional title with title prop", () => {
        const { getByText } = renderShow(
            <Edit resourceName="posts" title="New Title" />,
        );

        getByText("New Title");
    });
});
