import React from "react";
import { RefineFieldMarkdownProps } from "@pankod/refine-ui-types";

import { render } from "@test";

export const fieldMarkdownTests = function (
    MarkdownField: React.ComponentType<
        RefineFieldMarkdownProps<string | undefined>
    >,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Markdown Field", () => {
        beforeAll(() => {
            jest.useFakeTimers();
        });

        it("renders markDown text with correct value", () => {
            const { getByText, container } = render(
                <div data-testid="custom-field">
                    <MarkdownField value={`**MarkdownField Test**`} />
                </div>,
            );

            expect(container.querySelector("strong")).toBeTruthy();
            getByText("MarkdownField Test");
        });
        it("render markdown with undefined value should show empty string", () => {
            const { container } = render(
                <div data-testid="custom-field">
                    <MarkdownField value={undefined} />
                </div>,
            );

            expect(container).toBeTruthy();
        });
    });
};
