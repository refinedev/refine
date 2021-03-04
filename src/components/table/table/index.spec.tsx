import React from "react";

import { TestWrapper, MockJSONServer, render } from "@test";

import { List } from "@components";
import { Table } from "./index";

describe("Table", () => {
    it("Should render table succesfully", async () => {
        const { getByTestId } = render(
            <List key="posts" resourceName="posts">
                <Table rowKey="id" filter={{ categoryId: [38] }}></Table>
            </List>,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }],
                }),
            },
        );

        expect(getByTestId("ant-tab")).toBeDefined();
    });
});
