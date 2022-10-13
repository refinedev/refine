import React from "react";

import { render, TestWrapper } from "@test";

export const pageLoginTests = function (LoginPage: React.ComponentType): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Login Page", () => {
        it("should render successfully", async () => {
            const { container } = render(<LoginPage />, {
                wrapper: TestWrapper({}),
            });

            expect(container).toBeTruthy();
        });
    });
};
