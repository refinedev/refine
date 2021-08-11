import React, { ReactNode } from "react";
import { Route } from "react-router-dom";
import { Button } from "antd";

import { render, TestWrapper, MockJSONServer } from "@test";

import { Show } from "./index";

const renderShow = (show: ReactNode) => {
    return render(<Route path="/:resource/show/:id">{show}</Route>, {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts", route: "posts" }],
            routerInitialEntries: ["/posts/show/1"],
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

        getByText("Show Post");
    });

    it("should render optional title with title prop", () => {
        const { getByText } = renderShow(<Show title="Test Title" />);

        getByText("Test Title");
    });

    it("should render optional resource with resource prop", () => {
        const { getByText } = render(
            <Route>
                <Show resource="posts" />
            </Route>,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts", route: "posts" }],
                    routerInitialEntries: ["/custom"],
                }),
            },
        );

        getByText("Show Post");
    });

    it("should render optional recordItemId with resource prop, not render list button", () => {
        const { getByText, queryByTestId } = renderShow(
            <Show recordItemId="1" />,
        );

        getByText("Show Post");

        expect(queryByTestId("show-list-button")).toBeNull();
    });

    describe("render edit button", () => {
        it("should render edit button", () => {
            const { getByText, queryByTestId } = render(
                <Route path="/:resource/show/:id">
                    <Show />
                </Route>,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [
                            { name: "posts", route: "posts", canEdit: true },
                        ],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            expect(queryByTestId("show-edit-button")).not.toBeNull();

            getByText("Show Post");
        });

        it("should not render edit button on resource canEdit false", () => {
            const { getByText, queryByTestId } = render(
                <Route path="/:resource/show/:id">
                    <Show />
                </Route>,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [
                            { name: "posts", route: "posts", canEdit: false },
                        ],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            expect(queryByTestId("show-edit-button")).toBeNull();

            getByText("Show Post");
        });

        it("should not render edit button on resource canEdit true & canEdit props false on component", () => {
            const { queryByTestId } = render(
                <Route path="/:resource/show/:id">
                    <Show canEdit={false} />
                </Route>,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [
                            { name: "posts", route: "posts", canEdit: true },
                        ],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            expect(queryByTestId("show-edit-button")).toBeNull();
        });

        it("should render edit button on resource canEdit false & canEdit props true on component", () => {
            const { queryByTestId } = render(
                <Route path="/:resource/show/:id">
                    <Show canEdit={true} />
                </Route>,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [
                            { name: "posts", route: "posts", canEdit: false },
                        ],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            expect(queryByTestId("show-edit-button")).not.toBeNull();
        });

        it("should render edit button with recordItemId prop", () => {
            const { getByText, queryByTestId } = render(
                <Route path="/:resource/show/:id">
                    <Show recordItemId="1" />
                </Route>,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [
                            { name: "posts", route: "posts", canEdit: true },
                        ],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            expect(queryByTestId("show-edit-button")).not.toBeNull();

            getByText("Show Post");
        });
    });

    describe("render delete button", () => {
        it("should render delete button", () => {
            const { queryByTestId } = render(
                <Route path="/:resource/show/:id">
                    <Show />
                </Route>,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [
                            { name: "posts", route: "posts", canDelete: true },
                        ],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            expect(queryByTestId("show-delete-button")).not.toBeNull();
        });

        it("should not render delete button on resource canDelete false", () => {
            const { queryByTestId } = render(
                <Route path="/:resource/show/:id">
                    <Show />
                </Route>,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [
                            { name: "posts", route: "posts", canDelete: false },
                        ],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            expect(queryByTestId("show-delete-button")).toBeNull();
        });

        it("should not render delete button on resource canDelete true & canDelete props false on component", () => {
            const { queryByTestId } = render(
                <Route path="/:resource/show/:id">
                    <Show canDelete={false} />
                </Route>,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [
                            { name: "posts", route: "posts", canDelete: true },
                        ],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            expect(queryByTestId("show-delete-button")).toBeNull();
        });

        it("should render delete button on resource canDelete false & canDelete props true on component", () => {
            const { queryByTestId } = render(
                <Route path="/:resource/show/:id">
                    <Show canDelete={true} />
                </Route>,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [
                            { name: "posts", route: "posts", canDelete: false },
                        ],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            expect(queryByTestId("show-delete-button")).not.toBeNull();
        });

        it("should render delete button with recordItemId prop", () => {
            const { queryByTestId } = render(
                <Route path="/:resource/show/:id">
                    <Show recordItemId="1" />
                </Route>,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [
                            { name: "posts", route: "posts", canDelete: true },
                        ],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            expect(queryByTestId("show-delete-button")).not.toBeNull();
        });
    });
});
