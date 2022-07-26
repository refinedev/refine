import React from "react";
import { RefineLayoutTitleProps } from "@pankod/refine-ui-types";

import { act, render, TestWrapper } from "@test";

export const layoutTitleTests = function (
    TitleElement: React.ComponentType<RefineLayoutTitleProps>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Title Element", () => {
        beforeAll(() => {
            jest.useFakeTimers();
        });

        it("should render successfully", async () => {
            const { container } = render(<TitleElement collapsed={false} />, {
                wrapper: TestWrapper({}),
            });

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(container).toBeTruthy();
        });
    });
};
