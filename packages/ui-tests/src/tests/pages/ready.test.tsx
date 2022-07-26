import React from "react";
import { RefineReadyPageProps } from "@pankod/refine-ui-types";

import { render, TestWrapper } from "@test";

export const pageReadyTests = function (
    ReadyPage: React.ComponentType<RefineReadyPageProps>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Ready Page", () => {
        beforeAll(() => {
            jest.useFakeTimers();
        });

        it("should render successfully", async () => {
            const { container } = render(<ReadyPage />, {
                wrapper: TestWrapper({}),
            });

            expect(container).toBeTruthy();
        });
    });
};
