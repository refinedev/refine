import React from "react";

import { render, TestWrapper, MockJSONServer } from "@test";

import { Resource } from "./index";
import { List } from "@components/crud";
import { Table, TextField } from "@components";

describe("<Resource />", () => {
    const PostList = ({ resourceName }: { resourceName: string }) => {
        return (
            <List resourceName={resourceName}>
                <Table>
                    <TextField source="title" />
                </Table>
            </List>
        );
    };
    it("renders with data", async () => {
        const { findByText } = render(
            <Resource name="posts" list={PostList} />,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                    routerInitialEntries: ["/resources/posts"],
                }),
            },
        );

        await findByText("Necessitatibus", {
            exact: false,
        });
    });
});
