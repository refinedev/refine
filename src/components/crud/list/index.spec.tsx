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
                <List key="posts" resourceName="posts">
                    <Table rowKey="id" />
                </List>,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [{ name: "posts" }],
                    }),
                },
            );

            await waitForElementToBeRemoved(() => getByText("No Data"));
        });
        it("renders given data", async () => {
            const { container } = render(
                <List key="posts" resourceName="posts">
                    <Table rowKey="id">
                        <Column key="title" title="Title" dataIndex="title" />
                    </Table>
                </List>,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [{ name: "posts" }],
                    }),
                },
            );

            expect(container).toMatchSnapshot();
        });

        it("should wrap with given component", async () => {
            const { container } = render(
                <List component={"section"} resourceName="posts">
                    <Table rowKey="id">
                        <Column key="title" title="Title" dataIndex="title" />
                    </Table>
                </List>,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [{ name: "posts" }],
                    }),
                },
            );
            expect(container.querySelector("section")).toBeTruthy();
        });
    });
});
