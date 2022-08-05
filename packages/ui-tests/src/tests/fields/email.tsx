import React, { ReactNode } from "react";
import { RefineFieldEmailProps } from "@pankod/refine-ui-types";

import { render } from "@test";

export const fieldEmailTests = function (
    EmailField: React.ComponentType<RefineFieldEmailProps<ReactNode, any, any>>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Email Field", () => {
        beforeAll(() => {
            jest.useFakeTimers();
        });

        it("renders email with mailto href", () => {
            const { getByText } = render(<EmailField value="test@test.com" />);

            expect(getByText("test@test.com")).toHaveProperty(
                "href",
                "mailto:test@test.com",
            );
        });
    });
};
