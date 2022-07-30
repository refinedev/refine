import React from "react";
import {
    RefineExportButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";

import { act, render, TestWrapper } from "@test";

export const buttonExportTests = function (
    ExportButton: React.ComponentType<RefineExportButtonProps<any, any>>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Export Button", () => {
        beforeAll(() => {
            jest.spyOn(console, "warn").mockImplementation(jest.fn());
            jest.useFakeTimers();
        });

        it("should render button successfuly", async () => {
            const { container, getByText } = render(<ExportButton />, {
                wrapper: TestWrapper({}),
            });

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(container).toBeTruthy();
            getByText("Export");
        });

        it("should have the correct test-id", async () => {
            const { queryByTestId } = render(<ExportButton />, {
                wrapper: TestWrapper({}),
            });

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(
                queryByTestId(RefineButtonTestIds.ExportButton),
            ).toBeTruthy();
        });

        it("should render text by children", async () => {
            const { container, getByText } = render(
                <ExportButton>refine</ExportButton>,
                {
                    wrapper: TestWrapper({}),
                },
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(container).toBeTruthy();

            getByText("refine");
        });

        it("should render without text show only icon", async () => {
            const { container, queryByText } = render(
                <ExportButton hideText />,
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(container).toBeTruthy();

            expect(queryByText("Export")).not.toBeInTheDocument();
        });
    });
};
