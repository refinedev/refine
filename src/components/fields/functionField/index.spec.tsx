import React from "react";

import { FunctionField } from "./";

import { render } from "@test";
describe("FunctionField", () => {
    it("renders email with mailto href", () => {
        const { getByText } = render(
            <FunctionField
                record={{ id: 1, firstName: "John", lastName: "Wick" }}
                render={(record: any) =>
                    `${record.firstName} ${record.lastName}`
                }
            />,
        );

        getByText("John Wick");
    });
});
