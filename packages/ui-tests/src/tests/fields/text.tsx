import React, { ReactNode } from "react";
import { RefineFieldTextProps } from "@refinedev/ui-types";

import { render } from "@test";

export const fieldTextTests = function (
    TextField: React.ComponentType<RefineFieldTextProps<ReactNode, any>>,
): void {
    describe("[@refinedev/ui-tests] Common Tests / Text Field", () => {
        it("renders text correctly", () => {
            const { getByText } = render(<TextField value="test" />);

            getByText("test");
        });
    });
};
