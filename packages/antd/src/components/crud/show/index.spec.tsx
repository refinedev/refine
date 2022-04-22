import React, { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { Button } from "antd";
import { AccessControlProvider } from "@pankod/refine-core";

import { render, TestWrapper, waitFor } from "@test";

import { Show } from "./index";

const renderShow = (
    show: ReactNode,
    accessControlProvider?: AccessControlProvider,
) => {
    return render(
        <Routes>
            <Route path="/:resource/:action/:id" element={show} />
        </Routes>,
        {
            wrapper: TestWrapper({
                routerInitialEntries: ["/posts/show/1"],
                accessControlProvider,
            }),
        },
    );
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

    it("depending on the accessControlProvider it should get the buttons successfully", async () => {
        const { getByText, queryByTestId } = renderShow(
            <Show canEdit canDelete />,
            {
                can: ({ action }) => {
                    switch (action) {
                        case "edit":
                        case "list":
                            return Promise.resolve({ can: true });
                        case "delete":
                        default:
                            return Promise.resolve({ can: false });
                    }
                },
            },
        );

        expect(getByText("Edit").closest("button")).not.toBeDisabled();
        expect(getByText("Posts").closest("button")).not.toBeDisabled();
        await waitFor(() =>
            expect(queryByTestId("show-delete-button")).toBeDisabled(),
        );
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

    it("should render with label instead of resource name successfully", () => {
        const { getByText } = render(
            <Routes>
                <Route path="/:resource/:action/:id" element={<Show />}></Route>
            </Routes>,
            {
                wrapper: TestWrapper({
                    resources: [
                        {
                            name: "posts",
                            options: { route: "posts", label: "test" },
                        },
                    ],
                    routerInitialEntries: ["/posts/show/1"],
                }),
            },
        );

        getByText("Show Test");
    });

    it("should render optional title with title prop", () => {
        const { getByText } = renderShow(<Show title="Test Title" />);

        getByText("Test Title");
    });

    it("should render optional resource with resource prop", () => {
        const { getByText } = render(
            <Routes>
                <Route
                    path="/:resource"
                    element={<Show resource="posts" />}
                ></Route>
            </Routes>,
            {
                wrapper: TestWrapper({
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
                <Routes>
                    <Route
                        path="/:resource/:action/:id"
                        element={<Show />}
                    ></Route>
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", edit: () => null }],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            expect(queryByTestId("show-edit-button")).not.toBeNull();

            getByText("Show Post");
        });

        it("should not render edit button on resource canEdit false", () => {
            const { getByText, queryByTestId } = render(
                <Routes>
                    <Route path="/:resource/:action/:id" element={<Show />} />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            expect(queryByTestId("show-edit-button")).toBeNull();

            getByText("Show Post");
        });

        it("should not render edit button on resource canEdit true & canEdit props false on component", () => {
            const { queryByTestId } = render(
                <Routes>
                    <Route
                        path="/:resource/:action/:id"
                        element={<Show canEdit={false} />}
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", edit: () => null }],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            expect(queryByTestId("show-edit-button")).toBeNull();
        });

        it("should render edit button on resource canEdit false & canEdit props true on component", () => {
            const { queryByTestId } = render(
                <Routes>
                    <Route
                        path="/:resource/:action/:id"
                        element={<Show canEdit={true} />}
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts" }],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            expect(queryByTestId("show-edit-button")).not.toBeNull();
        });

        it("should render edit button with recordItemId prop", () => {
            const { getByText, queryByTestId } = render(
                <Routes>
                    <Route
                        path="/:resource/:action/:id"
                        element={<Show recordItemId="1" />}
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", edit: () => null }],
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
                <Routes>
                    <Route path="/:resource/:action/:id" element={<Show />} />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", canDelete: true }],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            expect(queryByTestId("show-delete-button")).not.toBeNull();
        });

        it("should not render delete button on resource canDelete false", () => {
            const { queryByTestId } = render(
                <Routes>
                    <Route path="/:resource/:action/:id" element={<Show />} />
                </Routes>,

                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", canDelete: false }],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            expect(queryByTestId("show-delete-button")).toBeNull();
        });

        it("should not render delete button on resource canDelete true & canDelete props false on component", () => {
            const { queryByTestId } = render(
                <Routes>
                    <Route
                        path="/:resource/:action/:id"
                        element={<Show canDelete={false} />}
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", canDelete: true }],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            expect(queryByTestId("show-delete-button")).toBeNull();
        });

        it("should render delete button on resource canDelete false & canDelete props true on component", () => {
            const { queryByTestId } = render(
                <Routes>
                    <Route
                        path="/:resource/:action/:id"
                        element={<Show canDelete={true} />}
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", canDelete: false }],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            expect(queryByTestId("show-delete-button")).not.toBeNull();
        });

        it("should render delete button with recordItemId prop", () => {
            const { queryByTestId } = render(
                <Routes>
                    <Route
                        path="/:resource/:action/:id"
                        element={<Show recordItemId="1" />}
                    />
                </Routes>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", canDelete: true }],
                        routerInitialEntries: ["/posts/show/1"],
                    }),
                },
            );

            expect(queryByTestId("show-delete-button")).not.toBeNull();
        });
    });
});
