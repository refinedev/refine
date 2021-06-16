import React, { ReactNode } from "react";

import { render, TestWrapper, MockJSONServer } from "@test";

import { Table } from "antd";

import { List } from "./index";
import { Route } from "react-router-dom";

const renderList = (list: ReactNode) => {
    return render(<Route path="/resources/:resource">{list}</Route>, {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts", route: "posts" }],
            routerInitialEntries: ["/resources/posts"],
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

        it("should render asideComponent with aside prop", async () => {
            const { getByText } = renderList(
                <List Aside={<p>Aside</p>}></List>,
            );
            getByText("Aside");
        });

        it("should render optional title with title prop", async () => {
            const { getByText } = renderList(<List title="New Title"></List>);
            getByText("New Title");
        });

        // xit("should wrap with given component", async () => {
        //     const { container } = render(
        //         <List component={"section"} resourceName="posts">
        //             <Table rowKey="id">
        //                 <Column key="title" title="Title" dataIndex="title" />
        //             </Table>
        //         </List>,
        //         {
        //             wrapper: TestWrapper({
        //                 dataProvider: MockJSONServer,
        //                 resources: [{ name: "posts" }],
        //             }),
        //         },
        //     );
        //     expect(container.querySelector("section")).toBeTruthy();
        // });
    });
});
