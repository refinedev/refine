import React, { ReactNode } from "react";
import { Button } from "antd";
import { Route } from "react-router-dom";

import { render, TestWrapper } from "@test";
import { Create } from "./";

const renderCreate = (create: ReactNode) => {
    return render(<Route path="/:resource/create">{create}</Route>, {
        wrapper: TestWrapper({
            routerInitialEntries: ["/posts/create"],
        }),
    });
};
describe("Create", () => {
    it("should render page successfuly", async () => {
        const { container } = renderCreate(<Create />);

        expect(container).toBeTruthy();
    });

    it("should render default save button successfuly", async () => {
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

    it("should render default title successfuly", async () => {
        const { getByText } = renderCreate(<Create />);

        getByText("Create Post");
    });

    it("should render with label instead of resource name successfully", () => {
        const { getByText } = render(
            <Route path="/:resource/create">
                <Create />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [
                        {
                            name: "posts",
                            options: { route: "posts", label: "test label" },
                        },
                    ],
                    routerInitialEntries: ["/posts/create"],
                }),
            },
        );

        getByText("Create Test label");
    });

    it("should render optional title with title prop", async () => {
        const { getByText } = renderCreate(<Create title="New Title" />);

        getByText("New Title");
    });

    it("should render optional resource with resource prop", () => {
        const { getByText } = render(
            <Route>
                <Create resource="posts" />
            </Route>,
            {
                wrapper: TestWrapper({
                    routerInitialEntries: ["/custom"],
                }),
            },
        );

        getByText("Create Post");
    });

    it("should render tags", () => {
        const { getByText } = render(
            <Route path="/:resource/:action/:id">
                <Create />
            </Route>,
            {
                wrapper: TestWrapper({
                    routerInitialEntries: ["/posts/clone/1"],
                }),
            },
        );

        getByText("Create Post");
    });
});
