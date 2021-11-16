import React, { ReactNode } from "react";
import { Route } from "react-router-dom";
import { wait } from "@testing-library/react";

import { Button } from "antd";

import { render, TestWrapper, MockJSONServer } from "@test";
import { Edit } from "./";

const renderEdit = (edit: ReactNode) => {
    return render(<Route path="/:resource/edit/:id">{edit}</Route>, {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts", route: "posts" }],
            routerInitialEntries: ["/posts/edit/1"],
        }),
    });
};

describe("Edit", () => {
    it("should render page successfuly", async () => {
        const { container, queryByTestId } = renderEdit(<Edit />);

        await wait(() =>
            expect(queryByTestId("edit-list-button")).not.toBeNull(),
        );

        expect(container).toBeTruthy();
    });

    it("should render default save button successfuly", () => {
        const { container, getByText } = renderEdit(<Edit />);

        expect(container.querySelector("button")).toBeTruthy();
        getByText("Save");
    });

    it("should render default save and delete buttons successfuly", async () => {
        const { container, getByText } = renderEdit(<Edit canDelete />);

        expect(container.querySelector("button")).toBeTruthy();
        getByText("Save");
        await wait(() => getByText("Delete"));
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
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts", route: "posts" }],
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
        it("should render delete button ", async () => {
            const { getByText, queryByTestId } = render(
                <Route path="/:resource/edit/:id">
                    <Edit />
                </Route>,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [
                            { name: "posts", route: "posts", canDelete: true },
                        ],
                        routerInitialEntries: ["/posts/edit/1"],
                    }),
                },
            );

            await wait(() =>
                expect(queryByTestId("edit-delete-button")).not.toBeNull(),
            );

            getByText("Edit Post");
        });

        it("should not render delete button on resource canDelete false", () => {
            const { getByText, queryByTestId } = render(
                <Route path="/:resource/edit/:id">
                    <Edit />
                </Route>,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [
                            { name: "posts", route: "posts", canDelete: false },
                        ],
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
                        dataProvider: MockJSONServer,
                        resources: [
                            { name: "posts", route: "posts", canDelete: true },
                        ],
                        routerInitialEntries: ["/posts/edit/1"],
                    }),
                },
            );

            expect(queryByTestId("edit-delete-button")).toBeNull();
        });

        it("should render delete button on resource canDelete false & canDelete props true on component", async () => {
            const { queryByTestId } = render(
                <Route path="/:resource/edit/:id">
                    <Edit canDelete={true} />
                </Route>,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [
                            { name: "posts", route: "posts", canDelete: false },
                        ],
                        routerInitialEntries: ["/posts/edit/1"],
                    }),
                },
            );

            await wait(() =>
                expect(queryByTestId("edit-delete-button")).not.toBeNull(),
            );
        });

        it("should render delete button on resource canDelete false & deleteButtonProps props not null on component", async () => {
            const { queryByTestId } = render(
                <Route path="/:resource/edit/:id">
                    <Edit deleteButtonProps={{ size: "large" }} />
                </Route>,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [
                            { name: "posts", route: "posts", canDelete: false },
                        ],
                        routerInitialEntries: ["/posts/edit/1"],
                    }),
                },
            );

            await wait(() =>
                expect(queryByTestId("edit-delete-button")).not.toBeNull(),
            );
        });
    });
});
