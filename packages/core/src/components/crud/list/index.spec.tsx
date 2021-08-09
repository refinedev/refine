import React, { ReactNode } from "react";

import { render, TestWrapper, MockJSONServer } from "@test";

import { Table } from "antd";

import { List } from "./index";
import { Route } from "react-router-dom";

const renderList = (list: ReactNode) => {
    return render(<Route path="/:resource">{list}</Route>, {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts", route: "posts" }],
            routerInitialEntries: ["/posts"],
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

        describe("render create button", () => {
            it("should create edit button", () => {
                const { getByText, queryByTestId } = render(
                    <Route path="/:resource">
                        <List />
                    </Route>,
                    {
                        wrapper: TestWrapper({
                            dataProvider: MockJSONServer,
                            resources: [
                                {
                                    name: "posts",
                                    route: "posts",
                                    canCreate: true,
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
                            dataProvider: MockJSONServer,
                            resources: [
                                {
                                    name: "posts",
                                    route: "posts",
                                    canCreate: false,
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
                            dataProvider: MockJSONServer,
                            resources: [
                                {
                                    name: "posts",
                                    route: "posts",
                                },
                            ],
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
                            dataProvider: MockJSONServer,
                            resources: [
                                {
                                    name: "posts",
                                    route: "posts",
                                    canCreate: true,
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
                            dataProvider: MockJSONServer,
                            resources: [
                                {
                                    name: "posts",
                                    route: "posts",
                                    canCreate: true,
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
                            dataProvider: MockJSONServer,
                            resources: [
                                {
                                    name: "posts",
                                    route: "posts",
                                    canCreate: false,
                                },
                            ],
                            routerInitialEntries: ["/posts"],
                        }),
                    },
                );

                expect(queryByTestId("list-create-button")).not.toBeNull();
            });
        });
    });
});
