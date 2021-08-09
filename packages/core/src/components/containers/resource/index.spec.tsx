import React from "react";

import { render, TestWrapper, MockJSONServer } from "@test";

import { Resource } from "./index";
import { List } from "@components/crud";
import { Table } from "antd";

describe("<Resource />", () => {
    const PostList = () => {
        return (
            <List>
                <Table rowKey="id">
                    <Table.Column key="title" title="Title" dataIndex="title" />
                </Table>
            </List>
        );
    };
    it("renders with List", async () => {
        const { container } = render(
            <Resource name="posts" list={PostList} />,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                    routerInitialEntries: ["/posts"],
                }),
            },
        );

        expect(container).toBeDefined();
    });
});
