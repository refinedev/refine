import React from "react";

import { CheckSquareOutlined } from "@ant-design/icons";

import { render, fireEvent } from "@test";
import { BooleanField } from "./";

describe("BooleanField", () => {
    describe("BooleanField with default props values", () => {
        it("renders boolean field value with correct tooltip text", async () => {
            const baseDom = render(
                <div data-testid="default-field">
                    <BooleanField value={true} />
                </div>,
            );

            fireEvent.mouseOver(
                baseDom.getByTestId("default-field").children[0],
            );

            expect(await baseDom.findByText("true")).toBeInTheDocument();
        });

        it("renders boolean field value with correct icon", () => {
            const baseDom = render(
                <div data-testid="default-field">
                    <BooleanField value={true} />
                </div>,
            );

            const booleanField = baseDom.getByTestId("default-field")
                .children[0];

            expect(
                booleanField.children[0].classList.contains("anticon-check"),
            ).toBe(true);
        });
    });

    describe("BooleanField with custom props values", () => {
        it("should use prop for custom text", async () => {
            const baseDom = render(
                <div data-testid="custom-field">
                    <BooleanField
                        value={true}
                        valueLabelTrue="test"
                        TrueIcon={<CheckSquareOutlined />}
                    />
                </div>,
            );

            const booleanField = baseDom.getByTestId("custom-field")
                .children[0];
            fireEvent.mouseOver(booleanField);

            expect(await baseDom.findByText("test")).toBeInTheDocument();
        });

        it("renders value with prop for custom icon", () => {
            const baseDom = render(
                <div data-testid="custom-field">
                    <BooleanField
                        value={true}
                        valueLabelTrue="test"
                        TrueIcon={<CheckSquareOutlined />}
                    />
                </div>,
            );

            const booleanField = baseDom.getByTestId("custom-field")
                .children[0];

            expect(
                booleanField.children[0].classList.contains(
                    "anticon-check-square",
                ),
            ).toBe(true);
        });
    });
});
