import React from "react";

import { CheckSquareOutlined } from "@ant-design/icons";

import { render, fireEvent } from "@test";
import { BooleanField } from "./";

describe("BooleanField", () => {
    describe("BooleanField with default props values", () => {
        const initialValues = [true, false, "true", "false", "", undefined];

        const results = ["true", "false", "true", "true", "false", "false"];

        const iconClass = [
            "anticon-check",
            "anticon-close",
            "anticon-check",
            "anticon-check",
            "anticon-close",
            "anticon-close",
        ];

        initialValues.forEach((element, index) => {
            const testName =
                index === 2 || index === 3 || index === 4
                    ? `"${initialValues[index]}"`
                    : initialValues[index];

            it(`renders boolean field value(${testName}) with correct tooltip text and icon`, async () => {
                const baseDom = render(
                    <div data-testid="default-field">
                        <BooleanField value={element} />
                    </div>,
                );

                fireEvent.mouseOver(
                    baseDom.getByTestId("default-field").children[0],
                );

                expect(
                    await baseDom.findByText(results[index]),
                ).toBeInTheDocument();

                expect(
                    baseDom
                        .getByTestId("default-field")
                        .children[0].children[0].classList.contains(
                            iconClass[index],
                        ),
                ).toBe(true);
            });
        });
    });

    describe("BooleanField with custom props values", () => {
        it("should use prop for custom text", async () => {
            const baseDom = render(
                <div data-testid="custom-field">
                    <BooleanField value={true} valueLabelTrue="test" />
                </div>,
            );

            const booleanField =
                baseDom.getByTestId("custom-field").children[0];
            fireEvent.mouseOver(booleanField);

            expect(await baseDom.findByText("test")).toBeInTheDocument();
        });

        it("renders value with prop for custom icon", () => {
            const baseDom = render(
                <div data-testid="custom-field">
                    <BooleanField
                        value={true}
                        trueIcon={<CheckSquareOutlined />}
                    />
                </div>,
            );

            const booleanField =
                baseDom.getByTestId("custom-field").children[0];

            expect(
                booleanField.children[0].classList.contains(
                    "anticon-check-square",
                ),
            ).toBe(true);
        });
    });
});
