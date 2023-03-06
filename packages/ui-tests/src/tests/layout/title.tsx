import React from "react";
import { RefineLayoutTitleProps } from "@refinedev/ui-types";

import { render, TestWrapper } from "@test";

export const layoutTitleTests = function (
    TitleElement: React.ComponentType<RefineLayoutTitleProps>,
): void {
    describe("[@refinedev/ui-tests] Common Tests / Title Element", () => {
        it("should render successfully", async () => {
            const { container } = render(<TitleElement collapsed={false} />, {
                wrapper: TestWrapper({}),
            });

            expect(container).toBeTruthy();
        });
    });
};
