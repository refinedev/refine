import React from "react";
import { RefineFieldBooleanProps } from "@pankod/refine-ui-types";

import { act, fireEvent, render, waitFor, screen } from "@test";

export const fieldBooleanTests = function (
    BooleanField: React.ComponentType<
        RefineFieldBooleanProps<unknown, any, any>
    >,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Boolean Field", () => {
        beforeAll(() => {
            jest.useFakeTimers();
        });

        afterAll(() => {
            jest.useRealTimers();
        });

        it("should use prop for custom text", async () => {
            const baseDom = render(
                <div data-testid="custom-field">
                    <BooleanField value={true} valueLabelTrue="test" />
                </div>,
            );

            const booleanField =
                baseDom.getByTestId("custom-field").children[0];

            act(() => {
                fireEvent.mouseOver(booleanField);
            });

            await waitFor(() => {
                expect(screen.getByText("test")).toBeInTheDocument();
            });
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

            expect(getByTestId("icon-custom-element")).toBeTruthy();
        });
    });
};
