import React from "react";

import {
    render,
    TestWrapper,
    MockJSONServer,
    getByTestId,
    fireEvent,
} from "@test";
import { act } from "react-dom/test-utils";
import { Form, FormItem, SelectInput, TextInput } from "@components";
import { Filter } from "./";

describe("containers / filter", () => {
    const filters = (
        <Form
            data-testid="filter-form"
            name="filter-form"
            style={{
                marginBlock: 10,
            }}
            layout="inline"
        >
            <FormItem label="Search" name="q" data-testid="search">
                <TextInput placeholder="Search" />
            </FormItem>
            <FormItem label="Status" name="status" hidden data-testid="status">
                <SelectInput
                    allowClear
                    placeholder="All Status"
                    options={[
                        {
                            label: "Active",
                            value: "active",
                        },
                        {
                            label: "Draft",
                            value: "draft",
                        },
                    ]}
                />
            </FormItem>
        </Form>
    );

    it("render correct filters", async () => {
        const { container, findByTestId } = render(
            <Filter resourceName="posts">{filters}</Filter>,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [],
                }),
            },
        );

        expect(getByTestId(container, "search"));
        expect(await getByTestId(container, "status"));
        expect(
            await getByTestId(container, "status").getAttribute("class"),
        ).toContain("ant-form-item-hidden");

        expect(await findByTestId("filter-form")).toMatchSnapshot();
    });

    it("render correct filters dropdown", async () => {
        const { container, findByTestId } = render(
            <Filter resourceName="posts">{filters}</Filter>,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [],
                }),
            },
        );

        act(() => {
            fireEvent.click(getByTestId(container, "filters-dropdown-button"));
        });

        expect(await findByTestId("filters-dropdown")).toMatchSnapshot();
    });
});
