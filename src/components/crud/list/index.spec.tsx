import React from "react";

import {
    render,
    TestWrapper,
    MockJSONServer,
    waitForElementToBeRemoved,
} from "@test";

import { Table, Column } from "@components";

import { List } from "./index";

describe("<List/>", () => {
    describe("JSON Rest Server", () => {
        it("mounts with table", async () => {
            const { getByText } = render(
                <List resourceName="posts">
                    <Table />
                </List>,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [{ name: "posts" }],
                    }),
                },
            );

            waitForElementToBeRemoved(() => getByText("No Data"));
        });
        it("renders given data", async () => {
            const { findByText } = render(
                <List resourceName="posts">
                    <Table>
                        <Column key="slug" title="Slug" dataIndex="slug" />
                    </Table>
                </List>,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [{ name: "posts" }],
                    }),
                },
            );

            const slug = await findByText("ut-ad-et");

            expect(slug).toHaveProperty("className", "ant-table-cell");
        });
    });
});
