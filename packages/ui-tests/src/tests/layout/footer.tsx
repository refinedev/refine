import React from "react";
import { RefineLayoutFooterProps } from "@pankod/refine-ui-types";

import { act, render, TestWrapper } from "@test";

export const layoutFooterTests = function (
    FooterElement: React.ComponentType<RefineLayoutFooterProps>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Footer Element", () => {
        it("should render successfully", async () => {
            const { container } = render(<FooterElement />, {
                wrapper: TestWrapper({}),
            });

            expect(container).toBeTruthy();
        });
    });
};
