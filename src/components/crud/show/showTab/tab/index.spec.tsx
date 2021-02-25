import React from "react";

import { render, TestWrapper } from "@test";

import { TextField, ShowTab } from "@components";

import { Tab } from "./index";

describe("<Tab/>", () => {
    it("renders tab content with labeled data", async () => {
        const { getByText } = render(
            <ShowTab record={{ id: 1, slug: "testslug" }}>
                <Tab>
                    <TextField renderRecordKey="id" />
                    <TextField renderRecordKey="slug" />
                </Tab>
            </ShowTab>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );

        const idTitle = getByText("Id");
        expect(idTitle.tagName).toBe("H5");

        getByText("testslug");
    });
});
