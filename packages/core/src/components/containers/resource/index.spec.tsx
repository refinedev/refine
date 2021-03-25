import React from "react";

import { render, TestWrapper, MockJSONServer } from "@test";

import { Resource } from "./index";
import { List } from "@components/crud";
import { Column } from "@components";
import { Table } from "antd";

describe("<Resource />", () => {
    const PostList = ({ resourceName }: { resourceName: string }) => {
        return (
            <List resourceName={resourceName}>
                <Table rowKey="id">
                    <Column key="title" title="Title" dataIndex="title" />
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
                    routerInitialEntries: ["/resources/posts"],
                }),
            },
        );

        expect(container).toBeDefined();
    });
});
