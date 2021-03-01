import React from "react";

import { fireEvent, render, TestWrapper } from "@test";

import { TextField } from "@components";

import { ShowTab, Tab } from "./index";

describe("<ShowTab/>", () => {
    it("renders Tabs", async () => {
        const { getByTestId, getByText, getByRole, getAllByRole } = render(
            <ShowTab record={{ id: 1, slug: "testslug" }} data-testid="showtab">
                <Tab tab="Id Tab">
                    <TextField renderRecordKey="id" />
                </Tab>
                <Tab tab="Slug Tab">
                    <TextField renderRecordKey="slug" />
                </Tab>
            </ShowTab>,
            {
                wrapper: TestWrapper({
                    resources: [{ name: "posts" }],
                }),
            },
        );

        const tabs = getByTestId("showtab");
        expect(tabs.classList.contains("ant-tabs")).toBe(true);
        getByRole("tablist");
        expect(getAllByRole("tab")).toHaveLength(2);

        fireEvent.click(getByText("Slug Tab"));
        getByText("testslug");
    });
});
