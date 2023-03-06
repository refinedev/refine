import React from "react";
import {
    RefineRefreshButtonProps,
    RefineButtonTestIds,
} from "@refinedev/ui-types";

import { act, fireEvent, render, TestWrapper } from "@test";

export const buttonRefreshTests = function (
    RefreshButton: React.ComponentType<RefineRefreshButtonProps<any, any>>,
): void {
    describe("[@refinedev/ui-tests] Common Tests / Refresh Button", () => {
        const refresh = jest.fn();

        it("should render button successfuly", async () => {
            const { container } = render(<RefreshButton />, {
                wrapper: TestWrapper({}),
            });

            expect(container).toBeTruthy();
        });

        it("should have the correct test-id", async () => {
            const { queryByTestId } = render(<RefreshButton />, {
                wrapper: TestWrapper({}),
            });

            expect(
                queryByTestId(RefineButtonTestIds.RefreshButton),
            ).toBeTruthy();
        });

        it("should render text by children", async () => {
            const { container, getByText } = render(
                <RefreshButton>refine</RefreshButton>,
                {
                    wrapper: TestWrapper({}),
                },
            );

            expect(container).toBeTruthy();

            getByText("refine");
        });

        it("should render without text show only icon", async () => {
            const { container, queryByText } = render(
                <RefreshButton hideText />,
                {
                    wrapper: TestWrapper({}),
                },
            );

            expect(container).toBeTruthy();

            expect(queryByText("Refresh")).not.toBeInTheDocument();
        });

        it("should render called function successfully if click the button", async () => {
            const { getByText } = render(
                <RefreshButton onClick={() => refresh()} />,
                {
                    wrapper: TestWrapper({}),
                },
            );

            await act(async () => {
                fireEvent.click(getByText("Refresh"));
            });

            expect(refresh).toHaveBeenCalledTimes(1);
        });
    });
};
