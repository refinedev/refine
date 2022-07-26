import React from "react";
import { RefineLoginPageProps } from "@pankod/refine-ui-types";

import { render, TestWrapper } from "@test";

export const pageLoginTests = function (
    LoginPage: React.ComponentType<RefineLoginPageProps>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Login Page", () => {
        beforeAll(() => {
            jest.useFakeTimers();
        });

        it("should render successfully", async () => {
            const { container } = render(<LoginPage />, {
                wrapper: TestWrapper({}),
            });

            expect(container).toBeTruthy();
        });
    });
};
