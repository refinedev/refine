import React, { ReactNode } from "react";
import { RefineFieldTextProps } from "@pankod/refine-ui-types";

import { render } from "@test";

export const fieldTextTests = function (
    TextField: React.ComponentType<RefineFieldTextProps<ReactNode, any>>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Text Field", () => {
        beforeAll(() => {
            jest.useFakeTimers();
        });

        it("renders text correctly", () => {
            const { getByText } = render(<TextField value="test" />);

            getByText("test");
        });
    });
};
