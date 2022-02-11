import React, { ReactNode } from "react";
import { Route } from "react-router-dom";
import { Table } from "antd";

import { render, TestWrapper, waitFor } from "@test";
import { List } from "./index";
import { IAccessControlContext } from "@pankod/refine-core/dist/interfaces";

const renderList = (
    list: ReactNode,
    accessControlProvider?: IAccessControlContext,
) => {
    return render(<Route path="/:resource">{list}</Route>, {
        wrapper: TestWrapper({
            routerInitialEntries: ["/posts"],
            accessControlProvider,
        }),
    });
};
describe("<List/>", () => {
    describe("JSON Rest Server", () => {
        it("mounts with table", async () => {
            const { getByText } = renderList(
                <List key="posts">
                    <Table rowKey="id" />
                </List>,
            );

            getByText("No Data");
        });
        it("renders given data", async () => {
            const { container } = renderList(
                <List key="posts">
                    <Table rowKey="id">
                        <Table.Column
                            key="title"
                            title="Title"
                            dataIndex="title"
                        />
                    </Table>
                </List>,
            );

            expect(container).toMatchSnapshot();
        });

        it("should render optional title with title prop", async () => {
            const { getByText } = renderList(<List title="New Title"></List>);
            getByText("New Title");
        });

        it("should render with label instead of resource name successfully", () => {
            const { getByText } = render(
                <Route path="/:resource">
                    <List />
                </Route>,
                {
                    wrapper: TestWrapper({
                        resources: [
                            {
                                name: "posts",
                                options: { route: "posts", label: "test" },
                            },
                        ],
                        routerInitialEntries: ["/posts"],
                    }),
                },
            );

            getByText("Tests");
        });

        describe("render create button", () => {
            it("should create edit button", () => {
                const { getByText, queryByTestId } = render(
                    <Route path="/:resource">
                        <List />
                    </Route>,
                    {
                        wrapper: TestWrapper({
                            resources: [
                                {
                                    name: "posts",
                                    create: () => null,
                                },
                            ],
                            routerInitialEntries: ["/posts"],
                        }),
                    },
                );

                expect(queryByTestId("list-create-button")).not.toBeNull();

                getByText("Posts");
            });

            it("should not render create button on resource canCreate false", () => {
                const { getByText, queryByTestId } = render(
                    <Route path="/:resource">
                        <List />
                    </Route>,
                    {
                        wrapper: TestWrapper({
                            resources: [
                                {
                                    name: "posts",
                                },
                            ],
                            routerInitialEntries: ["/posts"],
                        }),
                    },
                );

                expect(queryByTestId("list-create-button")).toBeNull();

                getByText("Posts");
            });

            it("should render create button on resource canCreate false & createButtonProps props not null on component", () => {
                const { getByText, queryByTestId } = render(
                    <Route path="/:resource">
                        <List createButtonProps={{ size: "large" }} />
                    </Route>,
                    {
                        wrapper: TestWrapper({
                            routerInitialEntries: ["/posts"],
                        }),
                    },
                );

                expect(queryByTestId("list-create-button")).not.toBeNull();

                getByText("Posts");
            });

            it("should render create button on resource canCreate true & createButtonProps props not null on component", () => {
                const { getByText, queryByTestId } = render(
                    <Route path="/:resource">
                        <List createButtonProps={{ size: "large" }} />
                    </Route>,
                    {
                        wrapper: TestWrapper({
                            resources: [
                                {
                                    name: "posts",
                                    create: () => null,
                                },
                            ],
                            routerInitialEntries: ["/posts"],
                        }),
                    },
                );

                expect(queryByTestId("list-create-button")).not.toBeNull();

                getByText("Posts");
            });

            it("should not render create button on resource canCreate true & canCreate props false on component", () => {
                const { queryByTestId } = render(
                    <Route path="/:resource">
                        <List canCreate={false} />
                    </Route>,
                    {
                        wrapper: TestWrapper({
                            resources: [
                                {
                                    name: "posts",
                                    create: () => null,
                                },
                            ],
                            routerInitialEntries: ["/posts"],
                        }),
                    },
                );

                expect(queryByTestId("list-create-button")).toBeNull();
            });

            it("should render create button on resource canCreate false & canCreate props true on component", () => {
                const { queryByTestId } = render(
                    <Route path="/:resource">
                        <List canCreate={true} />
                    </Route>,
                    {
                        wrapper: TestWrapper({
                            resources: [
                                {
                                    name: "posts",
                                },
                            ],
                            routerInitialEntries: ["/posts"],
                        }),
                    },
                );

                expect(queryByTestId("list-create-button")).not.toBeNull();
            });

            it("should render disabled create button if user doesn't have permission", async () => {
                const { queryByTestId } = renderList(
                    <List canCreate={true} />,
                    {
                        can: ({ action }) => {
                            switch (action) {
                                case "create":
                                    return Promise.resolve({ can: false });
                                default:
                                    return Promise.resolve({ can: false });
                            }
                        },
                    },
                );

                await waitFor(() =>
                    expect(queryByTestId("list-create-button")).toBeDisabled(),
                );
            });
        });
    });
});
