import React from "react";

import { render, TestWrapper, MockJSONServer } from "@test";

import { ReferenceInput } from "./index";
import { categories } from "@test/dataMocks";

const TestComponent = (props: any) => {
    if (!props?.options || props?.options.length === 0) return null;
    return (
        <ul data-testid="prop-control">
            {props.options.map((el: any) => {
                return (
                    <li data-testid="option-item" key={el.value}>
                        {el.label}
                    </li>
                );
            })}
        </ul>
    );
};

describe("<ReferenceInput/>", () => {
    describe("JSON Rest Server", () => {
        it("passes label-value pairs as options to child", async () => {
            const { findAllByTestId } = render(
                <ReferenceInput optionText="title" reference="categories">
                    <TestComponent />
                </ReferenceInput>,
                {
                    wrapper: TestWrapper({
                        dataProvider: MockJSONServer,
                        resources: [{name: "posts"}, {name: "categories"}],
                    }),
                },
            );
            const options = await findAllByTestId("option-item");

            const expected = categories.map((el) => el.title);
            const retrieved = options.map((el) => el.innerHTML);

            expect(retrieved).toMatchObject(expected);
        });
    });
});
