import React from "react";
import {
    RefineImportButtonProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";

import { act, render, TestWrapper } from "@test";

export const buttonImportTests = function (
    ImportButton: React.ComponentType<RefineImportButtonProps<any, any>>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Import Button", () => {
        const parseMock = jest.fn();

        beforeAll(() => {
            jest.useFakeTimers();

            jest.mock("papaparse", () => {
                return {
                    parse: jest.fn(() => parseMock()),
                };
            });
        });

        it("should render button successfuly", async () => {
            const { container, getByText } = render(<ImportButton />, {
                wrapper: TestWrapper({}),
            });

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(container).toBeTruthy();
            getByText("Import");
        });

        it("should have the correct test-id", async () => {
            const { queryByTestId } = render(<ImportButton />, {
                wrapper: TestWrapper({}),
            });

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(
                queryByTestId(RefineButtonTestIds.ImportButton),
            ).toBeTruthy();
        });

        it("should render text by children", async () => {
            const { container, getByText } = render(
                <ImportButton>refine</ImportButton>,
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
                <ImportButton hideText />,
            );

            await act(async () => {
                jest.advanceTimersToNextTimer(1);
            });

            expect(container).toBeTruthy();
            expect(queryByText("Import")).not.toBeInTheDocument();
        });
    });
};
