import React, { ReactNode } from "react";
import { Route } from "react-router-dom";

import { Button } from "antd";

import { render, TestWrapper, MockJSONServer } from "@test";
import { Edit } from "./";

const renderEdit = (edit: ReactNode) => {
    return render(<Route path="/resources/posts/edit/:id">{edit}</Route>, {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts", route: "posts" }],
            routerInitialEntries: ["/resources/posts/edit/1"],
        }),
    });
};

describe("Edit", () => {
    it("should render page successfuly", () => {
        const { container } = renderEdit(<Edit resourceName="posts"></Edit>);

        expect(container).toBeTruthy();
    });

    it("should render default save and delete buttons successfuly", () => {
        const { container, getByText } = renderEdit(
            <Edit resourceName="posts" />,
        );

        expect(container.querySelector("button")).toBeTruthy();
        getByText("Save");
        getByText("Delete");
    });

    it("should render optional buttons with actionButtons prop", () => {
        const { getByText } = renderEdit(
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
        const { getByText, debug } = renderEdit(<Edit resourceName="posts" />);

        getByText("Edit post");
    });

    it("should render optional title with title prop", () => {
        const { getByText } = renderEdit(
            <Edit resourceName="posts" title="New Title" />,
        );

        getByText("New Title");
    });
});
