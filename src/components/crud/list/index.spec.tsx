import React from "react";

import {
    render,
    TestWrapper,
    MockJSONServer,
    waitForElementToBeRemoved,
} from "@test";

import { Table, TextField } from "@components";

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

            await waitForElementToBeRemoved(() => getByText("No Data"));
        });
        it("renders given data", async () => {
            const { findByText } = render(
                <List resourceName="posts">
                    <Table>
                        <TextField title="Slug" source="slug" />
                    </Table>
                </List>,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [{ name: "posts" }],
                    }),
                },
            );

            await findByText("ut-ad-et");
        });
    });
});
