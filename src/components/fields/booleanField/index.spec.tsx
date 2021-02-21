import React from "react";

import { CheckSquareOutlined, CloseOutlined } from "@ant-design/icons";

import { render } from "@test";
import { BooleanField } from "./";

describe("BooleanField", () => {
    it("renders boolean field value with correct icon", () => {
        const { getByTestId } = render(
            <BooleanField value={true} data-testid="test-boolean-field" />,
        );

        const icon = getByTestId("test-boolean-field").children[0].children[0];

        expect(icon.classList.contains("anticon-check")).toBe(true);
    });

    it("renders value with prop for custom icon", () => {
        const { getByTestId } = render(
            <BooleanField
                value={true}
                data-testid="test-boolean-field"
                TrueIcon={<CheckSquareOutlined />}
            />,
        );

        const icon = getByTestId("test-boolean-field").children[0].children[0];

        expect(icon.classList.contains("anticon-check-square")).toBe(true);
    });

    it("renders empty string if the value is undefined", () => {
        const { getAllByText } = render(<BooleanField value={undefined} />);

        getAllByText("");
    });
});
