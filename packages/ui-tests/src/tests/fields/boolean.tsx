import React from "react";
import { RefineFieldBooleanProps } from "@pankod/refine-ui-types";

import { fireEvent, render } from "@test";

export const fieldBooleanTests = function (
    BooleanField: React.ComponentType<RefineFieldBooleanProps<any, any, any>>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Boolean Field", () => {
        beforeAll(() => {
            jest.useFakeTimers();
        });

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
            const { getByTestId } = render(
                <div data-testid="custom-field">
                    <BooleanField
                        value={true}
                        trueIcon={<div data-testid="icon-custom-element" />}
                    />
                </div>,
            );

            expect(getByTestId("icon-custom-element")).toBe(true);
        });
    });
};
