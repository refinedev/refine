import React from "react";

import { render, TestWrapper, MockJSONServer, getByTestId } from "@test";
import { Form, FormItem, SelectInput, TextInput } from "@components";
import { Filter } from "./";

// import { categories } from "@test/dataMocks";

describe("containers / filter", () => {
    it("render correct filters", async () => {
        const { debug, container, findAllByTestId } = render(
            <Filter resourceName="posts">
                <Form
                    name="filter-form"
                    style={{
                        marginBlock: 10,
                    }}
                    layout="inline"
                >
                    <FormItem label="Search" name="q" data-testid="search">
                        <TextInput placeholder="Search" />
                    </FormItem>
                    <FormItem
                        label="Status"
                        name="status"
                        hidden
                        data-testid="status"
                    >
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
            </Filter>,
            {
                wrapper: TestWrapper({
                    dataProvider: MockJSONServer,
                    resources: [{ name: "posts" }, { name: "categories" }],
                }),
            },
        );

        expect(getByTestId(container, "search"));
        expect(await getByTestId(container, "status"));
        expect(
            await getByTestId(container, "status").getAttribute("class"),
        ).toContain("ant-form-item-hidden");

        // debug();

        // const options = await findAllByTestId("option-item");

        // const expected = categories.map((el) => el.title);
        // const retrieved = options.map((el) => el.innerHTML);

        // expect(retrieved).toMatchObject(expected);
    });
});
