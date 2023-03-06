import React from "react";
import { RefineErrorPageProps } from "@refinedev/ui-types";

import { render, TestWrapper } from "@test";

export const pageErrorTests = function (
    ErrorPage: React.ComponentType<RefineErrorPageProps>,
): void {
    describe("[@refinedev/ui-tests] Common Tests / Error Page", () => {
        it("should render successfully", async () => {
            const { container } = render(<ErrorPage />, {
                wrapper: TestWrapper({}),
            });

            expect(container).toBeTruthy();
        });
    });
};
