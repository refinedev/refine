import React, { ReactNode } from "react";
import { Route } from "react-router-dom";

import { Button } from "antd";

import { render, TestWrapper, MockJSONServer } from "@test";
import { Edit } from "./";

const renderEdit = (edit: ReactNode) => {
    return render(<Route path="/resources/:resource/edit/:id">{edit}</Route>, {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts", route: "posts" }],
            routerInitialEntries: ["/resources/posts/edit/1"],
        }),
    });
};

describe("Edit", () => {
    it("should render page successfuly", () => {
        const { container } = renderEdit(<Edit></Edit>);

        expect(container).toBeTruthy();
    });

    it("should render default save and delete buttons successfuly", () => {
        const { container, getByText } = renderEdit(<Edit />);

        expect(container.querySelector("button")).toBeTruthy();
        getByText("Save");
        getByText("Delete");
    });

    it("should render optional buttons with actionButtons prop", () => {
        const { getByText } = renderEdit(
            <Edit
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
        const { getByText } = renderEdit(<Edit />);

        getByText("Edit post");
    });

    it("should render optional title with title prop", () => {
        const { getByText } = renderEdit(<Edit title="New Title" />);

        getByText("New Title");
    });
});
