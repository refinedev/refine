import React, { ReactNode } from "react";
import { Route } from "react-router-dom";
import { Button } from "antd";

import { render, TestWrapper, waitFor } from "@test";
import { Edit } from "./";
import { IAccessControlContext } from "@pankod/refine-core/dist/interfaces";

const renderEdit = (
    edit: ReactNode,
    accessControlProvider?: IAccessControlContext,
) => {
    return render(<Route path="/:resource/edit/:id">{edit}</Route>, {
        wrapper: TestWrapper({
            routerInitialEntries: ["/posts/edit/1"],
            accessControlProvider,
        }),
    });
};

describe("Edit", () => {
    it("should render page successfuly", () => {
        const { container, queryByTestId } = renderEdit(<Edit />);

        expect(queryByTestId("edit-list-button")).not.toBeNull();

        expect(container).toBeTruthy();
    });

    it("should render default save button successfuly", () => {
        const { container, getByText } = renderEdit(<Edit />);

        expect(container.querySelector("button")).toBeTruthy();
        getByText("Save");
    });

    it("should render default save and delete buttons successfuly", () => {
        const { container, getByText } = renderEdit(<Edit canDelete />);

        expect(container.querySelector("button")).toBeTruthy();
        getByText("Save");
        getByText("Delete");
    });

    it("should render optional buttons with actionButtons prop", () => {
        const { getByText, queryByTestId } = renderEdit(
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
        expect(queryByTestId("edit-delete-button")).toBeNull();
    });

    it("should render default title successfuly", () => {
        const { getByText } = renderEdit(<Edit />);

        getByText("Edit Post");
    });

    it("should render with label instead of resource name successfully", () => {
        const { getByText } = render(
            <Route path="/:resource/edit/:id">
                <Edit />
            </Route>,
            {
                wrapper: TestWrapper({
                    resources: [
                        {
                            name: "posts",
                            options: { route: "posts", label: "test" },
                        },
                    ],
                    routerInitialEntries: ["/posts/edit/1"],
                }),
            },
        );

        getByText("Edit Test");
    });

    it("should render optional title with title prop", () => {
        const { getByText } = renderEdit(<Edit title="New Title" />);

        getByText("New Title");
    });

    it("should render optional mutationMode with mutationModeProp prop", () => {
        const container = renderEdit(<Edit mutationMode="undoable" />);

        expect(container).toBeTruthy();
    });

    it("should render optional resource with resource prop", () => {
        const { getByText } = render(
            <Route>
                <Edit resource="posts" />
            </Route>,
            {
                wrapper: TestWrapper({
                    routerInitialEntries: ["/custom"],
                }),
            },
        );

        getByText("Edit Post");
    });

    it("should render optional recordItemId with resource prop", () => {
        const { getByText, queryByTestId } = renderEdit(
            <Edit recordItemId="1" />,
        );

        getByText("Edit Post");

        expect(queryByTestId("edit-list-button")).toBeNull();
    });

    describe("render delete button", () => {
        it("should render delete button ", () => {
            const { getByText, queryByTestId } = render(
                <Route path="/:resource/edit/:id">
                    <Edit />
                </Route>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", canDelete: true }],
                        routerInitialEntries: ["/posts/edit/1"],
                    }),
                },
            );

            expect(queryByTestId("edit-delete-button")).not.toBeNull();

            getByText("Edit Post");
        });

        it("should not render delete button on resource canDelete false", () => {
            const { getByText, queryByTestId } = render(
                <Route path="/:resource/edit/:id">
                    <Edit />
                </Route>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", canDelete: false }],
                        routerInitialEntries: ["/posts/edit/1"],
                    }),
                },
            );

            expect(queryByTestId("edit-delete-button")).toBeNull();

            getByText("Edit Post");
        });

        it("should not render delete button on resource canDelete true & canDelete props false on component", () => {
            const { queryByTestId } = render(
                <Route path="/:resource/edit/:id">
                    <Edit canDelete={false} />
                </Route>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", canDelete: true }],
                        routerInitialEntries: ["/posts/edit/1"],
                    }),
                },
            );

            expect(queryByTestId("edit-delete-button")).toBeNull();
        });

        it("should render delete button on resource canDelete false & canDelete props true on component", () => {
            const { queryByTestId } = render(
                <Route path="/:resource/edit/:id">
                    <Edit canDelete={true} />
                </Route>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", canDelete: false }],
                        routerInitialEntries: ["/posts/edit/1"],
                    }),
                },
            );

            expect(queryByTestId("edit-delete-button")).not.toBeNull();
        });

        it("should render delete button on resource canDelete false & deleteButtonProps props not null on component", () => {
            const { queryByTestId } = render(
                <Route path="/:resource/edit/:id">
                    <Edit deleteButtonProps={{ size: "large" }} />
                </Route>,
                {
                    wrapper: TestWrapper({
                        resources: [{ name: "posts", canDelete: false }],
                        routerInitialEntries: ["/posts/edit/1"],
                    }),
                },
            );

            expect(queryByTestId("edit-delete-button")).not.toBeNull();
        });
    });

    describe("accessibility of buttons by accessControlProvider", () => {
        it("should render disabled list button and not disabled delete button", async () => {
            const { queryByTestId } = renderEdit(<Edit canDelete />, {
                can: ({ action }) => {
                    switch (action) {
                        case "list":
                            return Promise.resolve({ can: true });
                        case "delete":
                        default:
                            return Promise.resolve({ can: false });
                    }
                },
            });

            await waitFor(() =>
                expect(queryByTestId("edit-list-button")).not.toBeDisabled(),
            );
            await waitFor(() =>
                expect(queryByTestId("edit-delete-button")).toBeDisabled(),
            );
        });

        it("should render disabled list button and delete button", async () => {
            const { queryByTestId } = renderEdit(<Edit canDelete />, {
                can: ({ action }) => {
                    switch (action) {
                        case "list":
                        case "delete":
                            return Promise.resolve({ can: false });
                        default:
                            return Promise.resolve({ can: false });
                    }
                },
            });

            await waitFor(() =>
                expect(queryByTestId("edit-list-button")).toBeDisabled(),
            );
            await waitFor(() =>
                expect(queryByTestId("edit-delete-button")).toBeDisabled(),
            );
        });
    });
});
